"use strict";
class PhysicsObject {
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
    }
    applyGravity(gravity) {
        this.velocityY += gravity;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    getBottom() {
        return this.y + this.height;
    }
    setBottom(bottom) {
        this.y = bottom - this.height;
    }
}
function main() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const object = new PhysicsObject(ctx, 100, 100, 50, 50, 'red');
    object.velocityX = 2;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        object.applyGravity(0.1);
        object.update();
        object.draw();
        if (object.getBottom() > canvas.height) {
            object.setBottom(canvas.height);
            object.velocityY = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
}
main();
