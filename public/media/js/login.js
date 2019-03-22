var Login = function () {
    
    return {
        //main function to initiate the module
        init: function () {
        	
           $('.login-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true,
	             
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "请输入用户名",

	                },
	                password: {
	                    required: "请输入密码"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                
	            }
	        });

	        /*$('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                    
	                }
	                return false;
	            }
	        });*/

	        $('.forget-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "请输入邮箱地址",
	                    email:"邮箱地址错误"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                
	            }
	        });

	        // $('.forget-form input').keypress(function (e) {
	        //     if (e.which == 13) {
	        //         if ($('.forget-form').validate().form()) {
	        //             
	        //         }
	        //         return false;
	        //     }
	        // });





	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	        $('.register-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	            	 username: {
	                    required: "请输入用户名"
	                },
	                password: {
	                    required: "请输入密码"
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },
	                email: {
	                    required: "请输入邮箱地址",
	                    email: "邮箱地址错误"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.addClass('help-small no-left-padding').insertAfter($('#register_tnc_error'));
	                } else {
	                    error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	                }
	            },

	            submitHandler: function (form) {
	                
	            }
	        });



 			jQuery('#register-submit-btn').click(function () {

	               if ($('.register-form').validate().form()) {
			           $.ajax({
			               type: "POST",
			               url: "/register",
			               data: {"email": $(".register-email").val(),"username":$(".register-username").val(),"password":$(".register-password").val()},
			               success:function(data){
			               	    if(data.code === 1){
                                    alert(data.msg)
                                    jQuery('.login-form').show();
	                                jQuery('.register-form').hide();
                                    return
			               	    }
			               	   alert(data.msg)
			               }

			            })
			       }
			       return false;
	        });


	        jQuery('#login-submit-btn').click(function () {

	               if ($('.login-form').validate().form()) {
			           $.ajax({
			               type: "POST",
			               url: "/login",
			               data: {"username": $(".login-username").val(),"password":$(".login-password").val()},
			               success:function(data){
			               	    if(data.code === 1){
                              
                                    location.href="index"
                                    return
			               	    }
			               	   alert(data.msg)
			               }

			            })
			       }
			       return false;
	        });






	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
        }


        

    };

}();