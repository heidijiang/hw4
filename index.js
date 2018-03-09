window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));


let windowHeight = function() {
	$(document).height($(window).height());
}


let fillNYT = function(result) {
	let nyt_col = $("#nyt").html();
	let l = result.response.docs.length;
	if (l > 5) l = 5;
	for (let i = 0; i < l; ++i) {
		let item = result.response.docs[i];
		if (item.multimedia.length > 0) {
			let headline = item.headline.main;
			let url = item.web_url;
			let img;
			for (let m = 0; m<item.multimedia.length; ++m) {
				if (item.multimedia[m].subtype == "thumbnail") {
					img = item.multimedia[m].url;
					break;
				}
			}
			let txt = "<div class=\"article nyt\">";
			txt += "<div class=\"article2\"><img class=\"nytImg\" src=\"https://www.nytimes.com/" + img+"\">";
			txt += "<span class=\"nytTitle\"><a href=\""+ url + "\">" + headline + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.snippet + "</div></div>";
			nyt_col = nyt_col + txt;
			$("#nyt").html(nyt_col);
		}
	}
}

let fillNewsAPI = function(result) {
	let source = result.articles[0].source.id;
	let col = $("#"+source).html();
	let l = result.articles.length;
	if (l > 5) l = 5;
	for (let i = 0; i < l; ++i) {
		let item = result.articles[i];
		let headline = item.title;
		let url = item.url;
		let img = item.urlToImage;
		if (img[0] == "h") {
			let txt = "<div class=\"article" + " " + source + "\">";
			txt += "<div class=\"article2\"><img class=\"img\" src=\"" + img+"\">";
			txt += "<span class=\"nytTitle\"><a href=\""+ url + "\">" + headline + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.description + "</div></div>";
			col = col + txt;
			$("#"+source).html(col);
		}
	}
}

let newsWrapper = function() {

	let url, req;
	let site = ["fox-news","cnn","breitbart-news","the-washington-post"];
	
	for (s of site) {
		url = 'https://newsapi.org/v2/everything?' +
	          'q=\"donald trump\"&' +
	          'language=en&' +
	          'sources='+ s + '&' +
	          'sortBy=publishedAt&' +
	          'apiKey=98822d390f2f45fe99670d23f6325ef6';
	    
		req = new Request(url);
		fetch(req,{mode: 'cors'}).then(convertoJson).then(fillNewsAPI).catch(displayError);
	}

	// url = 'https://services.cnn.com/newsgraph/search/description:trump/hasImage:true/source:cnn/language:en/rows:10/start:0/lastPublishDate,desc?api_key=66v94mw2atyzkd4nj6pnzfp7';
	url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "f2dead0100cf489aa6556bc1cb017f36",
	  'q': "trump",
	  'sort': "newest",
	  'fq': "source: (\"The New York Times\")",
	});
	req = new Request(url);
	fetch(req,{mode: 'cors'}).then(convertoJson).then(fillNYT).catch(displayError);

	$(windowHeight)
}

let displayError = function(err, status, msg) {
  console.log(err)
  console.debug(status)
  console.debug(msg)
}

let convertoJson = function(result) {
	return result.json();
}

let twitterStyle = function() {
	$(".twitter-block").css("padding","10px");
	$(".twitter-block").css("background-color","white");
	$(".twitter-block").css("border","1px solid black");
	$(".twitter-block").css("margin-bottom","20px");
	// $(".twitter-block").width($("#first").width());
}

$(window).scroll(function() {
    if ($(this).scrollTop() > 50){  
        $('header').addClass("sticky");
        $("#subhdr").hide();
        $(".icon2").hide();
    }
    else{
        $('header').removeClass("sticky");
        $("#subhdr").show();
        $(".icon2").show();
    }
});
$(newsWrapper);
$(twitterStyle);
$(document).resize(twitterStyle)
