module.exports = `
	scalar JSON

	enum Status {
		pending
		completed
		cancelled
	}

	type Perfomance {
		positiveReviews: Int
		negativeReviews: Int
		reviewedAt: String
	}

	type Statistics {
		positiveReviews: Int
		negativeReviews: Int
		perfomance: [Perfomance]
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

	input InputCustomer {
		fullName: String
		firstName: String
		lastName: String
		email: String
	}
	type Customer {
		id: String
		fullName: String
		firstName: String
		lastName: String
		email: String
	}

	input InputReview {
		satisfied: Boolean
		comment: String
		createdAt: String
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
		getSurveys(
			query: String
			dateTo: String
			dateFrom: String
			skip: Int
			limit: Int
			orderDateFrom: String
			orderDateTo: String
			status: Status
		): SurveyArray

		getSurvey(id: String): Survey
		cancelSurvey(id: String): Survey
		issueJwt(querystring: String): Jwt

		getStatistics (dateFrom: String): Statistics
	}
	type Mutation {
		createSurvey(
			shop: String
			order: JSON
			customer: InputCustomer
			review: InputReview
		): Survey
		updateSurvey(id: String): Survey
	}
`;
