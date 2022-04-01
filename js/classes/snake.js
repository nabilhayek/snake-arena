import { ctx } from '../main.js';
import { allFood } from './food.js';

export let allSnakes = [];
const directions = ['up', 'down', 'left', 'right'];

const randomDirection = () => {
  return directions[Math.floor(Math.random() * directions.length)];
};

export default class Snake {
  constructor(color, name, tick) {
    this.x = (Math.floor(Math.random() * (800 / 10 - 10)) + 1) * 10;
    this.y = (Math.floor(Math.random() * (800 / 10 - 10)) + 1) * 10;
    this.name = name;
    this.direction = randomDirection();
    this.color = color;
    this.tail = [];
    this.enemySnakes = allSnakes.filter((snake) => snake.name !== this.name);
    allSnakes.push(this);
    this.tick = tick;
  }
  //draw the snake
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
    this.tail.forEach((part) => {
      ctx.fillRect(part.x, part.y, 10, 10);
    });
  }
  //move the snake
  move() {
    this.tail.unshift({ x: this.x, y: this.y });
    if (this.tail.length > 5) {
      this.tail.pop();
    }
    switch (this.direction) {
      case 'right':
        this.x += 10;
        break;
      case 'left':
        this.x -= 10;
        break;
      case 'up':
        this.y -= 10;
        break;
      case 'down':
        this.y += 10;
        break;
    }
    if (this.isCollidingWithWall()) {
      this.destroy();
    }
    this.enemySnakes.forEach((snake) => {
      if (this.isColliding(snake)) {
        this.destroy();
      }
    });
    if (this.isOutsideOfCanvas()) {
      this.destroy();
    }
  }

  //if snake is outside of the canvas, destroy
  isOutsideOfCanvas() {
    if (this.x < 0 || this.x > 800 - 10 || this.y < 0 || this.y > 800 - 10) {
      return true;
    }
    return false;
  }

  update() {
    this.tick(this, allSnakes, allFood);
  }

  destroy() {
    allSnakes = allSnakes.filter((snake) => snake.name !== this.name);
  }

  checkCollisions() {}

  //check if snake is colliding with another snake from allSnakes
  isColliding(snake) {
    if (this.x === snake.x && this.y === snake.y) {
      snake.destroy();
      return true;
    }
    snake.tail.forEach((part) => {
      if (this.x === part.x && this.y === part.y) {
        return true;
      }
    });
    return false;
  }

  //check if snake is colliding with the wall
  isCollidingWithWall() {
    if (
      this.x < 0 ||
      this.x > ctx.canvas.width - 10 ||
      this.y < 0 ||
      this.y > ctx.canvas.height - 10
    ) {
      return true;
    }
    return false;
  }

  //change the direction of the snake
  changeDirection(newDirection) {
    if (this.direction === 'up' && newDirection === 'down') return;
    if (this.direction === 'down' && newDirection === 'up') return;
    if (this.direction === 'left' && newDirection === 'right') return;
    if (this.direction === 'right' && newDirection === 'left') return;
    this.direction = newDirection;
  }

  //check if the snake is eating the food

  //grow the snake
  grow() {
    this.tail.push({ x: this.x, y: this.y });
    this.tail.push({ x: this.x, y: this.y });
  }
}
