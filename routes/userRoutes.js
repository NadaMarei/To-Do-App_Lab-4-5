const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const validator = require('../middlewares/validators');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const verify = require('../middlewares/verify');
const CustomError = require('../helpers/customError');
const signJwt = promisify(jwt.sign);
const {jwtSecret} = require('../config')



// users
const checkRequiredFields = (params)=>(req,res,next)=>{
	const receivedParams = Object.keys(req.body);
	const missingParams = params.filter(param=>!receivedParams.includes(param))
	if(missingParams.length)throw new CustomError(`missing params ${missingParams.join(',')}`,400)

}

// create users and the sign-up
router.post('/register',async(req,res,next)=>{
	try{
		const {username,age,password} = req.body;
		if (!username || !age || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        //Check if the user already exist or not
        const userExist = await userModel.findOne({ username: req.body.username });
        if (userExist) {
            return res.json({ message: 'User already exist with the given username' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new userModel(req.body);
        await user.save();
		res.send(user);
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        return res.json({ error: error });
    }
	})

// the sign-in
router.post('/login',validator.validateSignin,async (req,res,next)=>{
	try {
        const { username, password } = req.body;
        //Check emptyness of the incoming data
        if (!username || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        //Check if the user already exist or not
        const userExist = await userModel.findOne({email:req.body.username});
        if(!userExist){
            return res.json({message:'Wrong credentials'})
        }
        //Check password match
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched){
            return res.json({message:'Wrong credentials pass'});
        }
        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.cookie({"token":token}).json({success:true,message:'LoggedIn Successfully'})
    } catch (error) {
        return res.json({ error: error });
    }

})

router.get('/profile',verify,async (req,res,next)=>{
	res.send({user:req.user})
})

// getUsers
router.get('/',verify,async(req,res,next)=>{
		const users = await userModel.find();
		res.send(users);
})
// update user
router.patch('/:id', async(req,res)=>{
	try{
		const updatedUser = await userModel.findByIdAndUpdate("req.params.id",req.body,{new:true});
		res.send(updatedUser);
	}catch (err){
		console.log(err)
		return next(err)
	}
})


module.exports = router;