
var canvasWidth = -1;
var canvasHeight = -1;

var context;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvasWidth = canvas.width
    canvasHeight = canvas.height;
    draw();
};

function draw() {
    context.fillStyle = "rgb(200,0,0)";
    context.fillRect (10, 10, 55, 50);
 
    context.fillStyle = "rgba(0, 0, 200, 0.5)"; 
    context.fillRect (30, 30, 55, 50);
};
