$("header").load("public.html #header-1");//#header-1为public.html中头部信息的id
$("nav").load("public.html #nav-l");
$("footer").load("public.html #footer-1");
//----------banner部分轮播图-----------------------------
timer = setInterval(autoPlay,2000);
		var index=0;
		function autoPlay(){
			index++;
			if(index==$("#banner ul").find("li").size()){
				index=0;
			}
			$("#banner ol").find("li").eq(index)
			               .addClass("active")
			               .siblings()
			               .removeClass("active");
			
			$("#banner ul").find("li").eq(index)
						   .fadeIn(800)
						   .siblings()
						   .fadeOut(800);
		};
		$("#banner ol li").mouseover(function(){
			clearInterval( timer );
			index = $(this).index() - 1;
			autoPlay();
		})
		$("#banner ol li").mouseout(function(){
			
			timer = setInterval(autoPlay,2000);
		})
			
		$("#banner").mouseenter(function(){
			clearInterval( timer );
			$("#banner div").show();
			
		})
		$("#banner").mouseleave(function(){
			$("#banner div").hide();
			timer = setInterval(autoPlay,2000);
		})
		
		$("#banner .l").click(function(){
			
			index--;
			if(index==$("#banner ul").find("li").size()){
				index=0;
			}
			console.log(index)
			$("#banner ol").find("li").eq(index)
			               .addClass("active")
			               .siblings()
			               .removeClass("active");
			
			$("#banner ul").find("li").eq(index)
						   .fadeIn(800)
						   .siblings()
						   .fadeOut(800);
		
		})
		$("#banner .r").click(function(){
			
			autoPlay();
		})
//---------------------最新特卖部分sale-----------------------------------------
//----------list部分
//--倒计时与模板引擎ajax数据请求
var data = {
			arr:[]
		}
ajaxGet("json/index-data.json",function(str){
var arr = JSON.parse(str);
data.arr = arr;
var html = template("lists",data);
document.getElementById("main").innerHTML = html;


//------------倒计时	
function diff(start,end){
    return Math.abs( end.getTime() - start.getTime() )/1000;
}


var end = new Date("2017-10-1 16:45:00");
var start = new Date();
var t = diff(start,end);


showTime();
function showTime(){
	/*var d = parseInt((t/3600)/24)*/
	var h = parseInt( t /3600 );
	var m = parseInt( (t - h*3600)/60 );
	var s = parseInt( t-h*3600-m*60 );
	
	var oSj = document.getElementById("main").children;
	
	for(var i=0;i<oSj.length;i++){
		$("#main").find(".djs")[i].innerHTML=`${parseInt(h)}时${parseInt(m)}分${parseInt(s)}秒结束`;
	}
}
	var timer1 = setInterval(function(){
	t--;
	if( t < 0 ){
		$("#main").find(".djs")[0].innerHTML = "商品下架了";
		clearInterval(timer1);
	}else{
		showTime();
	}
	},1000);
})















//-----------------点击切换
	$("#notice .z").click(function(){
		$("#notice .z").css("background","#FED8E5");
		$("#notice .y").css("background","");
		$("#wrap ul:first").show();
		$("#wrap ul:last").hide();
	})
	$("#notice .y").click(function(){
		$("#notice .y").css("background","#FED8E5");
		$("#notice .z").css("background","");
		$("#wrap ul:first").hide();
		$("#wrap ul:last").show();
	})

	var flag = true;
	var flagx = true; 
		$("#notice .s").click(function(){
		if(flag){
			$("#wrap ul").animate({"top":-538},1000);
			flag = false;
		}else{
			flag = true;
			$("#notice .x").click();
		}
	})
	
	
	$("#notice .x").click(function(){
		if(flagx){
			$("#wrap ul").animate({"top":0},1000);
			flagx = false;
		}else{
			flagx = true;
			$("#notice .s").click()
		}
		
	
	})




