export default class FindByMark {
  colsCount = 6;

  carbrands = ['Aston Martin', 'BMW', 'Honda', 'Baic', 'HMC', 'Rolls Roice', 'Haval'];

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
    this.findAllFirstLetters(carbrands).forEach((letter) => {
      this.$content.append(`
        <div data-letter="${letter}" class="find-by-marks-desktop__item">
          <span class="find-by-marks-desktop__title header-text-l">
            ${letter}
          </span>
        </div>  
      `);
    });

    carbrands.forEach((brand) => {
      const firstLetter = brand[0].toUpperCase();
      this.$content.find(`[data-letter="${firstLetter}"`).append(`
        <a href="#" class="find-by-marks-desktop__mark regular-text-m">
          ${brand}
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
    const filteredCarbrands = this.carbrands.filter((carbrand) => carbrand.toLowerCase().includes(value.toLowerCase()));
    this.fillBrandsList(filteredCarbrands);
    this.fillMobileBrandsList(filteredCarbrands);
  }

  fillMobileBrandsList(carbrands) {
    this.$mobileContent.empty();
    carbrands.forEach((brand) => {
      this.$mobileContent.append(`
        <a href="#" class="car-brands__item">
          <div class="car-brands__item__text">
            <span class="${brand}-icon brand-icon"></span>
            <span>${brand}</span>
          </div>
          <span class="arrow-icon"></span>
        </a>
      `);
    });
  }
}
