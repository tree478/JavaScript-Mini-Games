//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score;
let bgcolor;
let leftImage;
let rightImage;
let coin;
let backgroundImage;


/* PRELOAD LOADS FILES */
function preload(){
  leftImage = loadImage("assets/facing_left.png");
  rightImage = loadImage("assets/facing_right.png");
  coin = loadImage("assets/coin.png");
  backgroundImage = loadImage("assets/background.png");
  font = loadFont("assets/Source_Code_Pro/SourceCodePro-VariableFont_wght.ttf");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600,400);
  winColor = "#c37755";
  bgcolor = "#fff3cc";

  //resize images
  leftImage.resize(80, 0);
  rightImage.resize(80,0);
  coin.resize(30, 0);
  backgroundImage.resize(660, 0);
  
  //Create catcher 
  catcher = new Sprite(leftImage, 200, 300, 100, 20);
  catcher.collider = 'k';
  
  //Create falling object
  fallingObject = new Sprite(coin, 100,0,100, 20);
  fallingObject.vel.y = 3;

  score = 0;
 
}

/* DRAW LOOP REPEATS */
function draw() {
  background(bgcolor);
  image(backgroundImage, 0, 0); 
  
  // Draw directions to screen
  fill(0);
  textSize(15);
  textFont(font);
  textStyle(BOLD);
  text("Score: " + score, 10, 20);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects.", width-160, 20);
  //If fallingObject reaches bottom, move back to top
  if(fallingObject.y >= height){
    fallingObject.x = random(width);
    fallingObject.y = -10;
    fallingObject.vel.y = random(2, 6);
    fallingObject.direction = "down";
    score -= 1;
  }

  //move catcher
  if(kb.pressing('left')){
    catcher.vel.x = -4;
    catcher.image = rightImage;
  }
  else if(kb.pressing('right')){
    catcher.vel.x = 4;
    catcher.image = leftImage;
  }
  else{
    catcher.vel.x = 0;
  }

  //stop catcher
  if(catcher.x < 50){
    catcher.x = 50;
  } else if(catcher.x > 550){
    catcher.x = 550;
  }

  //collisions
  if(fallingObject.collides(catcher)){
    fallingObject.y = -10;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(2, 5);
    fallingObject.direction = "down";
    score += 1;
  }

  //winning
  if(score == 15){
    background(winColor);
    fallingObject.y = -10;
    catcher.y = -100;
    text("You won the game!\nClick to restart the game!", 200, 200);
    if(mouse.presses()){
      image(backgroundImage, 0, 0);
      score = 0;
      catcher.y = 300;
      fallingObject.y = -10;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(2, 5);
      fallingObject.direction = "down";
    }
  }

}