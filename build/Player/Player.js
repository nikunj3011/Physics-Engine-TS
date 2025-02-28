export class Player {
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.1;
        this.isJumping = false;
        this.bounceDamping = 0.7;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = -this.velocityX * this.bounceDamping;
        }
        if (this.y + this.height > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
            this.velocityY = -this.velocityY * this.bounceDamping;
            this.isJumping = false;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = -this.velocityY * this.bounceDamping;
        }
        this.velocityY += this.gravity;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.velocityX = -5;
    }
    moveRight() {
        this.velocityX = 5;
    }
    jump() {
        if (!this.isJumping) {
            this.velocityY = -10;
            this.isJumping = true;
        }
    }
    stopMoving() {
        this.velocityX = 0;
    }
    checkCollision(enemy) {
        if (this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height) {
            return true;
        }
        return false;
    }
    checkWin(goal) {
        if (this.x + this.width > goal.x &&
            this.x < goal.x + goal.width &&
            this.y + this.height > goal.y &&
            this.y < goal.y + goal.height) {
            return true;
        }
        return false;
    }
}
