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

function onCheckState(item) {
	if (!item.ytState || !item.ytState.url || !item.ytState.when || item.ytState.when + 5000 < Date.now()) {
		browser.storage.local.set({
			ytState: {url: window.location.href, when: Date.now()}
		});
		return;
	}

	if (item.ytState.url != window.location.href && item.ytState.when + 15000 > Date.now()) {
		window.location.href = item.ytState.url;
	}
}

function onError(error) {
	alert("Error: " + error);
}

function yt_cleanup() {
	let gettingState = browser.storage.local.get();
	gettingState.then(onCheckState, onError);

	if (document.getElementById('secondary')) {
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
