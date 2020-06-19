const { EDIT_NEW_TIMESHEET_IDENTIFIER } = require('./shared-selectors');

const ADD_TIMESHEET_LINK_IDENTIFIER = '.divBottomButtons > .insert-new-btn';

const VISIBLE_ON_ADD_NEW_TIMESHEET_IDENTIFIER =
	'#ComboBoxHeaderFixedClientProject';

module.exports = async function addOrEditTimesheet(context) {
	const { currentMonthIndex, lastSubmittedMonthIndex, page } = context;

	// click in ADD a new timesheet or EDIT the last one.
	if (currentMonthIndex !== lastSubmittedMonthIndex) {
		await page.click(ADD_TIMESHEET_LINK_IDENTIFIER);
	} else {
		await page.click(EDIT_NEW_TIMESHEET_IDENTIFIER);
	}

	await page.waitForSelector(VISIBLE_ON_ADD_NEW_TIMESHEET_IDENTIFIER);

	return context;
};
