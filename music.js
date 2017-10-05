// Put your Last.fm API key here
var api_key = "6c118581d60723b33845b35c91cbf2e6";

function sendRequest() {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            
			parse_string_resp1(str)  
			
        }
    };
    xhr.send();
}
 
function parse_string_resp1(str){
		var tr = ""
		dat = JSON.parse(str)
		var art_name = dat.artist.name
		var art_link = dat.artist.url
		var art_bio = dat.artist.bio.summary
		var art_image_url = dat.artist.image[2]["#text"];
		tr=tr+"<p><strong><em>Artist Name:</strong></em>  "+art_name+"</p>"
		tr=tr+'<p><strong>Last fm URL:</strong><a href="'+art_link+'"'+'>'+art_link+'</a></p>'
		tr = tr+'<p><strong>Breif Biography:</strong> '+art_bio+'</p><br/>'
		tr = tr+'<img src="'+art_image_url+'"/><br/>'
		tr = tr+'<h2>Top Albums</h2>'
		tr = tr + '<ol id = "topalbums"></ol>'
		getTopAlbums()
		tr = tr+"<br/>"
		tr = tr+'<h2> Similar Artists</h2>'
		tr = tr+'<ol id="similarartists"></ol>'
		getSimilarArtists()
		document.getElementById("output").innerHTML = tr
		
}

function getTopAlbums(){
	var xhr = new XMLHttpRequest();
	var method = "artist.getTopAlbums"
	var artist = encodeURI(document.getElementById("form-input").value);
	xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
	xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
			
			parse_string_resp2(str)
        }
    };
    xhr.send();
}

function parse_string_resp2(str){
	var tr = ""
	var i;
	dat = JSON.parse(str)
	for( i=0;i<dat.topalbums.album.length;i++){		
		tr = tr+"<li> <img src = "+dat.topalbums.album[i].image[0]["#text"]+"/>"+dat.topalbums.album[i].name+"</li>"
	}	
	document.getElementById("topalbums").innerHTML = tr
}

function getSimilarArtists(){
	var xhr = new XMLHttpRequest();
	var method = "artist.getSimilar"
	var artist = encodeURI(document.getElementById("form-input").value);
	xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
	xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
			
			parse_string_resp3(str)
			
        }
    };
    xhr.send();
}

function parse_string_resp3(str){
	var tr = ""
	var i;
	dat = JSON.parse(str)
	for( i=0;i<dat.similarartists.artist.length;i++){		
		tr = tr+"<li>"+dat.similarartists.artist[i].name+"</li>"
	}	
	document.getElementById("similarartists").innerHTML = tr
}


