module.exports = `
	scalar JSON

	enum Status {
		pending
		completed
		cancelled
	}

	type Survey {
		id: String
		shop: String
		customer: Customer
		createdAt: String
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
		createdAt: String
	}
	type SurveyArray {
		total: Int
		surveys: [Survey]
	}

	type Query {
		surveys(
			query: String
			dateTo: String
			dateFrom: String
			orderDateFrom: String
			orderDateTo: String
			status: Status
		): [Surveys]

		createSurvey(shop: String): Survey
		survey(id: String): Survey
		cancelSurvey(id: String): Survey
		surveys(query: String, dateFrom: String, dateTo: String): SurveyArray
		issueJwt(querystring: String): Jwt
	}
	type Mutation {
		updateSurvey(id: String): Survey
	}
`;
