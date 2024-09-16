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
      spaceBetween: 12,
    },
    carCatalogSwiper: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 12,
    },
    marksListRoute: 'https://multi-4.vitmp.ru/api/auto/new/mark/list',
  },
};

export default configuration;
