require('dotenv').config();

const puppeteer = require('puppeteer');

const USERNAME_IAG_IDENTIFIER = '#Username';
const PASSWORD_IAG_IDENTIFIER = '#Password';
const SUBMIT_BUTTON_IAG_IDENTIFIER = 'input[type="submit"]';

const START_UP_URL = 'https://rm.aubay.pt/Account/Login?ReturnUrl=%2f';

(async () => {
	const sleep = (timeout = 5000) =>
		new Promise((resolve) => setTimeout(resolve, timeout));

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(START_UP_URL);

	await page.focus(USERNAME_IAG_IDENTIFIER);
	await page.keyboard.type(process.env.USERNAME);

	await page.focus(PASSWORD_IAG_IDENTIFIER);
	await page.keyboard.type(process.env.PASSWORD);

	await page.click(SUBMIT_BUTTON_IAG_IDENTIFIER);

	await sleep();

	await browser.close();
})();
