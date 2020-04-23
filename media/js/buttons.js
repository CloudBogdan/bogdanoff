const buttons = $(".button");

each(
    button=> {
        let btn = buttons.eq(button);

        btn.append(`
            <span class="wave"></span>
        `);

        on_m_move_else(
            e=> {
                let size = max(btn.width(), btn.height()) + 50;

                css(
                    btn.children(".wave"), {
                        transform: `translate(-50%, -50%) scale(${ size / 5 })`,
                        left: e.clientX - btn.offset().left,
                        top: e.clientY - btn.offset().top
                    }
                );
                css(
                    $(".header .button.fill").eq(button).children(".wave"), {
                        top: e.clientY - btn.offset().top + win.scrollTop()
                    }
                );

            },
            ()=> {

                css(
                    btn.children(".wave"), {
                        transform: `translate(-50%, -50%) scale(0)`,
                    }
                );

            },
        btn);
        
    },
buttons);
