class Dino {
	constructor() {
		this.dinoIdleSprite = loadImage("Idle.png");
		this.dinoRun1Sprite = loadImage("run1.png");
		this.dinoRun2Sprite = loadImage("run2.png");
		this.dinoLow1Sprite = loadImage("low1.png");
		this.dinoLow2Sprite = loadImage("low2.png");
		this.dinoJumpSprite = loadImage("jump.png");
		this.dinoDeathSprite = loadImage("death.png"); // image(dinoDeath, 232, 500, 44, 47, 0, 0, 44, 47);
		this.toggleSprite = true;
		this.isDead = false;
		this.isJumping = false;
		this.reachedTop = false;
		this.jumpSpeed = 10;
		this.x = 50;
		this.y = 125;
	}

	run() {
		if (this.toggleSprite)
			image(this.dinoRun1Sprite, 30, 100, 44, 47, 0, 0, 44, 47);
		else
			image(this.dinoRun2Sprite, 30, 100, 44, 47, 0, 0, 44, 47);

		if (frameCount % 6 == 0)
			this.toggleSprite = !this.toggleSprite;
		
		this.x = 50;
		this.y = 125;
	}

	startJump() {
		this.y = 125;
		this.isJumping = true;
		this.reachedTop = false;
		image(this.dinoJumpSprite, 30, this.y, 44, 47, 0, 0, 44, 47);
		this.y -= this.jumpSpeed;
		this.jumpSpeed -= 0.5;
	}

	jump() {
		if (this.y >= 35 && !this.reachedTop) {
			image(this.dinoJumpSprite, 30, this.y-25, 44, 47, 0, 0, 44, 47);
			this.y -= this.jumpSpeed;
			this.jumpSpeed -= 0.5;
			
			if(this.y <= 35) {
				this.reachedTop = true;
				this.y = 35;
				this.jumpSpeed = 1;
			}
		}
		else {
				image(this.dinoJumpSprite, 30, this.y-25, 44, 47, 0, 0, 44, 47);
				this.y += this.jumpSpeed;
				this.jumpSpeed += 0.5;
			
				if(this.y >= 125) {
					this.y = 125;
					this.jumpSpeed = 10;
					this.isJumping = false;
				}
		}
	}

	duck() {
		if(!this.isJumping) {
			if (this.toggleSprite)
				image(this.dinoLow1Sprite, 30, 121, 60, 30, 0, 0, 118, 67);
			else
				image(this.dinoLow2Sprite, 30, 119, 60, 30, 0, 0, 119, 69);

			if (frameCount % 6 == 0)
				this.toggleSprite = !this.toggleSprite;

			this.x = 55; 
			this.y = 147;
		}
	}
	
	stop() {
		image(this.dinoDeathSprite, 30, this.y-30, 44, 47, 0, 0, 44, 47);
		this.isDead = true;
	}
	
	getCollisions(bird, cactus1, cactus2)
	{
		// right dino -> ellipse(50+20, dino.y,2,2);
		// left dino -> ellipse(50-19, dino.y,2,2);
		// top dino -> ellipse(50, dino.y-21,2,2);
		// bottom dino -> ellipse(50, dino.y+19,2,2);
		
		// left bird -> ellipse(bird.x,bird.y-16,2,2);
		// right bird -> ellipse(bird.x+45,bird.y-16,2,2);
		// bottom bird -> ellipse(bird.x+22.5, bird.y, 2, 2);
		// top bird -> ellipse(bird.x+22.5, bird.y-30, 2, 2);
		
		// left cactus -> ellipse(cactus.x, cactus.y+25, 2, 2);
		// right cactus -> ellipse(cactus.x + 25, cactus.y+25, 2, 2);
		// top cactus -> ellipse(cactus.x + 12.5, cactus.y, 2, 2);
		
		// Cacti1
		if(cactus1 != undefined && cactus1 != null) {
			if(this.isJumping) {
				// if the dino is within the width of the cactus from above
				if((this.x-19 <= cactus1.x+12.5 && cactus1.x+12.5 <= this.x+20) && (this.y-21 <= cactus1.y && this.y+19 >= cactus1.y))
					return true;
			}
			else {
				// if the dino runs into the cactus
				if(cactus1.x <= this.x+20 && cactus1.x+25 >= this.x+20)
						return true;
			}
		}
		
		// Cacti2
		if(cactus2 != undefined && cactus2 != null) {
			if(this.isJumping) {
				// if the dino is within the width of the cactus from above
				if((this.x-19 <= cactus2.x+12.5 && cactus2.x+12.5 <= this.x+20) && (this.y-21 <= cactus2.y && this.y+19 >= cactus2.y))
					return true;
			}
			else {
				// if the dino runs into the cactus
				if(cactus2.x <= this.x+20 && cactus2.x+25 >= this.x+20)
						return true;
			}
		}
		
		// Bird
		if(bird != undefined && bird != null) {
			if(this.isJumping) {
				if((this.x-19 <= bird.x+22.5 && bird.x+22.5 <= this.x+20) && (this.y-21 <= bird.y-30 && this.y+19 >= bird.y-30 || this.y+19 >= bird.y && this.y-21 <= bird.y))
					return true;
			}
			else {
				if(bird.x <= this.x+20 && bird.y >= this.y-21 && bird.x+45 >= this.x+20)
					return true;
			}
		}
		
		return false;
	}
}