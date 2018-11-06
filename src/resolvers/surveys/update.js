const {omit} = require('ramda');

module.exports = (_, {id, ...args}, {surveys}) =>
	surveys.findOneAndUpdate({id}, {$set: omit(['id'], args)});
