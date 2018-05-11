<?php
	include "getInfoFromDatabase.php";
	$id = $_GET["id"];
	$movie = getInfo($id);
	extract($movie);
?>
<!doctype html>
<html>
	<head>
		<title><?php echo $name; ?></title>
	</head>
	<body>
	</body>
</html>