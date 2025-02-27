class Player {
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
    }

    public update(): void {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y + this.height > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
        if (this.y < 0) {
            this.y = 0;
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

class GoalBox {
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

class EnemyBox {
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

function main(): void {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    const player: Player = new Player(ctx, 50, 50, 50, 50, 'red');
    const enemy1: EnemyBox = new EnemyBox(ctx, 200, 200, 50, 50, 'blue');
    const enemy2: EnemyBox = new EnemyBox(ctx, 300, 300, 50, 50, 'green');
    const goal: GoalBox = new GoalBox(ctx, 400, 400, 50, 50, 'orange');

    let isGameOver: boolean = false;
    let isGameWon: boolean = false;

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

        if (!isGameOver && !isGameWon) {
            player.update();
            player.draw();

            enemy1.update();
            enemy1.draw();

            enemy2.update();
            enemy2.draw();

            goal.draw();

            if (player.checkCollision(enemy1) || player.checkCollision(enemy2)) {
                isGameOver = true;
            } else if (player.checkWin(goal)) {
                isGameWon = true;
            }
        } else if (isGameOver) {
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