const resultButton = document.querySelector('.calculator__result-button');

function getFirstDayOfNextMonth(currentDate) {
    // Создаем копию текущей даты
    const firstDayOfNextMonth = new Date(currentDate);

    // Устанавливаем следующий месяц
    firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);

    // Устанавливаем день месяца в текущее число
    firstDayOfNextMonth.setDate(currentDate.getDate());

    return firstDayOfNextMonth;
}

function tableResult() {
         const tableBody = document.getElementById('table__payment');
         const tableFoot = document.getElementById('table__foot');
        // Получаем значения из формы
        let propertyPrice = parseFloat(document.getElementById('calculator__form-price').value);
        let initialContribution = parseFloat(document.getElementById('calculator__form-contribution').value);
        let loanTerm = parseInt(document.getElementById('calculator__form-term').value);
        let interestRate = parseFloat(document.getElementById('calculator__form-rate').value);

        // Ваш код для подсчёта ежемесячного платежа
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const loanAmount = propertyPrice - initialContribution;
        const monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Очищаем таблицу перед обновлением
        tableBody.innerHTML = '';

        // Заполняем таблицу данными
        let remainingLoanAmount = loanAmount;
        let currentDate = new Date(); 
        
        for (let paymentNumber = 1; paymentNumber <= numberOfPayments; paymentNumber++) {
            const interestPayment = remainingLoanAmount * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingLoanAmount -= principalPayment;

            const firstDayOfNextMonth = getFirstDayOfNextMonth(currentDate);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paymentNumber}</td>
                <td>${firstDayOfNextMonth.toLocaleDateString()}</td>
                <td>${remainingLoanAmount.toFixed(2)}</td>
                <td>${principalPayment.toFixed(2)}</td>
                <td>${interestPayment.toFixed(2)}</td>
                <td>${monthlyPayment.toFixed(2)}</td>
            `;

            tableBody.appendChild(row);
            currentDate = firstDayOfNextMonth;
        }

        // Обновляем общую сумму в подвале таблицы
        const totalPrincipal = loanAmount - remainingLoanAmount;
        const totalInterest = monthlyPayment * numberOfPayments - loanAmount;
        tableFoot.innerHTML = `
            <tr>
                <th colspan="3">Всего</th>
                <th>${totalPrincipal.toFixed(2)}</th>
                <th>${totalInterest.toFixed(2)}</th>
                <th>${(totalPrincipal + totalInterest).toFixed(2)}</th>
            </tr>
        `;
};

resultButton.addEventListener('click',tableResult)