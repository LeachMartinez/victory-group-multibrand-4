export default class Select {
  constructor(selector) {
    this.$select = $(selector);
    this.fillSelectList();
    this.initListeners();
  }

  fillSelectList() {
    const select = this.$select.find('.select-values');
    const selectValues = this.$select.find('.select-values option');
    const selectList = this.$select.find('.select-list');

    selectValues.each((index, el) => {
      const $el = $(el);
      const template = $(`<span data-val="${$el.val()}" class="select-item">${$el.text()}</span>`);
      selectList.append(template);
    });

    this.$select.find('.select-item').on('click', (event) => {
      this.$select.removeClass('opened');
      select.val($(event.currentTarget).data('val')).change();
    });
  }

  initListeners() {
    this.$select.find('.input').on('focus', () => {
      this.$select.addClass('opened');
    });

    this.$select.find('.select-values').on('change', (event) => {
      this.$select.find('.input').val(event.currentTarget.value);
    });

    this.$select.find('.select-backdrop').on('click', () => {
      this.$select.removeClass('opened');
    });
  }
}
