const DEFAULT_HOUR_PERIOD_PER_DAY = 8;

const HOUR_CELL_IDENTIFIER = 'input.cellDataTextBox';

module.exports = async function insertHours(context) {
	const { page } = context;

	await page.waitFor(1000);

	await page.$$eval(
		HOUR_CELL_IDENTIFIER,
		(cells, hourPeriod) => {
			cells.forEach((cell) => (cell.value = hourPeriod));
		},
		DEFAULT_HOUR_PERIOD_PER_DAY
	);

	return context;
};
