let WINDOW_WIDTH = 0;

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

    WINDOW_WIDTH = window.outerWidth;
    setCssByDevice(window.outerWidth);
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
        document.getElementById('home'),
        document.getElementById('menu'),
    ];



    let svg_elements = [
        document.getElementById('player_line_line'),
        document.getElementById('player_line_rect')
    ];

    if (play != null) {
        background_img.style.opacity = 1;
        play.id = 'pause_disabled';

        timer(); // Запуск секундомера песни

        changeTextToValue(play, 'PAUSE');
        changeTextsColor(texts, "#FFFFFF");
        changeSVGColor(svg_elements, "#FFFFFF");
    } else if (pause != null) {
        background_img.style.opacity = 0;
        pause.id = 'play_disabled';

        clearTimeout(t); // Остановка секундомера паузы

        changeTextToValue(pause, 'PLAY');
        changeTextsColor(texts, "#ABABAB");
        changeSVGColor(svg_elements, "#ABABAB");
    }
}

function changeTextsColor(elements, color) {
    elements.forEach(element => {
        if (element != null) {
            element.style.color = color;
        }
    });
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
            letterSpeed: 70,
            callback: () => {
                let id = element.id;
                    let re = /_disabled/gi;
                element.id = id.replace(re, '');
            }
        });
    })();
}

function volumeLessButton() {
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');

    if (play != null) {
        document.getElementById('volume_less').style.color = '#e3dede';
    } else if (pause != null) {
        document.getElementById('volume_less').style.color = '#3a3a3a';
    }

    if ((BRIGHTNESS_VALUE - 10) >= 0) {
        BRIGHTNESS_VALUE -= 10;
    }
    let backgroung_img = document.getElementById("site_area");
    backgroung_img.style.filter = `brightness(${BRIGHTNESS_VALUE*2}%)`

    setTimeout(() => {
        if (play != null) {
            document.getElementById('volume_less').style.color = null;
        } else if (pause != null) {
            document.getElementById('volume_less').style.color = null;
        }
    }, 150);
}

function volumeUpButton() {
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');

    if (play != null) {
        document.getElementById('volume_up').style.color = '#e3dede';
    } else if (pause != null) {
        document.getElementById('volume_up').style.color = '#3a3a3a';
    }



    if ((BRIGHTNESS_VALUE + 10) <= 100) {
        BRIGHTNESS_VALUE += 10;
    }
    let backgroung_img = document.getElementById("site_area");
    backgroung_img.style.filter = `brightness(${BRIGHTNESS_VALUE*2}%)`

    setTimeout(() => {
        if (play != null) {
            document.getElementById('volume_up').style.color = null;
        } else if (pause != null) {
            document.getElementById('volume_up').style.color = null;
        }
    }, 150);
}

window.onresize = function( event ) {
    setCssByDevice(event.srcElement.outerWidth);
};

function setCssByDevice(width) {
    let elements = [
        document.getElementById('menu'),
        document.getElementById('home'),
        document.getElementById('site_center'),
        document.getElementById('text_donda'),
        document.getElementById('player_wrapper'),
        document.getElementById('countdown'),
        document.getElementById('countdown_back'),
        document.getElementById('site_footer'),
        document.getElementById('play'),
        document.getElementById('pause'),
        document.getElementById('volume'),
        document.getElementById('ask'),
        document.getElementById('player_text'),
        document.getElementById('countdown_wrapper')
    ];

    if (width < 500) {
        elements.forEach(element => {
            if (element != null) {
                let class_name = element.className;
                let re = /pc/gi;
                element.className = class_name.replace(re, 'mobile');
            }
        });

        document.getElementById('player_line').width.baseVal.value = 300;
        document.getElementById('player_line_line').x2.baseVal.value = 300;
        if (document.getElementById('play') != null) {
            document.getElementById('site_footer').insertBefore(document.getElementById('player_wrapper'), document.getElementById('play'));
        } else  if (document.getElementById('pause') != null) {
            document.getElementById('site_footer').insertBefore(document.getElementById('player_wrapper'), document.getElementById('pause'));
        }
    } else {
        elements.forEach(element => {
            if (element != null) {
                let class_name = element.className;
                let re = /mobile/gi;
                element.className = class_name.replace(re, 'pc');
            }
        });
        document.getElementById('player_line').width.baseVal.value = 123;
        document.getElementById('player_line_line').x2.baseVal.value = 123;
        document.getElementById('site_center').appendChild(document.getElementById('player_wrapper'));
    }
}

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

    if (home != null && document.getElementById('pause')) {
        playButton();
    }
}


