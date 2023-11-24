import { formatNumberWithSpaces } from './spaces.js';

// Ваши инпуты
const priceInput = document.getElementById('calculator__form-price');
const contributionInput = document.getElementById('calculator__form-contribution');

// Функция для применения форматирования к инпуту
function formatInput(input) {
    const value = input.value.replace(/\s/g, ''); // Убираем существующие пробелы
    const formattedValue = formatNumberWithSpaces(value);
    console.log(formattedValue);
    input.value = formattedValue;
    console.log(input.value);
}

// Применяем форматирование к инпутам при загрузке страницы
formatInput(priceInput);
formatInput(contributionInput);
