var dino;
var ground_Sprite, ground1_Position, ground1_SpawnPoint, ground2_Position, ground2_SpawnPoint, ground_ScrollSpeed;
var cloud_Sprite, cloud_SpawnPoint, cloud_TimeUntilNextSpawn, cloud_SpawnRate, cloud_ScrollSpeed, cloudsArray;
var bird1_Sprite, bird2_Sprite, bird_SpawnPoint, bird_TimeUntilNextSpawn, bird_SpawnRate, bird_ScrollSpeed, birdsArray;
var cactus1_Sprite, cactus2_Sprite, cactus3_Sprite, cactus4_Sprite, cactus5_Sprite;
var cacti_SpawnPoint, cacti_TimeUntilNextSpawn, cacti_SpawnRate, cacti_ScrollSpeed, cactiArray;
var restart_button;

function preload() {

	ground_Sprite = loadImage("spritesheet.png");
	cloud_Sprite = loadImage("1x-cloud.png");
	bird1_Sprite = loadImage("enemy1.png");
	bird2_Sprite = loadImage("enemy2.png");
	cactus1_Sprite = loadImage("CACTUS1.png");
	cactus2_Sprite = loadImage("CACTUS2.png");
	cactus3_Sprite = loadImage("CACTUS3.png");
	cactus4_Sprite = loadImage("CACTUS4.png");
	cactus5_Sprite = loadImage("CACTUS5.png");
	restart_Sprite = loadImage("1x-restart.png");
	button = createImg("1x-restart.png", "Play Again");
	button.mousePressed(setup);
	button.hide();
}

function setup() {
	createCanvas(600, 150);
	//imageMode(CENTER);
	imageMode(CORNER);
	
	dino = new Dino();
	
  ground1_Position = ground1_SpawnPoint = -2;
	ground2_Position = ground2_SpawnPoint = 1198;
	ground_ScrollSpeed = 5;
	
	cloud_SpawnPoint = 600;
	cloud_SpawnRate = 5;
	cloud_TimeUntilNextSpawn = 0; 
	cloudsArray = [];
	cloud_ScrollSpeed = 1;
	cloud_SpawnInterval = setInterval(function() {cloud_TimeUntilNextSpawn = cloud_TimeUntilNextSpawn>0?cloud_TimeUntilNextSpawn-1:0;}, 1000);
	
	bird_SpawnPoint = 600;
	bird_SpawnRate = 15;
	bird_TimeUntilNextSpawn = 0; 
	birdsArray = [];
	bird_ScrollSpeed = 4.75;
	bird_SpawnInterval = setInterval(function() {bird_TimeUntilNextSpawn = bird_TimeUntilNextSpawn>0?bird_TimeUntilNextSpawn-1:0;}, 1000);
	
	cacti_SpawnPoint = 600;
	cacti_SpawnRate = 5;
	cacti_TimeUntilNextSpawn = 0; 
	cactiArray = [];
	cacti_ScrollSpeed = ground_ScrollSpeed;
	cacti_SpawnInterval = setInterval(function() {cacti_TimeUntilNextSpawn = cacti_TimeUntilNextSpawn>0?cacti_TimeUntilNextSpawn-1:0;}, 1000);


	button.position(width/2, height/2-15);
	button.hide();
}

function draw() {
	background(247);
  UpdateScene();
  
  fill(0);
  // left side of canvas
  ellipse(0,100,2,2);
  // right side of canvas
	ellipse(600,100,2,2);
	if(!dino.isDead) {
		if(!dino.isJumping) {
			if(keyIsDown(DOWN_ARROW))
				dino.duck();
			else
				dino.run();
		}
		else
			dino.jump();
		
		if(dino.getCollisions(birdsArray[0])) {
			cloud_ScrollSpeed = 0;
			bird_ScrollSpeed = 0;
			ground_ScrollSpeed = 0;
			cacti_ScrollSpeed = 0;
			dino.stop();
		}

		fill(255, 204, 0);
		ellipse(50+20, dino.y,2,2);
		ellipse(50-19, dino.y,2,2);

		ellipse(50, dino.y-21,2,2);
		ellipse(50, dino.y+18,2,2);
	}
	else {
		dino.stop();
		clearInterval(cloud_SpawnInterval);
		clearInterval(bird_SpawnInterval);
		clearInterval(cacti_SpawnInterval);
		button.show();
	}
}

