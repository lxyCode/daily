var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/diary', {useNewUrlParser: true});
var Schema = mongoose.Schema

var userSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	create_time:{
		type:Date,
		default:Date.now
	},
	avatar:{
        type:String,
        default:""
	},
	bio:{
		type:String,
		default:""
	},
	gender:{
		type:Number,
		enum:[1,0],
		default:1
	},
	birthday:{
		type:Date
	}
})

module.exports = mongoose.model("User",userSchema)