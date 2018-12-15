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

function rememberState(reason) {
//	alert(reason + ", new state: " + window.location.href);
	browser.storage.local.set({ ytState: {url: window.location.href, when: Date.now()} });
}

function onCheckState(item) {
	// No remembered YouTube page -- remember the current page and date
	if (!item.ytState || !item.ytState.url) {
		rememberState('No url');
		return;
	}

	if (item.ytState.when + 30000 > Date.now() && item.ytState.when + 60000 < Date.now()) {
		rememberState('Stale date');
		return;
	}

	// we somehow ended up on a different YouTube page (autoplay?) Back to the remembered page.
	if (item.ytState.url != window.location.href && item.ytState.when + 60000 > Date.now()) {
		window.location.href = item.ytState.url;
	}
}

function onError(error) {
	alert("Error: " + error);
}

function yt_cleanup() {
	let gettingState = browser.storage.local.get();
	gettingState.then(onCheckState, onError);

	//wall of suggested next videos
	if (document.getElementsByClassName('ytp-videowall-still-info-content').length) {
		window.location.href = window.location.href;
	}

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
	setInterval(yt_cleanup, 10000);
}
