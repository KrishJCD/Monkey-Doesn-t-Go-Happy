var backImage,backgr;
var player, player_running;
var ground,ground_img;

var obstacleGroup,obsImg;

var foodGroup,foodImg
var gameOverImg;
var score=1;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obsImg=loadImage("stone.png");
  foodImg=loadImage("banana.png");
  gameOverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-(6+score/100);
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  obstacleGroup=new Group();
  foodGroup = new Group();
  alert("Your Monkey's Size keeps on decreasing if you dont feed him...");
  alert("Please Feed Him and take his Utmost Care: ");
  
}

function draw() { 
  background(0);
  World.frameRate=60;
  if(gameState===PLAY){
  score=round(frameCount/60);
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
        player.velocityY = -12;
      }
      player.velocityY = player.velocityY + 0.8;
      
      player.scale=constrain(player.scale,0.09,0.5)
      if(frameCount%80==0)
      {
        spawnObstacles();
      }
      if(frameCount%60==0)
      {
        spawnFood();
      }


      if(obstacleGroup.isTouching(player))
      {
        gameState=END;
      }

      for(var i=0;i<foodGroup.length;i++)
      {
        if(foodGroup.get(i)!=undefined && foodGroup.get(i).isTouching(player))
        {
          foodGroup.get(i).destroy();
          player.scale=player.scale+0.01;
          
        }
      }
      player.scale=player.scale-0.0001;


      player.collide(ground);

  }
  else if(gameState === END)
  {
    gameOver.visible = true;  
      backgr.velocityX = 0;
      player.velocityY = 0;
      
     obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);

     foodGroup.setLifetimeEach(-1);
     foodGroup.setVelocityXEach(0);
  }


  drawSprites();

  fill("red");
  textSize(18);
  text("Score: "+score,400,100);
}

function spawnObstacles()
{
  var obs=createSprite(random(700,800),350);
  //obs.debug=true;
  obs.setCollider("rectangle",0,0,140,140);
  obs.addImage(obsImg);
  obs.velocityX=-(6+score/100)
  obs.lifetime=800;
  obs.scale=0.2;
  obstacleGroup.add(obs);
}

function spawnFood()
{
  var food=createSprite(random(700,800),random(200,300));
  food.addImage(foodImg);
  food.velocityX=-6;
  food.lifetime=200;
  food.scale=0.07;
  foodGroup.add(food);
}
