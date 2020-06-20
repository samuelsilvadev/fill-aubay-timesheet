const HOUR_CELL_IDENTIFIER = 'input.cellDataTextBox';

module.exports = async function insertHours(context) {
	const { page, hoursPerDay } = context;

	await page.waitFor(1000);

	await page.$$eval(
		HOUR_CELL_IDENTIFIER,
		(cells, hourPeriod) => {
			cells.forEach((cell) => (cell.value = hourPeriod));
		},
		hoursPerDay
	);

	return context;
};
