import $ from 'jquery';

const range = $('.range');
range.on('input', (event) => setProgress($(event.target)));
range.on('change', (event) => setProgress($(event.target)));

range.each((_, el) => setProgress($(el)));

/**
 * @param {JQuery<HTMLInputElement> } rangeInput
 */
function setProgress(rangeInput) {
  const min = Number(rangeInput.attr('min'));
  const max = Number(rangeInput.attr('max'));
  const value = Number(rangeInput.val());
  const progress = rangeInput.next();

  if (!progress.hasClass('range__progress')) return;
  const width = ((value - min) * 100) / (max - min);
  progress.css('width', `calc(${width}%)`);
}
