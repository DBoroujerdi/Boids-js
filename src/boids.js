var canvas;
var context;
var sineDot;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.font = "11px Arial";

    sineDot = new Dot(0, canvas.height / 2, 1);
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
    var siny = Math.sin(this.x);
    var zeroLine = canvas.height / 2;
    if (siny === 0) {
	this.y = canvas.height / 2;
    } else if (siny > 0) {
	this.y = zeroLine + (canvas.height / 2) * siny;
    } else {
	this.y = zeroLine - (canvas.height / 2) * Math.abs(siny);
    }
};

function loop(fps) {
    var timeNow = new Date().getTime();
    var interval = 1000 / fps;
    var timePrevious = timeNow;
    var fpsTime = 0;
    var fpsCount = 0;
    var fps = 0;
    
    setInterval(function() {

	timeNow = new Date().getTime();
	
	var delta = timeNow - timePrevious;

	fpsTime = fpsTime + delta;
	fpsCount++;

	if (fpsTime >= 1000) {
	    fps = fpsCount;
	    fpsTime = 0;
	    fpsCount = 0;
	}

	timePrevious = new Date().getTime();

	update(delta);
	render();
	context.fillText("FPS: " + fps, 30, canvas.height - 30);

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
