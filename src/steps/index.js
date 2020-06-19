const steps = {
	1: {
		describe: 'Doing sign-in',
		fn: require('./1-sign-in'),
	},
	2: {
		describe: 'Selecting year and month',
		fn: require('./2-select-date'),
	},
	3: {
		describe: 'Adding Timesheet',
		fn: require('./3-add-or-edit'),
	},
	4: {
		describe: 'Selecting client and project',
		fn: require('./4-select-client-and-project'),
	},
	5: {
		describe: 'Filling hours',
		fn: require('./5-insert-hours'),
	},
	6: {
		describe: 'Saving Timesheet',
		fn: require('./6-save-timesheet'),
	},
	7: {
		describe: 'Re opening Timesheet to submit',
		fn: require('./7-reopen-timesheet'),
	},
	8: {
		describe: 'Submitting Timesheet',
		fn: require('./8-submit-timesheet'),
	},
};

module.exports = steps;
