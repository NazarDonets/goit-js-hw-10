import data from './../menu.json';
import articleTemp from './../templates/menu-card.hbs';

const refs = {
	themeSwitch: document.querySelector('#theme-switch-toggle'),
	body: document.querySelector('body'),
	menuContainer: document.querySelector('.js-menu'),
};

const { themeSwitch, body, menuContainer } = refs;

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
