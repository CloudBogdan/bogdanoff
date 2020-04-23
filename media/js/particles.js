function particlesInit(element) {
    const ecta = new Ecta({
        canvas: {
            element: element
        }
    });
    const max_distance = 80;

    class Particle {
        constructor(x, y) {

            this.x = x;
            this.y = y;
            this.vel = {
                x: 0,
                y: 0
            };
            this.old = {
                x: x,
                y: y
            };

        }

        draw() {

            this.vel.x *= .93;
            this.vel.y *= .93;
            this.x += this.vel.x;
            this.y += this.vel.y;

            ecta.fill("#fff");
            ecta.ellipse(this.x, this.y, 1.5);

        }
    }

    let particles = [];
    for (let count = 40; count --;)
        particles.push(
            new Particle(random(ecta.width / 2 - 350, ecta.width / 2 + 350), random(ecta.height / 2 - 60, ecta.height / 2 + 60))
        );
        
    let dt = 0;
    function loop() {
        requestAnimationFrame(loop);
        dt += .1;
        
        ecta.clear();

        for (let particle in particles) {
            let prt = particles[particle];
            prt.old.y = sin(dt / 30 + particle * 5) * 60 + ecta.height / 2;
            
            if (
                ecta.isDistance(
                    ecta.mouse(),
                    prt,
                    max_distance  
                )
            ) {

                prt.vel.x += (prt.x - ecta.mouse().x) / 30;
                prt.vel.y += (prt.y - ecta.mouse().y) / 30;
                
            }
            prt.vel.x += -(prt.x - prt.old.x) / 100;
            prt.vel.y += -(prt.y - prt.old.y) / 100;

            for (let j in particles) {
                let dis = ecta.getDistance(
                    particles[j],
                    prt
                )

                if (dis < 200) {
        
                    ecta.stroke(`rgba(255,255,255, ${ 1 - dis / 100 })`);
                    ecta.line(prt.x, prt.y, particles[j].x, particles[j].y);
                    
                }
                
            }

            prt.draw();
        }

    }
    loop();
}
function particlesParalaxInit(element) {
    const ecta = new Ecta({
        canvas: {
            element: element
        }
    });
        
    let dt = 0;
    function loop() {
        requestAnimationFrame(loop);
        dt += .1;
        
        ecta.clear();

        for (let i = 60; i --;) {

            let z = i / 10;
            let speed = dt / 300;
            
            ecta.fill(`rgba(${ i * 4 }, ${ i * 4 - sin(speed + i) * 30 }, 130, ${ z / 6 })`);
            ecta.ellipse(
                (ecta.width / 2 + sin(i + (speed)) * (60 + z * 50) + cos(i * 100) * 200) - (ecta.mouse().center.x / 150 * z),
                (ecta.height / 2 + cos(i + (speed)) * (60 + z * 50) + sin(i * 100) * 200) - (ecta.mouse().center.y / 150 * z),
                .5 * z
            )

        }
        
    }
    loop();


}