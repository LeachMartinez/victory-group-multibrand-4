const configuration = {
  sliders: {
    newCars: {
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    mostPopular: {
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    bannerSwiper: {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    },
    catalogSwiper: {
      slidesPerView: 4,
      spaceBetween: 12,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
    carGallerySwiper: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
    },
    carCatalogSwiper: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 12,
    },
    howToSwiper: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 12,
    },
    contactsGallerySwiper: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
    },
    allFeedbacksSwiper: {
      slidesPerView: 3,
      spaceBetween: 12,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    compireSwiper: {
      slidesPerView: 4,
      spaceBetween: 12,
      navigation: {
        enabled: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        lockClass: 'swiper-hide-pagination',
      },
    },
  },
  marksListRoute: 'https://multi-4.vitmp.ru/api/auto/new/mark/list',
  timerDate: '2024/09/21',
};

export default configuration;
