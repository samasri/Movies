window.onload = start;
var count=0;//Used to make a pattern
function start()	{
	
	var array = getArray("");
	setHandlers();
	createTable(array);
}
function setHandlers() {
	document.getElementById("action").onclick = function() {
		clear();
		document.getElementById("h1").innerHTML = "Top 10 action movies:";
		array = getArray("action");
		createTable(array);
	};
	document.getElementById("comedy").onclick = function() {
		clear();
		document.getElementById("h1").innerHTML = "Top 10 comedy movies:";
		array = getArray("comedy");
		createTable(array);
	};
	document.getElementById("drama").onclick = function() {
		clear();
		document.getElementById("h1").innerHTML = "Top 10 drama movies:";
		array = getArray("drama");
		createTable(array);
	};
	document.getElementById("horror").onclick = function() {
		clear();
		document.getElementById("h1").innerHTML = "Top 10 horror movies:";
		array = getArray("horror");
		createTable(array);
	};
	document.getElementById("romance").onclick = function() {
		clear();
		document.getElementById("h1").innerHTML = "Top 10 romance movies:";
		array = getArray("romance");
		createTable(array);
	};
}
function createTable(array) {
	//window.location.reload();
	for(var i=0;i<array.length;i++) {
		var current = array[i];
		var div = document.createElement("div");
		div.className="movie";
		//switch color for every division
		if(count==0) {
			count=1;
			div.style.backgroundColor = "#687F9D";
		}
		else if(count==1)	{
			count=0;
			div.style.backgroundColor = "#99DAFC";
		}
		var anchor = document.createElement("a");
		anchor.href = "generateMoviePage.php?id="+current.id;
		var img = document.createElement("img");
		img.setAttribute("src", current.src);
		img.setAttribute("alt",current.name);
		anchor.appendChild(img);
		div.appendChild(anchor);
		
		div.appendChild(document.createTextNode(i+1+". "));
		
		var name = array[i][1];
		var a = document.createElement("a");
		a.setAttribute("href","generateMoviePage.php?id="+current.id);
		a.innerHTML = current.name;
		div.appendChild(a);
		
		var year = document.createTextNode(" ("+current.year+")");
		div.appendChild(year);
		
		var par = document.createElement("p");
		var rating = current.rating;
		par.innerHTML = current.star+"<br>Rating: "+rating;
		div.appendChild(par);
		document.getElementById("top").appendChild(div);
	}
}
function clear() {
	var top = document.getElementById("top");
	top.innerHTML = "";
	var h = document.createElement("h2");
	h.id="h1";
	h.innerHTML = "Top 25 movies of all time: ";
	top.appendChild(h);
}