import { EnemyBox } from "./AI/EnemyBox";
import { GoalBox } from "./GoalBox/GoalBox";
import { Level } from "./Levels/Level";
import { Player } from "./Player/Player";

function main(): void {
    if (typeof document === 'undefined') {
        console.error('This code must be run in a browser environment.');
        return;
    }
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    const player: Player = new Player(ctx, 50, 50, 50, 50, 'red');
    const enemy1: EnemyBox = new EnemyBox(ctx, 200, 200, 50, 50, 'blue');
    const enemy2: EnemyBox = new EnemyBox(ctx, 300, 300, 50, 50, 'green');
    const goal: GoalBox = new GoalBox(ctx, 400, 400, 50, 50, 'orange');

    let isGameOver: boolean = false;
    let isGameWon: boolean = false;

    const level1: Level = new Level(
        player,
        [new EnemyBox(ctx, 200, 200, 50, 50, 'blue')],
        new GoalBox(ctx, 400, 400, 50, 50, 'orange'),
        'lightblue'
    );

    const level2: Level = new Level(
        player,
        [new EnemyBox(ctx, 300, 300, 50, 50, 'green'), new EnemyBox(ctx, 200, 200, 50, 50, 'blue')],
        new GoalBox(ctx, 400, 400, 50, 50, 'orange'),
        'lightgreen'
    );

    const levels: Level[] = [level1, level2];

    let currentLevel: number = 0;

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                player.moveLeft();
                break;
            case 'ArrowRight':
                player.moveRight();
                break;
            case 'ArrowUp':
                player.jump();
                break;
            case 'ArrowDown':
                break;
            case 'Enter':
                if (isGameOver || isGameWon) {
                    isGameOver = false;
                    isGameWon = false;
                    player.x = 50;
                    player.y = 50;
                    player.velocityX = 0;
                    player.velocityY = 0;
                }
                break;
        }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                player.stopMoving();
                break;
        }
    });

    function animate(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // if (!isGameOver && !isGameWon) {
        //     player.update();
        //     player.draw();

        //     enemy1.update();
        //     enemy1.draw();

        //     enemy2.update();
        //     enemy2.draw();

        //     goal.draw();

        //     if (player.checkCollision(enemy1) || player.checkCollision(enemy2)) {
        //         isGameOver = true;
        //     } else if (player.checkWin(goal)) {
        //         isGameWon = true;
        //     }
        // }
        if (!isGameOver && !isGameWon) {
            levels[currentLevel].update();
            levels[currentLevel].draw(ctx);

            if (levels[currentLevel].checkCollisions()) {
                isGameOver = true;
            } else if (levels[currentLevel].checkWin()) {
                isGameWon = true;
                currentLevel++;
                if (currentLevel >= levels.length) {
                    currentLevel = 0;
                }
            }
        }
        else if (isGameOver) {
            ctx.font = '48px Arial';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
            ctx.font = '24px Arial';
            ctx.fillText('Press Enter to try again', canvas.width / 2, canvas.height / 2 + 50);
        } else if (isGameWon) {
            ctx.font = '48px Arial';
            ctx.fillStyle = 'green';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
            ctx.font = '24px Arial';
            ctx.fillText('Press Enter to play again', canvas.width / 2, canvas.height / 2 + 50);
        }

        requestAnimationFrame(animate);
    }

    animate();
}

main();