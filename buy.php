<?php
	include "getInfoFromDatabase.php";
	$movie = getInfo($_GET["movie"]);
?>
<!doctype html>
<html>
	<head>
		<title>Movie Crawler</title>
		<meta charset="UTF-8">
		<link href="style.css" type="text/css" rel="stylesheet">
	</head>
	<body>
		<div id="content">
			
			<div id="header">
				<img src="logo.gif">
				<h2>Live your life, watch in ours</h2>
			</div>
			<div id="navigation">
				<ul>
					<li><a href="index.html">Homepage</a></li>
					<li><a href="topCharts.html">Top Charts</a></li>
					<li><a href="browse.html">Browse</a></li>
					<li><a href="search.html">Search</a></li>
					<li><a href="about.html">About</a></li>
				</ul>	
			</div>
			<img id="movieImg" src="<?php echo $movie["src"] ?>">
			<p id="movieP"><?php echo $movie["name"]." (".$movie["year"].")" ?><hr></p>
			<form id="buyForm" method="get" action="">
				<label>
					Please provide us your name & mobile number and we will call you back in the next 12 hours:<br><br>Name:
					<input name = "name"></input><br>
					Mobile Number: <input name="number" id="phoneNumber"></input>
					<input name = "movie" class="hidden" value=<?php if(isset($_GET["movie"])) echo $_GET["movie"]; ?>></input><br>
					<input type="submit" value = "Submit"></input>
				</label>
				<?php if(isset($_GET["number"]) && isset($_GET["name"])) {
						 file_put_contents("client.csv",$_GET["number"].",".$_GET["name"].",".$movie["name"]."\n",FILE_APPEND);
						 echo "<label>Thank you for buying from Movies Crawler! <br> You will be redirecte to the homepage in 2 seconds.</label>";
						  header( 'refresh:3; url=index.html' ) ;
					  }
				?>
			</form>
			
		</div>
	</body>
</html>