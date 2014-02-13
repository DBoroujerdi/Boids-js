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
    this.posx = x;
    this.posy = y;
    this.velocity = v;
};

Dot.prototype.render = function() {
    context.fillRect(this.posx, this.posy, 5, 5);
};

Dot.prototype.move = function(delta) {
    this.posx = this.posx + (this.velocity * delta);
    if (this.posx > canvas.width) {
	// move back to other side of the canvas
	this.posx = canvas.width - this.posx;
    }
    
    var x = (this.posx / canvas.width) * (2 * Math.PI);
    var y = Math.sin(x);
    this.posy = canvas.height * (y + 1) / 2;
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
