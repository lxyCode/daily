var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/diary', {useNewUrlParser: true});
var Schema = mongoose.Schema

var userDaily = new Schema({
	userid:{
		type:String,
		required:true
	},
	dailytime:{
		type:String,
		required:true
	},
	already:{
		type:String,
		required:true,

	},
	gtasks:{
		type:String,
		default:""
	},
	createtime:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Daily",userDaily)