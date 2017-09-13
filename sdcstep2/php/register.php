<?php
	header("Access-Control-Allow-Origin:*");//后台实现跨域；
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	/*echo $uname;*/
	//添加
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("db1705",$db);
	mysql_query("set names utf8");
	$sql="insert into users(uname,upwd)values('$uname','$upwd')";
	
	
	//查询
	$sql2 = "select * from users where uname='$uname'";
	$res2 = mysql_query($sql2);
	$arr = mysql_fetch_array($res2);
	//print_r($arr);
	if($arr){
		echo "2";//用户名已存在
	}else{
		$res = mysql_query($sql);
		if($res){
			echo "1";//注册成功
		}else{
			echo "0";//注册失败
		}	
	}
	
	
	
	
	
	
	
?>