const LIMIT = 10000;
const STATUS_IN_LIMIT = 'все хорошо!';
const STATUS_OUT_OF_LIMIT = 'все плохо!';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';
const CURRENCY = 'руб.'

const pushExpenseNode = document.querySelector('.js-input__btn');
const inputExpenseNode = document.querySelector('.js-input__expens');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const clearBtnNode = document.getElementById("clearBtn");

let expenses = [];

init(expenses);

pushExpenseNode.addEventListener('click', function () {
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    trackExpense(expense);

    render(expenses)
})

function trackExpense(expense) {
    expenses.push(expense);     // добавляем значение в массив
}


function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
}


function calculateExpenses(expenses) {
    //производится подсчет суммы трат
    let sum = 0;
    expenses.forEach(element => {
        sum += element;
    });

    return sum;
}

function getExpenseFromUser() {
    if (inputExpenseNode.value === '') {    // проверяем наличие значения в поле вводаили !inputExpenseNode.value
        return null;
    }

    const expense = parseInt(inputExpenseNode.value)     // делаем строку числом

    clearInput()

    return expense;
}


function clearInput() {
    inputExpenseNode.value = '';     // после нажатия обнуляем поля ввода
}

function renderHistory(expenses) {

    let expensesListHTML = '';

    expenses.forEach(element => {
        const elementHTML = `<li class = 'historyElement'>${element} ${CURRENCY}</li>`;
        expensesListHTML += elementHTML;
    });

    historyNode.innerHTML = `<ol class='expenesHistoryList'>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
    sumNode.innerText = `${sum} ${CURRENCY}`;
}

function renderStatus(sum) {
    // проверяем выход за предел лимита
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        const out_of_limit = sum - LIMIT;
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (-${out_of_limit} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}

const clearBtnHandler = () => {
    expenses = [];
    render(expenses);
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
};

clearBtnNode.addEventListener("click", clearBtnHandler);