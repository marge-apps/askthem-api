module.exports = `
	scalar JSON

	type Survey {
		id: String
		shop: String
		customer: Customer
		order: JSON
		review: Review
	}

	type Jwt {
		token: String
	}

	type Customer {
		id: String
		fullName: String
		firstName: String
		lastName: String
		email: String
	}

	type Review {
		satisfied: Boolean
		comment: String
		reviewedOn: String
	}

	type Query {
		survey(id: String): Survey
		surveys(query: String, dateFrom: String, dateTo: String): [Survey]
		issueJwt(querystring: String): Jwt
	}

`;
