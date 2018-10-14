const faker = require('faker');
const shopifyOrder = require('../../fixtures/shopify-order.json');

const surveyFactory = () => ({
	id: 'ba876b9g98b',
	shop: 'devshop.myshopify.com',
	order: shopifyOrder,
	customer: {
		id: '9843298',
		firstName: 'John',
		lastName: 'Doe',
		fullName: 'John Doe',
		email: 'johndoe@email.com'
	},
	review: {
		satisfied: faker.random.boolean(),
		comment: faker.lorem.paragraph(faker.random.number(1, 3)),
		reviewedOn: new Date().toString()
	}
});

module.exports = {
	Survey: surveyFactory,
	JSON: () => ({sample: 'data'})
};
