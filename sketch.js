var backImage,backgr;
var player, player_running;
var ground,ground_img;
 var bananaImg, stoneImg;
 var score=0;
 var gameover1;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_fall = loadAnimation("Monkey_08.png");
  bananaImg = loadImage("banana.png")
  stoneImg= loadImage("stone.png")
  gameover1=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("fall",monkey_fall);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstacleGroup= new Group();

  gameover = createSprite(340,280,20,50);
  gameover.addImage("gameover4",gameover1);
  gameover.visible= false;

}

function draw() { 
  background(0);

  if(gameState===PLAY)
  {
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObsticles();

    if (bananaGroup.isTouching(player))
    {
    score=score+2;
    bananaGroup.destroyEach();
    }

    switch(score)
    {
      case 10:player.scale=0.15;
      break;

      case 20:player.scale=0.17;
      break;

      case 30:player.scale=0.19;
      break;

      case 40:player.scale=0.21;
      break;
      default:break;
    }
    if (obstacleGroup.isTouching(player))
    {
       gameState=END;

    }
  }
  
  else if (gameState===END){
    bananaGroup.setVelocityXEach(0)
    backgr.velocityX=0;

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
   // bananaGroup.destroyEach();
    //obstacleGroup.destroyEach();
    gameover.visible= true;
    player.changeAnimation("fall",monkey_fall);
    
  }


  drawSprites();
 
   stroke("white")
  textSize(20)
  fill("white")
  text("Score : "+score,700,40)
  
}

function spawnFood()
{
  if(frameCount%80===0){
    
    banana=createSprite(800,200,30,30);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImg);
    banana.scale=0.066;
    banana.velocityX=-4;
    banana.lifetime=800;
    bananaGroup.add(banana);
  }
}

function spawnObsticles(){

  if(frameCount%300===0){
    obstacle1=createSprite(800,315,70,70)
    obstacle1.addImage(stoneImg)
    obstacle1.scale=0.2
    obstacle1.velocityX=-4;
    obstacle1.lifetime=800;
    obstacleGroup.add(obstacle1) 
  }

}