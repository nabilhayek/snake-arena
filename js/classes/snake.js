import { ctx } from '../main.js';

export let allSnakes = [];

export default class Snake {
  constructor(x, y, direction, color, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.direction = direction;
    this.color = color;
    this.tail = [];
    this.enemySnakes = allSnakes.filter((snake) => snake.name !== this.name);
    allSnakes.push(this);
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
      console.log('collided with wall');
      this.destroy();
    }
    this.enemySnakes.forEach((snake) => {
      if (this.isColliding(snake)) {
        console.log('collided with another snake');
        this.destroy();
      }
    });
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
