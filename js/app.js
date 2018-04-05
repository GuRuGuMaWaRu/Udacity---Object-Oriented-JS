// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.startingPoints = [63, 146, 229];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x > 505) {
    var randomStart = Math.floor(Math.random() * 3);

    this.x = 0;
    this.y = this.startingPoints[randomStart];
    this.speed = Math.floor(Math.random() * (120 - 50)) + 50;
  }
  this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.stepY = 83;
  this.stepX = 101;
  this.direction = "none";
};

Player.prototype.update = function() {
  // console.log("x", this.x);
  // console.log("y", this.y);
  if (this.direction === "left") {
    if (this.x - this.stepX > -40) {
      this.x = this.x - this.stepX;
    } else {
      // console.log(`x: ${this.x}; y: ${this.y}`);
    }
  } else if (this.direction === "right") {
    if (this.x + this.stepX < 505) {
      this.x = this.x + this.stepX;
    } else {
      // console.log(`x: ${this.x}; y: ${this.y}`);
    }
  } else if (this.direction === "up") {
    if (this.y - this.stepY > -40) {
      this.y = this.y - this.stepY;
    } else {
      // console.log(`x: ${this.x}; y: ${this.y}`);
    }
  } else if (this.direction === "down") {
    if (this.y + this.stepY < 471) {
      this.y = this.y + this.stepY;
    } else {
      // console.log(`x: ${this.x}; y: ${this.y}`);
    }
  }
  this.direction = "none";
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      this.direction = "left";
      return;
    case "right":
      this.direction = "right";
      return;
    case "up":
      this.direction = "up";
      return;
    case "down":
      this.direction = "down";
      return;
    default:
      this.direction = "none";
      return;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(303, 388);
var enemy1 = new Enemy(0, 63, 50);
var enemy2 = new Enemy(303, 146, 60);
var enemy3 = new Enemy(101, 229, 70);

var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
