(function () {
    'use strict';
    var fg = fg || {};
    fg.js_error_type = fg.js_error_type || 'other';
    fg.js_logger = function (message) {
        if ('undefined' !== typeof fg.js_error_alert && fg.js_error_alert) {
            alert(message);
        }
        if ('undefined' !== typeof console && 'undefined' !== typeof console.log) {
            console.log(message);
        }
        (new Image()).src = '//error.fgplug.in/' + fg.js_error_type + '.gif?message=' + encodeURIComponent(message) + '&from=' + encodeURIComponent(document.location);
    };
    fg.window_error = function (errorMessage, url, line) {
        if ('object' == typeof errorMessage) {
            url = errorMessage.target.src;
            errorMessage = errorMessage.type;
            line = 0;
        }
        fg.js_logger('window.onerror: ' + errorMessage + ' ' + url + ' ' + line);
    };
    if ('undefined' !== typeof window.addEventListener) {
        window.onerror = fg.window_error;
    } else if ('undefined' !== typeof window.attachEvent) {
        window.attachEvent('error', fg.window_error);
    }
    jQuery(function () {
        jQuery('<div>').ajaxError(function (event, request, settings, exception) {
            fg.js_logger('AjaxError:' + settings.type + ' ' + settings.url + ' ' + request.status + ' (' + request.statusText + '):' + exception);
        });
    });
    jQuery.error = function (message) {
        fg.js_logger('jQuery.error: ' + message);
    };
    if (typeof console != 'undefined' && typeof console.error != 'undefined') {
        console.error = function () {
            var argument_strings = [];
            for (var i = 0; i < arguments.length; i++) {
                argument_strings.push(' ' + arguments[i]);
            }
            fg.js_logger('console.error: ' + argument_strings.join(' '));
        };
    }
})();

