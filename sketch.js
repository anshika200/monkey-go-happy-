var monkey, monkey_running, monkeyCollided;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, groundImage, score;
var path, pathImage, invisiblePath;
var score = 0,
  score1 = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImage;
var restart, restartImage;
var dieSound, jumpSound;

function preload() {

  groundImage = loadImage("forest-1.jpg")

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_collided = loadImage("sprite_2.png")
  gameOverImage = loadImage("game_over.jpg");
  restartImage = loadImage("reload-arrow.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  pathImage = loadImage("path.jpg")
  monkeycollided = loadImage("sprite_1.png");

  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3")
}



function setup() {
  createCanvas(600, 600);

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.scale = 2
  ground.x = ground.width / 2;

  path = createSprite(0, 580, 300);
  path.addImage("path", pathImage);
  path.scale = 2.5;
  path.x = path.width / 2;
  invisiblePath = createSprite(0, 585, 800, 10);
  invisiblePath.visible = false

  monkey = createSprite(120, 580)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.20;

  foodGroup = new Group();
  obstacleGroup = new Group();

  gameOver = createSprite(300, 250);
  gameOver.addImage(gameOverImage)
  gameOver.visible = false
  gameOver.scale = 1;

  restart = createSprite(300, 380)
  restart.addImage(restartImage);
  restart.scale = 0.08;
  restart.visible = false
}

function draw() {
  background("white");

  console.log(monkey.y)

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (path.x < 0) {
    path.x = path.width / 2;
  }

  if (gameState === PLAY) {

    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space") && monkey.y >= 518.6) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.2;
    ground.velocityX = -3;
    path.velocityX = -6;


    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score1 = score1 + 1;
      jumpSound.play();

    }

    if (monkey.isTouching(obstacleGroup)) {
      dieSound.play();
      gameState = END;
    }

    food();
    obstacles();

  } else
  if (gameState === END) {
    ground.velocityX = 0;
    path.velocityX = 0;
    
    
    
    obstacleGroup.setVelocityXEach(0)
     
    obstacleGroup.setLifetimeEach(-1);
    
  
    restart.visible = true;
    gameOver.visible = true;

    if (mousePressedOver(restart)) {
      gameState = PLAY;
      reset();
    }


  }

  monkey.collide(invisiblePath);



  drawSprites();

  textSize(20);
  fill("pink");
  text("Survival Time :  " + score, 40, 30);
  text("Food : " + score1, 40, 50)
}

function reset() {
  

  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  score = 0;
  
 
  }

function food() {

  if (World.frameCount % 80 == 0) {
    banana = createSprite(400, 0, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.10;
    banana.y = Math.round(random(220, 420));
    banana.velocityX = -4;
    banana.lifetime = 120;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 540, 100, 40);
    obstacle.velocityX = -6;

    //assign scale and lifetime to the obstacle
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstacleGroup.add(obstacle);

    // obstacle.debug=true
  }
}