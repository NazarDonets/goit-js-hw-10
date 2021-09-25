import data from './../menu.json';

const refs = {
	themeSwitch: document.querySelector('#theme-switch-toggle'),
	body: document.querySelector('body'),
};

const { themeSwitch, body } = refs;

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
