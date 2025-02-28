export class EnemyBox {
    private ctx: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private color: string;
    private velocityX: number;
    private velocityY: number;
    
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = Math.random() * 2 - 1;
        this.velocityY = Math.random() * 2 - 1;
    }

    public update(): void {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x + this.width > this.ctx.canvas.width || this.x < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.height > this.ctx.canvas.height || this.y < 0) {
            this.velocityY = -this.velocityY;
        }
    }

    public draw(): void {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}