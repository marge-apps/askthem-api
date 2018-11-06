/* eslint-disable camelcase */
const pAll = require('p-all');
const faker = require('faker');
const {equals, range, map} = require('ramda');
const realOrder = require('../fixtures/shopify-order.json');

const statuses = ['pending', 'completed', 'cancelled'];

const createSurvey = () => {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const email = `${firstName}_${lastName}@${faker.internet.domainName()}`;
	const status = statuses[faker.random.number({min: 0, max: 2})];
	const createdAt = new Date(
		faker.random.number({min: 1500000000000, max: Date.now()})
	);
	const orderId = faker.random.number({min: 10000000, max: 99999999});
	const customerId = faker.random.number({min: 1000, max: 99999999});

	const review = equals('completed', status)
		? {
				satisfied: [true, false][faker.random.number({min: 0, max: 1})],
				reviewedOn: new Date(
					faker.random.number({min: createdAt, max: Date.now()})
				),
				comment: faker.lorem.sentences(faker.random.number({min: 0, max: 10}))
		  }
		: null;

	return {
		shop: 'dev-shop.myshopify.com',
		status,
		createdAt,
		order: {
			...realOrder,
			id: orderId,
			email,
			created_at: createdAt,
			contact_email: email,
			customer: {
				...realOrder.customer,
				id: customerId,
				email,
				accepts_marketing: true,
				first_name: firstName,
				last_name: lastName
			}
		},
		review
	};
};

const seed = async (collection, amount = 1000) => {
	await collection.drop();

	const fns = map(
		() => async () => {
			const survey = createSurvey();
			await collection.insert(survey);
		},
		range(1, amount)
	);

	await pAll(fns);
};

module.exports = {createSurvey, seed};
