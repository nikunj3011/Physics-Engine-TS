import { Actor } from "../Actor/Actor";
export class Player extends Actor {
    constructor(ctx, x, y, width, height, color) {
        super(ctx, x, y, width, height, color);
        this.isJumping = false;
    }
    update() {
        super.update();
        if (this.y + this.height >= this.ctx.canvas.height) {
            this.isJumping = false;
        }
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
