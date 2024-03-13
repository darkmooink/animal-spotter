// JavaScript Document

var minimumSpeedF = 1;
var maximumSpeedF = 20;
var minimumSpeedS = 0;
var maximumSpeedS = 2;
var minimumAnimals = 10;
var maximumAnimals = 10;
var beforeEnd = 5000; //last animal created at least ms before end
var length = 20000;
setTimeout("var win = document.getElementById('window1');",100);
var qty = 0;
var time = 100;
var total = 0;
var minR = 0;
var minG = 0;
var minB = 0;
var maxR = 0;
var maxG = 0;
var maxB = 0;
var settings = 0;
var	buffer = 30;  //the ammount of pixels from each side that the animal will not appear in+
var recording;
var timers = new Array()

function createAnimal(){
	animal = createAnimal(getColor(1), getColor(2), getColor(3));
	return animal;
}

function createAnimal(r,g,b){
	var color = new Array();
	color[0] = r;
	color[1] = g;
	color[2] = b;
	animal = createAnimal(color);
	return animal
}

function createAnimal(color){
	var animal = document.createElement("div");
	animal.id = "animal"+qty
	animal.className = "animal";
	animal.innerHTML = "&nbsp;";
	animal.style.backgroundColor = "rgb("+getColor(1)+", "+getColor(2)+", "+getColor(3)+")";
	win.appendChild(animal);
	qty++;
	return animal;
}


function moveAnimal(animal, down, right, time){
	if (animal.left == null || animal.top == null){
		animal.left = animal.offsetLeft;
		animal.top = animal.offsetTop;
	}
	animal.left += parseFloat(right);
	animal.top += parseFloat(down);
	animal.style.left = Math.floor(animal.left) + "px";
	animal.style.top = Math.floor(animal.top) + "px";
	if (animal.offsetTop + animal.offsetHeight < 0 || animal.offsetTop > animal.parentNode.offsetHeight || 
		animal.offsetLeft + animal.offsetWidth < 0 || animal.offsetLeft > animal.parentNode.offsetWidth){
			//console.log("test");
			animal.parentNode.removeChild(animal)
		}else
	if (time>0){
		setTimeout(function(){moveAnimal(animal, down, right, time)}, time);
	}
}



function placeNewAnimal(animal, pos, side){
	wWidth = animal.parentNode.offsetWidth;
	wHeight = animal.parentNode.offsetHeight;
	switch(side) {
		case 1:
			//top
			if (pos > wWidth-buffer || pos < buffer){
				pos = getNewPointOnSide(wWidth, animal.offsetWidth, buffer)
			}
			animal.style.left = pos + "px";
			animal.style.top = -animal.offsetHeight + "px";
			break;
			
		case 2:
			//bottom
			if (pos > wWidth-buffer || pos < buffer){
				pos = getNewPointOnSide(wWidth, animal.offsetWidth, buffer)
			}
			animal.style.left = pos + "px";
			animal.style.top = wHeight + "px";
			break;
			
		case 3:
			//left
			if (pos > wHeight-buffer || pos < buffer){
				pos = getNewPointOnSide(wHeight, animal.offsetHeight, buffer)
			}
			animal.style.top = pos + "px";
			animal.style.left = -animal.offsetWidth + "px";
			break;
			
		case 4:
			//right
			if (pos > wHeight-buffer || pos < buffer){
				pos = getNewPointOnSide(wHeight, animal.offsetHeight, buffer)
			}
			animal.style.top = pos + "px";
			animal.style.left = wWidth + "px";
			break;
			
			break;
		default:
			break;
	}
	return side
}



function runAnimal(timeout){
		animal = createAnimal();
	side = Math.floor((Math.random()*4)+1)
	//side = 1;
	point = getPointOnSide(animal, side, buffer);
	placeNewAnimal(animal, point, side);	
	vec = getRandVector(side);
	jslog = "setTimeout(function(){animal = createAnimal();placeNewAnimal(animal, "
	jslog += point+", "+side+");moveAnimal(animal, "+vec[0]
	jslog += ", "+vec[1]
	jslog += ", "
	jslog += time
	jslog += ");}, "
	jslog += timeout+");";
	recording += jslog;
	
	moveAnimal(animal, vec[0], vec[1], time);
}


function run(){
	document.getElementById("run").disabled = "true";
	total = (maximumAnimals - minimumAnimals);
	total = Math.random()* total;
	total = total + parseInt(minimumAnimals);
	total = Math.floor(total);
	for (var i = 0; i < total;i++){
		var timesp = Math.floor(Math.random()*(length - beforeEnd));
		
		setTimeout("runAnimal("+timesp+")",timesp);
		//total = i;
	}
	setTimeout("end()", length);
	recording = ("setTimeout(\"end()\", "+length+");");
}
function end(){
	win.innerHTML = "";
	document.getElementById("run").disabled = "";
	qty = 0;
	document.getElementById("recording").value = recording;
	alert("fin");
}

