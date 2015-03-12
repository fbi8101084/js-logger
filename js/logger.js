(function () {
    'use strict';
    var fg = fg || {};
    fg.js_error_type = fg.js_error_type || 'other';
    if ('undefined' !== typeof console) {

        fg.js_logger = function (message) {
            if (fg.js_error_alert) {
                alert(message);
            }
            if ('undefined' !== typeof console.log) {
                console.log(message);
            }
            (new Image()).src =
                '//error.fgplug.in/' + fg.js_error_type + '.gif' +
                '?message=' + encodeURIComponent(message) +
                '&from=' + encodeURIComponent(document.location);
        };

        if ('undefined' !== typeof console.error) {
            console.error = function () {
                var argument_strings = [], i;

                for (i = 0; i < arguments.length; i++) {
                    argument_strings.push(' ' + arguments[i]);
                }

                fg.js_logger('console.error: ' + argument_strings.join(' '));
            };
        }
    }

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

    if ('undefined' !== typeof jQuery) {
        jQuery(function () {
            jQuery('<div>').ajaxError(function (event, request, settings, exception) {
                fg.js_logger('AjaxError:' + settings.type + ' ' + settings.url + ' ' + request.status + ' (' + request.statusText + '):' + exception);
            });
        });
        jQuery.error = function (message) {
            fg.js_logger('jQuery.error: ' + message);
        };
    }
})();

