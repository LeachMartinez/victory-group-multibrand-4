export default class Tab {
  constructor(initialSelector) {
    this.initialSelector = $(initialSelector);
    this.activateTabContent();
    this.addListeners();
  }

  findActiveTab() {
    return this.initialSelector.find('.tabs__item.active').data('id');
  }

  findActiveTabContent() {
    return this.initialSelector.find(`.tabs__content[data-content-id='${this.findActiveTab()}']`);
  }

  activateTabContent() {
    this.findActiveTabContent().addClass('active');
  }

  addListeners() {
    const clickCb = this.handleClickTabItem.bind(this);
    this.initialSelector.find('.tabs__item').on('click', clickCb);
  }

  handleClickTabItem(event) {
    const target = $(event.currentTarget);
    const targetDataId = target.data('id');
    const targetContent = this.initialSelector.find(`.tabs__content[data-content-id="${targetDataId}"]`);
    this.initialSelector.find('.tabs__content').removeClass('active');
    this.initialSelector.find('.tabs__item').removeClass('active');
    targetContent.addClass('active');
    target.addClass('active');
  }
}
