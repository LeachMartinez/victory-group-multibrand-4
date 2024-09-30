export default class CreditCalculator {
  monthPayment = 30_000;

  monthPaymentGap = 6;

  autocreditMinSum = 100_000;

  autocreditMaxSum = 5_000_000;

  carPrice = 7_000_000;

  creditSum = 4_000_000;

  sumRange = $('#first-payment-input');

  sumValue = $('#first-payment-value');

  periodRange = $('#credit-period-input');

  periodValue = $('#credit-period-value');

  monthPaymentValue = $('#month-payment-value');

  type = 'CreditOnly' || 'CreditCar';

  creditPeriod = 6;

  constructor() {
    this.carPrice = +$('#credit-sum-value').data('value');
    this.creditTotal = +$('#credit-sum-value').data('value');
    this.type = Number.isNaN(this.carPrice) ? 'CreditOnly' : 'CreditCar';

    this.sumRange.attr('min', this[`setupSumRangeMin${this.type}`]());
    this.sumRange.attr('max', this[`setupSumRangeMax${this.type}`]());

    this.creditPeriodEvent(this.periodRange.val());
    this.creditSumEvent(+this.sumRange.val());
    this.monthPaymentListeners();
    this.creditPeriodListener();
    this.sumListeners();
  }

  setupSumRangeMinCreditOnly() {
    return 100000;
  }

  setupSumRangeMinCreditCar() {
    return 0;
  }

  setupSumRangeMaxCreditOnly() {
    return 5000000;
  }

  setupSumRangeMaxCreditCar() {
    return this.carPrice * 0.9;
  }

  monthPaymentListeners() {
    $('#minus-month-payment').on('click', () => this.changeMonthPayment(+this.monthPaymentGap));
    $('#plus-month-payment').on('click', () => this.changeMonthPayment(-this.monthPaymentGap));
  }

  sumListeners() {
    this.sumRange.on('input', (event) => this.creditSumEvent(event.currentTarget.value));
    this.sumValue.on('change', (event) => {
      const target = $(event.currentTarget);
      const value = target.val().replace(/[^\d.]/g, '');
      const currentValue = this.validateValue(value);
      target.val(currentValue);

      this.sumRange.val(currentValue);
      this.sumRange.trigger('input');
    });
  }

  creditSumEvent(val) {
    this.creditSum = this[`calculateSumValue${this.type}`](val);
    this.monthPayment = this[`calculateMonthPayment${this.type}`]();
    this.updatePaymentValues();

    this.updateSumValue();
  }

  creditPeriodListener() {
    this.periodRange.on('input change', (event) => this.creditPeriodEvent(event.currentTarget.value));
  }

  creditPeriodEvent(val) {
    this.creditPeriod = +val;
    this.monthPayment = this[`calculateMonthPayment${this.type}`]();
    this.updatePaymentValues();
    this.updateCreditPeriod();
  }

  changeMonthPayment(amount) {
    this.creditPeriod += amount;
    this.periodRange.val(this.creditPeriod);
    this.periodRange.trigger('change');
  }

  convertPrice(price) {
    const formatter = new Intl.NumberFormat('ru');
    return formatter.format(price) + ' ₽';
  }

  updatePaymentValues() {
    this.monthPaymentValue.text(this.convertPrice(this.monthPayment));
  }

  validateValue(value) {
    const min = +this.sumRange.attr('min');
    const max = +this.sumRange.attr('max');

    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  }

  calculatePeriodValueCreditCar() {
    return (this.carPrice - this.firstPayment) / this.monthPayment;
  }

  calculatePeriodValueCreditOnly() {
    return Math.round(this.creditSum / this.monthPayment);
  }

  calculateMonthPaymentCreditOnly() {
    return Math.round(this.creditSum / this.creditPeriod);
  }

  calculateMonthPaymentCreditCar() {
    return Math.round((this.carPrice - this.creditSum) / this.creditPeriod);
  }

  calculateSumValueCreditOnly(val) {
    return val;
  }

  calculateSumValueCreditCar(val) {
    $('#credit-sum-value').text(this.convertPrice(this.creditTotal - val));
    return val;
  }

  updateCreditPeriod() {
    this.periodValue.text(`${this.creditPeriod} мес.`);
  }

  updateSumValue() {
    this.sumValue.val(this.creditSum);
  }
}
