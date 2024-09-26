/* eslint-disable camelcase */
export default class MarkSearch {
  colsCount = 6;

  carbrands = [];

  $closeBtn = $('.header-input-search__button');

  $content = $('.find-by-marks-desktop');

  $findField = $('.header-input-search');

  $mobileInput = $('.header-input-search-mobile');

  $mobileClose = $('.header-input-search-mobile-button');

  $mobileContent = $('.find-by-marks-mobile');

  missingNodes = [
    $('.header .logo'),
    $('.header nav'),
    $('.header .button.main'),
    $('.main__banner__container'),
    $('.car-brands__container'),
    $('.new-cars__container'),
    $('.day-offer__container'),
    $('.gifts__container'),
    $('section.most-popular'),
    $('.feedbacks__container'),
    $('.promo__container'),
    $('.competitors__container'),
    $('.about-info__container'),
    $('.contacts__container'),
    $('.footer__form'),
  ];

  mobileMissingNodes = [
    $('.mobile-menu__content nav'),
    $('.mobile-menu__bottom'),
    $('.mobile-menu__top .cross'),
  ];

  constructor(carbrands, colsCount) {
    if (colsCount) {
      this.colsCount = colsCount;
    }

    if (carbrands) {
      this.carbrands = carbrands;
    }

    this.initListeners();
    this.fillBrandsList(this.carbrands);
    this.fillMobileBrandsList(this.carbrands);
  }

  initListeners() {
    const focusSearchCb = this.handleFocusSearch.bind(this);
    const closeSearchCb = this.handleCloseSearch.bind(this);
    const handleInputCb = this.handleInputSearch.bind(this);
    const focusMobileSearchCb = this.handleMobileFocusSearch.bind(this);
    const closeMobileSearchCb = this.handleMobileCloseSearch.bind(this);

    this.$findField.on('focus', focusSearchCb);
    this.$mobileInput.on('focus', focusMobileSearchCb);
    this.$findField.on('input', handleInputCb);
    this.$mobileInput.on('input', handleInputCb);
    this.$closeBtn.on('click', closeSearchCb);
    this.$mobileClose.on('click', closeMobileSearchCb);
  }

  handleMobileFocusSearch() {
    this.#hideMissingNodes(this.mobileMissingNodes);
    this.$mobileClose.addClass('active');
    this.$mobileContent.addClass('active');
    $('.mobile-menu__content').css({ 'justify-content': 'flex-start' });
  }

  handleMobileCloseSearch() {
    $('.header__actions').removeClass('header-input-search__active-action');
    this.#showMissingNodes(this.mobileMissingNodes);
    this.$mobileClose.removeClass('active');
    this.$mobileContent.removeClass('active');
    $('.mobile-menu__content').css({ 'justify-content': 'space-between' });
  }

  handleFocusSearch(event) {
    const target = $(event.currentTarget);
    this.#hideMissingNodes(this.missingNodes);
    this.$closeBtn.addClass('active');
    this.$content.addClass('active');
    target.closest('.input__wrapper').addClass('active');
    $('.header__actions').addClass('header-input-search__active-action');
  }

  handleCloseSearch() {
    $('.header__actions').removeClass('header-input-search__active-action');
    this.$findField.closest('.input__wrapper').removeClass('active');
    this.#showMissingNodes(this.missingNodes);
    this.$closeBtn.removeClass('active');
    this.$content.removeClass('active');
  }

  #hideMissingNodes (type) {
    type.forEach((el) => {
      el.hide();
    });
  }

  #showMissingNodes (type) {
    type.forEach((el) => {
      el.show();
    });
  }

  fillBrandsList(carbrands) {
    this.$content.empty();
    const brands = carbrands.flatMap((brand) => Object.keys(brand)).sort();

    this.findAllFirstLetters(brands).forEach((letter) => {
      this.$content.append(`
        <div data-letter="${letter}" class="find-by-marks-desktop__item">
          <span class="find-by-marks-desktop__title header-text-l">
            ${letter}
          </span>
        </div>  
      `);
    });

    carbrands.forEach((brand) => {
      const brandName = Object.keys(brand)[0];
      const { url } = brand[brandName];
      const firstLetter = brandName[0].toUpperCase();
      this.$content.find(`[data-letter="${firstLetter}"`).append(`
        <a href="${url}" target="_blank" class="find-by-marks-desktop__mark regular-text-m">
          ${brandName}
        </a>
      `);
    });
  }

  findAllFirstLetters(carbrands) {
    return Array.from(
      new Set(
        carbrands.map((brand) => brand[0].toUpperCase()),
      ),
    );
  }

  handleInputSearch(event) {
    const { value } = event.currentTarget;
    const filteredCarbrands = this.carbrands.filter((carbrand) => {
      const brand = Object.keys(carbrand)[0].toLocaleLowerCase();
      return brand.includes(value.toLocaleLowerCase());
    });

    this.fillBrandsList(filteredCarbrands);
    this.fillMobileBrandsList(filteredCarbrands);
  }

  fillMobileBrandsList(carbrands) {
    this.$mobileContent.empty();

    carbrands.forEach((brand) => {
      const brandName = Object.keys(brand)[0];
      const { url, image_monotone } = brand[brandName];

      this.$mobileContent.append(`
        <a href="${url}" target="_blank" class="car-brands__item">
          <div class="car-brands__item__text">
            <img src="${image_monotone}" class="brand-icon"></img>
            <span>${brandName}</span>
          </div>
          <span class="arrow-icon"></span>
        </a>
      `);
    });
  }

  static async getMarks () {
    try {
      return await $.ajax('https://multi-4.vitmp.ru/api/auto/new/mark/list');
    } catch (error) {
      return [];
    }
  }
}
