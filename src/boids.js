var canvas;
var context;
var sineDot;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.font = "11px Arial";

    sineDot = new Dot(0, canvas.height / 2, 0.2);
    sineDot.render();

    loop();
};

function Dot(x, y , v) {
    this.x = x;
    this.y = y;
    this.v = v;
};

Dot.prototype.render = function() {
    context.fillRect(this.x, this.y, 5, 5);
};

Dot.prototype.move = function(delta) {
    this.x = this.x + (this.v * delta);
    if (this.x > canvas.width) {
	// move back to other side of the canvas
	this.x = canvas.width - this.x;
    }
};

function loop(fps) {
    var timeNow = new Date().getTime();
    var interval = 1000 / fps;
    var timePrevious = timeNow;
    var fpsTime = 0;
    var fps = 0;
    
    setInterval(function() {

	timeNow = new Date().getTime();
	
	var delta = timeNow - timePrevious;

	fpsTime = fpsTime + delta;
	fps++;

	if (fpsTime >= 1000) {
	    // context.fillText("FPS: " + fps, canvas.width - 30, canvas.height - 30);
	    console.log("FPS: " + fps);
	    fpsTime = 0;
	    fps = 0;
	}

	timePrevious = new Date().getTime();

	update(delta);
	render();

    }, interval);
};

function update(delta) {
    sineDot.move(delta);
};

function render() {
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    sineDot.render();
};
