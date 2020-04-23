function each(func, selector) {
    selector.each(func);
}
function css(selector, styles) {
    return selector.css(styles);
}
function delay(func, delay) {
    setTimeout(func, delay);
}

// Events
function on_click(func, selector) {
    selector.on("click", func);
}

function on_m_over(func, selector) {
    selector.on("mouseover", func);
}
function on_m_out(func, selector) {
    selector.on("mouseout", func);
}
function on_m_move(func, selector) {
    selector.on("mousemove", func);
}
function on(func, event, selector) {
    selector.on(event, func);
}
// Else
function on_m_over_else(func, func2, selector) {
    selector.on("mouseover", func);
    selector.on("mouseout", func2);
}
function on_m_move_else(func, func2, selector) {
    selector.on("mousemove", func);
    selector.on("mouseout", func2);
}