var isMenuOpen = false;
var toggleElements;

$(function () {

    toggleElements = [
        $('#main'),
        $('header'),
        $('#menu-overlay'),
        $('#front-content')
    ];

    $('#menu-overlay').click(toggleMenu);
    $('#menu').click(toggleMenu);
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
}

function toggleMenu() {
    if (!isMenuOpen) {
        openMenu();
    } else {
        closeMenu();
    }
    isMenuOpen = !isMenuOpen;
}