//creating the objects
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacle, pacman, greenghost, pinkghost, redghost, skyblueghost, yellowghost;
var fireballImage, pacmanImage, greenghostImage, pinkghostImage, redghostImage, skyblueghostImage, yellowghostImage;
var background1, backgroundImage;
var fireballGroup, ghostGroup;
var gameOver, gameOverImage;
var score = 0;

function preload(){
  //loading images
  redghostImage = loadImage('redghost.png');
  pinkghostImage = loadImage('pinkghost.png');
  greenghostImage = loadImage('greenghost.jpg');
  yelowghostImage = loadImage('yellowghost.png');
  skyblueghostImage = loadImage('skyblueghost.png');
  fireballImage = loadImage('fireball.png');
  backgroundImage = loadImage('backgroundImg.jpg');
  gameOverImage = loadImage('gameoverImg.jpg');
  pacmanImage = loadImage('pacman1.png');
}

function setup(){
  //creating the canvas
  createCanvas(800, 800);
  
  //creating the background image
  background1=createSprite(0,0,800,800);
  background1.addImage(backgroundImage);
  background1.scale= 2.5;
  background1.x=background1.width/2;
  background1.velocityX=-4;
  
  //creating the pacman sprite
  pacman = createSprite(250, 230, 20, 20);
  pacman.addImage(pacmanImage);
  pacman.scale = 0.08;
  pacman.setCollider("rectangle", 0, 0, 90, 90);
    
  //creating new groups
  fireballGroup = new Group();
  ghostGroup = new Group();
  
  //creating the score
  score = 0;
}

function draw(){
  //text size and colour
  textSize(20);
  fill('lightgreen');

  //play game state
  if(gameState === PLAY) {
    //calling the functions
    ghosts();
   // fireballs();
    
    //changing the position of pacman
    if(keyCode === 38){
      pacman.velocityY = pacman.velocityY -4
    }
      
    //destroying the ghosts after touching pacman
    if (ghostGroup.isTouching(pacman)) {
       ghostGroup.destroyEach();
       score = score + 1;
    }
          
    if(fireballGroup.isTouching(pacman)) {
      fireballGroup.destroyEach();
      ghostGroup.destroyEach();
      gameState = END;
    }
  }
  
  //end game state
  if(gameState === END) {
    ghostGroup.setVelocityXEach(0);
    ghostGroup.setLifetimeEach(-1);
    fireballGroup.setVelocityXEach(0);
    fireballGroup.setLifetimeEach(-1);
      
    //changing the animation of pacman      
    pacman.addImage(gameOverImage);
    pacman.scale = 2.3;
    pacman.x = 250;
    pacman.y = 250;

    //resetting the game     
    if(keyDown('space')) {
      reset();
    }
  }
  
  //displaying the objects on the sreen
  drawSprites();
  
  //scoring
  text("Score: " + score, 220, 50);
}

//function to reset the game 
function reset(){
  gameState = PLAY;
  score = 0;
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  pacman.addImage(pacmanImage);
}

//function to make the ghosts appear randomly
function ghosts() {
  if (World.frameCount % 80 === 0) {
    var ghost = createSprite(400, 200, 20, 20);
    ghost.scale = 0.2;
    if (ghost === 1) {
      ghost.addImage(redghostImage);
    } else if (ghost === 2) {
      ghost.addImage(pinkghostImage);
    } else if (ghost === 3) {
      ghost.addImage(greenghostImage);
    } else if (ghost === 4) {
      ghost.addImage(skyblueghostImage);
    } else {
      ghost.addImage(yellowghostImage); 
    }
    ghost.y=Math.round(random(80, 500));
    
    //assigning lifetime and velocity to the fruits        
    ghost.lifetime = 250;
    ghost.velocityX = -7;
    
    //adding the fruits to the fruit group
    ghostGroup.add(ghost);
  }
}

//function to make fireballs appear randomly
function fireballs() {
  if(World.frameCount % 75 === 0){
    obstacle = createSprite(400, 200, 20, 20);
    obstacle.addImage(fireballImage);
    obstacle.scale = 0.3;
    obstacle.y = Math.round(random(100, 500));
    obstacle.velocityX = -8;
    fireballGroup.velocityX = -(7 + score/100);
    obstacle.lifetime = 50;
    fireballGroup.add(obstacle);
  }
}