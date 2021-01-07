/**
 * 3pts - chrome extension
 *
 * created: 2021-01-05
 */
function browserActionListener(tab) {
  const targetUrl = tab.url;
  let extensionView = `${chrome.runtime.getURL('html/view.html')}?host=${targetUrl}`;

  if (targetUrl.startsWith('chrome-extension://')) {
    const viewSearch = new URL(targetUrl).searchParams;
    extensionView = decodeURI(viewSearch.get('host'));
  }
  if (extensionView && extensionView !== 'null') {
    chrome.tabs.update(tab.id, {url: extensionView});
  }
}

chrome.browserAction.onClicked.addListener(browserActionListener);
