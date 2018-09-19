function run_script(code) {
	// Add and remove a script on the page
	var wD = document.wrappedJSObject;
	var tmp = wD.createElement('script');
	tmp.innerHTML = code;
	wD.documentElement.appendChild(tmp);
	wD.documentElement.removeChild(tmp);
}

function sanitize() {
	if (!window.ytUrl) {
		window.ytUrl = window.location.href;
	}
	
	if (window.ytUrl != window.location.href) {
		window.location.href = window.ytUrl;
	}

	if (document.getElementById('secondary')) {
		// "This Nazi shit just won't do." -- The Vandals
		run_script("document.getElementById('secondary').parentElement.removeChild(document.getElementById('secondary'))");
	}

	if (document.getElementById('related')) {
		run_script("document.getElementById('related').parentElement.removeChild(document.getElementById('related'))");

	if (!document.getElementById('player-theater-container').firstChild) {	
		run_script("document.querySelector('button.ytp-size-button').click()");
	}
}

setInterval(sanitize, 2000);
