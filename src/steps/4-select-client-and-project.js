const { CLIENT_IDENTIFIER } = require('./shared-selectors');

const PROJECT_IDENTIFIER = '#TariffId';

const CLIENT_SELECT_FIRST_IDENTIFIER = '#ClientId :nth-child(2)';
const PROJECT_SELECT_FIRST_IDENTIFIER = '#TariffId :nth-child(2)';

module.exports = async function selectClientAndProject(context) {
	const { page } = context;

	await page.waitForSelector(CLIENT_IDENTIFIER);

	const clientId = await page.$eval(
		CLIENT_SELECT_FIRST_IDENTIFIER,
		($client) => $client.value
	);

	await page.select(CLIENT_IDENTIFIER, clientId);

	await page.waitFor(500);

	const projectId = await page.$eval(
		PROJECT_SELECT_FIRST_IDENTIFIER,
		($project) => $project.value
	);

	await page.select(PROJECT_IDENTIFIER, projectId);

	return context;
};
