const {
	assoc,
	assocPath,
	identity,
	ifElse,
	pathOr,
	pick,
	pipe,
	prop
} = require('ramda');

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

const withOrderDateFrom = ifElse(
	prop('orderDateFrom'),
	args =>
		assocPath(['order.created_at', '$gte'], new Date(args.orderDateFrom))(args),
	identity
);

const withOrderDateTo = ifElse(
	prop('orderDateTo'),
	args =>
		assocPath(['order.updated_at', '$lte'], new Date(args.orderDateTo))(args),
	identity
);
const withStatus = ifElse(
	prop('status'),
	args => assoc('status', args.status)(args),
	identity
);

const withSearch = ifElse(
	prop('query'),
	args => assocPath(['$text', '$search'], args.query)(args),
	identity
);

const cleanUselessParams = pick([
	'status',
	'createdAt',
	'$text',
	'order.created_at'
]);

module.exports = {
	find: async (_, args, {surveys}) => {
		const limit = pathOr(25, ['limit'], args);
		const skip = pathOr(0, ['skip'], args);
		const sort = pathOr('createdAt', ['sortDate'], args);

		return {
			surveys: await surveys.find(
				pipe(
					withDateFrom,
					withDateTo,
					withOrderDateFrom,
					withOrderDateTo,
					withStatus,
					withSearch,
					cleanUselessParams
				)(args),
				{limit, skip, sort}
			),
			total: surveys.count()
		};
	},
	cleanUselessParams,
	withDateFrom,
	withDateTo,
	withOrderDateFrom,
	withOrderDateTo,
	withStatus
};
