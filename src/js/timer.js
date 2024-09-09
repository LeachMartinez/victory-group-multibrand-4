import $ from 'jquery';

export default class Timer {
  constructor(deadline, selector) {
    this.deadline = deadline;
    this.timer = $(selector);
    this.timerId = Math.random() * new Date();
    this.$hours = this.timer.find('.timer__hours');
    this.$minutes = this.timer.find('.timer__minutes');
    this.$seconds = this.timer.find('.timer__seconds');
  }

  // eslint-disable-next-line class-methods-use-this
  declensionNum (num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }

  countdownTimer() {
    const diff = this.deadline - new Date();
    if (diff <= 0) {
      clearInterval(this.timerId);
    }

    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    this.$hours.find('.header-text-l').text(hours < 10 ? '0' + hours : hours);
    this.$minutes.find('.header-text-l').text(minutes < 10 ? '0' + minutes : minutes);
    this.$seconds.find('.header-text-l').text(seconds < 10 ? '0' + seconds : seconds);
    this.$hours.find('.regular-text-m').text(this.declensionNum(hours, ['час', 'часа', 'часов']));
    this.$minutes.find('.regular-text-m').text(this.declensionNum(minutes, ['минута', 'минуты', 'минут']));
    this.$seconds.find('.regular-text-m').text(this.declensionNum(seconds, ['секунда', 'секунды', 'секунд']));
  }
}
