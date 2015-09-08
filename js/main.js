var isMenuOpen = false;
var toggleElements;
var currentTab;

function getElementPosition(array, anchor, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return i < [].indexOf.call(array, anchor) ? 'left' : 'right';
        }
    }
    return 'unknown';
}

$(function () {

    var tabs = $('.tab-item').map(function (index, el) {
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
        $('#underline-bar').css({
            left: $(this).offset().left,
            width: $(this).width() + 40
        });

        // Decide to close the menu or switch to other tabs
        if (currentTab && currentTab != tabId) {
            // Move to other tabs
            currentTab = tabId;
        } else {
            currentTab = tabId;
            toggleMenu();
        }

    });
});

function openMenu() {
    $('#menu-overlay').show();
    toggleElements.forEach(function (element) {
        element.removeClass('no-back-anim');
        element.addClass('open-menu');
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
    currentTab = false;
}

function toggleMenu() {
    if (!isMenuOpen) {
        openMenu();
    } else {
        closeMenu();
    }
    isMenuOpen = !isMenuOpen;
}

function moveTab() {
    $('#holder-1').addClass('move-left');
    setTimeout(function () {
        $('#holder-1').addClass('hide');
    }, 100);
    $('#holder-2').removeClass('hide');
    setTimeout(function () {
        $('#holder-2').removeClass('move-right');
    }, 100);

}