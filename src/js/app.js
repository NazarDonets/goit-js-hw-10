import data from './../menu.json';
import articleTemp from './../templates/menu-card.hbs';

var arraySort = require('array-sort');

const refs = {
	themeSwitch: document.querySelector('#theme-switch-toggle'),
	body: document.querySelector('body'),
	menuContainer: document.querySelector('.js-menu'),
	buttonAsc: document.getElementById('sortAsc'),
	buttonDesc: document.getElementById('sortDesc'),
	notificationMsg: document.querySelector('.notification-container'),
};

const {
	themeSwitch,
	body,
	menuContainer,
	buttonAsc,
	buttonDesc,
	notificationMsg,
} = refs;

const Theme = {
	LIGHT: 'light-theme',
	DARK: 'dark-theme',
};

console.log(notificationMsg);

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

function showNotification() {
	notificationMsg.classList.remove('visibility-hidden');
}

function hideNotification() {
	notificationMsg.classList.add('visibility-hidden');
}

setTimeout(showNotification, 500);

const hideNotifTimer = setTimeout(() => {
	hideNotification();
}, 4000);

notificationMsg.addEventListener('mouseenter', (e) => {
	if (e.target === notificationMsg) {
		clearTimeout(hideNotifTimer);
	}
});

notificationMsg.addEventListener('mouseout', () => {
	setTimeout(() => {
		hideNotification();
	}, 2000);
});

body.addEventListener('click', (e) => {
	if (e.target === notificationMsg) {
		hideNotification();
		clearTimeout(hideNotifTimer);
	}
});
