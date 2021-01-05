/**
 * 3pts - chrome extension
 *
 * created: 2021-01-05
 */
function browserActionListener(tab) {
  const targetUrl = tab.url;
  const extensionView = `${chrome.runtime.getURL('html/view.html')}?host=${targetUrl}`;
  
  chrome.tabs.update(tab.id, {url: extensionView});
}

chrome.browserAction.onClicked.addListener(browserActionListener);
