import 'jquery.inputmask';
import 'jquery-lazy';
import 'jquery-modal';
import $ from 'jquery';

import 'jquery-modal/jquery.modal.min.css';
import 'select2/dist/js/select2.full.js';
import 'select2/dist/css/select2.min.css';

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import Swiper from 'swiper';
import {
  Autoplay, Grid, Navigation, Pagination,
} from 'swiper/modules';

import './ui/range.js';
import Timer from './ui/timer.js';
import Tab from './ui/tabs.js';

import 'swiper/css/bundle';
import '../scss/app.scss';
import MarkSearch from './header/MarkSearch.js';
import configuration from './configuration.js';

window.$ = $;
const app = {
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
    const defaultSwiperBullets = (index, className) => `<span class="${className}">${index}</span>`;
    const defaultNavigation = {
      enabled: true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    };
    const defaultPagination = {
      el: '.swiper-pagination',
      clickable: false,
      type: 'bullet',
      renderBullet: defaultSwiperBullets,
      renderCustom: (_, current, total) => {
        let paginationHtml = '';
        const maxVisible = total < 4 ? total : 4;
        let visibledIndex = 1;

        while (visibledIndex <= total) {
          if (visibledIndex === maxVisible - 1 && total > maxVisible) {
            paginationHtml += defaultSwiperBullets('...', `swiper-pagination-bullet ${(current >= maxVisible - 1 && current !== total) && 'swiper-pagination-bullet-active'}`);
          } else if (visibledIndex < maxVisible) {
            paginationHtml += defaultSwiperBullets(visibledIndex, `swiper-pagination-bullet ${visibledIndex === current && 'swiper-pagination-bullet-active'}`);
          } else if (visibledIndex === total) {
            paginationHtml += defaultSwiperBullets(visibledIndex, `swiper-pagination-bullet ${visibledIndex === current && 'swiper-pagination-bullet-active'}`);
          }

          visibledIndex++;
        }

        return paginationHtml;
      },
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
      ...slides.howToSwiper,
      modules: [Pagination, Navigation],
      pagination: {
        type: 'fraction',
        el: '.swiper-pagination',
      },
      navigation: defaultNavigation,
    });

    return {
      contactsGallerySwiper,
      carCatalogSwiper,
      carGallerySwiper,
      newCarsSwiper,
      mostPopularSwiper,
      bannerSwiper,
      catalogSwiper,
      howToSwiper,
    };
  },
  runTimers: () => {
    // "2024/10/07"
    const timer = new Timer(new Date(2024, 9, 9), '.timer');
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

    return {
      specTabs,
      mostPopularTabs,
    };
  },
  runFindByMark: async () => new MarkSearch(await MarkSearch.getMarks()),
  runLazy: () => {
    $('.lazy').Lazy({
      threshold: 0,
      visibleOnly: true,
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
};

app.runFancybox();
app.runTabs();
app.runMasks();
app.runSwiper();
app.runTimers();
app.runListeners();
app.runFindByMark();
app.runLazy();
app.runSelect2();
