import { updateProgressBar } from "./progressBar.js";
import { updateValues } from './result.js';

const priceNumberInput = document.getElementById('calculator__form-price');

const contributionBadges = document.querySelectorAll('.contribution');
const contributionNumberInput = document.getElementById('calculator__form-contribution');
const contributionRangeInput = document.getElementById('calculator__form-range-2');
const contributionProgressBar = document.getElementById('progress-bar-2')

const termBadges = document.querySelectorAll('.term');
const termNumberInput = document.getElementById('calculator__form-term');
const termRangeInput = document.getElementById('calculator__form-range-3');
const termProgressBar = document.getElementById('progress-bar-3');

const rateBadges = document.querySelectorAll('.rate');
const rateNumberInput = document.getElementById('calculator__form-rate');
const rateRangeInput = document.getElementById('calculator__form-range-4');
const rateProgressBar = document.getElementById('progress-bar-4');

function onBadgeClick(numberInputElement, rangeInputElement, progressBarElement, badgeValue) {
	numberInputElement.value = badgeValue;
	rangeInputElement.value = badgeValue;
	updateProgressBar(rangeInputElement, progressBarElement, badgeValue);
}

contributionBadges.forEach((badge) => {
	badge.addEventListener('click', () => {
		const value = priceNumberInput.value / 100 * Number(badge.dataset.value);
		onBadgeClick(contributionNumberInput, contributionRangeInput, contributionProgressBar, value);
		updateValues();
	})
});

termBadges.forEach((badge) => {
	badge.addEventListener('click', () => {
		debugger;
		onBadgeClick(termNumberInput, termRangeInput, termProgressBar, Number(badge.dataset.value));
		updateValues();
	})
});

rateBadges.forEach((badge) => {
	badge.addEventListener('click', () => {
		debugger;
		onBadgeClick(rateNumberInput, rateRangeInput, rateProgressBar, Number(badge.dataset.value));
		updateValues();
	})
});
