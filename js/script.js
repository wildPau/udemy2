'use strict';
let startBtn = document.querySelector('#start'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	expensItem = document.querySelectorAll('input.expenses-item'),
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	expenseBtn = document.getElementsByTagName('button')[0],
	approve1 = document.getElementsByTagName('button')[1],
	calculate = document.getElementsByTagName('button')[2],
	daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
	inputOpt = document.querySelectorAll('.optionalexpenses-item'),
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	income = document.querySelector('#income'),
	savings = document.querySelector("#savings"),
	sumValue = document.querySelector("#sum"),
	percentValue = document.querySelector("#percent"),
	yearValue = document.querySelector(".year-value"),
	monthValue = document.querySelector(".month-value"),
	dayValue = document.querySelector(".day-value"),
	money, time;


console.log(expensesValue);
// window.onload = function () {
// 	if (startBtn != checkBtn) {
// 		console.log('Good');
// 	} else {
// 		console.log('Bad');
// 	}
// };


// let checkBtn = false;
// console.log(checkBtn);

startBtn.addEventListener('click', function () { //кнопка Начать расчет
	time = prompt('Yor time: YYYY-MM-DD', 2019 - 11 - 13);
	money = +prompt('Your Budget?', 10000); // + превращает строку в числовое значение

	while (isNaN(money) || money == "" || money == null) { //isNaN - является ли значение выражения числом
		money = +prompt('Your Budget?', 10000);
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();

	yearValue.value = new Date(Date.parse(time)).getFullYear(); //если это input то мы работаем с value а не с textContent! 
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1; //начало месяца с 0 до 11
	dayValue.value = new Date(Date.parse(time)).getDate();
	if (startBtn) {
		expenseBtn.removeAttribute('disabled');
		approve1.removeAttribute('disabled');
		calculate.removeAttribute('disabled');
	} else {
		expenseBtn.setAttribute('disabled');
		approve1.setAttribute('disabled');
		calculate.setAttribute('disabled');
	}
});

expenseBtn.addEventListener('click', function () {
	let sum = 0;
	for (var i = 0; i < expensItem.length; i++) {

		var a = expensItem[i].value,
			b = expensItem[++i].value;

		if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
			a != '' && b != '' && a.length < 50) {
			// console.log(appData.expence);
			appData.expence[a] = b; //а-ключь b-значение
			sum += +b; //присваиваем sum , b + - превращ в число

		} else {
			i--;
		}

	}

	expensesValue.textContent = sum;
	appData.sumOutput = sum;
	// console.log(appData.sumOutput);
});

approve1.addEventListener('click', function () { //Ввод необязательных расходов
	for (let i = 0; i < inputOpt.length; i++) {
		let opt = inputOpt[i].value;
		console.log(opt);
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
	}
	// console.log(appData.optionalExpenses);
});

calculate.addEventListener('click', function () {

	if (appData.budget != undefined) {

		appData.moneyPerDay = ((appData.budget - appData.sumOutput) / 30).toFixed(0); //toFixed()-метод округляет к целому (1)даст одно число после точки.
		daybudgetValue.textContent = appData.moneyPerDay;
		// console.log(appData.optionalExpenses);
		console.log(appData.budget);
		console.log(appData.sumOutput);


		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный уровень дохода';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний уровень дохода';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий уровень дохода';
		} else {
			levelValue.textContent = 'Error';
		}
	} else {
		daybudgetValue.textContent = 'Error';
	}
	console.log(appData.expence);
});

income.addEventListener('input', function () { //Change вместо input- текст появится после того как убрать фокус с поля
	let items = income.value;
	appData.income = items.split(", ");
	// appData.income.push(prompt(" Может что-то еще?"));
	// appData.income.sort();
	incomeValue.textContent = appData.income;
});

savings.addEventListener('click', function () {
	if (appData.saving == true) {
		appData.saving = false;
	} else {
		appData.saving = true;
	}
	console.log(appData.saving);
});

sumValue.addEventListener('input', function () {
	if (appData.saving == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', function () {
	if (appData.saving == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

startBtn.addEventListener("click", function () {

});
// console.log(optionalExpenses);
var appData = {
	budget: money,
	timeData: time,
	expence: {},
	optionalExpenses: {},
	income: [],
	saving: false,
	sumOutput: '',
	detectDayBudget: function () {
		appData.moneyPerDay = (appData.budget / 30).toFixed(0); //toFixed()-метод округляет к целому (1)даст одно число после точки.
		alert('Ежедневный расход:' + appData.moneyPerDay);
	},
	chooseExpenses: function () {
		for (var i = 0; i < 2; i++) {

			var a = prompt("Введите обязательную статью расходов в этом месяце", 10000),
				b = prompt("Во сколько обойдется?", 5000);

			if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
				a != '' && b != '' && a.length < 50) {
				console.log('done');
				appData.expence[a] = b;
			} else {


			}
		}
	},
	detectLevel: function () {
		if (appData.moneyPerDay < 100) {
			console.log('Минимальный уровень дохода');
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log('Средний уровень дохода');
		} else if (appData.moneyPerDay > 2000) {
			console.log('Высокий уровень дохода');
		} else {
			console.log('Error');
		}
	},

	chooseOptExpenses: function () {

	},
	chackSaving: function () {
		if (appData.saving == true) {
			let save = +prompt('Какова сумма накопления?'),
				percent = +prompt('Под какой процент?');

			appData.monthIncome = save / 100 / 12 * percent;
			alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
		}
	},

	choseIncome: function () {
		let items = prompt("Что принесёт дополнительный доход?(перечислите через запятую)", "");

		// while(items == "" || items == null){
		// 	items = prompt("Что принесёт дополнительный доход?(перечислите через запятую)" , "");
		// 	// (typeof(items) != null && items != undefined && items != '' )
		// 	appData.income = items.split(',');					//записываем строки  в массив через запятую
		// 	appData.income.push(prompt('Может что-то еще?'));		//добавляем в массив одно значение(даже через запятую будет одно значение, вопрос 
		// 	appData.income.sort();		//сортировка по алфавиту
		// }
		if (typeof (items) != "string" || items == "" || typeof (items) == null) {
			console.log("Вы ввели некорректные данные или не ввели их вовсе");
		} else {
			appData.income = items.split(", ");
			appData.income.push(prompt("Может что-то еще?"));
			appData.income.sort();
		}
		appData.income.forEach(function (itemmassive, i) { // i - кол-во вызовов
			alert("Способы доп. заработка: " + (i + 1) + " - " + itemmassive);
		});
	}
};
// console.log(appData.optionalExpenses);
// appData.choseIncome();

for (var key in appData) {
	// console.log("Key: " + key + " Value: " +appData[key]);  //выводит в консоль значения всего объекта
};