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
}

function onCheckState(item) {
	// on the original video: do nothing
	if (item.ytState && item.ytState.url == window.location.href) {
		return;
	}
	// missing or stale state: store it
	if (!item.ytState || !item.ytState.url || !item.ytState.when || item.ytState.when + 15000 < Date.now()) {
		browser.storage.local.set({
			ytState: {url: window.location.href, when: Date.now()}
		});
		return;
	}

	// otherwise we must be on a new video: go back to the original.
	window.location.href = item.ytState.url;
}

function onError(error) {
	alert("Error: " + error);
}

function yt_cleanup() {
	let gettingState = browser.storage.local.get();
	gettingState.then(onCheckState, onError);

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
}

setInterval(yt_cleanup, 2000);
