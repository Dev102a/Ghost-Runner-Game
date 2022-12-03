var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png")
 // spookySound = loadSound("spooky.wav")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.width = 400
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.4


  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
 
}

function draw(){
  background(0);

// ghost.debug = true
  
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3
    }

    if(keyDown("space")){
     ghost.velocityY = - 10
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      gameState = "end" 
      ghost.destroy()
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over Click Restart Button", 300,300)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
   if(frameCount % 240 == 0){
    var climber = createSprite(200,10)
    var door = createSprite(200,-50)
    var invisibleBlock = createSprite(200,15)
    
    invisibleBlock.height = 2
    invisibleBlock.width = climber.width
    
    door.x = Math.round(random(120,400))
    climber.x = door.x
    invisibleBlock.x = door.x

    door.addImage("door",doorImg)
    climber.addImage("climber",climberImg)

    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
   

    //assign lifetime to the variable
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800
    
    doorsGroup.add(door)
    invisibleBlockGroup.add(invisibleBlock)
    climbersGroup.add(climber)
}
}

