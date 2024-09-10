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
import FindByMark from './header/findByMark.js';

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

    const slides = {
      newCars: {
        slidesPerGroup: 8,
        slidesPerView: 4,
      },
      mostPopular: {
        slidesPerGroup: 4,
        slidesPerView: 4,
      },
    };

    if (
      window.__victorySettings
      && window.__victorySettings.bannerSwiperSettings
    ) {
      bannerSwiperSettings = window.__victorySettings.bannerSwiperSettings;
    }

    if (window.outerWidth < 1332) {
      slides.newCars.slidesPerGroup = 6;
      slides.newCars.slidesPerView = 3;
    }

    if (window.outerWidth < 1100) {
      slides.newCars.slidesPerGroup = 1;
      slides.newCars.slidesPerView = 1;
    }

    let bannerSwiperSettings = {
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    };

    const newCarsSwiper = new Swiper('.new-cars-swiper', {
      modules: [Grid, Pagination, Navigation],
      slidesPerGroup: slides.newCars.slidesPerGroup,
      slidesPerView: slides.newCars.slidesPerView,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const mostPopularSwiper = new Swiper('.most-popular-swiper', {
      modules: [Grid, Pagination, Navigation],
      slidesPerGroup: slides.mostPopular.slidesPerGroup,
      slidesPerView: slides.mostPopular.slidesPerView,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const bannerSwiper = new Swiper('.banner-swiper', {
      ...bannerSwiperSettings,
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

    return {
      newCarsSwiper,
      mostPopularSwiper,
      bannerSwiper,
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
  },
  runFindByMark: async () => {
    const findByMark = new FindByMark(await FindByMark.getMarks());
  },
};

app.runTabs();
app.runMasks();
app.runSwiper();
app.runTimers();
app.runListeners();
app.runFindByMark();
