const monk = require('monk');
const {seed} = require('./seed');

const shouldSeedDatabase = process.env.SEED_DATABASE === 'TRUE';

const db = monk(process.env.MONGODB_URI || 'mongodb://localhost');
const collection = db.get('surveys');

const prepareDb = async () => {
	if (shouldSeedDatabase) await seed(collection);

	await collection.createIndex({
		'customer.email': 'text',
		'customer.firstName': 'text',
		'customer.lastName': 'text',
		'review.comment': 'text',
		shop: 'text'
	});
};

prepareDb();

module.exports = {
	db,
	collection
};
