export default class TimerOffer {
  constructor(selector) {
    this.deadline = new Date(configuration.timerDate);
    this.timer = $(selector);
    this.timerId = null; // Меняем на null, чтобы было проще управлять таймером
  }

  declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }

  countdownTimer() {
    const diff = this.deadline - new Date();
    if (diff <= 0) {
      clearInterval(this.timerId);
      this.timer.text('Акция завершена');
      return; // Останавливаем выполнение, если время истекло
    }

    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    let hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    let minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    let seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const daysText = this.declensionNum(days, ['день', 'дня', 'дней']);
    this.timer.text(`${days} ${daysText} ${hours}:${minutes}:${seconds}`);
  }

  start() {
    this.countdownTimer(); // Первый запуск таймера
    this.timerId = setInterval(() => this.countdownTimer(), 1000); // Обновление каждую секунду
  }
}
