const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const abs = Math.abs;
const max = Math.max;
const min = Math.min;
const round = Math.round;
function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}
function arcctg(a, b) {
    if (a >= 0 && b > 0) return Math.PI / 2 - Math.atan(a / b);
    if (a < 0 && b > 0) return Math.PI / 2 - Math.atan(a / b);
    if (a < 0 && b <= 0) return Math.PI + Math.atan(b / a);
    if (a >= 0 && b <= 0) return 3*Math.PI/2 + Math.abs(Math.atan(a / b));
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}