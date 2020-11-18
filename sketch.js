//defining the variables
var knife, knifeImage, moving, fruit1, fruit2, fruit3, fruit4, gamev;
var fruitGroup, enemyGroup;
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var swooshSound, gameOvers;

function preload() {
  //loading images, animation and sounds
  knifeImage = loadImage("sword.png");
  moving = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gamev = loadImage("gameover.png");
  swooshSound = loadSound("knifeSwooshSound.mp3");
  gameOvers = loadSound("gameover.mp3");
}

function setup() {
  //to create the canvas
  createCanvas(400, 400);
  //to create the knife
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;

  //to create the groups
  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw() {
  //to create the background
  background("pink");
  //to call the fruits and enemy functions
  fruits();
  enemy();

  if (gameState === 1) {
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      swooshSound.play();
      score = score + 2;
    }
    if (enemyGroup.isTouching(knife)) {
      gameState = 0;
      gameOvers.play();
    }
  } else if (gameState === 0) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    knife.addImage(gamev);
    knife.x = 250;
    knife.y = 250;
  }

  //to display the score
  text("YOUR SCORE IS: " + score, 100, 100);

  //to draw the sprites
  drawSprites();
}

function fruits() {

  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;

    position = Math.round(random(5, 6));

    if (position === 5) {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position === 6) {
        fruit.x = 0
        fruit.velocityX = (7 + (score / 4));
      }
    }

    f_select = Math.round(random(1, 4));
    if (f_select === 1) {
      fruit.addImage(fruit1);
    } else if (f_select === 2) {
      fruit.addImage(fruit2);
    } else if (f_select === 3) {
      fruit.addImage(fruit3);
    } else if (f_select === 4) {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);

  }

}

function enemy() {
  if (frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("emn", moving);
    mR = Math.round(random(7,8));
    console.log(mR);
    if(mR === 7){
      monster.x = 400;
      monster.velocityX = -(8+(score/10));
    }
    if(mR === 8){
      monster.x = 0;
      monster.velocityX = (8+(score/10));
    }
    monster.y = Math.round(random(100, 300))
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
}