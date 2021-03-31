/**
 * 3pts - chrome extension
 *
 * created: 2021-01-05
 */
const iframeTarget = document.getElementById('target');
const iframe3pts = document.getElementById('app3pts');

const viewSearch = new URLSearchParams(location.search);
const targetUrl = decodeURI(viewSearch.get('host'));

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        const headers = info.responseHeaders;
        const blockedHeaders = ['x-frame-options', 'frame-options', 'content-security-policy'];
        const filtredHeaders = headers.filter((header) => !blockedHeaders.includes(header.name.toLowerCase()));

        return {responseHeaders: filtredHeaders};
    },
    {
        urls: [ '*://*/*' ],
        types: [ 'sub_frame' ]
    },
    ['blocking', 'responseHeaders', 'extraHeaders']
);

iframe3pts.src = "https://3pts.dev";
iframeTarget.src = targetUrl;
