/* VARIABLES */

let player, floor;
let objects = [];
let gravity = 1;
let ms;
let increment; 
let score; 

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImage = loadImage("assets/gradient (1).png");
  font = loadFont("assets/Source_Code_Pro/SourceCodePro-VariableFont_wght.ttf");
}

/* SETUP RUNS ONCE */
function setup() {
  new Canvas(600, 300);
  backgroundImage.resize(9600, 0);
  world.gravity.y = 10;

  player = new Sprite();
  player.diameter = 30;
  player.x = 100;
  player.y = 225;
  player.vy = 0;
  //player.gravity = 2;

  floor = new Sprite(0, 270, 1200, 60, 'static');

  object = new Sprite(random(500, 700), 225, 30, 30, 'k');
  object.vel.x = -3;

  increment = 0; 
  score = 0; 
}

/* DRAW LOOP REPEATS */
function draw() {
  
  increment -= 0.1
  background("white");
  image(backgroundImage, increment, 0, width, height);
  textFont(font);
  textStyle(BOLD);
  textSize(15);
  fill("black");
  text("Score:" + score, 10, 20);
  text("Welcome to FIND HOPE. \nYour goal is to find the \nlight and overcome 25 obstacles.\nPress the spacebar to make\nthe player jump", width - 300, 20);

  if(kb.presses(' ')){
    player.velocity.y = -7;
    player.velocity.y += gravity;
  }
  
  if(object.x <= 0){
    object.x = random(width) + 300;
    object.y = 225;
    object.vel.x = -3;
    object.direction = "left";
    score += 1;
  } 

  if(object.collided(player)){
    background('white');
    object.x = -100;
    player.x = -100;

    textFont(font);
    textStyle(BOLD);
    textSize(15);
    text("GAME OVER\nClick to restart the game!", width/2 - 75, height/2);
    
    noLoop();
    // if(mouse.presses()){
    //   background('green');
    //   player.x = 100;
    //   object.x = random(width) + 200;
    //   object.vel.x = -3;
    //   object.direction = "left";
    // }
    
  }
  if(score == 25){
    textFont(font);
    textStyle(BOLD);
    textSize(30);
    text("You won the game!", width/2 - 100, height/2);
    noLoop();
  }
}
