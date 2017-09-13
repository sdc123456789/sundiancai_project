$("header").load("public.html #header-1");//#header-1为public.html中头部信息的id
$("nav").load("public.html #nav-l");
$("footer").load("public.html #footer-1");


//-----ajax加载数据--------------------------
		var str = location.href;
		
		did=str.split("?")[1].split("&")[0].split("=")[1];
		dimg=str.split("?")[1].split("&")[1].split("=")[1];
		dname=decodeURIComponent(str.split("?")[1].split("&")[2].split("=")[1]);
		dxj=decodeURIComponent(str.split("?")[1].split("&")[3].split("=")[1]);
		dyj=decodeURIComponent(str.split("?")[1].split("&")[4].split("=")[1]);
	
		$.ajax({
			type:"get",
			url:"http://127.0.0.1/sdcstep2/json/gobal-data.json",
			success:function(res){
				var str="";
				for(var i in res){
					if(did==res[i].id){
						str=`<div id="lookbig">
					<div id="lookbox">
						<img src="images/${res[i].src}" /> 
						<p id="mask"></p>
					</div>
					<div id="small">
						<ul><li><img src="images/${res[i].src}"/></li></ul>
						<span class="sl"><</span>
						<span class="sr">></span>
					</div>
					<div id="big">
						<img src="images/${res[i].src}" />
					</div>
				</div>	
				<div id="magdetail">
					<p class="detail-t">
						<img src="images/small-log.jpg" />
						<span>荷兰直供  杭州保税二区发货</span>
					</p>
					<p class="detail-ta">Nutrilon牛栏 荷兰奶粉4段1-3岁800g</p>
					<div class="detail-tb">
						<p class="detail-xj">速普价： &ensp;&ensp;<i>${res[i].xj}</i></p>
						<p class="detail-yj">市场价： &ensp;&ensp;<i>${res[i].yj}</i>(已为您节省：23元)</p>
					</div>
					<div class="detail-sf">税费      &ensp;&ensp;本商品适用税费11.9%</div>
					<div class="detail-area">运费       &ensp;&ensp;<select><option>上海</option></option></select>
						免运费    预计正常3-5个工作日送达
					</div>
					<div class="detail-count">
						<span>-</span><input type="text" value="2"/><span>+</span>
						2 件起售 &ensp;&ensp;赠送 <i>23 </i>积分
					</div>
					<div class="addcar">
						<span class="addcar-l">加入购物车</span>
						<span class="addcar-r">客户端下单</span>
					</div>
			</div>	`
					}
				}
				$("#look").html(str)
			
			//----------放大镜
			$("#lookbox").on({
			"mouseenter":function(){
				$("#big").show();
				$("#mask").show();
			},
			"mouseleave":function(){
				$("#big").hide();
				$("#mask").hide();
				
			},
			"mousemove":function(e){
				var e = e||event;
				x = e.pageX-$("#lookbig").offset().left-$("#mask").width()/2;
				y = e.pageY-$("#lookbig").offset().top-$("#mask").height()/2;
				maxL = $("#lookbig").width()-$("#mask").width();
				maxT = $("#lookbig").height()-$("#mask").height();
				x =Math.min( maxL , Math.max( 0 ,x ) ); 
				y =Math.min( maxT , Math.max( 0 ,y ) );
	 			$("#mask").css({"left":x,"top":y});
	 			//大图宽度/小图宽度 (box)= 大图left/ x
	 			
	 			bigL =x*$("#big").find("img").width()/$("#lookbox").width();
	 			bigT =y*$("#big").find("img").height()/$("#lookbox").height();
	 			
	 			
	 			$("#big").find("img").css({
	 				"left":-bigL,
	 				"top":-bigT
	 			})
			}
		})
		
			}
		});
		

//------table切换
		
		$("#rprod ul").find("li").click(function(){
			index=$(this).index();
			
			$(this).css({
				"background":"#fff",
				"color":"#E5004B"
			}).siblings().css({
				"background":"#EAEAEA",
				"color":"#000"
			});
			
			$("#rprod .q").eq(index)
					   .css("display","block")
					   .siblings(".q")
					   .css("display","none")
			
		})
			
		