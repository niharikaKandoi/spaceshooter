var backgroundImg , background1 ;
var playerImg , player;
var bulletImg , bullet;
var bulletGroup;
var enemy , enemyImg , enemyGroup;
var PLAY = 1;
var END=0;
var gameState=PLAY;
var score=0;
var blastBgImg , blastImg;
var gameover , gameoverImg;
var reset,resetImg;
function preload(){
  backgroundImg = loadImage("background.png");
  playerImg = loadImage("player1.png");
  bulletImg=loadImage("bullet.png");
  enemyImg=loadImage("enemy.png")
  blastImg = loadImage("blast.png");
  gameoverImg = loadImage("gameover.png");
  blastBgImg = loadImage("blastBg.jpg");
  resetImg = loadImage("reset.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background1 = createSprite(windowWidth/2,0,windowWidth,windowHeight);
  background1.addImage(backgroundImg);
  background1.velocityY=3;
  background1.scale=1.5;

  player=createSprite(50,windowHeight-50,10,10);
  player.addImage(playerImg);
  player.scale=0.3;

    gameover = createSprite(windowWidth/2-50,windowHeight/2,10,10);
    gameover.addImage("gameover",gameoverImg);
    gameover.scale=0.2;

    reset = createSprite(windowWidth/2-50,windowHeight/2+100,10,10);
    reset.addImage("reset",resetImg);
    reset.scale=0.2;

    gameover.visible=false;
    reset.visible=false;
  bulletGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background ("black");
  
  if(gameState===PLAY){
   
    gameover.visible=false;
    reset.visible=false;
    background1.velocityY=3;
      if(background1.y>windowHeight){
        background1.y = windowHeight/2;
      }
 
      if(keyDown(RIGHT_ARROW)){
        player.x = player.x+5;
      } 

      if(keyDown(LEFT_ARROW)){
        player.x=player.x-5;  
      }

      if(keyDown("space")){
        spawnBullet();
      }
      if(bulletGroup.isTouching(enemyGroup)){
        bulletGroup.destroyEach();
        enemyGroup.destroyEach();
        score=score+1;
      }
      if(player.isTouching(enemyGroup)){
        player.addImage(blastImg);
        background1.addImage(blastBgImg);
        gameState=END;

      }      

      
     spawnEnemy();
     
     
  }
    
    if(gameState===END){
     enemyGroup.setVelocityEach(0);
     bulletGroup.setVelocityEach(0);
     enemyGroup.destroyEach();
     bulletGroup.destroyEach();
     background1.velocityY=0;
    
     gameover.visible=true  ;
     reset.visible=true;
     if(mousePressedOver(reset)){
       restart ();
     }
  }
  drawSprites();
  textSize(35);
  fill("white");
  text ("SCORE:"+score,windowWidth-200,50);
  
}
function restart (){
  gameState = PLAY;
  score = 0;
  enemyGroup.destroyEach();
  bulletGroup.destroyEach();
  player.addImage(playerImg);
  background1.addImage(backgroundImg);
}
function spawnBullet(){
  bullet = createSprite(50,windowHeight-50,10,10);
  bullet.x=player.x;
  bullet.y=player.y;
  bullet.addImage(bulletImg);
  bullet.velocityY = -3;
  bullet.scale=0.05;
  bullet.lifetime = 800;
  bullet.depth=player.depth;
  player.depth=player.depth+1;
  bulletGroup.add(bullet);
}
function spawnEnemy(){
if(frameCount%150===0){
  enemy = createSprite(Math.round(random(0,windowWidth)),0,10,10);
  enemy.addImage(enemyImg);
  enemy.velocityY = 6;
  enemy.lifetime = 800;
  enemy.scale=0.15;
  enemyGroup.add(enemy);
}
}