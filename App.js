let BRIGHTNESS_VALUE = 0;
let PLAYER_LINE_RECT;

let SONG_TIMELINE = 0;
let SONG_TIMELINE_STEP = 123/297;

let SONG_MIN = 4;
let SONG_SEC = 57;

let countdown, countdown_back, sec, min, sec_back, min_back, t;

$(document).ready(function () {
    countdown = document.getElementById('countdown');
    countdown_back = document.getElementById('countdown_back');
    PLAYER_LINE_RECT = document.getElementById('player_line_rect');

    sec = 0;
    min = 0;
    sec_back = 57;
    min_back = 4;

    setPlayerPosition(window.outerWidth);
});

function makeSongStep() {
    SONG_TIMELINE += SONG_TIMELINE_STEP;
    PLAYER_LINE_RECT.x.baseVal.value = SONG_TIMELINE;
}

function tick() {
    sec++;
    sec_back--;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    if (sec_back < 0) {
        sec_back = 59
        min_back--;
    }

    if (min === SONG_MIN && sec === SONG_SEC) {
        SONG_TIMELINE = 0 - SONG_TIMELINE_STEP;
        sec = 0;
        min = 0;
        makeSongStep();
        playButton();
        return true;
    }
    makeSongStep();
    return false;
}

function add() {
    let if_stop = tick();
    countdown.textContent = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
    countdown_back.textContent = "-" + (min_back > 9 ? min_back : "0" + min_back) + ":" + (sec_back > 9 ? sec_back : "0" + sec_back);
    if (!if_stop) timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function playButton() {
    let background_img = document.getElementById('site_area');

    let play = document.getElementById('play');
    let pause = document.getElementById('pause');

    let texts = [
        document.getElementById('text_donda'),
        document.getElementById('player_text'),
        document.getElementById('site_footer'),
        countdown,
        countdown_back
    ];



    let svg_elements = [
        document.getElementById('player_line_line'),
        document.getElementById('player_line_rect')
    ];

    if (play != null) {
        background_img.style.opacity = 1;
        play.id = 'pause';

        timer(); // Запуск секундомера песни

        changeTextToValue(play, 'PAUSE');
        changeTextsColor(texts, "#FFFFFF");
        changeSVGColor(svg_elements, "#FFFFFF");
    } else if (pause != null) {
        background_img.style.opacity = 0;
        pause.id = 'play';

        clearTimeout(t); // Остановка секундомера паузы

        changeTextToValue(pause, 'PLAY');
        changeTextsColor(texts, "#ABABAB");
        changeSVGColor(svg_elements, "#ABABAB");
    }
}

function changeTextsColor(elements, color) {
    elements.forEach(element => element.style.color = color);
}

function changeSVGColor(elements, color) {
    elements.forEach(element => {
        element.style.stroke = color;
        element.style.fill = color;
    })
}

function changeTextToValue(element, value_text) {
    (function loopAnimation() {
        bubbleText({
            element: element,
            newText: value_text,
            letterSpeed: 150,
        });
    })();
}

function volumeLessButton() {
    if ((BRIGHTNESS_VALUE - 10) >= 0) {
        BRIGHTNESS_VALUE -= 10;
    }
    let backgroung_img = document.getElementById("site_area");
    backgroung_img.style.filter = `brightness(${BRIGHTNESS_VALUE*2}%)`
}

function volumeUpButton() {
    if ((BRIGHTNESS_VALUE + 10) <= 100) {
        BRIGHTNESS_VALUE += 10;
    }
    let backgroung_img = document.getElementById("site_area");
    backgroung_img.style.filter = `brightness(${BRIGHTNESS_VALUE*2}%)`
}

window.onresize = function( event ) {
    setPlayerPosition(event.srcElement.outerWidth);
};

function setPlayerPosition(width) {
    let player_wrapper = document.getElementById('player_wrapper');

    if (width < 600) {
        player_wrapper.className = "player_wrapper_for_mobile";
    } else {
        player_wrapper.className = "player_wrapper_for_pc";
    }
}
