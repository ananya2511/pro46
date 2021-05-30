var PLAY=1;
var END=0;
var gameState=PLAY;
var boyRun,ground,invisible,cloudgroup,obstaclesgroup,reset,gameover,coinsgroup,score
var boyRunImg,groundImg,cloudImg,obstaclesImg1, obstaclesImg2,obstaclesImg3,resetImg,gameoverImg,
coinsImg


function preload(){
boyRunImg=loadAnimation("run1.png","run2.png","run3.png")
groundImg=loadImage("ground new.png")
//cloudImg=loadImage("")
obstaclesImg1=loadImage("ob.png");
obstaclesImg2=loadImage("ob1.png");
obstaclesImg3=loadImage("ob2.png");
resetImg=loadImage("reset.png");
gameoverImg=loadImage("gameover.png");
coinsImg=loadAnimation("coin.png","coin1.png","coin2.png","coin3.png","coin4.png","coin5.png")
}




function setup() {
  createCanvas(400,400)

boyRun = createSprite(100, 250);
boyRun.debug=false;
boyRun.setCollider("rectangle",0,0,55,70);
boyRun.addAnimation("run",boyRunImg);
ground = createSprite(200, 380);
ground.addImage("ground",groundImg);
ground.scale=3;
 invisible = createSprite(200, 290,400,10);
invisible.visible=false;
cloudgroup = createGroup();
 obstaclesgroup = createGroup();
reset = createSprite(200, 100);
reset.addImage("image",resetImg);
 gameover = createSprite(200, 200);
gameover.addImage("gameover",gameoverImg);
reset.scale=0.2;
gameover.scale=0.5;
 coinsgroup = createGroup();
score=0;

}


function draw() {
if (gameState==PLAY) {
     if (keyDown("up")) {
   boyRun.velocityY=-8;
  }
    boyRun.velocityY=boyRun.velocityY+0.8;
ground.velocityX=-4;
    if (ground.x<0) {
    ground.x=ground.width/2;
  }
  if(boyRun.isTouching(coinsgroup)){
    coinsgroup[0].destroy();
    score=score+1;
  }
  reset.visible=false;
  gameover.visible=false;
  spawnclouds();
  spawnobstacles();
  spawncoins();
  if (boyRun.isTouching(obstaclesgroup)) {
    gameState=END;
  }
  } else if(gameState==END)
  {
ground.velocityX=0;
cloudgroup.setVelocityXEach(0);
obstaclesgroup.setVelocityXEach(0);
boyRun.setAnimation("run2");
obstaclesgroup.setLifetimeEach(-1);
cloudgroup.setLifetimeEach(-1);
reset.visible=true;
gameover.visible=true;
boyRun.velocityY=0;
coinsgroup.setVelocityXEach(0);
coinsgroup.setLifetimeEach(-1);
    
  }
 if(mousePressedOver(reset)){
  gameState=PLAY;
 obstaclesgroup.destroyEach();
 cloudgroup.destroyEach();
 boyRun.setAnimation("run");
 coinsgroup.destroyEach();
 score=0;
 }   
  background("white");
 
  boyRun.collide(invisible);
textSize(25);
text("score:"+score, 2, 30);


  drawSprites();
}

function spawnobstacles(){
 
  if (World.frameCount%240==0) {
     var obstacles = createSprite(400, 250);
 obstacles.velocityX=-4;
  obstacles.setAnimation("ob"+randomNumber(1,3));
 obstacles.lifetime=110;
obstaclesgroup.add(obstacles);
obstacles.debug=false;
obstacles.setCollider("rectangle",0,0,55,70);


 }
  
}

function spawnclouds(){

 if (World.frameCount%120==0) {
          var cloud = createSprite(400,50);
cloud.y=
randomNumber(50, 150);
cloud.setAnimation("cloud");
cloud.velocityX=-2;
cloud.scale=0.2;
cloud.depth=boyRun.depth;
cloud.depth=cloud.depth-1;
cloud.lifetime=210;
cloudgroup.add(cloud);     
 }
               
}
function spawncoins(){
  if(World.frameCount%60==0){
var coins = createSprite(400, 50);
coins.y=
random(200, 290);
coins.setAnimation("coin");
coins.scale=0.5;
coins.velocityX=-2;
coins.lifetime=200;
coinsgroup.add(coins);


  }
}