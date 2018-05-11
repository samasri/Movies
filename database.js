function getArray(genre) {
	var array = [];
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if(ajax.readyState==4) {
			var result = ajax.responseText;
			result = result.split("<br>");
			for(var i=0;i<result.length;i++)	{
				if(i!=result.length-1){
					var line = result[i];
					array[i] = JSON.parse(line);
				}
			}
		}
	};
	if(genre=="") ajax.open("get", "getInfoFromDatabase.php?top=10", false);
	else {
		ajax.open("get", "getInfoFromDatabase.php?top=10&genre="+genre, false);
	}
	ajax.send(null);
	return array;
}