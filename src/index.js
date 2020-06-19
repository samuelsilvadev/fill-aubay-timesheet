require('dotenv').config();

const puppeteer = require('puppeteer');

const { MONTHS_MAP_INDEX_PT } = require('./utils/months');

const START_UP_URL = 'https://rm.aubay.pt/Account/Login?ReturnUrl=%2f';

const USERNAME_TAG_IDENTIFIER = '#Username';
const PASSWORD_TAG_IDENTIFIER = '#Password';
const SUBMIT_BUTTON_TAG_IDENTIFIER = 'input[type="submit"]';

const YEAR_SELECT_IDENTIFIER = '#Year';
const MONTH_SELECT_IDENTIFIER = '#Month';
const FIRST_TABLE_ROW_SELECT_IDENTIFIER =
	'.table.table-striped.grid-table > tbody > tr:first-child';
const MONTH_TABLE_DATA_IDENTIFIER = '[data-name="MonthDesc"]';

const ADD_TIMESHEET_LINK_IDENTIFIER = '.divBottomButtons > .insert-new-btn';
const VISIBLE_ON_ADD_NEW_TIMESHEET_IDENTIFIER =
	'#ComboBoxHeaderFixedClientProject';

const EDIT_NEW_TIMESHEET_IDENTIFIER =
	'.table.table-striped.grid-table > tbody > tr:first-child .grid-cell.hidden-xs a';

const HOUR_CELL_IDENTIFIER = 'input.cellDataTextBox';

const CLIENT_IDENTIFIER = '#ClientId';
const PROJECT_IDENTIFIER = '#TariffId';

const CLIENT_SELECT_FIRST_IDENTIFIER = '#ClientId :nth-child(2)';
const PROJECT_SELECT_FIRST_IDENTIFIER = '#TariffId :nth-child(2)';

const SAVE_TIMESHEET_IDENTIFIER = '#saveTimesheetForm';

const SUBMIT_TIMESHEET_IDENTIFIER = '#submitTimesheetForm';

const DEFAULT_HOUR_PERIOD_PER_DAY = 8;

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(START_UP_URL);

	await page.focus(USERNAME_TAG_IDENTIFIER);
	await page.keyboard.type(process.env.USERNAME);

	await page.focus(PASSWORD_TAG_IDENTIFIER);
	await page.keyboard.type(process.env.PASSWORD);

	await page.click(SUBMIT_BUTTON_TAG_IDENTIFIER);

	await page.waitForSelector(YEAR_SELECT_IDENTIFIER);
	await page.waitForSelector(MONTH_SELECT_IDENTIFIER);
	await page.waitForSelector(FIRST_TABLE_ROW_SELECT_IDENTIFIER);

	// step 2
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;

	await page.select(YEAR_SELECT_IDENTIFIER, `${currentYear}`);

	const lastSubmittedMonth = await page.$eval(
		FIRST_TABLE_ROW_SELECT_IDENTIFIER,
		(tableRow, monthTableIdentifier) =>
			tableRow
				.querySelector(monthTableIdentifier)
				.textContent.toLowerCase(),
		MONTH_TABLE_DATA_IDENTIFIER
	);

	// maybe we don't need that, we can use the currentMonth
	// since the array index in there will be the same as currentMonth
	const currentMonthIndex = MONTHS_MAP_INDEX_PT.findIndex(
		({ index }) => index === currentMonth
	);

	const lastSubmittedMonthIndex = MONTHS_MAP_INDEX_PT.findIndex(
		({ month }) => month === lastSubmittedMonth
	);

	if (currentMonthIndex < lastSubmittedMonthIndex) {
		throw new Error(
			'The current month is smaller than the last submitted month.'
		);
	}

	// also check status, to avoid start something that is already finished.
	if (currentMonthIndex !== lastSubmittedMonthIndex) {
		if (lastSubmittedMonth) {
			const nextMonthIndex = currentMonthIndex + 1;

			await page.select(MONTH_SELECT_IDENTIFIER, `${nextMonthIndex}`);
		} else {
			await page.select(MONTH_SELECT_IDENTIFIER, `${currentMonth}`);
		}
	}

	await page.waitFor(500);

	// step 3
	// click in ADD a new timesheet or EDIT the last one.
	if (currentMonthIndex !== lastSubmittedMonthIndex) {
		await page.click(ADD_TIMESHEET_LINK_IDENTIFIER);
	} else {
		await page.click(EDIT_NEW_TIMESHEET_IDENTIFIER);
	}

	await page.waitForSelector(VISIBLE_ON_ADD_NEW_TIMESHEET_IDENTIFIER);

	// step 5
	await page.waitForSelector(CLIENT_IDENTIFIER);

	const clientId = await page.$eval(
		CLIENT_SELECT_FIRST_IDENTIFIER,
		($client) => $client.value
	);

	await page.select(CLIENT_IDENTIFIER, clientId);

	// await page.waitForResponse(
	// 	/https:\/\/rm\.aubay\.pt\/Timesheet\/_GetProjects.*/,
	// 	{
	// 		timeout: 1000,
	// 	}
	// );

	// wait for project request 🛠
	await page.waitFor(1000);

	const projectId = await page.$eval(
		PROJECT_SELECT_FIRST_IDENTIFIER,
		($project) => $project.value
	);

	await page.select(PROJECT_IDENTIFIER, projectId);

	// step 6 - check hours
	await page.waitFor(1000);

	await page.$$eval(
		HOUR_CELL_IDENTIFIER,
		(cells, hourPeriod) => {
			cells.forEach((cell) => (cell.value = hourPeriod));
		},
		DEFAULT_HOUR_PERIOD_PER_DAY
	);

	// step 7 - click on save
	await page.click(SAVE_TIMESHEET_IDENTIFIER);
	await page.waitForSelector(YEAR_SELECT_IDENTIFIER);
	await page.waitForSelector(MONTH_SELECT_IDENTIFIER);

	// step 8 - re-open timesheet
	await page.click(EDIT_NEW_TIMESHEET_IDENTIFIER);

	// step 9 - click on submit
	await page.waitForSelector(CLIENT_IDENTIFIER);
	await page.click(SUBMIT_TIMESHEET_IDENTIFIER);

	await browser.close();
})();
