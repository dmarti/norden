function run_script(stuff) {
	// Add and remove a script on the page
	var wD = document.wrappedJSObject;
	if (!wD) {
		wD = document;
	}
	var tmp = wD.createElement('script');
	tmp.innerHTML = stuff;
	wD.documentElement.appendChild(tmp);
	wD.documentElement.removeChild(tmp);
	alert(stuff);
}

function yt_cleanup() {
	if (!window.originalYtUrl) {
		run_script("window.originalYtUrl = localStorage.getItem('originalYtUrl')");
		alert(window.originalYtUrl);
	}

	if (document.getElementById('secondary')) {
		// "This Nazi shit just won't do." -- The Vandals
		run_script("document.getElementById('secondary').parentElement.removeChild(document.getElementById('secondary'))");
	}

	if (document.getElementById('related')) {
		run_script("document.getElementById('related').parentElement.removeChild(document.getElementById('related'))");
	}

	if (!document.getElementById('player-theater-container').firstChild) {	
		run_script("document.querySelector('button.ytp-size-button').click()");
	}

	if (!window.originalYtUrl) {
		window.originalYtUrl = window.location.href;
		run_script("localStorage.setItem('originalYtUrl', '" + window.location.href + "')");
	}
	
	if (!(window.originalYtUrl == window.location.href)) {
		// go back to the original video
		window.location.href = window.originalYtUrl;
	} 
}

setInterval(yt_cleanup, 2000);
