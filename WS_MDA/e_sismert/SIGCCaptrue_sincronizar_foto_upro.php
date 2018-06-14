<?php

$target_dir = "../UNIDADES_PRODUCTIVAS/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
move_uploaded_file($_FILES["file"]["tmp_name"], "./" .$target_dir.$_FILES["file"]["name"]);
echo "http://" . $_SERVER['SERVER_NAME'] . "/" . $target_file;

?>