const steps = require('./steps');

(() => {
	Object.keys(steps).reduce((promisesChain, key) => {
		return promisesChain.then((context) => {
			return steps[key](context);
		});
	}, Promise.resolve({}));
})();
