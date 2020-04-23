// Music visualisate
const music_tracks = $(".music-toogle .track");

function musicVisualizate() {

    let music_track_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(music_track_array);

    each(
        tr=> {
            let track = music_tracks.eq(tr);

            let height = music_track_array[tr * 10] / 7;
            height = height > 5 ? height : 5;
            
            css(
                track, {
                    height: height,
                    y: 50 - height,
                    transition: "0s"
                }
            );

        },
    music_tracks);

}

const ecta = new Ecta({
    canvas: {
        element: document.querySelector(".main_canvas"),
        create: false
    }
});
let reacts_heigth = [
    0,
    -500,
    -1000
];
function rects() {

    for (let i = 3; i --;) {
        let w = innerWidth / 3;
        reacts_heigth[i] = ecta.lerp(reacts_heigth[i], ecta.height - i * 100 + 300, .5);

        ecta.fill("#fff");
        ecta.rect(
            i * w - 2,
            0,
            w + 4,
            reacts_heigth[i]
        );

    }
    
}

// Scroll process
const 
    scroll_circle = $(".circle_scroll-process"),
    circle_width = 2 * Math.PI * 24;
let offset = 0;

css(
    scroll_circle, {
        "stroke-dasharray": circle_width + " " + circle_width,
        "stroke-dashoffset" : circle_width,
        "transform-origin": "center center",
        transform: "rotate(-90deg)"
    }
);

function setProcess(percent) {

    offset = circle_width - percent / 100 * circle_width;

    css(
        scroll_circle, {
            "stroke-dashoffset": offset
        }
    );

    if (section === 4)
        css(
            $(".scroll-process"), {
                opacity: 1
            }
        );
    else
        css(
            $(".scroll-process"), {
                opacity: 0
            }
        );

}

let dt = 0;
let clear_rect_width = 0;
function loop() {
    requestAnimationFrame(loop);
    dt += section >= 2 ? .1 : 0;

    if (music_playing)
        musicVisualizate();

    if (section === 2) {
        ecta.clear();
        clear_rect_width = 0;
    }
    else if (section > 2 || section === 1) {
        clear_rect_width = ecta.lerp(clear_rect_width, ecta.width + 100, .5);
        ecta.clear(0, 0, clear_rect_width, innerHeight);
    }
    
    if (section === 2)
        rects();
    else {
        reacts_heigth[0] = 0;
        reacts_heigth[1] = -500;
        reacts_heigth[2] = -1000;
    }

    let h = document.querySelector(".sec4").scrollHeight - win.height();
    setProcess(
        100 - (h - $(".sec4").scrollTop()) / h * 100
    );

}
loop();

function setDefHeaderColor(color="dark") {
    color === "dark" ? 
        $(".header").addClass("dark")
        :
        $(".header").removeClass("dark");
}

const fades = $(".fade");
function updateFades() {
    each(
        fd=> {
            
            setFadeTo(
                $(`.sec${ section + 1 } .fade.top, .sec${ section - 1 } .fade.top`).eq(fd),
                "top",
                "off"
            );
            setFadeTo(
                $(`.sec${ section + 1 } .fade.bottom, .sec${ section - 1 } .fade.bottom`).eq(fd),
                "bottom",
                "off"
            );
            setFadeTo(
                $(`.sec${ section + 1 } .fade.opacity, .sec${ section - 1 } .fade.opacity`).eq(fd),
                "opacity",
                "off"
            );
            delay(
                ()=> {

                    setFadeTo(
                        $(`.sec${ section } .fade.top`).eq(fd),
                        "n",
                        "on"
                    );
                    setFadeTo(
                        $(`.sec${ section } .fade.bottom`).eq(fd),
                        "n",
                        "on"
                    );
                    setFadeTo(
                        $(`.sec${ section } .fade.opacity`).eq(fd),
                        "opacity",
                        "on"
                    );

                },
            1000)

        },
    $(".fade"));
}
function setFadeTo(selector, dir="top", active) {

    if (active === "on") {
        
        css(
            selector, {
                opacity: 1
            }
        )

    } 
    else if (active === "off") {
        
        css(
            selector, {
                opacity: 0
            }
        )

    } 

    if (dir === "n" && active === "on") {
        
        css(
            selector, {
                transform: "translate(0, 0)"
            }
        )

    } 

    if (dir === "top") {

        css(
            selector, {
                transform: "translateY(-20px)"
            }
        );
        
    }
    else if (dir === "bottom") {

        css(
            selector, {
                transform: "translateY(20px)"
            }
        );
        
    }
    else if (dir === "opacity") {

        css(
            selector, {
                transform: "translate(-50%, -50%)"
            }
        );
        
    }
    else if (dir === "opacity" && active === "off") {
        
        delay(
            ()=> {

                css(
                    selector, {
                        display: "none"
                    }
                );

            },
        600);

    }
}