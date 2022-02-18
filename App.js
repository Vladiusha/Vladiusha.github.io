// let MENU_PC = 'menu_pc';
// let SITE_CENTER_PC = 'site_center_pc';
// let TEXT_DONDA_PC = 'text_donda_pc';
// let PLAYER_WRAPPER_PC = 'player_wrapper_pc';
// let COUNTDOWN_STYLE_PC = 'countdown_styles_pc';
// let SITE_FOOTER_PC = 'site_footer_pc';
// let PLAY_PC = 'play_pc';
// let VOLUME_PC = 'volume_pc';
// let ASK_PC = 'ask_pc';
//
//
// let MENU_MOBILE = 'menu_mobile';
// let SITE_CENTER_MOBILE = 'site_center_mobile';
// let TEXT_DONDA_MOBILE = 'text_donda_mobile';
// let PLAYER_WRAPPER_MOBILE = 'player_wrapper_mobile';
// let COUNTDOWN_STYLE_MOBILE = 'countdown_styles_mobile';
// let SITE_FOOTER_MOBILE = 'site_footer_mobile';
// let PLAY_MOBILE = 'play_mobile';
// let VOLUME_MOBILE = 'volume_mobile';
// let ASK_MOBILE = 'ask_mobile';


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

    setCSsByDevice(window.outerWidth);
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
        countdown_back,
        document.getElementById('home')
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
    setCSsByDevice(event.srcElement.outerWidth);
};

function setCSsByDevice(width) {
    let elements = [
        document.getElementById('menu'),
        document.getElementById('site_center'),
        document.getElementById('text_donda'),
        document.getElementById('player_wrapper'),
        document.getElementById('countdown'),
        document.getElementById('countdown_back'),
        document.getElementById('site_footer'),
        document.getElementById('play'),
        document.getElementById('volume'),
        document.getElementById('ask'),
        document.getElementById('player_text'),
        document.getElementById('countdown_wrapper')

    ];

    if (width < 1000) {
        elements.forEach(element => {
            let class_name = element.className;
            let re = /pc/gi;
            element.className = class_name.replace(re, 'mobile');
        });

        document.getElementById('player_line').width.baseVal.value = 300;
        document.getElementById('player_line_line').x2.baseVal.value = 300;
        document.getElementById('volume').style.display = 'none';
    } else {
        elements.forEach(element => {
            let class_name = element.className;
            let re = /mobile/gi;
            element.className = class_name.replace(re, 'pc');
        });
        document.getElementById('player_line').width.baseVal.value = 123;
        document.getElementById('player_line_line').x2.baseVal.value = 123;
        document.getElementById('volume').style.display = 'inline-flex';
    }
}

$("#play").on("click touchend", function() {
    alert('hello');
});

function menuButton() {
    let text_wrapper = document.getElementById('player_wrapper');
    let site_footer = document.getElementById('site_footer');
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    let volume = document.getElementById('volume');
    let ask = document.getElementById('ask');

    let elements = [
        text_wrapper,
        site_footer,
        play,
        pause,
        volume,
        ask
    ];

    let menu = document.getElementById('menu');
    let home = document.getElementById('home');

    if (menu != null) {
        elements.forEach(element => {
            if (element != null) {
                element.style.display = 'block';
            }
        })
        document.getElementById('volume').style.display = 'inline-flex';
        document.getElementById('text_donda').style.display='none';

        menu.id = 'home';
        changeTextToValue(menu, 'HOME');
    } else if (home != null) {
        home.id = 'menu';
        changeTextToValue(home, 'MENU');

        elements.forEach(element => {
            if (element != null) {
                element.style.display = 'none';
            }
        })
        document.getElementById('volume').style.display = 'none';

        document.getElementById('text_donda').style.display='block';
    }
}


