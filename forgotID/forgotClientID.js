(function() {
    var config = {
        overriddenStyleUrl: "http://hostingpage.com/overidden-client-id-style.css",
        homePageUrl: "http://forgotclientid.pinnacle.com/forgotIDContent.html",
        hashTag: "#clientId"
    }

    function fnSetIframePosition() {
        document.getElementById("forgotClientIdIframe").style.position = "absolute";
        document.getElementById("forgotClientIdIframe").style.left = "0px";
        document.getElementById("forgotClientIdIframe").style.top = "0px";
    }

    function fnSetIframeSize() {
        document.getElementById("forgotClientIdIframe").style.width = document.body.clientWidth + 'px';
        document.getElementById("forgotClientIdIframe").style.height = document.body.clientHeight + 'px';
    }

    function fnIsValidStyleSheetAddress(styleHref) {
        return /^http(s)?/.test(styleHref);
    }

    function fnPostOverriddenStyleAddressMessage(styleHref, iframe) {
        if (fnIsValidStyleSheetAddress(styleHref)) {
            iframe.onload = function() {
                iframe.contentWindow.postMessage({
                    "key": "injectOverriddenStyleSheet",
                    "value": styleHref
                }, config.homePageUrl)
            }
        }
    }

    function fnInitial() {
        fnMonitorHash();
    }

    function fnMonitorHash() {
        if (location.hash === config.hashTag) {
            window.forgotClientIdPopup();
        }
    }

    window.onresize = function() {
        fnSetIframeSize();
    }

    window.onmessage = function(e) {
        e = e || event;
        if (e.data === 'closePopup') {
            document.getElementById("forgotClientIdIframe").parentNode.removeChild(document.getElementById("forgotClientIdIframe"));
            window.location.hash = '';
        }
    }

    window.onhashchange = function() {
        fnMonitorHash();
    }

    var forgotClientId = {
        injectHtml: function(domNode) {
            document.body.appendChild(domNode);
            fnSetIframePosition();
            fnSetIframeSize();
        },

        template: function() {
            var iframe = document.createElement("iframe");
            iframe.id = 'forgotClientIdIframe';
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameBorder", "no");
            iframe.src = config.homePageUrl + "?referDomain=" + location.href;
            fnPostOverriddenStyleAddressMessage(config.overriddenStyleUrl, iframe);
            return iframe;
        },

        popup: function() {
            forgotClientId.injectHtml(forgotClientId.template());
        }
    }

    window.forgotClientIdPopup = forgotClientId.popup;
    fnInitial();
})();
