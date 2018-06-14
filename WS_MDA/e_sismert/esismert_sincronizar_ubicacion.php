<?php
ob_start();
require_once('Conexion/conecta.php');

$coorx=$_GET['coorx'];
$coory=$_GET['coory'];
$dni=$_GET['dni'];
$resultados=array();
//$Datos2=$JSON["rows"]["_array"][2]["CIUD_CEDULA"];

$verifica = 0;

mysqli_select_db($conecta,$database_conecta);

$query=" UPDATE `tbl_ciudadano` SET `coordenadax` = '".$coorx."', `coordenaday` = '".$coory."' WHERE `cedula` = '".$dni."' ";

if(mysqli_query($conecta,$query)){
		$verifica=1;
	 }

if(  $verifica == 1 ){
	$resultados["validar"] = "ok";
  }else{
  	$resultados["validar"] = "error";
  }

$resultadosJson = json_encode($resultados);


echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';


			header('Content-type: text/html; charset=utf-8; application/json');
			
			//Se abre el acceso a las conexiones que requieran de esta aplicacion
			header("Access-Control-Allow-Origin: *");


ob_end_flush();
?>

