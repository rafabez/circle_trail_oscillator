let shapes = [];
let osc, playing = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    osc = new p5.Oscillator('sine');
    osc.amp(0);
    osc.start();
}

function draw() {
    background(0);

    let x = mouseX;
    let y = mouseY;
    shapes.push(new Shape(x, y));

    for (let i = shapes.length - 1; i >= 0; i--) {
        shapes[i].update();
        shapes[i].display();
        if (shapes[i].isFinished()) {
            shapes.splice(i, 1);
        }
    }

    if (playing) {
        let freq = map(x, 0, width, 100, 500);
        let amp = map(y, 0, height, 1, 0);
        osc.freq(freq);
        osc.amp(amp);
    }
}

function mousePressed() {
    if (!playing) {
        osc.amp(0.5, 0.05); // Fade in
        playing = true;
    }
}

function Shape(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.size = 0;

    this.update = function() {
        this.size += 2;
        this.alpha -= 5;
    };

    this.display = function() {
        stroke(255, this.alpha);
        strokeWeight(2);
        ellipse(this.x, this.y, this.size);
    };

    this.isFinished = function() {
        return this.alpha < 0;
    };
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
