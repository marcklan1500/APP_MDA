<?php
//$hostname_conecta="138.201.251.153";
//$database_conecta="geotacticscom_jaapp";
//$username_conecta="geotacticscom_jaapp";
//$password_conecta="Ecuador2017";

$hostname_conecta="localhost";
$database_conecta="mda_db";
$username_conecta="root";
$password_conecta="";
$conecta=mysqli_connect($hostname_conecta,$username_conecta,$password_conecta);
mysqli_set_charset($conecta,"utf8");
?>