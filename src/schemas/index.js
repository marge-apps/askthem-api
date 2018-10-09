module.exports = `
	type Survey {
		slug: String,
		shop: String
	}

	type Jwt {
		token: String
	}

	type Query {
		survey(id: String): Survey
		issueJwt(querystring: String): Jwt
	}
`
