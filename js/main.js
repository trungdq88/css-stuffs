var isMenuOpen = false;
/**
 * Array of element that will change when trigger open/close menu
 */
var toggleElements;
/**
 * Id of current open tab, `false` when menu is closed.
 */
var currentTabId;
/**
 * Element of current open tab, `false` when menu is closed.
 */
var $currentTab;
/**
 * Array of string represents list of tabs
 */
var tabs;

function getElementPosition(array, anchor, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return i < [].indexOf.call(array, anchor) ? 'left' : 'right';
        }
    }
    return 'unknown';
}

function moveUnderline() {
    $currentTab && $('#underline-bar').css({
        left: $currentTab.offset().left,
        width: $currentTab.width() + 40
    });
}
$(function () {

    tabs = $('.tab-item').map(function (index, el) {
        return el.getAttribute('href').replace('#', '');
    });

    toggleElements = [
        $('#main'),
        $('header'),
        $('#menu-overlay'),
        $('#front-content'),
        $('.item-holder'),
        $('#underline-bar')
    ];

    $('#menu-overlay').click(toggleMenu);
    $('.tab-item').click(function () {
        var tabId = $(this).attr('href').replace('#', '');

        // Show/hide tabs
        // 1. Show clicked tabs
        var $clickedTab = $('.item-holder[data-tab=' + tabId +']');
        $clickedTab.removeClass('hide');
        setTimeout(function () {
            $clickedTab.removeClass('move-right').removeClass('move-left');
        }, 100);

        // 2. Move other tabs to their right position
        $('.item-holder').each(function (index, el) {
            var itemId = el.dataset.tab;
            if (itemId != tabId) { // Don't move the clicked tab
                $(el).addClass('move-' + getElementPosition(tabs, tabId, itemId));
                setTimeout(function () {
                    $(el).addClass('hide');
                }, 300);
            }
        });

        // Move the underline bar
        $currentTab = $(this);
        moveUnderline();

        // Decide to close the menu or switch to other tabs
        if (currentTabId && currentTabId != tabId) {
            // Move to other tabs
            currentTabId = tabId;
        } else {
            currentTabId = tabId;
            toggleMenu();
        }

    });

    // Make sure underline changes when window size is changed
    $(window).resize(function () {
        moveUnderline();
    });
});

function openMenu() {
    $('#menu-overlay').show();
    toggleElements.forEach(function (element) {
        // This operation will redraw all the #main element,
        // so let's make it better by draw it at the beginning
        // of the frame by using requestAnimationFrame
        requestAnimationFrame(function () {
            element.removeClass('no-back-anim');
            element.addClass('open-menu');
        });
    });
}

function closeMenu() {
    toggleElements.forEach(function (element) {
        element.addClass('no-back-anim');
        element.removeClass('open-menu');
    });
    $('#menu-overlay').hide();
    $('#underline-bar').css({
        width: 0
    });
    currentTabId = false;
    $currentTab = false;

    // Hide all tabs content
    // 2. Move other tabs to their right position
    $('.item-holder').each(function (index, el) {
        setTimeout(function () {
            $(el).removeClass('move-left').removeClass('move-right');
            $(el).addClass('hide');
        }, 300);
    });
}

function toggleMenu() {
    if (!isMenuOpen) {
        openMenu();
    } else {
        closeMenu();
    }
    isMenuOpen = !isMenuOpen;
}
