var result = [];
var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function() {
	if(ajax.readyState == 4) {
		result = ajax.responseText.split("<br>");
		for(var i=0;i<result.length-1;i++) {
			result[i] = JSON.parse(result[i]);
		}
		return result;
	}
}
ajax.open("get", "getInfoFromDatabase.php?featured=5",false);
ajax.send(null);

window.onload = start;

function start() {
	for(var i=0;i<result.length-1;i++) {
		var current = result[i];
		var div = document.createElement("div");
		div.className = "featuredDiv";
		
		var a = document.createElement("a");
		a.href = "generateMoviePage.php?id="+current.id;
		
		var img = document.createElement("img");
		img.src = current.src;
		img.className = "featuredImg";
		
		a.appendChild(img);
		div.appendChild(a);
		
		var a = document.createElement("a");
		a.href = "generateMoviePage.php?id="+current.id;
		
		a = document.createElement("a");
		a.href = "generateMoviePage.php?id="+current.id;
		a.innerHTML = current.name + " (" + current.year + ")";
		a.className = "featuredA";
		div.appendChild(a);
		
		document.getElementById("featured").appendChild(div);
	}
}
