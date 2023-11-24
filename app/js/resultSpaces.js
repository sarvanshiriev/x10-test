import { formatNumberWithSpaces } from './spaces.js';

const resultWeightSpans = document.querySelectorAll('.calculator__result-weight');
const resultMonthSpan = document.querySelector('.calculator__result-month'); 

const originalMonthNumber = parseFloat(resultMonthSpan.textContent);
resultMonthSpan.textContent = formatNumberWithSpaces(originalMonthNumber) + ' ₽';

resultWeightSpans.forEach((span) => {
    const originalNumber = parseFloat(span.textContent);
    span.textContent = formatNumberWithSpaces(originalNumber) + ' ₽';
});
