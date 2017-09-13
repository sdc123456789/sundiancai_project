$(function(){
		var arr = getCookie("shoplist");
		var html = "";
		
		for(var i in arr){
			var shopinfo = arr[i];
			var cj = shopinfo.count*shopinfo.xj;
			html +=`<div class="shop-item clearfix">
					<p class="fl"><input type="checkbox" class="ck"/></p>
					<img class="fl" src="images/${shopinfo.src}" alt="" />
					<p class="fl">${shopinfo.name}</p>
					<span class="fl">${shopinfo.xj}元</span>
					<p class="fl count" 
						data-id="${shopinfo.id}" 
						data-price="${shopinfo.xj}" data-count="${shopinfo.count}"
						data-name="${shopinfo.name}" data-src="${shopinfo.src}"
						>
						<span class="updateCount" data-number="1">-</span>
						<span class="shop-count">${shopinfo.count}</span>
						<span class="updateCount" data-number="-1">+</span>
					</p>
					<em class="fl sumPrice">${cj}元</em>
					<i class="fl delBtn">删除</i>
				</div>`;
			
		}
		$(".shoplist").html( html );
		
		//全选
		$("#selectAll").click(function(){
			$(".ck").prop("checked", $(this).prop("checked"));
			jiesuan();
		})
		console.log(arr)
		//删除
		$(".shoplist").on("click","i",function(){
			var id = $(this).parent().find(".count").data("id");  //获取当前要删除的商品编号 和名称
			var pname = $(this).parent().find(".count").data("name");  //获取当前要删除的商品编号 和名称
			
			for(var i in arr){
				if( id == arr[i].id && pname == arr[i].name ){
					arr.splice(i,1);
					//操作数组同时，也要改变cookie
					setCookie("shoplist",JSON.stringify(arr));
					$(this).parent().remove();
				}
			}
			
		})
		
		//加减操作
		$(".updateCount").click(function(){
			var sign = $(this).html();
			var id = $(this).parent().data("id");  //获取当前要加减的商品编号 和名称
			var pname = $(this).parent().data("name");  //获取当前要加减的商品编号 和名称
			//取出数量
			var num = $(this).parent().find(".shop-count").html();
			if( sign == "-" && num == 1 ){
				return;
			}
			for( var i in arr ){
				if( id == arr[i].id && pname == arr[i].name ){
					sign=="+" ? arr[i].count++ : arr[i].count--;
					setCookie("shoplist",JSON.stringify(arr));
					$(this).parent().find(".shop-count").html( arr[i].count );
					$(this).parent().parent().find(".sumPrice").html( (arr[i].count * arr[i].xj)+"元"  );
				}
			}
		})
		
		
		//点击复选框 结算
		$(".ck").click(function(){
			jiesuan();
		})
	})
	
	//结算
	function jiesuan(){
		var money = 0;
		var count = 0;
		$(".ck:checked").each(function(){
			count += parseInt( $(this).parent().parent().find(".shop-count").html() )
			money += parseInt( $(this).parent().parent().find(".sumPrice").html() )
		})
		$(".count2").html( count );
		$(".money2").html( money );
	}
	