#!/usr/bin/env node

const { argv } = require('yargs');

const steps = require('./steps');
const logger = require('./utils/logger');

const DEFAULT_HOUR_PERIOD_PER_DAY = 8;

(() => {
	const {
		user,
		pass,
		hoursPerDay = DEFAULT_HOUR_PERIOD_PER_DAY,
		testing = false,
	} = argv;

	logger().warn("\nWelcome, let's begin!");

	if (!user || !pass) {
		logger().error(
			'\nUsername and password are required, Did you forget to pass them?, like `--user=` or `--pass=`'
		);

		process.exit(0);
	}

	Object.keys(steps)
		.reduce((promisesChain, key) => {
			return promisesChain
				.then((context) => {
					const { describe, fn } = steps[key];

					logger().success(`Step ${key} - ${describe}...`);

					return fn(context);
				})
				.catch((error) => {
					logger().error(error);
					logger().warn(
						'\n Unfortunately we will have to stop here. :('
					);

					process.exit(0);
				});
		}, Promise.resolve({ user, pass, hoursPerDay, testing }))
		.then(() => {
			logger().success(
				`\nIt seems everything went alright, see you next time :D`
			);

			process.exit(0);
		});
})();
