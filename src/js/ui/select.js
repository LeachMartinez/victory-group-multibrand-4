import $ from 'jquery';

const selectWrapper = $('.select');

function fillSelectList() {
  const select = selectWrapper.find('.select-values');
  const selectValues = selectWrapper.find('.select-values option');
  const selectList = selectWrapper.find('.select-list');

  selectValues.each((index, el) => {
    const $el = $(el);
    const template = $(`<span data-val="${$el.val()}" class="select-item">${$el.text()}</span>`);
    selectList.append(template);
  });

  selectWrapper.find('.select-item').on('click', (event) => {
    selectWrapper.removeClass('opened');
    select.val($(event.currentTarget).data('val')).change();
  });
}

selectWrapper.find('.input').on('focus', () => {
  selectWrapper.addClass('opened');
});

selectWrapper.find('.select-values').on('change', (event) => {
  selectWrapper.find('.input').val(event.currentTarget.value);
});

selectWrapper.find('.select-backdrop').on('click', () => {
  selectWrapper.removeClass('opened');
});

fillSelectList();
