/* eslint-disable no-eval */
// JQuery modules
import 'jquery.inputmask';
import 'jquery-lazy';
import 'jquery-modal';
import 'jquery-validation';
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
      pagination: defaultPagination,
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
          telephone: {
            required: true,
            minlength: 18,
            ruPhone: true,
          },
          agreement: {
            required: true,
          },
        },
        messages: {
          name: 'Поле должно быть заполнено',
          agreement: 'Поле должно быть заполнено',
          telephone: 'Номер телефона должен содержать 11 цифр',
        },
        submitHandler: function(form) {
          const $form = $(form);
          const formData = $form.serialize();
          $.ajax({
            url: $form.data('action'),
            type: $form.data('method'),
            data: formData,
            success: function(response) {
              eval(response.reachgoal);

              $form.trigger('reset');

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
};

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
