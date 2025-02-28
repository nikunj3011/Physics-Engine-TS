export class Actor {
    protected ctx: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    protected color: string;
    public velocityX: number;
    public velocityY: number;
    protected gravity: number;
    protected bounceDamping: number;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
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

    public update(): void {
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

    public draw(): void {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}