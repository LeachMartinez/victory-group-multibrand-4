/* eslint-disable no-eval */
// JQuery modules
import 'jquery.inputmask';
import 'jquery-lazy';
import 'jquery-modal';
import 'jquery-validation';
import 'jquery.cookie';

import 'inputmask.numeric.extensions';

import $ from 'jquery';

// Select2
import 'select2/dist/js/select2.full.js';

// Fancybox
import { Fancybox } from '@fancyapps/ui';

// Swiper modules
import Swiper from 'swiper';
import {
  Autoplay, Grid, Navigation, Pagination,
} from 'swiper/modules';

// self
import MarkSearch from './header/MarkSearch.js';
import './ui/range.js';
import Timer from './ui/timer.js';
import Tab from './ui/tabs.js';

// config file
import configuration from './configuration.js';

// import styles
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'select2/dist/css/select2.min.css';
import 'jquery-modal/jquery.modal.min.css';
import 'swiper/css/bundle';
import '../scss/app.scss';
import CreditCalculator from './calculator/index.js';
import ReviewForm from './customForm/ReviewForm.js';
import TimerOffer from './ui/offerTimer.js';
import CallbackWidget from './callback/index.js';

window.$ = $;
// window.configuration = configuration;
window.app = {
  runMasks: () => {
    $('.js-phone-mask').inputmask({
      mask: '+7 (*99) 999-99-99',
      definitions: {
        '*': {
          validator: '[4,9]',
        },
      },
      showMaskOnHover: false,
    });

    $('.js-digits-mask').inputmask({
      alias: 'currency',
      allowMinus: 'false',
      digits: '0',
      groupSeparator: ' ',
      rightAlign: false,
      prefix: '',
    });

    $('.js-numeric-mask').inputmask({
      alias: 'numeric',
      allowMinus: 'false',
      rightAlign: false,
    });
  },
  runSwiper: () => {
    const slides = configuration.sliders;
    const defaultSwiperBullets = (index, className) => `<span class="${className}">${index + 1}</span>`;
    const defaultNavigation = {
      enabled: true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      lockClass: 'swiper-hide-pagination',
    };
    const defaultPagination = {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      lockClass: 'swiper-hide-pagination',
      renderBullet: defaultSwiperBullets,
    };

    if (window.outerWidth <= 1332) {
      slides.newCars.slidesPerView = 3;
    }

    if (window.outerWidth <= 1100) {
      slides.newCars.slidesPerGroup = 1;
      slides.newCars.slidesPerView = 1;
      slides.mostPopular.grid.rows = 4;
      slides.mostPopular.slidesPerView = 1;
      slides.catalogSwiper.slidesPerView = 1;
      slides.carCatalogSwiper.slidesPerView = 1;
      slides.carCatalogSwiper.slidesPerGroup = 1;
      slides.contactsGallerySwiper.slidesPerGroup = 1;
      slides.contactsGallerySwiper.slidesPerView = 1;
      slides.howToSwiper.pagination = {
        type: 'fraction',
        el: '.how-to__pagination__mobile .swiper-pagination',
      };
      $('.compare-navigation-prev').remove();
      $('.compare-navigation-next').remove();
      slides.allFeedbacksSwiper.grid.rows = 3;
      slides.allFeedbacksSwiper.slidesPerView = 1;
    }

    if (window.outerWidth <= 699) {
      slides.carGallerySwiper.slidesPerView = 1;
    }

    const newCarsSwiper = new Swiper('.new-cars-swiper', {
      ...slides.newCars,
      modules: [Grid, Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const mostPopularSwiper = new Swiper('.most-popular-swiper', {
      ...slides.mostPopular,
      modules: [Grid, Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const carGallerySwiper = new Swiper('.car-gallery-swiper', {
      ...slides.carGallerySwiper,
      modules: [Pagination, Navigation],
      navigation: defaultNavigation,
    });

    const bannerSwiper = new Swiper('.banner-swiper', {
      ...slides.bannerSwiper,
      modules: [Pagination, Autoplay],
      pagination: {
        clickable: false,
        el: '.banner-swiper-pagination',
        renderBullet: function (index, className) {
          return (`
            <div class="banner-swiper-bullet ${className}">
              <div class="banner-swiper-progress"></div> 
            </div>
          `);
        },
      },
      on: {
        autoplayTimeLeft(_, __, progress) {
          const progressInPercents = Math.round(progress * 100);
          $('.swiper-pagination-bullet-active .banner-swiper-progress').css({
            width: `${progressInPercents}%`,
            height: '4px',
            background: '#9CA5B3',
          });
        },
      },
    });

    const catalogSwiper = new Swiper('.catalog-swiper', {
      ...slides.catalogSwiper,
      modules: [Grid, Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const carCatalogSwiper = new Swiper('.car-catalog-swiper', {
      ...slides.carCatalogSwiper,
      modules: [Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const contactsGallerySwiper = new Swiper('.contacts-gallery-swiper', {
      ...slides.contactsGallerySwiper,
      modules: [Pagination, Navigation, Grid],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const howToSwiper = new Swiper('.how-to-swiper', {
      modules: [Pagination, Navigation],
      pagination: {
        type: 'fraction',
        el: '.swiper-pagination',
      },
      navigation: defaultNavigation,
      ...slides.howToSwiper,
    });

    const allFeedbacksSwiper = new Swiper('.all-feedbacks-swiper', {
      ...slides.allFeedbacksSwiper,
      modules: [Pagination, Grid, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const compareBodySwipers = [];
    const compareSwiper = new Swiper('.compareSwiper', {
      modules: [Pagination, Navigation],
      ...slides.compireSwiper,
      navigation: defaultNavigation,
      on: {
        slideChange() {
          compareBodySwipers.forEach((swiper) => {
            swiper.slideToLoop(this.realIndex);
          });
        },
      },
    });

    $('.compareSwiper-body').each((index, el) => {
      $(el).addClass(`compareSwiper-body-${index}`);
      compareBodySwipers.push(new Swiper(`.compareSwiper-body-${index}`, {
        ...slides.compireSwiper,
        allowTouchMove: false,
        modules: [Pagination, Navigation],
        pagination: defaultPagination,
        navigation: defaultNavigation,
      }));
    });

    return {
      allFeedbacksSwiper,
      contactsGallerySwiper,
      carCatalogSwiper,
      carGallerySwiper,
      newCarsSwiper,
      mostPopularSwiper,
      bannerSwiper,
      catalogSwiper,
      howToSwiper,
      compareSwiper,
    };
  },
  runTimers: () => {
    const timer = new Timer(configuration.timerDate, '.timer');
    timer.countdownTimer();
    const timerUpdateAction = timer.countdownTimer.bind(timer);
    timer.timerId = setInterval(timerUpdateAction, 1000);
  },
  runListeners: () => {
    $('#show-more-btn').on('click', (event) => {
      const target = $(event.currentTarget);
      if (target.text() === 'Показать все марки') {
        $('.car-brands__more').css({ display: 'flex' });
        return target.text('Скрыть марки');
      }

      $('.car-brands__more').css({ display: 'none' });
      return target.text('Показать все марки');
    });

    $('.menu-icon').on('click', () => {
      $('.mobile-menu').addClass('active');
    });

    $('.mobile-menu__backdrop').on('click', () => {
      $('.mobile-menu').removeClass('active');
    });

    $('.mobile-menu__content .cross').on('click', () => {
      $('.mobile-menu').removeClass('active');
    });
    $('.compare__item__cross').each((_, el) => {
      $(el).on('click', (event) => {
        const compareItemId = $(event.currentTarget).closest('.compare__item').data('complectation-id');
        $(`[data-complectation-id="${compareItemId}"]`).remove();
      });
    });
  },
  runTabs: () => {
    const mostPopularTabs = new Tab('.most-popular__tabs-container');
    const specTabs = new Tab('.specs__container');
    const mobileSpecTabs = new Tab('.modal-specs__tabs-container');

    return {
      specTabs,
      mostPopularTabs,
      mobileSpecTabs,
    };
  },
  runFindByMark: async () => new MarkSearch(await MarkSearch.getMarks()),
  runLazy: () => {
    $('.lazy').Lazy({
      // visibleOnly: true,
      combined: true,
      afterLoad: function(element) {
        element.addClass('loaded');
      },
    });
  },
  runSelect2: () => $('.select').select2(),
  runFancybox: () => {
    Fancybox.bind('[data-fancybox]', {});
  },
  runColors: () => {
    const $colorLinks = $('[data-color-link]');
    const $currentColorName = $('[data-current-color-name]');
    const $activeColorImage = $('[data-current-color-src]');

    $colorLinks.on('click', (event) => {
      $colorLinks.removeClass('active');
      $activeColorImage.attr('src', $(event.currentTarget).addClass('active').attr('data-color-link'));
      $currentColorName.text($(event.currentTarget).attr('data-color-name'));
    });
  },
  runFormsValidation: () => {
    jQuery.validator.addMethod('ruPhone', function(phoneNumber) {
      function countDigits(str) {
        const regex = /\d/g;
        const matches = str.match(regex);

        if (matches) {
          return matches.length;
        }
        return 0;
      }

      return countDigits(phoneNumber) >= 11;
    });
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      },
    });
    $('.js-form-validator').each(function() {
      $(this).validate({
        focusInvalid: false,
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          model: {
            required: true,
            minlength: 2,
          },
          mark: {
            required: true,
            minlength: 2,
          },
          telephone: {
            required: true,
            minlength: 18,
            ruPhone: true,
          },
          textarea: {
            required: true,
            minlength: 2,
            maxlength: 1024,
          },
          agreement: {
            required: true,
          },
        },
        messages: {
          textarea: 'Поле должно быть заполнено',
          mark: 'Поле должно быть заполнено',
          model: 'Поле должно быть заполнено',
          name: 'Поле должно быть заполнено',
          agreement: 'Поле должно быть заполнено',
          telephone: 'Номер телефона должен содержать 11 цифр',
        },
        submitHandler: function(form, event) {
          const $form = $(form);
          const formData = $form.serialize();

          if ($form.attr('id') === 'review-first-form') {
            event.preventDefault();
            const secForm = new ReviewForm($form);
            return secForm;
          }

          $.ajax({
            url: $form.data('action'),
            type: $form.data('method'),
            data: formData,
            success: function(response) {
              eval(response.reachgoal);

              $form.trigger('reset');
              if ($form.attr('id') === 'review-second-form') {
                $('#review-first-form')[0].reset();
                $.modal.close();
              }
              const modal = $('#success-modal');
              if (modal.length > 0) {
                $.modal.close();
              }

              modal.modal({
                fadeDuration: 100,
              });
            },
            error: function(xhr, status, error) {
              console.log('Error:', status, error);
            },
          });
          return false;
        },
        errorElement: 'span',
      });
    });
  },
  runCalculator: () => new CreditCalculator(),
  runSpecsSelects: () => {
    $('.specs__select__header').each((index, el) => {
      $(el).on('click', (event) => {
        const header = $(event.currentTarget);
        let activeMethod = 'hide';

        if (header.hasClass('hidden')) {
          activeMethod = 'show';
          header.removeClass('hidden');
        } else {
          activeMethod = 'hide';
          header.addClass('hidden');
        }

        header.closest('.specs__select').find('.specs__list__item').each((_, item) => $(item)[activeMethod]());
        header.closest('.specs__select').find('.specs__select__item').each((_, item) => $(item)[activeMethod]());
      });
    });
  },
  runModals: () => {
    $('.js-open-modal').each((_, el) => {
      $(el).on('click', (event) => {
        event.preventDefault();
        const $target = $(event.currentTarget);
        const modalId = $target.data('modal-template');

        const modalBody = $(`#${modalId}`).modal({
          fadeDuration: 100,
        });

        if ($target.data('modal-type') === 'feedback') {
          modalBody.find('.modal-title').text($target.data('modal-model'));
          modalBody.find('.modal-user').text($target.data('modal-user'));
          modalBody.find('.modal-rating').text($target.data('modal-rating'));
          modalBody.find('.modal-text').text($target.data('modal-text'));
          modalBody.find('.modal-date').text($target.data('modal-date'));
          modalBody.find('.modal-attachments');
        }
      });
    });
  },
  runVideoSelect: () => {
    $('.feedback-video__item').each((_, el) => {
      $(el).on('click', (event) => {
        $('.feedback-video__item').removeClass('selected');
        $(event.currentTarget).addClass('selected');
        $('.feedback-video__desc .feedback__user__name').text($(event.currentTarget).find('.feedback-video__item__username').text());
        $('.feedback-video__desc .feedback__user__desc').text($(event.currentTarget).find('.feedback-video__model-name').text());
      });
    });
  },
  runOfferBanner: () => {
    const isHidden = window.sessionStorage.getItem('isOfferBannerHidden');

    const timer = new TimerOffer(configuration.timerDate, '.offer-banner__timer');
    timer.countdownTimer();
    const timerUpdateAction = timer.countdownTimer.bind(timer);
    timer.timerId = setInterval(timerUpdateAction, 1000);

    if (!isHidden) {
      $('.offer-banner__section').show();
    }

    $('.offer-banner__close').on('click', () => {
      window.sessionStorage.setItem('isOfferBannerHidden', 'true');
      $('.offer-banner__section').hide();
    });
  },
  runCallbackWidget: () => new CallbackWidget('var(--blue-main)', () => $('#callback-modal').modal({ fadeDuration: 100 })),
  runCompare: () => {
    $('#clear-compare-list').on('click', () => {
      $('.compare__item').remove();
      $('.parameter__item').remove();
      $('#compare-list-count').text(0);
      $.cookie('compare', []);
    });

    $('.redirect-to-compare').on('click', () => {
      window.location.href = '/compare';
    });

    $('.compare__item__cross').on('click', (event) => {
      const target = $(event.currentTarget);
      const carItem = target.closest('.compare__item');
      const compareId = carItem.data('compare-id');
      let compare = $.cookie('compare') == null ? $.cookie('compare', []) : $.cookie('compare').split(',');

      compare = compare.filter((el) => +el !== +compareId);
      $(`[data-compare-id="${compareId}"]`).remove();

      $('#compare-list-count').text(compare.length);
      $.cookie('compare', compare);
    });

    $(document).on('click', (event) => {
      event.stopPropagation();
      if (!$(event.target).closest('.car-item__compare__icon').length) {
        $('.car-item__compare__info').removeClass('active');
      }
    });

    $('.car-item__compare__info').on('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });

    if ($.cookie('compare') == null) {
      $.cookie('compare', []);
    }

    $('.remove-from-compare').on('click', (event) => {
      const target = $(event.currentTarget);
      const icon = target.closest('.car-item__compare__icon');
      const id = icon.data('compare-id');

      let compare = $.cookie('compare').split(',');
      compare = $.grep(compare, function(n) { return (n === 0 || n) && n !== ''; });
      compare = new Set(compare);
      compare.delete(String(id));

      icon.removeClass('active');
      $('.compare-added-count').text(`${compare.size} авто`);

      $.cookie('compare', Array.from(compare));
    });

    $('.car-item__compare__icon').on('click', (event) => {
      event.preventDefault();
      const target = $(event.currentTarget);
      const compareItemInfo = target.find('.car-item__compare__info');
      const id = target.data('compare-id');
      let compare = $.cookie('compare').split(',');
      compare = $.grep(compare, function(n) { return (n === 0 || n) && n !== ''; });
      compare = new Set(compare);
      $('.car-item__compare__info').removeClass('active');

      if (target.hasClass('active') && compareItemInfo.hasClass('active')) {
        compareItemInfo.removeClass('active');
      } else {
        compare.add(String(id));
        $('.compare-added-count').text(`${compare.size} авто`);
        target.addClass('active');
        compareItemInfo.addClass('active');
      }

      $.cookie('compare', Array.from(compare));
    });
  },
  complectationModal: () => {
    let isComplectationForm = false;
    const $activeTab = $('.complectation__modal__tabs__content.active');

    if ($activeTab.find('.complectation__modal__model__item').length > 1) {
      $activeTab.find('.complectatiom__modal__model__pagination').addClass('shown');
    } else {
      $activeTab.find('.complectatiom__modal__model__pagination').removeClass('shown');
    }

    $('.js-complectation-modal-swiper').each((index, el) => {
      $(el).addClass(`js-complectation-modal-swiper-${index}`);
      return new Swiper(`.js-complectation-modal-swiper-${index}`, {
        slidesPerView: 1,
        spaceBetween: 36,
        modules: [Pagination, Navigation],
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
          lockClass: 'swiper-hide-pagination',
        },
        navigation: {
          enabled: true,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          lockClass: 'swiper-hide-pagination',
        },
      });
    });
    $('.js-open-complectation-modal').on('click', () => {
      $('.complectation__modal__container').fadeIn();
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-1').css('display', 'flex');
    });

    $('.js-choose-complectation').on('click', () => {
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-2').css('display', 'flex');
    });
    $('.complectation__modal__button-next-2').on('click', () => {
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-3').css('display', 'flex');
      isComplectationForm = true;
    });
    $('.complectation__modal__button-prev-2').on('click', () => {
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-1').css('display', 'flex');
    });
    $(document).on('ajaxSuccess', () => {
      if (isComplectationForm) {
        $('.complectation__model__step').css('display', 'none');
        $('.complectation__model__step-4').css('display', 'flex');
        isComplectationForm = false;
      }
    });
    $('.complectation__modal__button-prev-3').on('click', (event) => {
      event.preventDefault();
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-2').css('display', 'flex');
    });
    $('.complectation__modal__confirm').on('click', () => {
      $('.complectation__modal__container').fadeOut();
    });
    $('.complectation__backdrop').on('click', () => {
      $('.complectation__modal__container').fadeOut();
    });

    $('.complectation__modal__tabs__item').on('click', (event) => {
      $('.complectation__modal__tabs__item').removeClass('active');
      $('.complectation__modal__tabs__content').removeClass('active');
      const tabId = $(event.currentTarget).data('tab-id');
      $(event.currentTarget).addClass('active');

      const currentTab = $(`[data-tab-id='${tabId}']`);
      currentTab.addClass('active');
      if (currentTab.find('.complectation__modal__model__item').length > 1) {
        currentTab.find('.complectatiom__modal__model__pagination').addClass('shown');
      } else {
        currentTab.find('.complectatiom__modal__model__pagination').removeClass('shown');
      }
    });

    $('.complectation__modal__model__info-button').on('click', (event) => {
      const target = event.currentTarget;
      const slideId = $(target).data('slide-id');
      const infoContainer = $(`div[data-slide-id="${slideId}"]`);

      if (!infoContainer.hasClass('active')) {
        infoContainer.addClass('active');
        const targetRect = target.getBoundingClientRect();
        const containerRect = infoContainer[0].getBoundingClientRect();

        infoContainer.css({
          top: `${targetRect.y - containerRect.height - (targetRect.height * 2) - containerRect.y - 12}px`,
          left: `${targetRect.x - containerRect.x}px`,
        });
      } else {
        infoContainer.removeClass('active');
        infoContainer.css({ top: '0', left: '0' });
      }
    });
  },
};

window.app.complectationModal();
window.app.runVideoSelect();
window.app.runCalculator();
window.app.runFormsValidation();
window.app.runColors();
window.app.runFancybox();
window.app.runTabs();
window.app.runMasks();
window.app.runSwiper();
window.app.runTimers();
window.app.runListeners();
window.app.runFindByMark();
window.app.runLazy();
window.app.runSelect2();
window.app.runSpecsSelects();
window.app.runModals();
window.app.runOfferBanner();
window.app.runCallbackWidget();
window.app.runCompare();
