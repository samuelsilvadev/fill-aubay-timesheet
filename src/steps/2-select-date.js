const { MONTHS_MAP_INDEX_PT } = require('../utils/months');

const {
	MONTH_SELECT_IDENTIFIER,
	FIRST_TABLE_ROW_SELECT_IDENTIFIER,
	YEAR_SELECT_IDENTIFIER,
} = require('./shared-selectors');

const MONTH_TABLE_DATA_IDENTIFIER = '[data-name="MonthDesc"]';

module.exports = async function selectDate(context) {
	const { page } = context;

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

	return { ...context, currentMonthIndex, lastSubmittedMonthIndex };
};
