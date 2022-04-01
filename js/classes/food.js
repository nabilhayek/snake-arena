import { ctx } from '../main.js';
import { allSnakes } from './snake.js';

export const allFood = [];

export default class Food {
  constructor(color) {
    this.x =
      (Math.floor(Math.random() * (ctx.canvas.width / 10 - 10)) + 1) * 10;
    this.y =
      (Math.floor(Math.random() * (ctx.canvas.height / 10 - 10)) + 1) * 10;
    this.size = 10;
    this.color = color;
    allFood.push(this);
  }

  //check if an snake from allSnakes is eating the food
  isEating(snake) {
    if (snake.x === this.x && snake.y === this.y) {
      return true;
    }
    return false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    allSnakes.forEach((snake) => {
      if (this.isEating(snake)) {
        snake.grow();
        this.x =
          (Math.floor(Math.random() * (ctx.canvas.width / 10 - 10)) + 1) * 10;
        this.y =
          (Math.floor(Math.random() * (ctx.canvas.height / 10 - 10)) + 1) * 10;
      }
    });
  }
}
