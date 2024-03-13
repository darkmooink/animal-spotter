// JavaScript Document

function getColor(c){
	var minC = 0;
	var maxC = 0;
	switch (c){
		case 1:
			minC = minR;
			maxC = maxR;
			break;
		case 2:
			minC = minG;
			maxC = maxG;
			break;
		case 3:
			minC = minB;
			maxC = maxB;
			break;
		default:
			break;
	}
			
	var val = Math.random();
	val = val*(maxC - minC)+1;
	val = val + minC
	val = Math.floor(val);
	return val;
}


function getRandVector(side){
	var rangeS = (maximumSpeedS+1)-minimumSpeedS
	a = Math.random()*rangeS;
	a = a+minimumSpeedS;
	if (Math.floor(Math.random()*2)==0){
		a = -a;
	}
	var rangeF = ((maximumSpeedF+1)-minimumSpeedF)
	b = Math.random()*rangeF;
	b = b+minimumSpeedF;
	if (side == 2 || side == 4){
		b = -b;
	}
	
	if (side == 1 || side == 2){
		vec = [b,a];
	} else {
		vec = [a,b];
	}
	
	return vec;
}

function getNewPointOnSide(length, extra, buffer){
	pos = Math.random();
	pos= pos*(length+extra-(buffer*2));
	pos = Math.floor(pos-extra+buffer);
	return pos;
}

function getPointOnSide(animal, side, buffer){
	wWidth = animal.parentNode.offsetWidth;
	wHeight = animal.parentNode.offsetHeight;
	switch(side) {
		case 1:
			//top
				pos = getNewPointOnSide(wWidth, animal.offsetWidth, buffer);
				break;
			
		case 2:
			//bottom
				pos = getNewPointOnSide(wWidth, animal.offsetWidth, buffer);
				break;
			
		case 3:
			//left
				pos = getNewPointOnSide(wHeight, animal.offsetHeight, buffer);
				break;
			
		case 4:
			//right
				pos = getNewPointOnSide(wHeight, animal.offsetHeight, buffer);
				break;
		default:
			break;
	}
	return pos
}







function setValues(){
	var x = document.forms["settings"];
	minimumSpeedF = x["minSpeedF"].value;
	if (minimumSpeedF <= 0){
		alert("minimum forward speed must be above 0")
		minimumSpeedF = 1;
		x["minSpeedF"].value = 1;
	}
	maximumSpeedF = x["maxSpeedF"].value;
	minimumSpeedS = x["minSpeedS"].value;
	maximumSpeedS = x["maxSpeedS"].value;
	minimumAnimals = x["minAnimal"].value;
	maximumAnimals = x["maxAnimal"].value;
	beforeEnd = x["timeBuffer"].value*1000; //last animal created at least ms before end
	length = x["length"].value*1000;
	time = 1000/x["fps"].value;
	minR = x["minR"].value;
	minG = x["minG"].value;
	minB = x["minB"].value;
	maxR = x["maxR"].value;
	maxG = x["maxG"].value;
	maxB = x["maxB"].value;
	win.style.height = x["height"].value + "px"
	win.style.width = x["width"].value + "px"
	var cssStyle = document.createElement('style');
	cssStyle.type = 'text/css';
	var rules = document.createTextNode(".animal{width:"+x["widthA"].value+"px; height:"+x["heightA"].value+"px;}");
	cssStyle.appendChild(rules);
	document.getElementsByTagName("head")[0].appendChild(cssStyle);
	return false;
}

function shSettings(){
	if (settings == 0){
		document.getElementById("settingsTable").style.display = "none";
		settings = 1;
	}else if (settings == 1){
		document.getElementById("settingsTable").style.display = "table";
		settings = 0;
	}else {
		settings = 0;
		shSettings();
	}
}
