const {
	MONTH_SELECT_IDENTIFIER,
	YEAR_SELECT_IDENTIFIER,
} = require('./shared-selectors');

const SAVE_TIMESHEET_IDENTIFIER = '#saveTimesheetForm';

module.exports = async function saveTimesheet(context) {
	const { page } = context;

	await page.click(SAVE_TIMESHEET_IDENTIFIER);
	await page.waitForSelector(YEAR_SELECT_IDENTIFIER);
	await page.waitForSelector(MONTH_SELECT_IDENTIFIER);

	return context;
};
