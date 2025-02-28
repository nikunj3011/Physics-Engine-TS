import { Actor } from "../Actor/Actor";
import { EnemyBox } from "../AI/EnemyBox";
import { GoalBox } from "../GoalBox/GoalBox";

export class Player extends Actor {
    private isJumping: boolean;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
        super(ctx, x, y, width, height, color);
        this.isJumping = false;
    }

    public update(): void {
        super.update();
        if (this.y + this.height >= this.ctx.canvas.height) {
            this.isJumping = false;
        }
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