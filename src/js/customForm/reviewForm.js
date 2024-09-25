export default class ReviewForm {
  constructor($firstForm) {
    this.$firstForm = $firstForm;
    this.$secondForm = $('#review-second-form');
    this.addHiddenFields();
    this.attachmentListeners();
    $('#review-second-form-modal').modal({
      fadeDuration: 100,
    });
  }

  addHiddenFields() {
    const inputs = this.$firstForm.find('.input');
    inputs.clone().appendTo(this.$secondForm);
    this.$secondForm.find('textarea').hide();
    this.$secondForm.find('.input').attr('type', 'hidden');
  }

  attachmentListeners() {
    $('.review-modal__attachment__input').on('change', (event) => {
      if (event.target.files) {
        event.preventDefault();
      }
      const label = $(event.currentTarget).closest('.review-modal__attachment__label');
      label.css('background-image', `url(${URL.createObjectURL(event.target.files[0])})`);
      label.addClass('added');
    });
    $('review-modal__attachment__label').on('click change', (event) => event.stopPropagation());
    $('.close-icon__wrapper').on('click', (event) => {
      event.stopPropagation();
      const label = $(event.currentTarget).closest('.review-modal__attachment__label');
      label.removeClass('added');
      label.css('background-image', '');
      label.find('.review-modal__attachment__input').val('');
    });
  }
}
