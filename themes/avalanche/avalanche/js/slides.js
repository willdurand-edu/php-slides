/*!
 * jQuery Landslide Plugin
 * Copyright (c) 2012 Evan Coury
 * Dual licensed under the MIT and GPL licenses.
 */
(function($, Hammer) {
   /**
    * Landslide initializer
    */
    var landslideInit = function(options) {
        var self = this;

        var defaults = {
            scalingEnabled: true,
            closePresenterViewOnClose: true,
        };
        var options = $.extend(defaults, options);

        var state = {
            currentSlide: 1,
            modifierKeyDown: false,
            blanked: false,
            scalingEnabled: true,
            exposeActive: false,
            presenterViewOpen: false,
            isPresenterView: false,
            presenterViewWindow: null,
        };

        var updateSlideClasses = function(updateOther) {
            var slide = getSlide(state.currentSlide);
            window.location.hash = (state.isPresenterView ? "presenter" : "slide") + state.currentSlide;
            $('.slide').removeClass('far-past past current future far-future');

            for (i=1; i<state.currentSlide-1; i++) {
                getSlide(i).addClass('far-past');
            }

            getSlide(state.currentSlide-1).addClass('past');
            slide.addClass('current');
            getSlide(state.currentSlide+1).addClass('future');

            for (i=state.currentSlide+2; i<$('.slide').length+1; i++) {
                getSlide(i).addClass('far-future');
            }

            // Update active ToC row
            $('#toc tr').removeClass('active');
            $('#toc-row-'+state.currentSlide).addClass('active');

            // Update title
            var header = slide.find('div.inner header');
            if (header.length > 0) {
                $('title').text(header.text());
            }

            // update presenter notes
            $('#current_presenter_notes #presenter_note').html($('.slide.current .presenter_notes').html());

            if (updateOther) sendRemoteCommand('slide#'+state.currentSlide);
        };

        var nextSlide = function() {
            if (state.currentSlide < $('.slide').length) {
                state.currentSlide++;
            }
            updateSlideClasses(true);
        };

        var prevSlide = function() {
            if (state.currentSlide > 1) {
                state.currentSlide--;
            }
            updateSlideClasses(true);
        };

        var toggleBlank = function(updateOther) {
            state.blanked = $('#blank').toggle().is(':visible');
            $('body').toggleClass('blank');
            if (updateOther) sendRemoteCommand('blank');
        };

        /**
         * Scale the contents of the .presentation div proportionately to the browser window size.
         */
        var updateScale = function() {
            computeScale = function() {
                var cSlide = $('.presentation')[0];
                var sx = $(cSlide).width() / $(window).width();
                var sy = $(cSlide).height() / $(window).height();
                return 1 / Math.max(sx, sy);
            };
            scale = state.scalingEnabled ? computeScale() : 1;
            presentation = $('.presentation')[0];
            transform = 'scale(' + scale + ')';
            $(presentation).css({
                'transform': transform,
                '-ms-transform': transform,
                '-moz-transform': transform,
                '-webkit-transform': transform,
                '-o-transform': transform,
            });
        };

        var togglePresenterView = function() {
            if (state.isPresenterView) {
                window.close();
                return;
            }

            if (state.presenterViewOpen && state.presenterViewWindow.closed) {
                state.presenterViewOpen = false;
                state.presenterViewWindow = null;
            }

            if (state.presenterViewOpen) {
                state.presenterViewWindow.close();
                state.presenterViewWindow = null;
                state.presenterViewOpen = false;
            } else {
                state.presenterViewWindow = open(window.location.pathname + "#presenter" + state.currentSlide, 'presenter_notes', 'directories=no,location=no,toolbar=no,menubar=no,copyhistory=no');
                if (state.presenterViewWindow == null) {
                    //console.log('Presenter view pop-up blocked! For local files in Firefox, add "<file>" (sans quotes) to your popup whitelist.');
                    return false;
                }
                state.presenterViewOpen = true;
            }
        };

        var getSlide = function(slideNumber) {
            return $($('.slide')[slideNumber - 1]);
        };

        var toggleFullScreen = function() {
            if (document.mozFullScreen !== undefined && !document.mozFullScreen) {
                document.body.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) {
                document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else {
                // TODO: Error in firefox, no method webkitCancelFullScreen
                document.webkitCancelFullScreen() || document.mozCancelFullScreen();
            }
        };

        var toggleExposeMode = function() {
            state.exposeActive = $('body').toggleClass('expose').hasClass('expose');
            if (state.isPresenterView) $('body').toggleClass('presenter_view');
        };

        var toggleModifierKey = function(keyCode, upOrDown) {
            switch (keyCode) {
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                case 91: // command
                    // TODO: This is buggy with multiple modifier keys: ctrl+shift, etc
                    state.modifierKeyDown = (upOrDown == 'down') ? true :  false;
                    break;
            }
        };

        var sendRemoteCommand = function(command) {
            if (state.presenterViewWindow == null){
                return; // if the presenter view isn't open, there's no reason to send a command
            }
            var w = state.isPresenterView ? window.opener : state.presenterViewWindow;
            w.postMessage(command, '*');
        };

        var startClock = function() {
            var addZero = function(num) {
                return num < 10 ? '0' + num : num;
            }
            var updateClock = function() {
                var now = new Date();
                $('#time #hours').text(addZero(now.getHours()));
                $('#time #minutes').text(addZero(now.getMinutes()));
                $('#time #seconds').text(addZero(now.getSeconds()));
            };
            updateClock(); // no delay before starting time
            setInterval(function() { updateClock(); }, 1000);
        };

        /**
         * Key shortcuts
         */
        $(window).keydown(function(event) {
            switch (event.keyCode) {
                // Toggle expose mode
                case 27: // ESC
                    toggleExposeMode();
                    //if (state.isPresenterView) $('body').toggleClass('presenter_view');
                    break;

                // Leave expose mode
                case 13: // Enter
                    if (!state.exposeActive) return;
                    toggleExposeMode();
                    //if (state.isPresenterView) $('body').addClass('presenter_view');
                    break;

                // Next slide
                case 39: // right arrow
                case 32: // space
                case 34: // page down
                case 40: // down arrow
                    event.preventDefault();
                    nextSlide();
                    break;

                // Previous slide
                case 37: // left arrow
                case 33: // page up
                case 38: // up arrow
                    event.preventDefault();
                    prevSlide();
                    break;

                case 80: // p
                    if (state.modifierKeyDown) return;
                    togglePresenterView();
                    break;

                // Toggle page numbers
                case 78: // n
                    if (state.modifierKeyDown || state.exposeActive) return
                    $('.page_number').toggle();
                    break;

                case 50: // 2
                    if (state.modifierKeyDown) return;
                    getSlide(state.currentSlide).find('.notes').toggle();
                    break;

                // Toggle blank screen
                case 190: // .
                case 48:  // 0
                case 66:  // b
                    if (state.modifierKeyDown || state.exposeActive) return;
                    toggleBlank(true);
                    break;

                // Toggle scaling
                case 69: // e
                    if (state.modifierKeyDown) return;
                    state.scalingEnabled = !state.scalingEnabled;
                    updateScale();
                    break;

                // Toggle table of contents
                case 84: // t
                    if (state.modifierKeyDown) return;
                    $('#toc').toggleClass('hidden');
                    if (!$('#help, #toc').hasClass('hidden')) $('#help').toggleClass('hidden');
                    break;

                // Toggle help
                case 72: // h
                    if (state.modifierKeyDown) return;
                    $('#help').toggleClass('hidden');
                    if(!$('#help, #toc').hasClass('hidden')) $('#toc').toggleClass('hidden');
                    break;

                // Toggle fullscreen
                case 70: // f
                    // From http://io-2012-slides.googlecode.com/
                    // Only respect 'f' on body. Don't want to capture keys from an <input>.
                    // Also, ignore browser's fullscreen shortcut (cmd+shift+f) so we don't
                    // get trapped in fullscreen!
                    if (event.target == document.body && !state.modifierKeyDown) {
                        toggleFullScreen();
                    }
                    break;
            }
        });

        /**
         * Monitor modifier key status
         */
        $(window).keydown(function(event) {
            toggleModifierKey(event.keyCode, 'down');
        });
        $(window).keyup(function(event) {
            toggleModifierKey(event.keyCode, 'up');
        });

        $(window).resize(function(event) {
            updateScale();
        });

        if (window.location.hash.indexOf("#presenter") != -1) {
            state.currentSlide = Number(window.location.hash.replace('#presenter', ''));
            state.isPresenterView = true;
            state.presenterViewOpen = true;
            state.presenterViewWindow = window;
            $('body').addClass('presenter_view');
        } else {
            state.currentSlide = (window.location.hash == "") ? 1 : Number(window.location.hash.replace('#slide', ''));
        }

        $('#toc a').click(function(event) {
            event.preventDefault();
            state.currentSlide = Number($(this).attr('href').replace('#slide', ''));
            updateSlideClasses(true);
        });

        $('.slide').each(function(i, slide) {
            $(slide).data('slide', i+1);
        });

        $('.slide').click(function(event) {
            if (!state.exposeActive) return;
            console.log('toggle expose');
            toggleExposeMode();
            state.currentSlide = $(this).data('slide');
            updateSlideClasses(true);
            event.preventDefault();
        });

        updateSlideClasses();

        state.scalingEnabled = options.scalingEnabled;
        updateScale();
        startClock();

        /**
         * Cross-window messaging (for remote control via presenter view)
         */
        window.addEventListener("message", function(event) {
            // TODO: Validate event.origin against whitelist
            if (event.data.indexOf("slide#") != -1) {
                state.currentSlide = Number(event.data.replace('slide#', ''));
                updateSlideClasses(false);
            }
            switch (event.data) {
                case 'blank':
                    toggleBlank(false);
                    break;
            }
        }, false);

        /**
         * Close presenter window if parent window is closed
         */
        if (options.closePresenterViewOnClose && !state.isPresenterView) {
            window.onunload = function() {
                if (state.presenterViewOpen) {
                    togglePresenterView();
                }
            };
        }

        var body = document.body;

        Hammer(body, { drag: false }).on('swipeleft', function (event) {
            event.gesture.preventDefault();
            nextSlide();
        });

        Hammer(body, { drag: false }).on('swiperight', function (event) {
            event.gesture.preventDefault();
            prevSlide();
        });

        return this;
    };

    /**
     * Expose jQuery methods
     */
    var methods = {
        'init': landslideInit,
    };

    $.fn.landslide = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.landslide');
        }
    };
})(jQuery, Hammer);
