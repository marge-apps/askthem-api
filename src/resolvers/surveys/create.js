module.exports = (_, args, {surveys, dbclient}) =>
	surveys.insert({
		...args,
		id: dbclient.id().toString(),
		status: args.pending || 'pending',
		createdAt: new Date()
	});

// Module.exports = (_, args, {surveys, dbclient}) => {
// 	throw new Error('Not implemented')
// }
