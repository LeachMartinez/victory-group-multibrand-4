import $ from 'jquery';

const range = $('.range');
range.on('input', (event) => setProgress($(event.target)));

range.each((_, el) => setProgress($(el)));

/**
 * @param {JQuery<HTMLInputElement> } rangeInput
 */
function setProgress(rangeInput) {
  const max = Number(rangeInput.attr('max'));
  const value = Number(rangeInput.val());
  const progress = rangeInput.next();

  if (!progress.hasClass('range__progress')) return;
  const width = (value * 100) / max;
  progress.css('width', `${width}%`);
}
