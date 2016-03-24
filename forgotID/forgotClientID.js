var forgotClientId = {

    injectStyle: function(style_href) {
        var css_file = document.createElement('link'),
            head = document.head;
        css_file.setAttribute('rel', 'stylesheet');
        css_file.href = style_href;
        //todo if the css aready exsists, don't append
        //todo onload and domready
        head.appendChild(css_file);
    },

    injectJavascript: function(js_src, cb) {
        var js_file = document.createElement('script'),
            head = document.head;

        js_file.onload = cb;
        js_file.src = js_src;
        //todo if the js_file aready exsists, don't append
        //todo onload and domready
        head.appendChild(js_file);
    },

    injectHtml: function(str_html) {
        $('body').append(str_html);
    },

    template: function() {
        return `
        <div id="forgotClientIdPopup" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <iframe id="forgotClientIdIframe" scrolling="no" frameBorder="no" src="http://forgotclientid.pinnacle.com/forgotIDContent.html"></iframe>
            </div>
        </div>`
    },

    popup: function() {
        $('#forgotClientIdPopup').modal();
    }
}

forgotClientId.injectStyle('http://forgotclientid.pinnacle.com/stylesheets/bootstrap_v3.3.6.css');
forgotClientId.injectStyle('http://forgotclientid.pinnacle.com/stylesheets/forgotClientId.css');

forgotClientId.injectJavascript('http://forgotclientid.pinnacle.com/javascripts/jquery.js', function() {
    console.log("js loaded");
    forgotClientId.injectHtml(forgotClientId.template);
    forgotClientId.injectJavascript('http://forgotclientid.pinnacle.com/javascripts/bootstrap.min.js', function() {

    })
})

window.onmessage = function(e) {
    e = e || event;
    console.log(e.data);
    setIframeSize(e.data);
}

window.forgotClientIdPopup = forgotClientId.popup;

function setIframeSize(ob) {
    document.getElementById("forgotClientIdIframe").style.width = ob.w+"px";
    document.getElementById("forgotClientIdIframe").style.height = ob.h+"px";
}
