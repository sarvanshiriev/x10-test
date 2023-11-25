import { updateValues } from './result.js';

export function updateProgressBar(rangeInputElement, progressBarElement, value) {
	const max = rangeInputElement.max;
	const percentage = (value / max) * 98;
	progressBarElement.style.width = percentage + '%';
}

const rangeInputs = Array.from(document.querySelectorAll('.calculator__form-slider'));
const numberInputs = Array.from(document.querySelectorAll('.calculator__form-input'));
const progressBars = Array.from(document.querySelectorAll('.calculator__form-progress-bar'))

const formNumberFields = rangeInputs.map((element, index) => [element, numberInputs[index], progressBars[index]]);

formNumberFields.forEach(([ rangeInput, numberInput, progressBar ]) => {
	const rangeInputElement = document.getElementById(rangeInput.id);
	const numberInputElement = document.getElementById(numberInput.id);
	const progressBarElement = document.getElementById(progressBar.id);

	rangeInputElement.addEventListener('input', ({ target }) => {
		updateProgressBar(rangeInputElement, progressBarElement, target.value);
		numberInputElement.value = target.value;
        updateValues();
		
	})

	numberInputElement.addEventListener('input', ({ target }) => {
		let targetValue = Number(target.value);

		if (target.value === "") {
			target.value= 0;
		}
		if (targetValue > rangeInputElement.max) {
			targetValue = Number(target.value.slice(0, -1));
			numberInputElement.value = targetValue;
		}
			rangeInputElement.value = targetValue;
			updateProgressBar(rangeInputElement, progressBarElement, targetValue);
			updateValues();
			
	})
})
