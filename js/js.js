
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var aterrizado=null;
var y = 10; 
var v = 0;
var c = 100;
var a = g; 
var velocidad = null;
var altura = null;
var combustible = null;

window.onload = function(){
	function is_touch_device() {
	if ('ontouchstart' in window) {document.getElementById("boton").style.display="inline-block";}		
	}
	is_touch_device();
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
	document.getElementById("play").onclick=function(){play();};
	document.getElementById("pause").onclick=function(){pause();};
	document.getElementById("reset").onclick=function(){reiniciarJuego();};
	
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	start();

	var botonSmartphone = document.getElementById("boton");
	botonSmartphone.addEventListener("touchstart", handlerFunction, false);
	botonSmartphone.addEventListener("touchend", endingFunction, false);
	function handlerFunction(event) {
		motorOn();
	}
	function endingFunction(event) {
		motorOff();
	}
	
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	y +=v*dt;
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	if (y<71){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		aterrizado=true;
		finalizarJuego();
	}
}
function motorOn(){
	a=-g;
	if (timerFuel==null){
		document.getElementById("Rocket").src = "img/Rocketcopia1.png";	
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
	if (c == 0){ 
		motorOff();
	}

	if (aterrizado){
		motorOff();
	}
}
function motorOff(){
	document.getElementById("Rocket").src = "img/Rocketcopia.png";
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(2);	
}

function play() {
	stop();
	start();
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline-block";
}
function pause() {
	stop();
	document.getElementById("pause").style.display="none";
	document.getElementById("play").style.display="inline-block";
}

function finalizarJuego() {
	if (v>5) {
		document.getElementById("gameOver").style.display="inline-block";
	} else {
			document.getElementById("userWin").style.display="inline-block";
			}
}

function reiniciarJuego() {
	stop();
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline-block";
	y = 10; 
	g = 1.622;
	a = g;
	dt = 0.016683;
	c = 100;
	v = 0;
	document.getElementById("fuel").innerHTML=100;
	start();
}