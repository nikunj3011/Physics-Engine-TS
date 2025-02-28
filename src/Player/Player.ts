import { EnemyBox } from "../AI/EnemyBox";
import { GoalBox } from "../GoalBox/GoalBox";

export class Player {
    private ctx: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private color: string;
    public velocityX: number;
    public velocityY: number;
    private gravity: number;
    private isJumping: boolean;
    private bounceDamping: number;

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
        this.isJumping = false;
        this.bounceDamping = 0.7;
    }

    public update(): void {
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
            this.velocityY =  -this.velocityY * this.bounceDamping;
            this.isJumping = false;
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

    public moveLeft(): void {
        this.velocityX = -5;
    }

    public moveRight(): void {
        this.velocityX = 5;
    }

    public jump(): void {
        if (!this.isJumping) {
            this.velocityY = -10;
            this.isJumping = true;
        }
    }

    public stopMoving(): void {
        this.velocityX = 0;
    }

    public checkCollision(enemy: EnemyBox): boolean {
        if (this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height) {
            return true;
        }
        return false;
    }
    public checkWin(goal: GoalBox): boolean {
        if (this.x + this.width > goal.x &&
            this.x < goal.x + goal.width &&
            this.y + this.height > goal.y &&
            this.y < goal.y + goal.height) {
            return true;
        }
        return false;
    }
}