var SECTION_HEIGHT = 700;
/**
 * Index of the current section
 * @type {number}
 */
var currentSection = 0;
/**
 * Index of the previous section
 * @type {number}
 */
var previousSection = -1;
var $sections;
var sections;
/**
 * Handling scroll
 */
var lastAnimation;

function getElementPosition(array, anchor, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return i < [].indexOf.call(array, anchor) ? 'left' : 'right';
        }
    }
    return 'unknown';
}

/**
 * Magic happens here
 * @param isMoveForward
 */
function moveSections(isMoveForward) {
    if (isMoveForward == undefined) isMoveForward = true;

    // Move section boundaries
    $sections.each(function (index, section) {
        var timingIndex = isMoveForward ? index : $sections.length - index - 1;
        // var timingIndex = index;
        setTimeout(function () {
            $(section).css({
                top: (- currentSection + index) * 90 + 'vh'
            });
        }, 100 * timingIndex + (isMoveForward ? 0 : 100));
        setTimeout(function () {
            $(section).css({
                bottom: ((currentSection - index) * 90 + 10) + 'vh'
            });
        }, 100 * timingIndex + (isMoveForward ? 100 : 0))
    });

    // Handle show/hide effect for items in previous section
    // and current (being shown) section
    var $previousSection = $($sections[previousSection]);
    if ($previousSection) {
        // Handle item move direction
        if (isMoveForward) {
            $previousSection.removeClass('backward');
        } else {
            $previousSection.addClass('backward');
        }
        $previousSection.removeClass('show');
    }
    var $currentSection = $($sections[currentSection]);
    if ($currentSection) {
        // Handle item move direction
        if (isMoveForward) {
            $currentSection.removeClass('backward');
        } else {
            $currentSection.addClass('backward');
        }
        $currentSection.addClass('show');
    }


    // Update section positions
    $sections.each(function (index, section) {
        $(section).removeClass('show');

        if (index < currentSection) {
            $(section).addClass('above');
            $(section).removeClass('bellow');
        } else if (index > currentSection) {
            $(section).removeClass('above');
            $(section).addClass('bellow');
        } else {
            $(section).removeClass('above');
            $(section).removeClass('bellow');
        }
    });
}

function next() {
    if (currentSection < $sections.length - 1) {
        previousSection = currentSection;
        currentSection++;
        moveSections(true);
    }
}
function previous() {
    if (currentSection > 0) {
        previousSection = currentSection;
        currentSection--;
        moveSections(false);
    }
}
function moveToSectionId(id) {
    var currentSessionId = "section" + (currentSection + 1);
    var isMoveForward = getElementPosition(sections, currentSessionId, id) == 'right';
    previousSection = currentSection;
    currentSection = [].indexOf.call(sections, id);
    moveSections(isMoveForward);
}

function handleScroll(event) {

    event.preventDefault();
    var delta = event.wheelDelta || -event.detail;

    var deltaOfInterest = delta,
        timeNow = new Date().getTime();

    // Cancel scroll if currently animating or within quiet period
    if(timeNow - lastAnimation < 1500) {
        event.preventDefault();
        return;
    }

    if (deltaOfInterest < 0) {
        next();
    } else {
        previous();
    }

    lastAnimation = timeNow;
}

function handleHashChange() {
    var id = location.hash.replace('#', '');
    id && moveToSectionId(id);
}
function disableAnimation() {
    $sections.addClass('no-animate');
}
function enableAnimation() {
    $sections.removeClass('no-animate');
}
$(function () {
    // Define variables
    $sections = $('section');
    sections = $sections.map(function (index, el) {
        return el.id;
    });

    // Setup for first load
    disableAnimation();
    moveSections();
    setTimeout(function() {
        enableAnimation();
        handleHashChange();
    }, 1000);

    // Bind events
    $(window).on('hashchange', handleHashChange);
    $sections.click(function () {
        var id = $(this).attr('id');
        moveToSectionId(id);
    });
    document.addEventListener('mousewheel', handleScroll);
    document.addEventListener('DOMMouseScroll', handleScroll);
});
