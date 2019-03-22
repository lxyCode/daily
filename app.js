var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")
var router = require("./router")
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = express()



//配置bodyParse
app.use(bodyParser.urlencoded({ extended: false }))


//开放public资源
app.use("/public/",express.static(path.join(__dirname,'./public/')))


//配置art-template
app.engine('html', require('express-art-template'))
app.set("views",path.join(__dirname,'./views/'))

//配置session
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
   cookie:{
            maxAge: 2000*60*60 // default session expiration is set to 1 hour
   }
 
}))

app.use(router)



app.listen(3000,function(){
	console.log("running in 3000")
})