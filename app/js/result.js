import { formatNumberWithSpaces } from './spaces.js';
export function updateValues() {
    let propertyPrice = parseFloat(document.getElementById('calculator__form-price').value.replace(/\s/g, ''));
    let initialContribution = parseFloat(document.getElementById('calculator__form-contribution').value.replace(/\s/g, ''));
    let loanTerm = parseInt(document.getElementById('calculator__form-term').value);
    let interestRate = parseFloat(document.getElementById('calculator__form-rate').value);

    let loanAmount = Math.round(propertyPrice - initialContribution);
    let monthlyInterestRate = interestRate / 100 / 12;
    let numberOfPayments = loanTerm * 12;
    let monthlyPayment = Math.round((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
    let interestAmount = Math.round(monthlyPayment * numberOfPayments - loanAmount);
    let totalAmount = Math.round(loanAmount + interestAmount);
    let requiredIncome = Math.round(monthlyPayment * 1.66);

      loanAmount = Math.max(0, loanAmount);
      interestAmount = Math.max(0, interestAmount);
      totalAmount = Math.max(0, totalAmount);
      requiredIncome = Math.max(0, requiredIncome);
    if (propertyPrice<=0 || loanTerm<=0 || propertyPrice<=initialContribution || interestRate===0) {
        document.querySelector('.calculator__result-month').textContent = 0;
        document.querySelector('.calculator__result-credit .calculator__result-weight').textContent = 0;
        document.querySelector('.calculator__result-credit:nth-child(2) .calculator__result-weight').textContent = 0;
        document.querySelector('.calculator__result-credit:nth-child(3) .calculator__result-weight').textContent = 0;
        document.querySelector('.calculator__result-credit:nth-child(4) .calculator__result-weight').textContent = 0;
    }
    else {
        document.querySelector('.calculator__result-month').textContent = monthlyPayment;
        document.querySelector('.calculator__result-credit .calculator__result-weight').textContent = loanAmount;
        document.querySelector('.calculator__result-credit:nth-child(2) .calculator__result-weight').textContent = interestAmount;
        document.querySelector('.calculator__result-credit:nth-child(3) .calculator__result-weight').textContent = totalAmount;
        document.querySelector('.calculator__result-credit:nth-child(4) .calculator__result-weight').textContent = requiredIncome;
    }
    const resultWeightSpans = document.querySelectorAll('.calculator__result-weight');
    const resultMonthSpan = document.querySelector('.calculator__result-month'); 
    
    const originalMonthNumber = parseFloat(resultMonthSpan.textContent);
    resultMonthSpan.textContent = formatNumberWithSpaces(originalMonthNumber) + ' ₽';
    
    resultWeightSpans.forEach((span) => {
        const originalNumber = parseFloat(span.textContent);
        span.textContent = formatNumberWithSpaces(originalNumber) + ' ₽';
    });
}
document.addEventListener('DOMContentLoaded',updateValues());
