window.onload = start;

function start() {
	var text = document.getElementById("text");
	text.onkeyup = search;
}

function search() {
	var result = [];
	var text = this.value;
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			clear();
			var result = ajax.responseText;
			result = result.split("<br>");
			for(var i = 0;i < result.length - 1; i++) {
				result[i] = JSON.parse(result[i]);
				var current = result[i];
				
				var div = document.createElement("div");
				div.className = "result";
				
				var a = document.createElement("a");
				a.href = "generateMoviePage.php?id="+current.id;
				var img = document.createElement("img");
				img.className = "resultImg";
				img.src = current.src;
				a.appendChild(img);
				div.appendChild(a);
				
				a = document.createElement("a");
				a.href = "generateMoviePage.php?id="+current.id;
				a.innerHTML = current.name + " (" + current.year + ")";
				div.appendChild(a);
				
				var p = document.createElement("p");
				var temp = current.star.split("-");
				current.star = temp.join(", ");
				p.innerHTML = current.star;
				div.appendChild(p);
				
				document.getElementById("searchResult").appendChild(div);
				
			}
		}
	}
	ajax.open("get","getInfoFromDatabase.php?search="+text,false);
	ajax.send(null);
}
function clear() {
	var temp = document.getElementById("searchResult");
	temp.parentNode.removeChild(temp);
	temp = document.createElement("div");
	temp.id = "searchResult";
	document.getElementById("search").appendChild(temp);
}