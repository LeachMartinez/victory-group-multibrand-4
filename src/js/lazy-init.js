$('.lazy').Lazy({
  // visibleOnly: true,
  threshold: 800, // изображения начнут загружаться за 500 пикселей до того, как они окажутся видимыми
  combined: true,
  afterLoad: function(element) {
    element.addClass('loaded');
  },
});
