const steps = {
	1: require('./1-sign-in'),
	2: require('./2-select-date'),
	3: require('./3-add-or-edit'),
	4: require('./4-select-client-and-project'),
	5: require('./5-insert-hours'),
	6: require('./6-save-timesheet'),
	7: require('./7-reopen-timesheet'),
	8: require('./8-submit-timesheet'),
};

module.exports = steps;
