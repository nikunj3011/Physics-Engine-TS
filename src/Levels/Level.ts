import { EnemyBox } from "../AI/EnemyBox";
import { GoalBox } from "../GoalBox/GoalBox";
import { Player } from "../Player/Player";

export class Level {
    private player: Player;
    private enemies: EnemyBox[];
    private goal: GoalBox;
    private background: string;

    constructor(player: Player, enemies: EnemyBox[], goal: GoalBox, background: string) {
        this.player = player;
        this.enemies = enemies;
        this.goal = goal;
        this.background = background;
    }

    public update(): void {
        this.player.update();
        this.enemies.forEach(enemy => enemy.update());
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.player.draw();
        this.enemies.forEach(enemy => enemy.draw());
        this.goal.draw();
    }

    public checkCollisions(): boolean {
        return this.enemies.some(enemy => this.player.checkCollision(enemy));
    }

    public checkWin(): boolean {
        return this.player.checkWin(this.goal);
    }
}