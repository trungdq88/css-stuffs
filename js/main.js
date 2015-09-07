var isMenuOpen = false;
var toggleElements;
var currentTab;

$(function () {

    toggleElements = [
        $('#main'),
        $('header'),
        $('#menu-overlay'),
        $('#front-content'),
        $('.item-holder'),
        $('#underline-bar')
    ];

    $('#menu-overlay').click(toggleMenu);
    $('#menu a').click(function () {
        var link = $(this).attr('href');

        // Move the underline bar
        $('#underline-bar').css({
            left: $(this).offset().left,
            width: $(this).width() + 40
        });

        if (currentTab && currentTab != link) {
            // Retain the menu
            currentTab = link;
        } else {
            currentTab = link;
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
    $('#underline-bar').css({width: 0});
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