function UpdateScene() {
	manageGround();
	manageClouds();
	manageBirds();
	manageCacti();
}

function manageGround() {
	image(ground_Sprite, ground1_Position, 135, 1233, 68, 0, 54, 1233, 68);
  image(ground_Sprite, ground2_Position, 135, 1233, 68, 0, 54, 1233, 68);

  ground1_Position -= ground_ScrollSpeed;
  ground2_Position -= ground_ScrollSpeed;
  
  if (ground1_Position <= -1200 - ground1_SpawnPoint)
    ground1_Position = ground2_SpawnPoint;
  if (ground2_Position <= -1200 - ground1_SpawnPoint)
		ground2_Position = ground2_SpawnPoint;
}

function manageClouds() {
	if(cloudsArray.length < 3 && cloud_TimeUntilNextSpawn === 0 && !dino.isDead) {
		// highest spawn point @ 30
		// lowest spawn point @ 75
		cloudsArray.push({x:cloud_SpawnPoint, y:randomNumber(30,75)});
		cloud_TimeUntilNextSpawn = cloud_SpawnRate;
	}

	if(cloudsArray[0] == undefined)
		cloudsArray.shift();
	
	cloudsArray.forEach((cloud, i) => {
		if(cloud.x <= -46)
			delete cloudsArray[i];
		else
		{
			image(cloud_Sprite, cloud.x, cloud.y, 46, 14, 0, 0, 46, 14);
			cloud.x -= cloud_ScrollSpeed;
		}
	});
}

function manageBirds() {

	if(birdsArray.length <= 1 && bird_TimeUntilNextSpawn === 0 && !dino.isDead) {
		// highest spawn point @ 50
		// lowest spawn point @ 150
		birdsArray.push({animate:true, x:bird_SpawnPoint, y:randomNumber(50,150)});
		bird_TimeUntilNextSpawn = bird_SpawnRate;
	}
	
	if(birdsArray[0] == undefined)
		birdsArray.shift();
	
	birdsArray.forEach((bird, i) => {
		if(bird.x <= -47)
			delete birdsArray[i];
		else
		{
			if(!dino.isDead) {
				if (bird.animate){
					image(bird1_Sprite, bird.x, bird.y-30, 47, 36, 0, 0, 91, 67);
					ellipse(bird.x,bird.y-16,2,2);
					ellipse(bird.x+45,bird.y-16,2,2);
					
					ellipse(bird.x+22.5, bird.y, 2, 2);
					ellipse(bird.x+22.5, bird.y-30, 2, 2);

				}else{
					image(bird2_Sprite, bird.x, bird.y-8-30, 47, 36, 0, 0, 87, 66);
					ellipse(bird.x,bird.y-16,2,2);
					ellipse(bird.x+45,bird.y-16,2,2);
					
					ellipse(bird.x+22.5, bird.y, 2, 2);
					ellipse(bird.x+22.5, bird.y-30, 2, 2);
				}
			}
			else
				image(bird2_Sprite, bird.x, bird.y-8-30, 47, 36, 0, 0, 87, 66);
			if (frameCount % 10 == 0)
					bird.animate = !bird.animate;
			
			bird.x -= bird_ScrollSpeed;
		}
	});
}

function manageCacti() {
	var cact = [cactus1_Sprite,cactus2_Sprite,cactus3_Sprite,cactus4_Sprite,cactus5_Sprite];
	
	if(cactiArray.length < 4 && cacti_TimeUntilNextSpawn === 0 && !dino.isDead) {
		// highest spawn point @ 30
		// lowest spawn point @ 75
		cactiArray.push({type: cact[random([0,1,2,3,4])], x:cacti_SpawnPoint, y:100, scaleBy:randomNumber(50,150), flip: random([true,false])});
		cacti_TimeUntilNextSpawn = cacti_SpawnRate;
	}
	
	if(cactiArray[0] == undefined)
		cactiArray.shift();
	
	cactiArray.forEach((cactus, i) => {
		if(cactus.x <= -25)
			delete cactiArray[i];
		else
		{
				image(cactus.type, cactus.x, cactus.y, 25, 50, 0, 0, 25, 50);
				cactus.x -= cacti_ScrollSpeed;
		}
	});
}

function keyPressed() {
	if(keyCode === UP_ARROW && !dino.isJumping && !dino.isDead)
		dino.startJump();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}