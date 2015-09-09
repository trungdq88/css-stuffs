var SECTION_HEIGHT = 700;
var currentSection = 0;
var $sections;
var sections;

function moveSections() {
    $sections = $('section');
    $sections.each(function (index, section) {
        $(section).css({
            top: (- currentSection + index) * SECTION_HEIGHT
        })
    });
}

function next() {
    if (currentSection < $sections.length - 1) {
        currentSection++;
        moveSections();
    }
}
function previous() {
    if (currentSection > 0) {
        currentSection--;
        moveSections();
    }
}
$(function () {
    sections = $('section').map(function (index, el) {
        return el.id;
    });
    moveSections();
    $('#menu').find('a').click(function () {
        var id = $(this).attr('href').replace('#', '');
        currentSection = [].indexOf.call(sections, id);
        moveSections();
    });
});
