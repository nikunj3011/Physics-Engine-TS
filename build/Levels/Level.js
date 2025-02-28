export class Level {
    constructor(player, enemies, goal, background) {
        this.player = player;
        this.enemies = enemies;
        this.goal = goal;
        this.background = background;
    }
    update() {
        this.player.update();
        this.enemies.forEach(enemy => enemy.update());
    }
    draw(ctx) {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.player.draw();
        this.enemies.forEach(enemy => enemy.draw());
        this.goal.draw();
    }
    checkCollisions() {
        return this.enemies.some(enemy => this.player.checkCollision(enemy));
    }
    checkWin() {
        return this.player.checkWin(this.goal);
    }
}
