var docid = null;
var happy = true;

function hasCompromisedOrigin(req) {
	var u = req.originUrl;
	if (!u) {
		return false;
	}
	if (u.indexOf('https://www.youtube.com/') == 0) {
		return true;
	}
	return false;
}

function isWatchPage(req) {
	return req.url.indexOf('https://www.youtube.com/watch') == 0;
}

function checkURL(requestDetails) {
	if (docid && isWatchPage(requestDetails)) {
		if(hasCompromisedOrigin(requestDetails)) {
			var properUrl = 'https://www.youtube.com/watch?v=' + docid;
			if (requestDetails.url == properUrl) {
				return;
			} else {
				return({'redirectUrl': 'https://www.youtube.com/watch?v=' + docid})
			}
		} else {
			console.log("New, apparently clean, watch page");
			happy = true;
		}
	}
	if (!happy) {
		console.log("Canceling request for wrong docid.");
		return({'cancel': true});
	}
	if (requestDetails.url.indexOf('&') == -1) {
		return
	}
	var q = requestDetails.url.split('?')[1].split('&');
	for (var i = 0; i < q.length; i++) {
		var item = q[i].split('=');
		if (item[0] == 'docid') {
			if (!docid) {
				docid = item[1];
				return;
			}
			if (docid != item[1]) {
				happy = false;
			}
		}
	}
}

browser.webRequest.onBeforeRequest.addListener(
	checkURL,
	{urls: ["*://www.youtube.com/*"]},
	["blocking"]
);
