class PhysicsObject {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private color: string;
  public velocityX: number;
  public velocityY: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.velocityX = 0;
      this.velocityY = 0;
  }

  public applyGravity(gravity: number): void {
      this.velocityY += gravity;
  }

  public update(): void {
      this.x += this.velocityX;
      this.y += this.velocityY;
  }

  public draw(): void {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public getBottom(): number {
      return this.y + this.height;
  }

  public setBottom(bottom: number): void {
      this.y = bottom - this.height;
  }
}

function main(): void {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

  const object: PhysicsObject = new PhysicsObject(ctx, 100, 100, 50, 50, 'red');
  object.velocityX = 2;

  function animate(): void {
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