var express = require("express")
var User = require("./models/user")
var Daily = require("./models/dailylist")
var router = express.Router()
var md5 = require("md5-node")





router.get("/login",function(req,res){
     res.render("login.html")
})





router.get("/index",function(req,res){

    res.render("index.html")
})




//注册请求
router.post("/register",function(req,res){
 
     User.findOne({
     	$or:[
           {email:req.body.email},
           {username:req.body.username}
     	]
     	
     },function(err,data){
     	 if(err){
            return res.status(500).json({
            	code:500,
            	msg:"服务端错误"
            })
     	 }

         if(data){
             return res.status(200).json({
             	code:0,
             	msg:"用户名或邮箱已存在"
             })
         }      
         req.body.password = md5(md5(req.body.password))
         new User(req.body).save(function(err,user){
              if(err){
              	  console.log(err)
              	  return res.status(500).json({
              	  	 code:500,
              	  	 msg:"服务端错误"
              	  })
              }

              res.status(200).json({
		          code:1,
		          msg:"注册成功"
		      })
         })

     })


})


//登录请求

router.post("/login",function(req,res){
    User.findOne({
    	$or:[
           	  {email:req.body.username},
              {username:req.body.username}
    	],

    	password:md5(md5(req.body.password))

    },function(err,data){
          if(err){
          	  return res.status(500).json({
	            	code:500,
	            	msg:"服务端错误"
              })
          }

          if(!data){
          	   return res.status(200).json({
		          code:0,
		          msg:"用户名或密码错误"
		      })
          }
          
          req.session.user = data

          res.status(200).json({
		          code:1,
		          msg:"登录成功"
		  })

    })
})


router.get("/daily",function(req,res){
    res.render("daily.html")
})

router.get("/dailylist",function(req,res){
	Daily.find({userid:req.session.user._id},function(err,data){
            if(err){
                 return res.status(500).json({
                 	 code:500,
                 	 msg:"服务端错误"
                 })
            }
            if(!data){
                return res.status(200).json({
                	code:0,
                	msg:"暂无数据"
                })
            }


            res.render("dailylist.html",{
            	 dailylist:data
            })


	})
    
})

//提交日报

router.post("/daily",function(req,res){

	 req.body.userid = req.session.user._id
      console.log(req.body)
	 new Daily(req.body).save(function(err,user){
	 	  if(err){
	 	  	 console.log(err)
	 	  	  return res.status(500).json({
	 	  	  	 code:500,
	 	  	  	 msg:"服务端错误"
	 	  	  })
	 	  }

	 	  res.status(200).json({
	 	  	  code:1,
	 	  	  msg:"保存成功"
	 	  })
	 })
    
})




module.exports = router

