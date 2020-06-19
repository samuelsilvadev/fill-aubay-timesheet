const { CLIENT_IDENTIFIER } = require('./shared-selectors');

const SUBMIT_TIMESHEET_IDENTIFIER = '#submitTimesheetForm';

module.exports = async function submitTimesheet(context) {
	const { page, browser } = context;

	// click on submit
	await page.waitForSelector(CLIENT_IDENTIFIER);
	await page.click(SUBMIT_TIMESHEET_IDENTIFIER);

	await browser.close();

	return context;
};
