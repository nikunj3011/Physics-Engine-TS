export class EnemyBox {
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x + this.width > this.ctx.canvas.width || this.x < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.height > this.ctx.canvas.height || this.y < 0) {
            this.velocityY = -this.velocityY;
        }
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
