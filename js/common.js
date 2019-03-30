$(function() {

    $('.canvi-user-info__close').click(function() {
        canviLeft.close();
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        nav:true,
        dots: false,
        navText: ['<ion-icon name="arrow-back"></ion-icon>', '<ion-icon name="arrow-back"></ion-icon>'],
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        smartSpeed: 1000,
        responsive:{
            0:{
                items:1
            },
            769:{
                items:2
            },
            1025:{
                items:3
            }
        }
    })


});

var canviLeft = new Canvi({
    content: '.js-canvi-content',
    navbar: '.js-canvi-navbar--left',
    openButton: '.js-canvi-open-button--left',
    position: "left",
    pushContent: !1,
    speed: "1s",
    width: "100vw",
    responsiveWidths: [ {
		breakpoint: "600px",
			width: "280px"
		}, {
			breakpoint: "1280px",
			width: "320px"
		}, {
			breakpoint: "1600px",
			width: "380px"
		} ]
});


(function (window, document) {
    'use strict';

    // Enable drop-down menus in Pure
    // Inspired by YUI3 gallery-simple-menu by Julien LeComte
    // [https://github.com/yui/yui3-gallery/blob/master/src/gallery-simple-menu/js/simple-menu.js]

    function PureDropdown(dropdownParent) {

        var PREFIX = 'pure-',
            ACTIVE_CLASS_NAME = PREFIX + 'menu-active',
            ARIA_ROLE = 'role',
            ARIA_HIDDEN = 'aria-hidden',
            MENU_OPEN = 0,
            MENU_CLOSED = 1,
            MENU_PARENT_CLASS_NAME = 'pure-menu-has-children',
            MENU_ACTIVE_SELECTOR = '.pure-menu-active',
            MENU_LINK_SELECTOR = '.pure-menu-link',
            MENU_SELECTOR = '.pure-menu-children',
            DISMISS_EVENT = (window.hasOwnProperty &&
                window.hasOwnProperty('ontouchstart')) ?
                    'touchstart' : 'mousedown',

            ARROW_KEYS_ENABLED = true,

            ddm = this; // drop down menu

            this._state = MENU_CLOSED;

            this.show = function () {
                if (this._state !== MENU_OPEN) {
                    this._dropdownParent.classList.add(ACTIVE_CLASS_NAME);
                    this._menu.setAttribute(ARIA_HIDDEN, false);
                    this._state = MENU_OPEN;
                }
            };

            this.hide = function () {
                if (this._state !== MENU_CLOSED) {
                    this._dropdownParent.classList.remove(ACTIVE_CLASS_NAME);
                    this._menu.setAttribute(ARIA_HIDDEN, true);
                    this._link.focus();
                    this._state = MENU_CLOSED;
                }
            };

            this.toggle = function () {
                this[this._state === MENU_CLOSED ? 'show' : 'hide']();
            };

            this.halt = function (e) {
                e.stopPropagation();
                e.preventDefault();
            };

            this._dropdownParent = dropdownParent;
            this._link = this._dropdownParent.querySelector(MENU_LINK_SELECTOR);
            this._menu = this._dropdownParent.querySelector(MENU_SELECTOR);
            this._firstMenuLink = this._menu.querySelector(MENU_LINK_SELECTOR);

            // Set ARIA attributes
            this._link.setAttribute('aria-haspopup', 'true');
            this._menu.setAttribute(ARIA_ROLE, 'menu');
            this._menu.setAttribute('aria-labelledby', this._link.getAttribute('id'));
            this._menu.setAttribute('aria-hidden', 'true');
            [].forEach.call(
                this._menu.querySelectorAll('li'),
                function(el){
                    el.setAttribute(ARIA_ROLE, 'presentation');
                }
            );
            [].forEach.call(
                this._menu.querySelectorAll('a'),
                function(el){
                    el.setAttribute(ARIA_ROLE, 'menuitem');
                }
            );

            // Toggle on click
            this._link.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                ddm.toggle();
            });

            // Keyboard navigation
            document.addEventListener('keydown', function (e) {
                var currentLink,
                    previousSibling,
                    nextSibling,
                    previousLink,
                    nextLink;

                // if the menu isn't active, ignore
                if (ddm._state !== MENU_OPEN) {
                    return;
                }

                // if the menu is the parent of an open, active submenu, ignore
                if (ddm._menu.querySelector(MENU_ACTIVE_SELECTOR)) {
                    return;
                }

                currentLink = ddm._menu.querySelector(':focus');

                // Dismiss an open menu on ESC
                if (e.keyCode === 27) {
                    /* Esc */
                    ddm.halt(e);
                    ddm.hide();
                }
                // Go to the next link on down arrow
                else if (ARROW_KEYS_ENABLED && e.keyCode === 40) {
                    /* Down arrow */
                    ddm.halt(e);
                    // get the nextSibling (an LI) of the current link's LI
                    nextSibling = (currentLink) ? currentLink.parentNode.nextSibling : null;
                    // if the nextSibling is a text node (not an element), go to the next one
                    while (nextSibling && nextSibling.nodeType !== 1) {
                        nextSibling = nextSibling.nextSibling;
                    }
                    nextLink = (nextSibling) ? nextSibling.querySelector('.pure-menu-link') : null;
                    // if there is no currently focused link, focus the first one
                    if (!currentLink) {
                        ddm._menu.querySelector('.pure-menu-link').focus();
                    }
                    else if (nextLink) {
                        nextLink.focus();
                    }
                }
                // Go to the previous link on up arrow
                else if (ARROW_KEYS_ENABLED && e.keyCode === 38) {
                    /* Up arrow */
                    ddm.halt(e);
                    // get the currently focused link
                    previousSibling = (currentLink) ? currentLink.parentNode.previousSibling : null;
                    while (previousSibling && previousSibling.nodeType !== 1) {
                        previousSibling = previousSibling.previousSibling;
                    }
                    previousLink = (previousSibling) ? previousSibling.querySelector('.pure-menu-link') : null;
                    // if there is no currently focused link, focus the last link
                    if (!currentLink) {
                        ddm._menu.querySelector('.pure-menu-item:last-child .pure-menu-link').focus();
                    }
                    // else if there is a previous item, go to the previous item
                    else if (previousLink) {
                        previousLink.focus();
                    }
                }
            });

            // Dismiss an open menu on outside event
            document.addEventListener(DISMISS_EVENT, function (e) {
                var target = e.target;
                if (target !== ddm._link && !ddm._menu.contains(target)) {
                    ddm.hide();
                    ddm._link.blur();
                }
            });

    }

    function initDropdowns() {
        var dropdownParents = document.querySelectorAll('.pure-menu-has-children');
        for (var i = 0; i < dropdownParents.length; i++) {
            var ddm = new PureDropdown(dropdownParents[i]);
        }
    }

    initDropdowns();

}(this, this.document));

(function (window, document) {
    var menu = document.getElementById('menu'),
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

    function toggleHorizontal() {
        [].forEach.call(
            document.getElementById('menu').querySelectorAll('.custom-can-transform'),
            function(el){
                el.classList.toggle('pure-menu-horizontal');
            }
        );
    };

    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            setTimeout(toggleHorizontal, 500);
        }
        else {
            toggleHorizontal();
        }
        menu.classList.toggle('open');
        document.getElementById('toggle').classList.toggle('x');
    };

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    document.getElementById('toggle').addEventListener('click', function (e) {
        toggleMenu();
        e.preventDefault();
    });

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
    })(this, this.document);
