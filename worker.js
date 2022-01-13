function setPixel(imageData, x, y, r, g, b, a) {
	x = Math.round((x+1)/2*imageData.width);
	y = Math.round((y+1)/2*imageData.height);

    let index = 4 * (x + y * imageData.width);
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function calculate(id){
	let hits = 0;

	for (i=0; i < 10000; i++){
		x = Math.random()*2-1;
		y = Math.random()*2-1;

		if (x*x+y*y <= 1){
			hits++;
			setPixel(id, x,y,255,255,255,255);
		}
		else{
			setPixel(id, x,y,255,0,0,255);
		}
	}

	let workerResult = {
		'hits': hits,
		'id': id
	}

	return workerResult;
}

onmessage = function(e) {
	//console.log('Message received from main script');

	let workerResult = calculate(e.data);

	//console.log('Posting message back to main script');
	postMessage(workerResult);
}