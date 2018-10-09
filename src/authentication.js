const {verify} = require('jsonwebtoken');
const {send} = require('micro');
const {tryCatch, pipe} = require('ramda');
const secret = process.env.SECRET;

const extract = props => {
	const {req} = props;
	const token = req.headers['authorization']
	const [_, payload] = token.split(' ')

	return {token: token, ...props}
}

const verify = tryCatch(
	props => verify(props.token, secret),
	(error, ...props) => send(props.res, 401)
)

const respond = props => send(props);

export default pipe(
	extract,
	verify,
	respond
)
