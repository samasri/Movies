<?php
	include "getInfoFromDatabase.php";
	$movie = getInfo($_GET["id"]);
	$movie["star"] = str_replace("-",", ", $movie["star"]);
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
			<div id="movie">
				<div id="img">
					<img src=<?php echo $movie["src"]; ?>>
				</div>
				<div id="mSpecs">
					<h2><?php echo $movie["name"]." (".$movie["year"].")" ?></h2>
					<ul>
						
						<li><b>Rating:</b> <meter id="meter" min="0" max="10" value="<?php echo $movie["rating"];?>">
							<?php echo $movie["rating"];?></meter>
							<?php echo $movie["rating"];?><br>
						</li>
						<li><b>Category:</b> <?php echo $movie["genre"]; ?></li>
						<li><b>Stars:</b> <?php echo $movie["star"];?></li>	
						<li><b>Plot:</b> <?php echo $movie["plot"];?></li>	
					</ul>
					<a id="buy" href="buy.php?movie=<?php echo $_GET["id"]; ?>">Buy DVD</a>
					
				</div>
				
			</div>
		</div>
	</body>
</html>
