$("header").load("public.html #header-1");//#header-1为public.html中头部信息的id
$("nav").load("public.html #nav-l");
$("footer").load("public.html #footer-1");

var gtimer = setInterval(play,1000);
		var ind= 0;
		function play(){
			ind++;
			if(ind>$("#banner").find("li").size()){
				ind=0;
			}
			$("#banner").find("li").eq(ind)
						.fadeIn(1000)
						.siblings()
						.fadeOut(1000)
		}
		
		//--------轮播country部分------
		timers = setInterval(Play,2000);
		
	function Play(){
		$("#lunb ul").animate({"margin-left":-292},1500,function(){
			$("#lunb ul").css("margin-left",0)
						 .find("li:first")
						 .appendTo($("#lunb ul"));
						 flagb = true;
		})
	}
		
		$("#lunb").mousemove(function(){
			clearInterval(timers);
			$("#lunb span").show();
		})
		$("#lunb").mouseout(function(){
			 timers = setInterval(Play,2000);
			$("#lunb span").hide();
		})
		var flagb= true;
		
		$("#lunb .le").click(function(){
			if(flagb){
				Play();
				flagb = false;
				
			}
		})
		
		$("#lunb .ri").click(function(){
			if(flagb){
			$("#lunb ul").find("li:last")
						 .prependTo("#lunb ul")
						 .end()
						 .css("margin-left",-292)
						 .animate( {"marginLeft":0},1500,function(){
						  	flagb = true;
						 } );
		}
			
			flagb = false;
		})
	//-----------轮播select部分-------------	
			timert = setInterval(Alay,3000);
		
	function Alay(){
		$("#lunbo ul").animate({"margin-left":-292},1500,function(){
			$("#lunbo ul").css("margin-left",0)
						 .find("li:first")
						 .appendTo($("#lunbo ul"));
						 flaga = true;
		})
	}
		
		$("#lunbo").mousemove(function(){
			clearInterval(timers);
			$("#lunbo span").show();
		})
		$("#lunbo").mouseout(function(){
			 timers = setInterval(Play,2000);
			$("#lunbo span").hide();
		})
		var flaga= true;
		
		$("#lunbo .lef").click(function(){
			if(flaga){
				Alay();
				flaga = false;
				
			}
		})
		
		$("#lunbo .rig").click(function(){
			if(flaga){
			$("#lunbo ul").find("li:last")
						 .prependTo("#lunbo ul")
						 .end()
						 .css("margin-left",-292)
						 .animate( {"marginLeft":0},1500,function(){
						  	flaga = true;
						 } );
		}
			
			flaga = false;
		})
	
