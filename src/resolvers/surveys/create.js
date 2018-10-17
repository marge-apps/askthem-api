module.exports = (_, args, {surveys, dbclient}) =>
	surveys.insert({
		...args,
		id: dbclient.id().toString(),
		status: args.pending || 'pending',
		createdAt: new Date()
	});
