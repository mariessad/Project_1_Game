// Bubble pop two player game
// put entire game inside button start function so the game starts on press

const canvas = document.getElementById("canvas-1");

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

// mouse object ability to use the mouse to play game

const mouse = {
  // gives a cross axis by dividing the canvas
  x: canvas.width / 2,
  y: canvas.height / 2,
};
