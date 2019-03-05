function initBackground() {
  window.addEventListener('storage', onLocalStorageChange, false);

  chrome.runtime.onConnect.addListener(function(popupPort) {
    port = popupPort;
    port.onDisconnect.addListener(function() {
      port = null;
    });
  });
}

initBackground();