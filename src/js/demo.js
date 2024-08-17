import $ from 'jquery';

let carPrice = 7400000;
const ORIGINAL_CAR_PRICE = 7400000;
const MONTH_PAYMENT_GAP = 10000;
const monthPayment = 30000;

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

updateDiscountValues();
$('#trade-in-checkbox').on('change', (event) => {
  calculateDiscount(DISCOUNTS.tradeIn, event.target.checked);
  updateDiscountValues();
});

$('#credit-checkbox').on('change', (event) => {
  calculateDiscount(DISCOUNTS.credit, event.target.checked);
  updateDiscountValues();
});

$('#disposal-program-checkbox').on('change', (event) => {
  calculateDiscount(DISCOUNTS.disposal, event.target.checked);
  updateDiscountValues();
});

function calculateDiscount(amount, isActive) {
  if (isActive) {
    carPrice -= amount;
    return;
  }

  carPrice += amount;
}

function updateDiscountValues() {
  BENEFIT_VALUE.text(convertPrice(ORIGINAL_CAR_PRICE - carPrice));
  TOTAL_SUM_VALUE.text(convertPrice(carPrice));
  CREDIT_SUM_VALUE.text(convertPrice(carPrice));
}

/**
 *
 * @param {number} price цена
 * @returns {string} отформатированная цена
 */
function convertPrice(price) {
  const formatter = new Intl.NumberFormat('ru');
  return formatter.format(price) + ' ₽';
}
