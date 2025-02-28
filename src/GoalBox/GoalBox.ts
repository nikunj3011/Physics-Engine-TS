export class GoalBox {
    private ctx: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    public draw(): void {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}