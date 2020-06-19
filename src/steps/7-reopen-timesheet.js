const { EDIT_NEW_TIMESHEET_IDENTIFIER } = require('./shared-selectors');

module.exports = async function reOpenTimesheet(context) {
	const { page } = context;

	await page.click(EDIT_NEW_TIMESHEET_IDENTIFIER);

	return context;
};
