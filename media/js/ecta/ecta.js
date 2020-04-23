const Ecta = (()=>{

    let mouse = {
        x: 0,
        y: 0,
        offset: {
            x: 0,
            y: 0
        },
        movement: {
            x: 0,
            y: 0
        },
        center: {
            x: 0,
            y: 0,
            offset: {
                x: 0,
                y: 0
            }
        },

        press: false,
        move: false
    };
    let moving = false;

    setInterval(()=> {
        mouse.move = moving || false;
    });

    onmousemove = e=> {
        
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.center.x = e.clientX - innerWidth / 2;
        mouse.center.y = e.clientY - innerHeight / 2;

        mouse.movement.x = e.movementX;
        mouse.movement.y = e.movementY;
        
        moving = e.isTrusted;

    }
    onmousedown = ()=> {

        mouse.press = true;
        
        onmouseup = ()=> {

            mouse.press = false;

        };
    };
    
    class Ecta {
        constructor({
            width=innerWidth,
            height=innerHeight,
            element=document.body,
            canvas={
                element: document.createElement("canvas"),
                create: true
            },
            color="transparent"
        }={}) {

            this.element = element;
            this.cvs = canvas.element;
            this.ctx = this.cvs.getContext("2d");

            try {
                if (canvas.create)
                    this.element.appendChild(this.cvs);
            } catch(err) {
                console.warn("Element doesn't exist")
            }

            this.width = width;
            this.height = height;

            this.cvs.style.background = color;
            this.cvs.width = this.width;
            this.cvs.height = this.height;

            this.color = color;

            this.filled = false;
            this.stroked = false;

        }

        getDistance(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        }
        isDistance(a, b, radius) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) < radius;
        }
        lerp(start, end, amt) {
            amt /= 10;
            return (1 - amt) * start + amt * end;
        }

        mouse() {
            mouse.offset.x = mouse.x - this.cvs.offsetLeft;
            mouse.offset.y = mouse.y - this.cvs.offsetTop;
            mouse.center.offset.x = mouse.x - innerWidth / 2 + this.cvs.style.left;
            mouse.center.offset.y = mouse.y - innerHeight / 2 + this.cvs.style.left;
            
            return mouse;
        }

        fill(color="#000") {

            this.ctx.fillStyle = color;

            this.filled = true;

        }
        stroke(color="#000", width=1) {

            this.ctx.lineWidth = width;
            this.ctx.strokeStyle = color;

            this.stroked = true;

        }
        clear(x=0, y=0, width=this.width, height=this.height) {

            this.ctx.clearRect(x, y, width, height);

        }

        rect(x, y, width, height) {

            !height ? height = width : 0;

            this.ctx.rect(x, y, width, height);

            if (this.filled) {
                this.ctx.fill();
                this.filled = false;
            }
            if (this.stroked) {
                this.ctx.stroke();
                this.stroked = false;
            }
            this.ctx.beginPath();

        }
        ellipse(
            x, y,
            width, height,
            start=0, end=Math.PI * 2,
            angle=0
        ) {

            !height ? height = width : 0;

            this.ctx.ellipse(x, y, width, height, angle, start, end);

            if (this.filled) {
                this.ctx.fill();
                this.filled = false;
            }
            if (this.stroked) {
                this.ctx.stroke();
                this.stroked = false;
            }
            this.ctx.beginPath();

        }
        line(start_x, start_y, end_x, end_y, begin_path=true) {

            this.ctx.moveTo(start_x, start_y);
            this.ctx.lineTo(end_x, end_y);

            if (this.filled) {
                this.ctx.fill();
                this.filled = false;
            }
            if (this.stroked) {
                this.ctx.stroke();
                this.stroked = false;
            }

            if (begin_path)
                this.ctx.beginPath();

        }
    }

    return Ecta;

})();