/* VARIABLES */
const speed = 5;
let redHealth;
let blueHealth;
let redSpaceship; 
let blueSpaceship;

let border;
let bullet;

let redBullets = [];
let blueBullets = [];

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  //textAlign(CENTER);
  textSize(20);
  //noStroke();

  redHealth = 10;
  blueHealth = 10;

  // Set up the home screen
  background("##80c5ed");
  text("Health: " + redHealth, 10, 20);
  text("Health: " + blueHealth, 215, 20);
  
  redSpaceship = new Sprite(width*0.25, height/2);
  blueSpaceship = new Sprite(width*0.75, height/2);
  border = new Sprite(width/2, 0);

  redSpaceship.w = 60; 
  redSpaceship.h = 40;
  redSpaceship.collider = 'd';
  redSpaceship.color = "red";

  blueSpaceship.w = 60;
  blueSpaceship.h = 40; 
  blueSpaceship.collider = 'd';
  blueSpaceship.color = "blue";

  border.w = 10;
  border.h = 800;
  border.collider = 's';
  border.color = 'black';

}

/* DRAW LOOP REPEATS */
function draw() {

  background("#80c5ed");
  text("Health: " + redHealth, 10, 20);
  text("Health: " + blueHealth, 215, 20);

  if (kb.pressing('up')){
    blueSpaceship.vel.y = -5;
  } else if (kb.pressing('down')){
    blueSpaceship.vel.y = 5;
  } else {
    redSpaceship.vel.y = 0;
    blueSpaceship.vel.y = 0;
  }

  if(kb.pressing('t')){
    redSpaceship.vel.y = -5;
  } else if(kb.pressing('g')){
    redSpaceship.vel.y = 5;
  } else{
    redSpaceship.vel.y = 0;
  }

  if(kb.presses('f')){
    let bullet = {
      x: redSpaceship.x,
      y: redSpaceship.y
    }
    redBullets.push(bullet);
  }

  for(let bullet of redBullets){
    circle(bullet.x, bullet.y, 10);
    bullet.x += 3;
  }

  if(kb.presses('control')){
    let bullet = {
      x: blueSpaceship.x,
      y: blueSpaceship.y
    }
    blueBullets.push(bullet);
  }

  for(let bullet of blueBullets){
    bullet.x -= 3;
    circle(bullet.x, bullet.y, 10);
  }

  for(let bullet of redBullets){
    let distance = dist(bullet.x, bullet.y, blueSpaceship.x, blueSpaceship.y);
    if(distance < 5){
      redBullets.splice(redBullets.indexOf(bullet), 1);
      blueHealth -= 1;
    }
  }

  for(let bullet of blueBullets){
    let distance = dist(bullet.x, bullet.y, redSpaceship.x, redSpaceship.y);
    //console.log(distance);
    if(distance < 30){
      blueBullets.splice(blueBullets.indexOf(bullet), 1);
      redHealth -= 1;
    }
  }

  if(redHealth == 0){
    text("Blue Wins!", width/2, height/2);
    noLoop();
  } else if(blueHealth == 0){
    text("Red Wins!", width/2, height/2);
    noLoop();
  }

}


