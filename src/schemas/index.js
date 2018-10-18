module.exports = `
	enum Status {
		pending
		completed
		cancelled
	}

	scalar JSON

	type Survey {
		id: String
		shop: String
		customer: Customer
		status: Status
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
	type SurveyArray {
		total: Int
		surveys: [Survey]
	}

	type Query {
		survey(id: String): Survey
		cancelSurvey(id: String): Survey
		surveys(query: String, dateFrom: String, dateTo: String): SurveyArray
		issueJwt(querystring: String): Jwt
	}
	type Mutation {
		updateSurvey(id: String): Survey
	}
`;
