// log of moving
var log = document.getElementById('log');

// main constructor

var Mover = function(strategy) {
  this.strategy = strategy;
};

// prototype

Mover.prototype.move = function() {
  return this.strategy();
};

// strategies

var Strategy1 = function() {
  log.innerHTML = log.innerHTML +'<br /> move1 ';
};

var Strategy2 = function() {
  log.innerHTML = log.innerHTML + '<br /> move2 ';
};

var Strategy3 = function() {
 log.innerHTML = log.innerHTML + '<br /> move3 ';
};

// init + out
var moveStrategy1 = new Mover (Strategy1);
var moveStrategy2 = new Mover (Strategy2);
var moveStrategy3 = new Mover (Strategy3);

moveStrategy1.move();
moveStrategy2.move();
moveStrategy3.move();
