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
		
		this.y = 125;
	}

	startJump() {
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
		if (this.toggleSprite)
			image(this.dinoLow1Sprite, 30, 121, 60, 30, 0, 0, 118, 67);
		else
			image(this.dinoLow2Sprite, 30, 119, 60, 30, 0, 0, 119, 69);

		if (frameCount % 6 == 0)
			this.toggleSprite = !this.toggleSprite;
		
		this.y = 147;
	}
	
	stop() {
		image(this.dinoDeathSprite, 30, this.y-30, 44, 47, 0, 0, 44, 47);
		this.isDead = true;
	}
	
	getCollisions(bird)
	{
		// right dino -> ellipse(50+20, dino.y,2,2);
		// left dino -> ellipse(50-19, dino.y,2,2);
		// top dino -> ellipse(50, dino.y-21,2,2);
		// bottom dino -> ellipse(50, dino.y+19,2,2);
		
		// left bird -> ellipse(bird.x,bird.y-16,2,2);
		// right bird -> ellipse(bird.x+45,bird.y-16,2,2);
		// bottom bird -> ellipse(bird.x+22.5, bird.y, 2, 2);
		// top bird -> ellipse(bird.x+22.5, bird.y-30, 2, 2);
		
		// Birds
		// if player jumps under/onto a bird
		if(bird != undefined) {
			// if(this.isJumping && (this.x-22 <= bird.x+25 && bird.x+25 <= this.x+22) && (this.y-22 <= bird.y && this.y+22 >= bird.y || this.y-22 <= bird.y-30 && this.y+22 >= bird.y-30))
			// 	console.log("hit bird");
			if(this.isJumping) {
				if((this.x-19 <= bird.x+22.5 && bird.x+22.5 <= this.x+20) && (this.y-21 <= bird.y-30 && this.y+19 >= bird.y-30 || this.y+19 >= bird.y && this.y-21 <= bird.y))
					return true;
			}
			else {
				if(bird.x <= this.x+20 && bird.y >= this.y-21 && bird.x+45 >= this.x+20)
						return true;
			}

			// if player runs into bird
			// if(bird.x <= this.x+22 && bird.y >= this.y-22)
			// 	console.log("ran into bird");
		}
		return false;
	}
}