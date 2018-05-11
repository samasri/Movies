window.onload = start;
function start() {
	var ul = document.createElement("ul");
	for(var i=0;i<26;i++) {
		var c = String.fromCharCode (97+i);
		var li = document.createElement("li");
		li.className = "button";
		li.innerHTML = c;
		li.id = c;
		li.onclick = openAjax;
		li.style.display = "inline";
		ul.appendChild(li);
	}
	document.getElementById("searchByLetter").appendChild(ul);
}

function openAjax(c) {
	clear();
	var c = this.id;
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			result = ajax.responseText;
			result = result.split("<br>");
			for(var i = 0; i < result.length-1; i++) {
				result[i] = JSON.parse(result[i]);
			}
			
		}
	}
	ajax.open("get", "getInfoFromDatabase.php?searchByLetter="+c,false);
	ajax.send(null);
	var ul = document.createElement("ul");
	ul.id="last";
	if(typeof(result[1]) == "undefined" && 
					typeof(result[0].name) == "undefined"){
		var p = document.createElement("p");
		p.id="last";
		p.innerHTML = "No movies found";
		document.getElementById("searchByLetter").appendChild(p);
		return;
	}
	for(var i = 0; i < result.length-1; i++) {
		var current = result[i];
		
		var a = document.createElement("a");
		a.href = "generateMoviePage.php?id="+current.id;
		var img = document.createElement("img");
		img.src = current.src;
		img.className = "imgFound";
		a.appendChild(img);
		var li = document.createElement("li");
		li.className = "letterFound";
		li.appendChild(a);
		
		a = document.createElement("a");
		a.href = "generateMoviePage.php?id="+current.id;
		a.className = "aFound";
		a.innerHTML = current.name;
		li.appendChild(a);
		ul.appendChild(li);
	}
	document.getElementById("searchByLetter").appendChild(ul);
}
function clear() {
	var element = document.getElementById("last")
	if(element) {
		element.parentNode.removeChild(element);
	}
}