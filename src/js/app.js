import 'jquery.inputmask';
import $ from 'jquery';

import Swiper from 'swiper';
import { Grid, Navigation, Pagination } from 'swiper/modules';

import './range.js';
import './select.js';

import 'swiper/css/bundle';
import '../scss/app.scss';

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

    return {
      newCarsSwiper,
      mostPopularSwiper,
    };
  },
};

app.runMasks();
app.runSwiper();
