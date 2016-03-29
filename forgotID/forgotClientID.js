(function() {
    var config = {
        overriddenStyleUrl: "http://hostingpage.com/overidden-client-id-style.css",
        homePageUrl: "http://forgotclientid.pinnacle.com/forgotIDContent.html",
        hashTag: "#clientId",
        iframeId: "forgotClientIdIframe",
        userAgent:"desktop"
    }

    function fnSetIframePosition() {
        document.getElementById(config.iframeId).style.position = "absolute";
        document.getElementById(config.iframeId).style.left = "0px";
        document.getElementById(config.iframeId).style.top = "0px";
    }

    function fnSetIframeSize() {
        document.getElementById(config.iframeId).style.width = "100%";
        document.getElementById(config.iframeId).style.height = "100%";
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
                }, config.homePageUrl);
            }
        }
    }

    function fnInit() {
        fnMonitorHash();
    }

    function fnMonitorHash() {
        if (location.hash === config.hashTag) {
            window.forgotClientIdPopup();
        }
    }

    window.onmessage = function(e) {
        e = e || event;
        if (e.data.key === 'closePopup') {
            document.getElementById(config.iframeId).parentNode.removeChild(document.getElementById(config.iframeId));
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
            iframe.id = config.iframeId;
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameBorder", "no");
            iframe.src = config.homePageUrl + "?referDomain=" + encodeURI(location.href.split(/\?|#/)[0]) + "&userAgent=" + config.userAgent;
            fnPostOverriddenStyleAddressMessage(config.overriddenStyleUrl, iframe);
            return iframe;
        },

        popup: function() {
            forgotClientId.injectHtml(forgotClientId.template());
        }
    }

    window.forgotClientIdPopup = forgotClientId.popup;
    fnInit();
})();
