import 'jquery.inputmask';
import $ from 'jquery';

import Swiper from 'swiper';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';

import './range.js';
import './select.js';
import './timer.js';

import 'swiper/css/bundle';
import '../scss/app.scss';
import Timer from './timer.js';

const app = {
  runMasks: () => {
    $('.js-phone-mask').inputmask({
      mask: '+7 (*99) 999-99-99',
      definitions: {
        '*': {
          validator: '[4,9]',
        },
      },
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
    const defaultPagination = {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: defaultSwiperBullets,
    };

    const defaultNavigation = {
      enabled: true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    };

    const newCarsSwiper = new Swiper('.new-cars-swiper', {
      modules: [Grid, Pagination, Navigation],
      slidesPerGroup: 4,
      slidesPerView: 4,
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
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    let bannerSwiperSettings = {
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
    }

    if (
      window.__victorySettings && 
      window.__victorySettings.bannerSwiperSettings
    ) {
      bannerSwiperSettings = window.__victorySettings.bannerSwiperSettings
    }

    const bannerSwiper = new Swiper(".banner-swiper", {
      ...bannerSwiperSettings,
      pagination: {
        clickable: false,
        el: ".banner-swiper-pagination",
        renderBullet: function (index, className) {
          console.log(className);
          
          return (`
            <div class="banner-swiper-bullet ${className}">
              <div class="banner-swiper-progress"></div> 
            </div>
          `);
        },
      },
      on: {
        autoplayTimeLeft(s, time, progress) {
          const progressInPercents = Math.round(progress * 100);
          $(".swiper-pagination-bullet-active .banner-swiper-progress").css({
            "width": `${progressInPercents}%`,
            "height": "4px",
            "background": "#9CA5B3"
          })
        }
      }
    })

    return {
      newCarsSwiper,
      mostPopularSwiper,
      bannerSwiper,
    };
  },
  runTimers: () => {
    const timer = new Timer(new Date(2024, 9, 9), ".timer")
    timer.countdownTimer()
    const timerUpdateAction = timer.countdownTimer.bind(timer) 
    timer.timerId = setInterval(timerUpdateAction, 1000);

  }
};

app.runMasks();
app.runSwiper();
app.runTimers();
