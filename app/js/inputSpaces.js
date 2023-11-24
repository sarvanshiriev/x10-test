import { formatNumberWithSpaces } from './spaces.js';

const priceInput = document.getElementById('calculator__form-price');
const contributionInput = document.getElementById('calculator__form-contribution');

function formatInput(input) {
    const value = input.value.replace(/\s/g, ''); 
    const formattedValue = formatNumberWithSpaces(value);
    console.log(formattedValue);
    input.value = formattedValue;
    console.log(input.value);
}

formatInput(priceInput);
formatInput(contributionInput);
