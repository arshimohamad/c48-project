var PLAY = 1;
var END;
var gameState = PLAY;
var BananaGroup 
var score = 0;
var gameOver;
var gameOverImg
var restart;
var restartImg;
var backgroundImg;
function preload(){
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  backgroundImg = loadImage("background.jpg")
}

function setup() {
  createCanvas(600,400);

  ground = new Ground();
  monkey = new Monkey();
  BananaGroup = new Group();
  gameOver = createSprite(300,150);
  restart = createSprite(300,230);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2
  restart.addImage(restartImg);
  restart.scale = 0.3
  gameOver.visible = false
  restart.visible = false
  
}


function draw() {
  background(backgroundImg);  
  textSize(20)
  fill("black");
  text("score="+score, 100,100);

  if(gameState === PLAY){
    if(frameCount % 60 === 0){
      banana = new Banana();
      BananaGroup.add(banana.sprite);    
    }
    /*
    if(keyDown(RIGHT_ARROW)){
      monkey.sprite.velocityX = 3+frameCount/600;
    }
    if(keyDown(LEFT_ARROW)){
      monkey.sprite.velocityX = -3-frameCount/600;
    }
    */
    monkey.sprite.x = mouseX

    for(var i=0;i<BananaGroup.length;i=i+1){
      var bananaSprite=BananaGroup.get(i);
      if(monkey.sprite.isTouching(bananaSprite)){
        bananaSprite.destroy();
        score = score+4;
      }
    }
    if(BananaGroup.isTouching(ground.sprite)){
      BananaGroup.destroyEach();
      score = score-2
    }
    if(score<0){
      gameState = END;
      
    }
  }

  if(gameState === END){
    monkey.sprite.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      BananaGroup.destroyEach();
      score = 0;
    }
  }
  drawSprites();
}