const CustomError = require('./helpers/customError')

require('dotenv').config()
const requiredEnvs = ['MONGO_URI','JWT_SECRET']
const missingEnvs = requiredEnvs.filter(env=>!process.env[env])
if(missingEnvs.length) {
	throw new CustomError(`missing envs ${missingEnvs.join(',')}`,500)
}
module.exports = {
	saltRound:process.env.SALT_ROUND || 10,
	mongoURI:process.env.MONGO_URI ,
	jwtSecret:process.env.JWT_SECRET,
	port:process.env.PORT || 3000
}
