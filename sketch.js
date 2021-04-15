var gardenBG, mouseBorder, tomTouch, jerry, tom, bullDog;
var gardenBGimg, jerryScared, jerrySmilling, jerryFun, tomStand, tomRunningLeft, tomRunningRight, tomWin, bullDogAngry, bullDogHappy, tomScared, bullDogGroup;

var PLAY = 0
var ENDW = 1;
var ENDL = 2;
var gameState = PLAY;

const bgSound = new Audio("TJsound.wav");

var gameStateS  = "sound";

function preload() {
    //load the images here
    gardenBGimg = loadImage("garden.png");
    jerryScared = loadImage("mouseScared.png");
    jerrySmilling = loadImage("mouseSmiling.png");
    jerryFun = loadImage("mouseFunThree.png");
    tomStand = loadImage("tomStanding.png");
    tomRunningLeft = loadImage("tomRunningTwo.png");
    tomRunningRight = loadImage("tomRunFlipRight.png");
    tomScared = loadImage("tomScared.png");
    tomWin = loadImage("catWinning.png");
    // bgSound = loadSound("TJsound.wav");
    bullDogHappy = loadImage("happyBullDog.png");
    bullDogAngry = loadImage("bullDog.png");
}

function setup(){
    createCanvas(1000,750);
    //create tom and jerry sprites here

    gardenBG = createSprite(500, 375);
    gardenBG.scale = 1.45;
    gardenBG.addImage(gardenBGimg);
    
    mouseBorder = createSprite(400, 375, 3, 750);
    mouseBorder.shapeColor = "red";
    mouseBorder.visible = false;
    
    tomTouch = createSprite(154.5, 375, 310, 750);
    tomTouch.visible = false;

    jerry = createSprite(155, 380);
    jerry.addImage(jerrySmilling);
    jerry.scale = 0.03;
    jerry.velocityX = 2;
    jerry.velocityY = 1.5;
    // jerry.debug = true;
    // jerry.setCollider("rectangle", 0, 0, 155, 200)

    tom = createSprite(900, 650);
    tom.addImage(tomStand);
    tom.scale = 0.2;
    // tom.debug = true;

    bullDogGroup = new Group();

    // bgSound.setVolume(0.5);
}

function draw() {
    background(0);

    edges = createEdgeSprites();
    jerry.bounceOff(edges);
    tom.bounceOff(edges);
    jerry.bounceOff(mouseBorder);

    if(gameState == PLAY) {
        if(keyDown("space")) {
            jerry.addImage(jerryFun);
            jerry.scale = 0.3;
            // jerry.debug = true;
            jerry.setCollider("rectangle", 0, 0, 155, 200)
        } else {
            jerry.addImage(jerrySmilling);
            jerry.scale = 0.03;
            
        }

        bgSound.play();
	    bgSound.loop = true;

        // if(gameStateS == "sound"){
        //     bgSound.play();
        //     gameStateS = "mute";
        // }
    
        if(keyDown("left")) {
            tom.x-=5
            tom.addImage(tomRunningLeft);
            tom.scale = 0.1;
            // tom.debug = true;
        } else if(keyDown("right")) {
            tom.x+=5
            tom.addImage(tomRunningRight);
            tom.scale = 0.1;
            // tom.debug = true;
        } else if(keyDown("up")) {
            tom.y-=5
        } else if(keyDown("down")) {
            tom.y+=5
        } else {
            tom.scale = 0.2;
            tom.addImage(tomStand);
        }
    
        if(jerry.x-tom.x < tom.width/2+jerry.width/2 && tom.x-jerry.x < tom.width/2+jerry.width/2 && jerry.y-tom.y < tom.height/2+jerry.height/2 && tom.y-jerry.y < tom.height/2+jerry.height/2) { 
            gameState = ENDW; 
        } else if (tom.isTouching(bullDogGroup)) {
            gameState = ENDL  
        } else { 
            gameState = PLAY;
        }

        bullDogObstacle();
    }

    if(gameState == ENDW) {
        jerry.addImage(jerryScared);
        jerry.velocityX = 0;
        jerry.velocityY = 0;
        jerry.scale = 0.125;
        jerry.setCollider("rectangle", 0, 0, 50, 50)
        // jerry.debug = true;

        bgSound.pause();

        tom.addImage(tomWin);
        tom.scale = 0.25;

        bullDogGroup.destroyEach();

        // tom.debug = true;

        // bgSound.stop();
    }

    if(gameState == ENDL) {
        jerry.addImage(jerrySmilling);
        jerry.velocityX = 0;
        jerry.velocityY = 0;
        jerry.scale = 0.032;
        
        bgSound.pause();

        // bullDog.addImage(bullDogHappy);
        bullDogGroup.setVelocityXEach(0);

        tom.addImage(tomScared);
        tom.scale = 0.17;

        // bgSound.stop();
    }
    drawSprites();
}

function bullDogObstacle() {
    if(frameCount % 90 == 0) {
        var bullDog = createSprite(1200, random(20, 730));
        bullDog.addImage(bullDogAngry);
        bullDog.scale = 0.5;
        // bullDog.velocityX = -5;
        // bullDog.debug = true;
        bullDogGroup.add(bullDog);
        bullDogGroup.setVelocityXEach(-4);
    }
}