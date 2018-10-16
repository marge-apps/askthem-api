module.exports = (_, args, {surveys, dbclient}) =>
	surveys.insert({
		id: dbclient.id().toString(),
		shop: 'devshop.myshopify.com',
		status: 'pending',
		customer: {},
		order: {}
	});
