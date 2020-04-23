const sections_num = 5;

const explore_button = $(".explore_button");
let section = 1;

$(document).ready(()=> {

    updateFades();

});
on_click(
    ()=> {

        section = 2;
        setDefHeaderColor("dark");

        delay(
            ()=> {

                css(
                    $(".scroll_bar"), {
                        opacity: 1
                    }
                );

            },
        800);

        scrollerUpdate();

    },
explore_button);

// Scroll
const scroller = $(".scroll_bar .scroller");
let want_scroll = true;

function scrollerUpdate() {
    
    css(
        scroller, {
            top: (300 / (sections_num - 1) * (section - 2)) + "px"
        }
    );
    css(
        $(".pages_num-list .list-item"), {
            opacity: .3
        }
    );
    css(
        $(".pages_num-list .list-item").eq(section-2), {
            opacity: 1
        }
    );

    want_scroll = false;

    delay(
        ()=> {
            want_scroll = true;
        },
    1000);

    delay(
        ()=> {
            win.scrollTop($(".sec" + section).offset().top);
        },
    800);
    updateFades();

}

on(
    e=> {
        let wheel = e.originalEvent.deltaY;

        if (section > 1 && want_scroll) {
            
            if (wheel < -2) {
                if (section === 2) {

                    section = 1;
                    scrollerUpdate();
                    css(
                        $(".scroll_bar"), {
                            opacity: 0
                        }
                    );

                }
                if (section !== 4) {
                
                    section --;
                    section < 1 ? section = 1 : 0;

                    scrollerUpdate();

                } else {

                    if ($(".sec4").scrollTop() <= 50) {

                        section --;
                        scrollerUpdate();

                    }

                }

            }
            if (wheel > 2) {

                if (section !== 4) {
                
                    section ++;
                    section > sections_num ? section = sections_num + 1 : 0;
                    
                    scrollerUpdate();

                } else {

                    if ($(".sec4").scrollTop() + win.height() >= document.querySelector(".sec4").scrollHeight - 50) {

                        section ++;
                        scrollerUpdate();

                    }

                }

            }

            if (section > 2 || section === 1)
                setDefHeaderColor("light");
            else
                setDefHeaderColor("dark");
            
        }
        
    },
    "mousewheel",
win);

on_click(
    ()=> {

        section = 5;
        scrollerUpdate();

    },
$(".scroll-process"))