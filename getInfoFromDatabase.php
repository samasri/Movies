<?php
	function toJSON($movie) {
		$movie["star"] = trim($movie["star"]);
		return '{ "id": "'.$movie["id"].'", "name": "'.
		$movie["name"].'", "src": "'.$movie["src"].
		'", "plot": "'.$movie["plot"].'", "rating": "'.
		$movie["rating"].'", "year": "'.$movie["year"].
		'", "star": "'.$movie["star"].
		'", "genre": "'.$movie["genre"].'" }';
	}
	function getInfo($id)	{
		if($id==0) return;
		$file=file("Movie Database.csv");
		$line = $file[$id];
		$line = substr($line, strpos($line, ",")+1);
		$src = substr($line, 0, strpos($line, ","));
		$line = substr($line, strpos($line, ",")+1);
		$name = substr($line, 0, strpos($line, ","));
		$line = substr($line, strpos($line, ",")+1);
		$genre = substr($line, 0, strpos($line, ","));
		$line = substr($line, strpos($line, ",")+1);
		$plot = substr($line, 0, strpos($line, ","));
		$line = substr($line, strpos($line, ",")+1);
		$rating = substr($line, 0, strpos($line, ","));
		$line = substr($line, strpos($line, ",")+1);
		$year = substr($line, 0, strpos($line, ","));
		$line = substr($line, strpos($line, ",")+1);
		$star = $line;
		$array = [];
		$array["id"] = $id;
		$array["name"] = $name;
		$array["src"] = $src;
		$array["plot"] = $plot;
		$array["rating"] = $rating;
		$array["year"] = $year;
		$array["star"] = "Starring: ".$star;
		$array["genre"] = $genre;
		return $array;
	}
	if(isset($_GET["top"])) {
		$maxNumber = count(file("Movie Database.csv"));
		$array = [];
		
		for($i=1;$i<$maxNumber;$i++)	{
			$array[$i]=$i;
		}
		$number = $_GET["top"];
		for($i=0;$i<$number;$i++)	{
			$max=0;
			$maxNb=0;
			foreach($array as $nb)	{
				$movie = getInfo($nb);
				$movie["genre"] = strtolower($movie["genre"]);
				if(isset($_GET["genre"]) && $_GET["genre"]==$movie["genre"]){
					if($movie["rating"]>$max["rating"]) {
						$max=$movie;
						$maxNb = $nb;
					}
				}
				elseif(!isset($_GET["genre"])) {
					if($movie["rating"]>$max["rating"]) {
						$max=$movie;
						$maxNb = $nb;
					}
				}
			}
			$max["star"] = trim($max["star"]);
			echo toJSON($max).'<br>';
			unset($array[$maxNb]);
		}
	}
	if(isset($_GET["featured"])) {
		$year = date("Y");
		$latestMovies = [];
		for($i=0;$i<count(file("Movie Database.csv"));$i++) {
			$movie = getInfo($i);
			if($movie["year"] == 2014) array_push($latestMovies,$movie);
		}
		$indexPicked = [];
		for($i=0;$i<5;$i++) {
			$temp = rand(0, count($latestMovies)-1);
			while(in_array($temp,$indexPicked)) $temp = rand(0, count($latestMovies)-1);
			array_push($indexPicked, $temp);
			$movie = $latestMovies[$temp];
			$movie["star"] = trim($movie["star"]);
			echo toJSON($movie).'<br>';
		}
	}
	if(isset($_GET["searchByLetter"])) {
		$letter = strtoupper($_GET["searchByLetter"]);
		for($i=0;$i<count(file("Movie Database.csv"));$i++) {
			$movie = getInfo($i);
			if(strpos($movie["name"],$letter)===0) {
				echo toJSON($movie)."<br>";
			}
		}
	}
	if(isset($_GET["search"])) {
		$text = strtolower($_GET["search"]);
		for($i = 0; $i < count(file("Movie Database.csv")); $i++) {
			$movie = getInfo($i);
			if(strpos(strtolower($movie["name"]),$text) || 
			strpos(strtolower($movie["star"]),$text)) {
				echo toJSON($movie)."<br>";
			}
		}
	}
?>