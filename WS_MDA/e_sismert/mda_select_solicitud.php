<?php
require_once('conexion/conecta.php');
$verifica=0;
$id=$_GET["id"];
/* crea un array con datos arbitrarios que seran enviados de vuelta a la aplicacion */
$resultados = array();

mysqli_select_db($conecta,$database_conecta);
$query_coor = "SELECT * FROM t_lugares_atencion;";
$coor = mysqli_query($conecta,$query_coor) or die(mysqli_error($conecta));

$totalRows_coor = mysqli_num_rows($coor);
if($totalRows_coor>0)
{
	$verifica=1;
}else{
	$verifica=2;
}
	$datosU= array();
	while ($row_user = mysqli_fetch_assoc($coor)) {
		$datosU[]=array($row_user['aten_nombre'], (float) $row_user['aten_coorx'], (float) $row_user['aten_coory']);			
	}

if(  $verifica == 1 ){
	  /*esta informacion se envia solo si la validacion es correcta */
	  $resultados["mensaje"] = "Validacion Correcta";
	  $resultados["validacion"] = "ok";
	  $resultados["datosU"]=$datosU;
  
  }else{
	  /*esta informacion se envia si la validacion falla */
	  $resultados["mensaje"] = "Error de enlace";
	  $resultados["validacion"] = "error";
  }

$resultadosJson = json_encode($resultados);

echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';


			header('Content-type: application/json');
			
			//Se abre el acceso a las conexiones que requieran de esta aplicacion
			header("Access-Control-Allow-Origin: *");


?>

