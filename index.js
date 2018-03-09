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


let pluginNYT = function(result) {
	let nyt_col = $("#first").html();
	for (let i = 0; i < result.response.docs.length; ++i) {
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
			$("#first").html(nyt_col);
		}
	}
	$(windowHeight)
}

let pluginFox = function(result) {
	let fox_col = $("#third").html();
	
	for (let i = 0; i < result.articles.length; ++i) {
		let item = result.articles[i];
		let headline = item.title;
		let url = item.url;
		let img = item.urlToImage;
		if (img[0] == "h") {
			let txt = "<div class=\"article fox\">";
			txt += "<div class=\"article2\"><img class=\"foxImg\" src=\"" + img+"\">";
			txt += "<span class=\"nytTitle\"><a href=\""+ url + "\">" + headline + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.description + "</div></div>";
			fox_col = fox_col + txt;
			$("#third").html(fox_col);
		}

	}

}

let NYTwrapper = function(p) {
	let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "f2dead0100cf489aa6556bc1cb017f36",
	  'q': "trump",
	  'sort': "newest",
	  'fq': "source: (\"The New York Times\")",
	  'page': p
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  pluginNYT(result);
	}).fail(function(err) {
	  throw err;
	});
}

let twitterStyle = function() {
	$(".twitter-block").css("padding","10px");
	$(".twitter-block").css("background-color","white");
	$(".twitter-block").css("border","1px solid black");
	$(".twitter-block").css("margin-bottom","20px");
	// $(".twitter-block").width($("#first").width());
}

let foxWrapper = function() {
	let url = 'https://newsapi.org/v2/everything?' +
          'q=trump&' +
          'sources=fox-news&' +
          'sortBy=publishedAt&' +
          'apiKey=35f81e90dd81401ba1b70c28895e226a';
	let req = new Request(url);
	fetch(req).then(convertoJson).then(pluginFox).catch(displayError);
}

let pfactWrapper = function() {
	let url = 'http://politifact.com/api/statements/truth-o-meter/people/donald-trump/json/?n=8&callback=?'
	$.getJSON(url,function(data) {
		let pf = $("#pfact").html();
		$.each(data, function(index,item){
        	let txt = "<div class=\"article pfact\">";
			txt += "<div class=\"article2\"><img class=\"pfactImg\" src=\"" + item.ruling.canonical_ruling_graphic+"\">";
			txt += "<span class=\"nytTitle\"><a href=\"http://politifact.com/"+ item.statement_url + "\">" + item.statement_context + " by " + item.speaker.first_name + " " + item.speaker.last_name 
			+ " on " + item.statement_date + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.statement + "</div></div>";
			txt += "<p></p>";
			pf = pf + txt;
			$("#pfact").html(pf);
        })
    })
}
let displayError = function(err, status, msg) {
  console.debug(err)
  console.debug(status)
  console.debug(msg)
  window.alert("Sorry, something went wrong.")
}

let convertoJson = function(result) {
	return result.json();
}

//35f81e90dd81401ba1b70c28895e226a


$(NYTwrapper(0));
$(foxWrapper);
$(pfactWrapper);
$(twitterStyle);
$(document).resize(twitterStyle)
