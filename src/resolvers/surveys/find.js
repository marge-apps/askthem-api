const {assoc, assocPath, identity, ifElse, pick, pipe, prop} = require('ramda');

const withDateFrom = ifElse(
	prop('dateFrom'),
	args => assocPath(['createdAt', '$gte'], new Date(args.dateFrom))(args),
	identity
);

const withDateTo = ifElse(
	prop('dateTo'),
	args => assocPath(['createdAt', '$lte'], new Date(args.dateTo))(args),
	identity
);

const withStatus = ifElse(
	prop('status'),
	args => assoc('status', args.status)(args),
	identity
);

const cleanUselessParams = pick(['status', 'createdAt']);

module.exports = {
	find: (_, args, {surveys}) =>
		surveys.find(
			pipe(
				withDateFrom,
				withDateTo,
				withStatus,
				// WithOrderDateFrom
				// withOrderDateTo
				cleanUselessParams
			)(args)
		),
	cleanUselessParams,
	withDateFrom,
	withDateTo,
	withStatus
};
