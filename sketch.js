/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;
var shrubsGroup;
var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800,400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;
  jungle.velocityX=-4;
  
  kangaroo=createSprite(150,250,10,10);
  kangaroo.addAnimation("kangarooRunning",kangaroo_running);
  kangaroo.addAnimation("kangaroocollided",kangaroo_collided);
  kangaroo.scale=0.2;
  
  invisiblejungle=createSprite(200,350,1200,10);
  invisiblejungle.visible=false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  kangaroo.setCollider("circle",0,0,400);
  kangaroo.debug = false;
}

function draw() {
  background(255);
  kangaroo.x=camera.position.x-270;

  if(gameState===PLAY){

  if (jungle.x <200){
    jungle.x=750;
  }
  
  spawnShrub();

  spawnStones();

  if(keyDown("space")){
    kangaroo.velocityY=-7;
  }

  kangaroo.velocityY = kangaroo.velocityY + 0.8;

  kangaroo.collide(invisiblejungle);


  if(kangaroo.isTouching(shrubsGroup)){
    score++;
    shrubsGroup[0].destroy();
  }
  if(obstaclesGroup.isTouching(kangaroo)){
    gameState=END;
  }
}else if(gameState===END){
  
  kangaroo.changeAnimation("kangaroocollided",kangaroo_collided);
  jungle.velocityX=0;
  kangaroo.velocityY=0;
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();
  
}

  drawSprites();

  textSize(20);
  fill("black");
  text("Score: "+score,700,90);
}

function spawnShrub(){
  if(frameCount%150===0){
    var shrubs=createSprite(camera.position.x+200,330,40,10);
    shrubs.addImage(shrub1);
    shrubs.scale=0.07;
    shrubs.x=Math.round(random(50,700));
    shrubs.velocityX=-3;
    shrubs.lifetime=200;
    shrubsGroup.add(shrubs);
  }
}

function spawnStones(){
  if(frameCount%150===0){
    var stones=createSprite(camera.position.x+200,330,10,10);
    stones.addImage(obstacle1);
    stones.scale=0.2;
    stones.x=Math.round(random(50,700));
    stones.velocityX=-3;
    stones.lifetime=200;
    obstaclesGroup.add(stones);
  }
}
