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
canvas.height = 500;

// initialze score for both players
let score1 = 1;
// let score2 = 1;
let player1Score = document.getElementById("score-1");
// let player2Score = document.getElementById("score-2");

player2Switch = false;
gameOver = false;

// levels
let level = 1;

// add event listener to canvas,
// referring to the canvas cross axis created above,
// gives ability  to track exactly where the mouse is clicking on the canvas element
// measures distance from browser window, so have to minus canvas position from browser
// there is a JS method - getBoundingClientRect()
startButton.addEventListener("click", startGameFunc);
restartButton.addEventListener("click", reload);
function reload() {
  location.reload();
}
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
  });
  canvas.addEventListener("mouseup", function (e) {
    // when your mouseclick ends, change to false
    mouse.click = false;
    mouse.x = e.x - canvasLocation.left;
    mouse.y = e.y - canvasLocation.top;
  });

  // players
  const playerSprite1 = new Image();
  playerSprite1.src = "./images/mermaid-art.png";

  // const playerSprite2 = new Image();
  // playerSprite2.src = "./images/merman-art.png";

  class Players {
    constructor(spriteImg) {
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
      this.spriteWidth = 182;
      // divide pixel height by amount of rows
      this.spriteHeight = 332;
      this.spriteImg = spriteImg;
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
        context.lineWidth = 0.1;
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
      // context.fillStyle = "purple";
      // context.beginPath();
      // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // context.fill();
      // context.closePath();
      // context.fillRect(this.x, this.y, this.radius, 10);
      // animate the spritesheet
      // this.frameX++;
      // this.frameY += this.frameX == 4 ? 1 : 0;
      // this.frameX %= 4;
      // this.frameY %= 3;
      // built in drawimage, can pass it 3, 5, or 9 arguments
      // using 9 here, first is image you want to draw
      //next 4 are the area to crop, last 4 define where you want image to go on canvas

      context.drawImage(
        this.spriteImg,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 40,
        this.y - 60,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }

  const player = new Players(playerSprite1);
  // const player2 = new Players(playerSprite2);

  // bubbles to pop
  const bubblesArr = [];
  // const bubblesArr1 = [];

  const bubbleImage = new Image();
  bubbleImage.src = "./images/bubble_pop_frame_01.png";
  // const bubbleImage2 = new Image();
  // bubbleImage2.src = "./images/bubble_pop_frame_01.png";
  class Bubble {
    constructor(spriteImg, playerNum) {
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
      this.spriteImg = spriteImg;
      this.playerNum = playerNum;
    }
    //   collision detection
    update() {
      // bubble goes up and down on y axis, at a random speed
      this.y -= this.speed;
      // calcuate distance between player and bubble

      console.log("bubble update 1");
      const distanceX = this.x - this.playerNum.x;
      const distanceY = this.y - this.playerNum.y;
      this.distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
    draw() {
      // context.fillStyle = "blue";
      // context.beginPath();
      // // circle shape
      // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // // fill the circle
      // context.fill();
      // // close the path
      // context.closePath();
      // context.stroke();
      // add bubble image, offset x + y to make sure bubble is corectly over collision area
      context.drawImage(
        this.spriteImg,
        this.x - 65,
        this.y - 65,
        this.radius * 2.5,
        this.radius * 2.6
      );
    }
  }

  // enemies

  const enemyImage = new Image();
  enemyImage.src = "./images/enemy_fish_pink.png";
  const enemyImage2 = new Image();
  enemyImage2.src = "./images/jellyfish.png";
  const enemyImage3 = new Image();
  enemyImage3.src = "./images/enemy_fish_yellow.png";
  const enemyImage4 = new Image();
  enemyImage4.src = "./images/Jellyfish.png";

  // enemy contructor

  class Enemy {
    constructor(spriteImg) {
      // where enemy is placed on canvas
      // offscreen to start on X axis
      this.x = canvas.width + 200;
      // random position on Y axis
      this.y = Math.random() * canvas.height - 150;
      this.radius = 60;
      this.speed = Math.random() * 2 + 2;
      this.frame = 0;
      this.frameX = 0;
      this.frameY = 0;
      // depends on your sprite sheet dimensions divided by # of rows and # of columns
      this.spriteWidth = 418;
      this.spriteHeight = 397;
      this.spriteImg = spriteImg;
    }
    //collision area for enemy
    draw() {
      // context.fillStyle = "red";
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // context.fill();
      // built-in draw method, 3 5 or 9 arguments
      context.drawImage(
        // enemyImage,
        this.spriteImg,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 55,
        this.y - 55,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    }
    update() {
      this.x -= this.speed;
      // move enemy from right to left
      // if enemy dissapears on edge of canvas, reposition back to other side
      if (this.x < 0 - this.radius * 2) {
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.speed = Math.random() * 2 + 2;
      }
      // show each sprite sheet image at a different frame point, animating the enemy fish
      this.frameX++;
      this.frameY += this.frameX == 4 ? 1 : 0;
      this.frameX %= 4;
      this.frameY %= 3;
      // enemy collision with player - calculate distance between two center points, compare to radius of circle
      const distanceX = this.x - player.x;
      const distanceY = this.y - player.y;
      // use pythagorean theorem to calculate (a squared + b squared = c squared)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < this.radius + player.radius) {
        gameOverFunc();
      }
    }
  }

  // create instance of enemy

  const enemy1 = new Enemy(enemyImage);
  // enemy function that invokes update and draw method
  function enemyHandler() {
    enemy1.draw();
    enemy1.update();
  }
  const enemy2 = new Enemy(enemyImage2);
  function enemyHandler2() {
    enemy2.draw();
    enemy2.update();
  }
  const enemy3 = new Enemy(enemyImage3);
  function enemyHandler3() {
    enemy3.draw();
    enemy3.update();
  }
  const enemy4 = new Enemy(enemyImage4);
  function enemyHandler4() {
    enemy4.draw();
    enemy4.update();
  }

  // game over func
  function gameOverFunc() {
    context.fillStyle = "white";
    context.font = "40px Arial";
    //  game levels shown on canvas
    if (level === 1) {
      setTimeout(() => {
        context.fillText("Level 2, Press Play to start level", 120, 100),
          (canvas.style.backgroundImage = "url('./images/water-bg-2.jpg')");
      }, 1000);
      level++;
    } else if (level === 2) {
      setTimeout(() => {
        context.fillText("Level 3, Press Play to start level", 120, 200);
        canvas.style.backgroundImage = "url('./images/water-bg-3.jpg')";
        canvas.style.backgroundSize = "800px 500px";
      }, 1000);
      level++;
    } else if (level > 2) {
      // player2Switch = true;
      setTimeout(() => {
        // context.fillText("Player 2 Start, Press Play", 120, 200);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText("GAME OVER, Score:" + (score1 - 1), 90, 100);
        canvas.style.backgroundImage =
          "url('./images/pink-background-sprites.jpg')";
      }, 1000);
      // level++;
      // } else if (level === 4) {
      //   console.log(`level ${level}`);
      //   setTimeout(() => {
      //     context.fillText("Game Over, Final Score" + (score1 - 1), 150, 300);
      //     canvas.style.backgroundImage = "url('./images/water-bg-2.jpg')";
      //   }, 1000);
      //   level++;
      // } else if (level === 5) {
      //   console.log(`level ${level}`);
      //   setTimeout(() => {
      //     context.fillText("Level 6, Press Play to start level", 120, 200);
      //   }, 1000);
      //   level++;
      // } else if (level > 5) {
      //   console.log(`level ${level}`);
      //   console.log(`game over ${score1} ${score2}`);
      //   context.clearRect(0, 0, canvas.width, canvas.height);
      //   context.fillText("GAME OVER", 120, 300);
      //   canvas.style.backgroundImage =
      //     "url('./images/pink-background-sprites.jpg')";

      //   if (score1 > score2) {
      //     console.log("scores time");
      //     context.fillText(
      //       "Player 1 Wins With a Score of " + (score1 - 1),
      //       120,
      //       100
      //     );
      //   }
      //   if (score2 > score1) {
      //     context.fillText(
      //       "Player 2 Wins With a Score of " + (score2 - 1),
      //       120,
      //       100
      //     );
      //   }
      //   if (score1 === score2) {
      //     context.fillText("It's a Tie! Score: " + (score2 - 1), 120, 100);
      //   } else {
      //     // console.log("error");
      //   }
    }
    gameOver = true;
  }

  // bubble pop sound elements

  const bubbleSound1 = document.createElement("audio");
  bubbleSound1.src = "./sounds/Plop.ogg";
  const bubbleSound2 = document.createElement("audio");
  bubbleSound2.src = "./sounds/bubbles-single3.wav";

  function handleBubbles() {
    // run this code every 50 frames
    if (gameFrame % 50 === 0 && player2Switch === false) {
      console.log("player 1 bubbles");
      // add a new bubble to the bubles array
      bubblesArr.push(new Bubble(bubbleImage, player));
    }
    //   loop through bubbles array and call the update and draw method for each bubble
    if (player2Switch === false) {
      for (let i = 0; i < bubblesArr.length; i++) {
        bubblesArr[i].update();
        bubblesArr[i].draw();
        // if bubble is out of canvas, splice it out, otherwise you'd have a huge array of bubbles
        if (bubblesArr[i] < 0) {
          bubblesArr.splice(i--, 1);
        }
        // collision detection and bubble removal
        if (bubblesArr[i].distance < bubblesArr[i].radius + player.radius) {
          //   make sure the bubbles don't count for too many points on each collision
          if (!bubblesArr[i].counted) {
            // bubble pop sounds
            if (bubblesArr[i].sound === "sound1") {
              bubbleSound1.play();
            } else {
              bubbleSound2.play();
            }
            player1Score.innerText = score1++;
            bubblesArr[i].counted = true;
            bubblesArr.splice(i--, 1);
          }
        }
      }
    }
    // player 2 collision detection +bubble removal
    // if (gameFrame % 50 === 0 && player2Switch === true) {
    //   // add a new bubble to the bubles array
    //   console.log("player 2 bubbles should start");
    //   bubblesArr1.push(new Bubble(bubbleImage2, player2));
    // }
    // //   loop through bubbles array and call the update and draw method for each bubble
    // if (player2Switch === true) {
    //   console.log("player 2 bubbles");
    //   for (let i = 0; i < bubblesArr1.length; i++) {
    //     bubblesArr1[i].update();
    //     bubblesArr1[i].draw();
    //     // if bubble is out of canvas, splice it out, otherwise you'd have a huge array of bubbles
    //     if (bubblesArr1[i] < 0) {
    //       bubblesArr1.splice(i--, 1);
    //     }
    //     if (bubblesArr1[i].distance < bubblesArr1[i].radius + player2.radius) {
    //       console.log("collision player2");
    //       //   make sure the bubbles don't count for too many points on each collision
    //       if (!bubblesArr1[i].counted) {
    //         // bubble pop sounds
    //         if (bubblesArr1[i].sound === "sound1") {
    //           bubbleSound1.play();
    //         } else {
    //           bubbleSound2.play();
    //         }
    //         // if (player2Switch === true) {
    //         player2Score.innerText = score2++;
    //         bubblesArr1[i].counted = true;
    //         bubblesArr1.splice(i--, 1);
    //       }
    // }
    // }
    // }
    // }
  }

  // animation loop
  function animation() {
    // clear canvas after each frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    //   invoke bubbles function to add a bubble every 50 frames

    if (level < 4) {
      handleBubbles();
      player.updatePosition();
      player.draw();
      enemyHandler();
    }

    if (level === 2) {
      // add another enemy for level2 //
      // console.log("2nd enemy appears");
      enemyHandler2();
    }
    if (level === 3) {
      enemyHandler4();
      enemyHandler3();
    }

    //   increment the game frame, increases endlessly as game runs
    //   use to add periodic events to game
    gameFrame++;
    // if game over = false, freeze the game animation
    if (!gameOver)
      //   built in JS method. Creates a recursive loop
      requestAnimationFrame(animation);
    if (level < 5) gameOver = false;
  }

  animation();

  // show current round number
  document.getElementById("round-1").innerText = level;
}
