import data from './../menu.json';
import articleTemp from './../templates/menu-card.hbs';

var arraySort = require('array-sort');

const refs = {
	themeSwitch: document.querySelector('#theme-switch-toggle'),
	body: document.querySelector('body'),
	menuContainer: document.querySelector('.js-menu'),
	buttonAsc: document.getElementById('sortAsc'),
	buttonDesc: document.getElementById('sortDesc'),
};

const { themeSwitch, body, menuContainer, buttonAsc, buttonDesc } = refs;

const Theme = {
	LIGHT: 'light-theme',
	DARK: 'dark-theme',
};

let activeTheme = localStorage.getItem('THEME');

if (activeTheme === Theme.DARK) {
	themeSwitch.checked = true;
	body.classList.add(activeTheme);
}

themeSwitch.addEventListener('click', toggleTheme);

function toggleTheme(e) {
	if (e.target.checked) {
		body.classList.replace(Theme.LIGHT, Theme.DARK);
		localStorage.setItem('THEME', Theme.DARK);
	} else {
		body.classList.replace(Theme.DARK, Theme.LIGHT);
		localStorage.setItem('THEME', Theme.LIGHT);
	}
}

function createMarkup(data) {
	return data.map(articleTemp).join('');
}

const articlesMarkup = createMarkup(data);

menuContainer.insertAdjacentHTML('afterbegin', articlesMarkup);

buttonAsc.addEventListener('click', () => {
	menuContainer.innerHTML = '';
	function createMarkup(data) {
		return arraySort(data, 'price').map(articleTemp).join('');
	}

	const articlesMarkup = createMarkup(data);

	menuContainer.insertAdjacentHTML('afterbegin', articlesMarkup);
});

buttonDesc.addEventListener('click', () => {
	menuContainer.innerHTML = '';
	function createMarkup(data) {
		return arraySort(data, 'price', { reverse: true })
			.map(articleTemp)
			.join('');
	}

	const articlesMarkup = createMarkup(data);

	menuContainer.insertAdjacentHTML('afterbegin', articlesMarkup);
});

// arraySort(array, comparisonArgs);
