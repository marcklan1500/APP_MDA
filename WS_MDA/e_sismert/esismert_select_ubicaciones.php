
<?php
require_once('conexion/conecta.php');
$verifica=0;
$cedula=$_GET["cedula"];
$fecha=$_GET["fecha"];
/* crea un array con datos arbitrarios que seran enviados de vuelta a la aplicacion */
$resultados = array();

mysqli_select_db($conecta,$database_conecta);
$query_coor = "SELECT * FROM tbl_ubicaciones where cedula like '".$cedula."' and fecha between '".$fecha." 00:00:01' and '".$fecha." 23:59:59';";
$coor = mysqli_query($conecta,$query_coor) or die(mysqli_error($conecta));

$totalRows_coor = mysqli_num_rows($coor);
if($totalRows_coor>0)
{
	$verifica=1;
}else{
	$verifica=2;
}
	//$datosU= array();
	$resultadoArray = array();
	while ($row_user = mysqli_fetch_assoc($coor)) {
		//$datosU[]=array((float) $row_user['coordenadax'], (float) $row_user['coordenaday']);				
		$resultadoArray[] = array('lat' => (float) $row_user['coordenadax'], 'lng' => (float) $row_user['coordenaday']);
	}

if(  $verifica == 1 ){
	  /*esta informacion se envia solo si la validacion es correcta */
	  $resultados["mensaje"] = "Validacion Correcta";
	  $resultados["validacion"] = "ok";
	  $resultados["datosU"]=$resultadoArray;
  
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