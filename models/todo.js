const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
		title:{
			type:String,
			required:true,
			unique:true
		},
		status:{
			type:String,
			enum:['todo','in-progress','done'],
			default:'todo'
		},
		user:{
			type:Schema.Types.ObjectId,
			required:true,
			ref:'User'
		}
})

const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;