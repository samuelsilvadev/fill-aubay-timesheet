const chalk = require('chalk');

function logger() {
	return {
		warn(message) {
			console.log(chalk.yellowBright(message));
		},
		error(message) {
			console.log(chalk.redBright(message));
		},
		success(message) {
			console.log(chalk.greenBright(message));
		},
		info(message) {
			console.log(chalk.whiteBright(message));
		},
	};
}

module.exports = logger;
