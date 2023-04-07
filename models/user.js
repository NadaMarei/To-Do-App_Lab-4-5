const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const _ = require('lodash'); 
const {saltRound} = require('../config');

const userSchema = new Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},
	age:Number,
	password:{
		type:String,
		required:true,
	},	
	},{
	toJSON:{
		//this is used to hide the return of password and __v
		transform: (doc,ret)=>{
			const dataToReturn = _.pick(ret,['_id','username','age'])
			return dataToReturn;
		}
	}
});
userSchema.pre('save',async function(next){
	const userDocument = this;
	if(userDocument.isModified('password')){
		const hashedPassword = await bcrypt.hash(userDocument.password,saltRound);
		userDocument.password = hashedPassword;
	}
	next();
})
userSchema.methods.comparePassword = function (password){
	const userDocument = this;
	return bcrypt.compare(password,userDocument.password)
}
// userSchema.statics.
const User = mongoose.model('User',userSchema);

module.exports = User;