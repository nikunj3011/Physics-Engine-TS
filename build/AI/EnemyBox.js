import { Actor } from "../Actor/Actor";
export class EnemyBox extends Actor {
    constructor(ctx, x, y, width, height, color) {
        super(ctx, x, y, width, height, color);
        this.speedMultiplier = 5; // Adjust this value to control the speed
        this.velocityX = (Math.random() - 0.5) * 2 * this.speedMultiplier; // Random initial velocity with multiplier
        this.velocityY = (Math.random() - 0.5) * 2 * this.speedMultiplier; // Random initial velocity with multiplier
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
            this.velocityX = -this.velocityX;
        }
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.height > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
            this.velocityY = -this.velocityY;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = -this.velocityY;
        }
    }
}
