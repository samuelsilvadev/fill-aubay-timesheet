const { argv } = require('yargs');

const steps = require('./steps');

(() => {
	const { user, pass } = argv;

	Object.keys(steps).reduce((promisesChain, key) => {
		return promisesChain.then((context) => {
			return steps[key](context);
		});
	}, Promise.resolve({ user, pass }));
})();
