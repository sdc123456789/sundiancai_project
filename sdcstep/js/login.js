//注册登录切换
$("#btn-login").click(function(){
			$("#login").animate({
				"left":100,
				"opacity":0
			},1000,function(){
				$("#login").css("left",-430)
			})
			$("#register").animate({
				"left":0,
				"opacity":1
			},1000);
			$("#bannr").find("i").html("注册");
		})
		
		$("#btn-register").click(function(){
			$("#register").animate({
				"left":100,
				"opacity":0
			},1000,function(){
				$("#register").css("left",-430)
			})
			$("#login").animate({
				"left":0,
				"opacity":1
			},1000);
			$("#bannr").find("i").html("登录");
		})
		



//--------拖拽验证
$("#login .silding").find(".s-block")[0].onmousedown = function(e){
		var e = e || event;
		    posx = e.offsetX;
//			console.log(posx);
			document.onmousemove =function(e){
				var e = e||event;
				x = e.pageX-$("#show")[0].offsetLeft-$("#login .silding")[0].offsetLeft-posx;
				maxL = $("#login .silding")[0].offsetWidth -$("#login .silding").find(".s-block")[0].offsetWidth-3
				if(x<0){
					x = 3;
				}else if(x>maxL){
					x = maxL;
				};
				$("#login .silding").find(".s-block")[0].style.left=x+"px"
				
			}
		
		
	document.onmouseup = function(){
				if(x<maxL){
					$("#login .silding").find(".s-block")
										.animate({left:3},1000)
				}
				else if(x=maxL){
					$("#login .silding").find(".s-block").html("√")
														 .css("color","#A6E69A")
														 .end()
														 .html("验证通过")
														 .css("background","#A6E69A")
				}
				document.onmousemove = null;
			}


	}
	

//----------------登陆跳转
$("#login .login-put").find(".put-t").blur(function(){
			var reg = /^[1-9]\d{10}$/
			var val = $("#login .login-put").find(".put-t").val()
			if(!reg.test(val)){
				$("#login .login-put").find(".ts").html("手机号码格式不正确")
												
			}
		})
		
		$("#login .login-put").find(".put-b").blur(function(){
			var reg = /^\w{6-11}$/
			var val = $("#login .login-put").find(".put-b").val()
			if(!reg.test(val)){
				$("#login .login-put").find(".ts").html("密码格式不正确")
												  
			}
		})
		//-------------登录-
		function ID(id){
				return document.getElementById(id);
			}
			
		ID("btn").onclick = function(){
		var ajax = null;
		if(window.XMLHttpRequest){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveXObject("Microsoft.XMLHTTP")
		}
		
		ajax.open("POST","http://127.0.0.1/sdcstep2/php/login.php",true);
		
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		var data = "uname="+ID("uname").value+"&upwd="+ID("upwd").value;
		ajax.send(data);
		ajax.onreadystatechange = function(){
			if(ajax.status==200&&ajax.readyState==4){
				switch(ajax.responseText){
					case "1":alert("登录成功");
					location.href="http://127.0.0.1/sdcstep2/index.html";
					break;
					case "0":alert("登录失败");
					break;
				}
				                                                                                                                                                                                                                                                                                                                
				
			}
		}
		
	}	
	//------注册------
		ID("yzm-btn").onclick = function(){
			
			
			ID("yzm-btn").innerHTML = Math.random().toString(10).substring(2,6);
		}
			
		ID("btnr").onclick = function(){
		var ajax = null;
		if(window.XMLHttpRequest){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveXObject("Microsoft.XMLHTTP")
		}
		
		ajax.open("POST","http://127.0.0.1/sdcstep2/php/register.php",true);
		
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		var data = "uname="+ID("unamer").value+"&upwd="+ID("upwdr").value;
		ajax.send(data);
		ajax.onreadystatechange = function(){
			if(ajax.status==200&&ajax.readyState==4){
				switch(ajax.responseText){
					case "1":alert("注册成功");
					location.href="login.html";
					break;
					case "0":alert("注册失败");
					break;
					case "2":alert("用户名已存在");
				}
				                                                                                                                                                                                                                                                                                                                
				
			}
		}
		
	}	
		




