function sanitize() {
	if (!window.ytUrl) {
		window.ytUrl = window.location.href;
	}
	
	if (window.ytUrl != window.location.href) {
		window.location.href = window.ytUrl;
	}

	if (!document.getElementById('secondary') &&
	    !document.getElementById('related') &&
	     document.getElementById('player-theater-container').firstChild) {	
	    	return;
	}

	var wD = document.wrappedJSObject;
	var zap = wD.createElement('script');
	zap.innerHTML = "document.getElementById('secondary').parentElement.removeChild(document.getElementById('secondary'))";
	wD.documentElement.appendChild(zap);
	wD.documentElement.removeChild(zap);

	var zap = wD.createElement('script');
	zap.innerHTML = "document.getElementById('related').parentElement.removeChild(document.getElementById('related'))";
	wD.documentElement.appendChild(zap);
	wD.documentElement.removeChild(zap);

	var big = wD.createElement('script');
	big.innerHTML = "document.querySelector('button.ytp-size-button').click()";
	wD.documentElement.appendChild(big);
	wD.documentElement.removeChild(big);
}

setInterval(sanitize, 2000);
