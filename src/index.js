const { argv } = require('yargs');

const steps = require('./steps');
const logger = require('./utils/logger');

(() => {
	const { user, pass } = argv;

	logger().warn("\nWelcome, let's begin!");

	Object.keys(steps).reduce((promisesChain, key) => {
		return promisesChain
			.then((context) => {
				const { describe, fn } = steps[key];

				logger().success(`Step ${key} - ${describe}...`);

				return fn(context);
			})
			.catch((error) => {
				logger().error(error);
				logger().warn('\n Unfortunately we will have to stop here. :(');

				process.exit(0);
			});
	}, Promise.resolve({ user, pass }));
})();
