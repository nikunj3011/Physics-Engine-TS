"use strict";
class Player {
    constructor(ctx, x, y, width, height, color) {
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
    update() {
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
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveLeft() {
        this.velocityX = -5;
    }
    moveRight() {
        this.velocityX = 5;
    }
    jump() {
        if (!this.isJumping) {
            this.velocityY = -10;
            this.isJumping = true;
        }
    }
    stopMoving() {
        this.velocityX = 0;
    }
    checkCollision(enemy) {
        if (this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height) {
            return true;
        }
        return false;
    }
}
class EnemyBox {
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
function main() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const player = new Player(ctx, 50, 50, 50, 50, 'red');
    const enemy1 = new EnemyBox(ctx, 200, 200, 50, 50, 'blue');
    const enemy2 = new EnemyBox(ctx, 300, 300, 50, 50, 'green');
    let isGameOver = false;
    document.addEventListener('keydown', (event) => {
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
                if (isGameOver) {
                    isGameOver = false;
                    player.x = 50;
                    player.y = 50;
                    player.velocityX = 0;
                    player.velocityY = 0;
                }
                break;
        }
    });
    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                player.stopMoving();
                break;
        }
    });
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!isGameOver) {
            player.update();
            player.draw();
            enemy1.update();
            enemy1.draw();
            enemy2.update();
            enemy2.draw();
            if (player.checkCollision(enemy1) || player.checkCollision(enemy2)) {
                isGameOver = true;
            }
        }
        else {
            ctx.font = '48px Arial';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
            ctx.font = '24px Arial';
            ctx.fillText('Press Enter to try again', canvas.width / 2, canvas.height / 2 + 50);
        }
        requestAnimationFrame(animate);
    }
    animate();
}
main();
