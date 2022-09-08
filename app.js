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
const player1Score = (document.getElementById("score-1").innerText = score1);
const player2Score = (document.getElementById("score-2").innerText = score2);

// add event listener to canvas,
// referring to the canvas cross axis created above,
// gives ability  to track exactly where the mouse is clicking on the canvas element
// measures distance from browser window, so have to minus canvas position from browser
// there is a JS method - getBoundingClientRect()
startButton.addEventListener("click", startGameFunc);

function startGameFunc() {
  let gameFrame = 0;

  // The Element.getBoundingClientRect() method returns a DOMRect object,
  // providing information about the size of an element and its position relative to the viewport.
  // Need this to make sure we get the appriate numbers from mousedown event relative to canvas element

  let canvasLocation = canvas.getBoundingClientRect();

  // mouse object ability to use the mouse to play game

  const mouse = {
    // gives a cross axis by dividing the canvas
    x: canvas.width / 2,
    y: canvas.height / 2,
    //   to see if mouse has been used
    click: false,
  };

  canvas.addEventListener("mousedown", function (e) {
    // when you click the mouse, changes from default false in mouse object to true
    mouse.click = true;
    mouse.x = e.x - canvasLocation.left;
    mouse.y = e.y - canvasLocation.top;
    //   console.log(e);
    //   console.log(mouse.x);
    //   console.log(mouse.y);
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
  const playerSprite1 = new Image();
  playerSprite1.src = "./images/mermaid-sprite.png";
  const playerSprite2 = new Image();
  playerSprite2.src = "";

  class Players {
    constructor() {
      this.x = canvas.width;
      this.y = canvas.height / 2;
      // use to position sprite character to face certain direction
      this.radius = 50;
      this.angle = 0;
      // coordinates of currently displayed frame in spritesheet
      this.frameX = 0;
      this.frameY = 0;
      // keeps track of overall number of frames
      this.frame = 0;
      // width of single frame from character sprite sheet
      // divide pixel width by amount of columns
      this.spriteWidth = 32;
      // divide pixel height by amount of rows
      this.spriteHeight = 48;
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
      // built in drawimage, can pass it 3, 5, or 9 arguments
      // using 9 here, first is image you want to draw
      //next 4 are the area to crop, last 4 define where you want image to go on canvas
      context.drawImage(
        playerSprite1,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 18,
        this.y - 18,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }

  const player = new Players();

  // bubbles to pop
  const bubblesArr = [];

  class Bubble {
    constructor() {
      this.x = Math.random() * canvas.width;
      // bubbles start from bottom, out of view
      this.y = canvas.height + 100;
      this.radius = 50;
      // give random speed to each bubble
      this.speed = Math.random() * 5 + 1;
      this.distance;
      this.counted = false;
      // bubble pop sounds, pick between two at random with ternanry operator
      this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    }
    //   collision detection
    update() {
      // bubble goes up and down on y axis, at a random speed
      this.y -= this.speed;
      // calcuate distance between player and bubble
      const distanceX = this.x - player.x;
      const distanceY = this.y - player.y;
      this.distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
    draw() {
      context.fillStyle = "blue";
      context.beginPath();
      // circle shape
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // fill the circle
      context.fill();
      // close the path
      context.closePath();
      context.stroke();
    }
  }

  // bubble pop sound elements

  const bubbleSound1 = document.createElement("audio");
  // bubbleSound1.src = "./sounds/Plop.ogg";
  const bubbleSound2 = document.createElement("audio");
  // bubbleSound2.src = "./sounds/bubbles-single3.wav";

  function handleBubbles() {
    // run this code every 50 frames
    if (gameFrame % 50 === 0) {
      // add a new bubble to the bubles array
      bubblesArr.push(new Bubble());
    }
    //   loop through bubbles array and call the update and draw method for each bubble
    for (let i = 0; i < bubblesArr.length; i++) {
      bubblesArr[i].update();
      bubblesArr[i].draw();
      // if bubble is out of canvas, splice it out, otherwise you'd have a huge array of bubbles
      if (bubblesArr[i] < 0) {
        bubblesArr.splice(i--, 1);
      }
      // collision detection and bubble removal
      if (bubblesArr[i].distance < bubblesArr[i].radius + player.radius) {
        //   console.log("collision");
        //   make sure the bubbles don't count for too many points on each collision
        if (!bubblesArr[i].counted) {
          // bubble pop sounds
          if (bubblesArr[i].sound === "sound1") {
            bubbleSound1.play();
          } else {
            bubbleSound2.play();
          }
          score1++;
          bubblesArr[i].counted = true;
          bubblesArr.splice(i--, 1);
        }
      }
    }
  }

  // animation loop
  function animation() {
    // clear canvas after each frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    //   invoke bubbles function to add a bubble every 50 frames
    handleBubbles();
    player.updatePosition();
    player.draw();
    //   increment the game frame, increases endlessly as game runs
    //   use to add periodic events to game
    gameFrame++;
    //   console.log(gameFrame);
    //   built in JS method. Creates a recursive loop
    requestAnimationFrame(animation);
  }

  animation();
}