//-----------------------cox部分
	var flagc = true;
		
		if(flagc){
			$("#cox ul").find("li").mouseenter(function(){
				$(this).find(".cox-t-t")
					   .slideDown(500)
					   .find(".cox-t-t1")
					   .stop()
					   .animate({"bottom":0},1000)
					   .end()
					   .find(".cox-t-t2")
					   .stop()
					   .animate({"bottom":0},1300,function(){
					   	flagc = true;
					   })
			})
			flagc = false;
		}
		
		$("#cox ul").find("li").mouseleave(function(){
			$(this).find(".cox-t-t")
				   .slideUp(500)
				   .find(".cox-t-t1")
				   .css("bottom",-56)
				   .end()
				   .find(".cox-t-t2")
				   .css("bottom",-56)
		})
		
		
	//-------分页
	var index = 1;//页码
	var pageNum = 16;//每页数据量
	//显示所有图片信息
	showData();
	function showData(){
		ajaxGet("json/gobal-data.json",fn);
		function fn(msg){
			
			var arr = JSON.parse( msg );
			
			var str = "";
			for( var i = (index-1)*pageNum ; i < index*pageNum ; i++ ){
		
				if( i < arr.length ){ //解决最后一页bug  数据量不够问题
			
					str += `<li>
						<a href="http://127.0.0.1/sdcstep2/detail-page.html?pid=${arr[i].id}&pimg=${arr[i].src}&pname=${encodeURIComponent(arr[i].name)}&pyj=${encodeURIComponent(arr[i].yj)}&pxj=${encodeURIComponent(arr[i].xj)}"><img src="images/${arr[i].src}"/></a>
						<div class="xm">${arr[i].name}</div>
						<div class="jg"><u>${arr[i].xj}</u><i>${arr[i].yj}</i></div>
						<div class="gm">
							<div class="gm-l clear">
								<input type="text" id="text" value="1"/>
								<p>
									<a href="javascript:void(0)" id="bn1" style="margin-bottom:1px">+</a>
									<a href="javascript:void(0)" id="bn2" >-</a>
								</p>
							</div>
							<span style="display:none" data-id=${arr[i].id} data-img=${arr[i].src} data-xj=${arr[i].xj} data-yj=${arr[i].yj} data-name=${arr[i].name} ></span>
							<div class="gm-c">加入购物车</div>
							<div class="gm-r">收藏</div>
						</div>
					</li>`;
				}
			}
			$("#mainu")[0].innerHTML = str;
			
			//获取总页数
			pageTotal = Math.ceil(arr.length / pageNum);
			//重新生成页码
			var page = "";
			for( var j = 1 ; j <= pageTotal ; j++ ){
				page += `<li>${j}</li>`;
			}
			$("#u")[0].innerHTML = page;
			$("#u")[0].children[index-1].className = "active";
	
		}
	}
	
	
	//操作页码     
	$("#u")[0].onclick = function(e){
		var e = e || event;
		var target = e.target || e.srcElement;
		if( target.nodeName == "LI" ){
			index = parseInt( target.innerHTML );
			showData();
		}
	}
	
	//下一页
	$("#right")[0].onclick = function(){
		if( index == pageTotal ){
			index = pageTotal;
			alert("已经是最后一页了");
		}else{
			index++;
		}
		showData();
	}
	
	//上一页
	$("#left")[0].onclick = function(){
		if( index == 1 ){
			index = 1;
		}else{
			index--;
		}
		showData();
	}
	//-----购物车----	
	$("#mainu").on("click",".gm-c",function(){
		var arr=[];
		var flag = true;
		var val = $(this).prevAll(".gm-l").find("#text").val();
		
		_json={
			id:$(this).prev().data("id"),
			src:$(this).prev().data("img"),
			name:$(this).prev().data("name"),
			xj:$(this).prev().data("xj").replace(/[^0-9]/ig,""),
			yj:$(this).prev().data("yj"),
			count:parseInt(val)
		}
		//console.log(_json)
		//当再次点击按钮时，cookie信息被覆盖  解决 ： 先取出cookie数据 存入到数组中，然后在把新增的商品存入到数组中
		var cookieInfo = getCookie("shoplist");
		if( cookieInfo.length != 0 ){//表示cookie中有数据
			arr = cookieInfo;
			//点击相同商品时，需要做商品数量的累加    用当前点击的商品编号id   和  取出来的cookie的 数据中商品id做比较 发现有相等的，count++
			for(var i in arr){
				if(_json.id == arr[i].id && _json.name == arr[i].name){
					arr[i].count+=_json.count;
					flag = false;
					break;
				}
			}
		}
		
		if(flag){
			arr.push(_json);
		}
		
		setCookie("shoplist",JSON.stringify(arr));
		var f = confirm("是否继续购买?确定--继续购买，取消---去购物车结算");
		if( !f ){
			location.href ="http://127.0.0.1/sdcstep2/shopcar.html";
		}
		/*console.log( document.cookie );*/
		var arr = getCookie("shoplist");
		var summ = 0;
		for(var obj of arr){
			summ += obj.count;
		}
		console.log(summ)
		alert(summ)
		$("#shopcar").html(summ)
		
	})
	
	var arr = getCookie("shoplist");
		var summ = 0;
		for(var obj of arr){
			summ += obj.count;
		}
		console.log( document.cookie )
		console.log(summ);
		
		$("#shopcar").html(summ);
		
		
		
		
		
		
		
//----------------------购物车---------------

