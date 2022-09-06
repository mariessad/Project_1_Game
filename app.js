// Bubble pop two player game
// put entire game inside button start function so the game starts on press

const canvas = document.getElementById("canvas-1");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

// "2d", leading to the creation of a CanvasRenderingContext2D
//object representing a two-dimensional rendering context.

const context = canvas.getContext("2d");

// canvas height and width have to be the same here as CSS

canvas.width = 800;
canvas.hight = 500;

// initialze score for both players
let score1 = 0;
let score2 = 0;

let gameFrame = 0;

// The Element.getBoundingClientRect() method returns a DOMRect object,
// providing information about the size of an element and its position relative to the viewport.
// Need this to make sure we get the appriate numbers from mousedown event relative to canvas element

let canvasLocation = canvas.getBoundingClientRect();
// console.log(canvasLocation);

// mouse object ability to use the mouse to play game
// do I want to use the mouse to control this game or keyboard?
//decide later, try with mouse controls for now

const mouse = {
  // gives a cross axis by dividing the canvas
  x: canvas.width / 2,
  y: canvas.height / 2,
  //   to see if mouse has been used
  click: false,
};

// add event listener to canvas,
// referring to the canvas cross axis created above,
// gives ability  to track exactly where the mouse is clicking on the canvas element
// measures distance from browser window, so have to minus canvas position from browser
// there is a JS method - getBoundingClientRect()

canvas.addEventListener("mousedown", function (e) {
  // when you click the mouse, changes from default false in mouse object to true
  mouse.click = true;
  mouse.x = e.x - canvasLocation.left;
  mouse.y = e.y - canvasLocation.top;
  console.log(e);
  console.log(mouse.x);
  console.log(mouse.y);
});
canvas.addEventListener("mouseup", function (e) {
  // when your mouseclick ends, change to false
  mouse.click = false;
  mouse.x = e.x - canvasLocation.left;
  mouse.y = e.y - canvasLocation.top;
  //   console.log(e);
  //   console.log(mouse.x);
  //   console.log(mouse.y);
});

// players

class Players {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    // use to position sprite character to face certain direction
    this.radius = 50;
    this.angle = 0;
    // coordinates of currently displayed frame
    this.frameX = 0;
    this.frameY = 0;
    // keeps track of overall number of frames
    this.frame = 0;
    // width of single frame from character sprite sheet
    // divide pixel width by amount of columns
    this.spriteWidth = 300;
    // divide pixel height by amount of rows
    this.spriteHeight = 300;
  }
  //   method to update player position
  updatePosition() {
    const distanceX = this.x - mouse.x;
    const distanceY = this.y - mouse.y;
    // if current mouse position is not equal to player position,
    // this allows players to move left and right,
    // divide by 30 so the animation isn't too fast to see
    if (mouse.x !== this.x) {
      this.x -= distanceX / 30;
    }
    if (mouse.y !== this.y) {
      this.y -= distanceY / 30;
    }
  }
  //  draw method
  draw() {
    if (mouse.click) {
      context.lineWidth = 0.2;
      // This method of the Canvas 2D API starts a new path,
      // by emptying the list of sub-paths.
      // Call this method when you want to create a new path.
      context.beginPath();
      // start point of path
      context.moveTo(this.x, this.y);
      // end point of path
      context.lineTo(mouse.x, mouse.y);
      // connects the path when stroke is called
      context.stroke();
    }
    // player chacter sans sprite
    context.fillStyle = "purple";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.fillRect(this.x, this.y, this.radius, 10);
  }
}

const player = new Players();

// bubbles to pop
const bubblesArr = [];
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 50;
    // give random speed to each bubble
    this.speed = Math.random() * 5 + 1;
    this.distance;
  }
  //   collision detection
  update() {
    // bubble goes up and down on y axis, at a random speed
    this.y -= this.speed;
  }
}

// animation loop
function animation() {
  // clear canvas after each frame
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.updatePosition();
  player.draw();
  //   built in JS method. Creates a recursive loop
  requestAnimationFrame(animation);
}

animation();
