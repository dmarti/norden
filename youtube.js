function run_script(stuff) {
	var wD = document.wrappedJSObject;
	if (!wD) {
		wD = document;
	}
	var tmp = wD.createElement('script');
	tmp.innerHTML = stuff;
	wD.documentElement.appendChild(tmp);
	wD.documentElement.removeChild(tmp);
}

function yt_cleanup() {
	if (document.getElementById('secondary')) {
		run_script("document.getElementById('secondary').parentElement.removeChild(document.getElementById('secondary'))");
	}

	if (document.getElementById('related')) {
		run_script("document.getElementById('related').parentElement.removeChild(document.getElementById('related'))");
	}

	// theater mode fills in the space left blank after removing the "related" videos
	if (!document.getElementById('player-theater-container').firstChild) {	
		run_script("document.querySelector('button.ytp-size-button').click()");
	}
}

if (document.location.href.indexOf('watch') > 0) {
	yt_cleanup();
}
