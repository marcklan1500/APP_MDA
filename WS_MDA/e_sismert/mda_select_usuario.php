<?php
require_once('conexion/conecta.php');
$verifica=0;
$pass =$_GET["pass"];
$correo=$_GET["correo"];
/* crea un array con datos arbitrarios que seran enviados de vuelta a la aplicacion */
$resultados = array();

mysqli_select_db($conecta,$database_conecta);
$query_ciudadano = "SELECT * FROM t_usuarios where usu_email='".$correo."' AND usu_password= '".$pass."';";
$ciudadano = mysqli_query($conecta,$query_ciudadano) or die(mysqli_error($conecta));

$totalRows_ciudadano = mysqli_num_rows($ciudadano);
if($totalRows_ciudadano>0)
{
	$verifica=1;
}else{
	$verifica=2;
}
	$datosU= array();
	while ($row_user = mysqli_fetch_assoc($ciudadano)) {
	$datosU[]=array('usu_email'=> $row_user['usu_email'],
					    );				
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

