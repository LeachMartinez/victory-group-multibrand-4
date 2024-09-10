import $ from 'jquery';

let carPrice = 7400000;
let monthPayment = 30000;
let creditPeriod = 6;
let firstPayment = 4000000;
const ORIGINAL_CAR_PRICE = 7400000;
const MONTH_PAYMENT_GAP = 10000;
const DISCOUNTS = {
  tradeIn: 170000,
  credit: 250000,
  disposal: 80000,
};
// Ваша выгода
const BENEFIT_VALUE = $('#benefit-value');
// от {сумма}
const TOTAL_SUM_VALUE = $('#total-sum-value');
// Ежемесячный платеж
const MONTH_PAYMENT_VALUE = $('#month-payment-value');
// кнопка увеличения платежа
const PLUS_PAYMENT_BUTTON = $('#plus-month-payment');
// кнопка уменьшения платежа
const MINUS_PAYMENT_BUTTON = $('#minus-month-payment');
// Сумма кредита
const CREDIT_SUM_VALUE = $('#credit-sum-value');
// Срок кредита
const CREDIT_PERIOD = $('#credit-period-value');
// Первоначальный взнос
const FIRST_PAYMENT_VALUE = $('#first-payment-value');
// Инпут периода кредита
const CREDIT_PERIOD_INPUT = $('#credit-period-input');

/**
 * расчет первого платежа
 * @param {val} amount кол-во месяцев
 */
function calculateFirstPaymentValue(val) {
  const currentVal = val || Number($('#first-payment-input').val());
  firstPayment = (carPrice * currentVal) / 100;
  monthPayment = Math.round((carPrice - firstPayment) / creditPeriod);
  updatePaymentValues();
}

/**
 * расчет срока кредита
 * @param {val} amount кол-во месяцев
 */
function calculatePeriodValue(val) {
  creditPeriod = val;
  monthPayment = Math.round((carPrice - firstPayment) / creditPeriod);
  updatePaymentValues();
}

/**
 * расчет месячного платежа
 * @param {number} amount число на которе увеличивается/уменьшается платеж
 */
function calculatePayment(amount) {
  if (monthPayment + amount < 10) return;
  monthPayment += amount;
  creditPeriod = Math.round((carPrice - firstPayment) / monthPayment);

  CREDIT_PERIOD_INPUT.val(creditPeriod);
  CREDIT_PERIOD_INPUT.trigger('change');
  updateCreditPeriod();
}

/**
 * расчет скидок
 * @param {number} amount скидка
 */
function calculateDiscount(amount) {
  carPrice += amount;
  calculateFirstPaymentValue();
}

/**
 * обновление значений периода
 */
function updateCreditPeriod() {
  CREDIT_PERIOD.text(`${creditPeriod} мес.`);
}

/**
 * обновление цены с учетом скидок
 */
function updateDiscountValues() {
  BENEFIT_VALUE.text(convertPrice(ORIGINAL_CAR_PRICE - carPrice));
  TOTAL_SUM_VALUE.text(`от ${convertPrice(carPrice)}`);
  CREDIT_SUM_VALUE.text(convertPrice(carPrice));
  updateFirstPaymentValue();
}

/**
 * Обновление значений ежемесячного платежа
 */
function updatePaymentValues() {
  MONTH_PAYMENT_VALUE.text(convertPrice(monthPayment));
}

/**
 * Обновление значений первоначального взноса
 */
function updateFirstPaymentValue() {
  FIRST_PAYMENT_VALUE.text(convertPrice(firstPayment));
}

/**
 * Конвертация числа в формат цены, например 1000000 -> 1 000 000 ₽
 * @param {number} price цена
 * @returns {string} отформатированная цена
 */
function convertPrice(price) {
  const formatter = new Intl.NumberFormat('ru');
  return formatter.format(price) + ' ₽';
}

$('#trade-in-checkbox').on('change', (event) => {
  calculateDiscount(event.target.checked ? -DISCOUNTS.tradeIn : DISCOUNTS.tradeIn);
  updateDiscountValues();
});

$('#credit-checkbox').on('change', (event) => {
  calculateDiscount(event.target.checked ? -DISCOUNTS.credit : DISCOUNTS.credit);
  updateDiscountValues();
});

$('#disposal-program-checkbox').on('change', (event) => {
  calculateDiscount(event.target.checked ? -DISCOUNTS.disposal : DISCOUNTS.disposal);
  updateDiscountValues();
});

CREDIT_PERIOD_INPUT.on('input', (event) => {
  calculatePeriodValue(event.target.value);
  updateCreditPeriod();
});

$('#first-payment-input').on('input', (event) => {
  calculateFirstPaymentValue(event.target.value);
  updateFirstPaymentValue();
});

MINUS_PAYMENT_BUTTON.on('click', () => {
  calculatePayment(-MONTH_PAYMENT_GAP);
  updatePaymentValues();
});

PLUS_PAYMENT_BUTTON.on('click', () => {
  calculatePayment(MONTH_PAYMENT_GAP);
  updatePaymentValues();
});

$('.slider__button').on('click', (event) => {
  if ($(event.currentTarget).hasClass('prev')) {
    let indexes = [currentIndexes[0] - 1, currentIndexes[1] - 1];
    if (indexes[0] < 0) {
      indexes = [0, 4];
    }
    showSlide(indexes);
  } else if ($(event.currentTarget).hasClass('next')) {
    let indexes = [currentIndexes[0] + 1, currentIndexes[1] + 1];
    if (indexes[1] >= slides.length) {
      indexes = [2, 6];
    }
    showSlide(indexes);
  }
});

function showSlide(index) {
  $('.parameter .parameter__item').addClass('hidden');
  slides.addClass('hidden');
  for (let i = index[0]; i < index[1]; i++) {
    $(`.parameter__item[data-index="${i + 1}"]`).removeClass('hidden');
    $(slides[i]).removeClass('hidden');
  }
  currentIndexes = index;
}
const slides = $('.slider .compare__item');
let currentIndexes = [0, 4];

updateDiscountValues();
updatePaymentValues();
updateCreditPeriod();
updateFirstPaymentValue();
