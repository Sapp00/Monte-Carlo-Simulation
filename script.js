var canvas = document.getElementById("drawpingPane");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");

// fill the rect
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

var active = false

var hits = 0;
var total_points = 0;

myWorker = new Worker("worker.js");

function updateCanvas(id) {
    ctx.putImageData(id, 0, 0);

    total_points += 10000;
    pi = hits / total_points * 4;
    document.getElementById("result").innerHTML = '		Total Points: '+total_points+' <br/>Points in the circle: '+hits+' <br/>Pi value: '+pi+' <br/>'
}

myWorker.onmessage = function(e) {
	//console.log("got a message!");
	//console.log(e);
	//console.log("got "+e.data.hits+" new hits");
	let msg = e.data;
	hits += msg.hits;
	updateCanvas(msg.id);

	if(active)
		myWorker.postMessage(canvasData);
}

function startSimulation(){
	myWorker.postMessage(canvasData);
}

function buttonClick(){
	active = !active;
	if(active){
		startSimulation();
	}
}