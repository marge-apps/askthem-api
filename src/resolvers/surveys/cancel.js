module.exports = (_, {id}, {surveys}) =>
	surveys.findOneAndUpdate({id}, {$set: {status: 'cancelled'}});
