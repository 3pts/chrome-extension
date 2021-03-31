/**
 * 3pts - chrome extension
 *
 * created: 2021-01-05
 */
const iframeTarget = document.getElementById('target');
const iframe3pts = document.getElementById('app3pts');

const viewSearch = new URLSearchParams(location.search);
const targetUrl = decodeURI(viewSearch.get('host'));

iframe3pts.src = "https://3pts.dev";
iframeTarget.src = targetUrl;

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        let headers = info.responseHeaders;
        for (let i = headers.length-1; i >= 0; i--) {
            const header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options') {
                headers.splice(i, 1);
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: [ '*://*/*' ],
        types: [ 'sub_frame' ]
    },
    ['blocking', 'responseHeaders', 'extraHeaders']
);
