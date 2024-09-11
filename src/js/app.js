import 'jquery.inputmask';
import $ from 'jquery';

import Swiper from 'swiper';
import {
  Autoplay, Grid, Navigation, Pagination,
} from 'swiper/modules';

import './ui/range.js';
import './ui/select.js';

import Timer from './ui/timer.js';
import Tab from './ui/tabs.js';

import 'swiper/css/bundle';
import '../scss/app.scss';
import MarkSearch from './header/MarkSearch.js';
import configuration from './configuration.js';

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
    const defaultSwiperBullets = (index, className) => '<span class="' + className + '">' + (index + 1) + '</span>';
    const defaultNavigation = {
      enabled: true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    };

    const defaultPagination = {
      el: '.swiper-pagination',
      clickable: true,
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

    return {
      newCarsSwiper,
      mostPopularSwiper,
      bannerSwiper,
      catalogSwiper,
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
  runTabs: () => new Tab('.most-popular__tabs-container'),
  runFindByMark: async () => new MarkSearch(await MarkSearch.getMarks()),
};

app.runTabs();
app.runMasks();
app.runSwiper();
app.runTimers();
app.runListeners();
app.runFindByMark();
