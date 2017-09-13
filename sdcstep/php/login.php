<?php
	header("Access-Control-Allow-Origin:*");//后台实现跨域；
	/*header("content-type:text/html;charset=utf-8");//防止乱码*/
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("db1705",$db);
	mysql_query("set names utf8");
	$sql = "select * from users where uname='$uname'";
	$res = mysql_query($sql);
	$arr = mysql_fetch_array($res);	
	if($arr){
		if($upwd==$arr["upwd"]){
			echo  "1" ;    //密码正确
		}else{
			echo  "0" ; //密码不正确
		}
	}
?>