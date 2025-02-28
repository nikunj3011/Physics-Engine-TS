export class Actor {
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
        this.bounceDamping = 0.7;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
            this.velocityX = -this.velocityX * this.bounceDamping;
        }
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = -this.velocityX * this.bounceDamping;
        }
        if (this.y + this.height > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
            this.velocityY = -this.velocityY * this.bounceDamping;
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
}
