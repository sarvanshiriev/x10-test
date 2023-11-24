// Функция для рассчета и обновления значений в блоке результатов
export function updateValues() {
    // Получаем значения из полей формы
    let propertyPrice = parseFloat(document.getElementById('calculator__form-price').value);
    let initialContribution = parseFloat(document.getElementById('calculator__form-contribution').value);
    let loanTerm = parseInt(document.getElementById('calculator__form-term').value);
    let interestRate = parseFloat(document.getElementById('calculator__form-rate').value);

    // Рассчеты и обновление результатов
    let loanAmount = Math.round(propertyPrice - initialContribution);
    let monthlyInterestRate = interestRate / 100 / 12;
    let numberOfPayments = loanTerm * 12;
    let monthlyPayment = Math.round((loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
    let interestAmount = Math.round(monthlyPayment * numberOfPayments - loanAmount);
    let totalAmount = Math.round(loanAmount + interestAmount);
    let requiredIncome = Math.round(monthlyPayment * 1.66);

      // Проверка на отрицательные значения и установка их в 0
      loanAmount = Math.max(0, loanAmount);
      interestAmount = Math.max(0, interestAmount);
      totalAmount = Math.max(0, totalAmount);
      requiredIncome = Math.max(0, requiredIncome);
    // Обновляем значения на странице
    if (propertyPrice<=0 || loanTerm<=0) {
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
}

