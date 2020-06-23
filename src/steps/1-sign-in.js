const puppeteer = require('puppeteer');

const {
	MONTH_SELECT_IDENTIFIER,
	FIRST_TABLE_ROW_SELECT_IDENTIFIER,
	YEAR_SELECT_IDENTIFIER,
} = require('./shared-selectors');

const { isDevelopment } = require('../utils/runtime');

const START_UP_URL = 'https://rm.aubay.pt/Account/Login?ReturnUrl=%2f';

const USERNAME_TAG_IDENTIFIER = '#Username';
const PASSWORD_TAG_IDENTIFIER = '#Password';
const SUBMIT_BUTTON_TAG_IDENTIFIER = 'input[type="submit"]';

module.exports = async function openAndSignIn(context) {
	const { user, pass, testing } = context;

	const browser = await puppeteer.launch({
		headless: !testing && !isDevelopment,
	});

	const incognitoContext = await browser.createIncognitoBrowserContext();
	const page = await incognitoContext.newPage();

	await page.goto(START_UP_URL);

	await page.focus(USERNAME_TAG_IDENTIFIER);
	await page.keyboard.type(process.env.USERNAME || `${user}`);

	await page.focus(PASSWORD_TAG_IDENTIFIER);
	await page.keyboard.type(process.env.PASSWORD || `${pass}`);

	await page.click(SUBMIT_BUTTON_TAG_IDENTIFIER);

	await page.waitFor(500);

	await page.waitForSelector(YEAR_SELECT_IDENTIFIER);
	await page.waitForSelector(MONTH_SELECT_IDENTIFIER);
	await page.waitForSelector(FIRST_TABLE_ROW_SELECT_IDENTIFIER);

	return { ...context, page, browser };
};
