let limit = 10000;
const GLOBAL_LABEL_LIMIT = "limit";
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
const clearBtnNode = document.getElementById('clearBtn');
const categoryNode = document.getElementById('categorySelect');
const changeLimitNode = document.getElementById('js-change_limit');

let expenses = [];
statusNode.innerText = STATUS_IN_LIMIT;
limitNode.innerText = limit;


function initLimit() {
    const limitFromStorage = parseInt(localStorage.getItem(GLOBAL_LABEL_LIMIT));
    if (!limitFromStorage) {
        return;
    }
    limitNode.innerText = limitFromStorage;
}
initLimit();

function getTotal() {
    let sum = 0;
    expenses.forEach(function (expense) {
        sum += expense.amont;
    })
    return sum;
}

function renderStatus() {
    const total = getTotal(expenses);
    sumNode.innerText = total;

    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = (`${STATUS_OUT_OF_LIMIT} (${limit - total} ${CURRENCY})`);
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}

function renderHistory() {
    historyNode.innerHTML = "";

    expenses.forEach(function (expense) {
        //const historyItem = document.createElement("li");
        const historyItem = document.createElement("li");
        historyItem.className = "historyElement rub";
        historyItem.innerText = `${expense.category} - ${expense.amont}`;
        historyNode.appendChild(historyItem);
    });
};

function render() {
    renderStatus(expenses);
    renderHistory(expenses);
}

function addBtnHandler() {
    const currentAmont = getExpensesFromUser();

    if (!currentAmont) {
        alert('Введите сумму корректно');
        return
    }

    const currentCategory = getCategoryFromUser();
    if (currentCategory === "Категория") {
        alert("Выберите категорию");
        return
    }

    const newExpense = { amont: currentAmont, category: currentCategory };

    expenses.push(newExpense);

    render();

    clearInput();

    console.log(expenses);
}



function getExpensesFromUser() {
    return parseInt(inputExpenseNode.value);
}

function getCategoryFromUser() {
    return categoryNode.value;
}

function clearInput() {
    inputExpenseNode.value = '';
    categoryNode.value = 'Категория';
};

const clearBtnHandler = () => {
    expenses = [];
    render();
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
};

const changeLimitHandler = () => {
    const newLimit = prompt("Новый лимит");

    const newLimitValue = parseInt(newLimit);

    if (!newLimitValue) {
        return;
    }


    limitNode.innerText = newLimitValue;

    limit = newLimitValue;

    // записываем лимит в local Storage
    localStorage.setItem('limit', newLimitValue);

    render();
};


changeLimitNode.addEventListener("click", changeLimitHandler);
clearBtnNode.addEventListener("click", clearBtnHandler);
pushExpenseNode.addEventListener("click", addBtnHandler);