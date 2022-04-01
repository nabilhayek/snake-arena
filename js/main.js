import Snake from './classes/snake.js';
import Food from './classes/food.js';
import { allFood } from './classes/food.js';
import { allSnakes } from './classes/snake.js';

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const drawBackground = () => {
  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const Player = new Snake(50, 50, 'down', '#ff0000', 'player1');
const aa = new Snake(750, 750, 'left', '#ffff00', 'aa');
const h = new Food('#00ff00');
const FPS = 6;

const players = [Player];

window.onload = () => {
  setInterval(() => {
    drawBackground();
    h.draw();
    allSnakes.forEach((player) => {
      const food = allFood[0];
      player.draw();
      player.move(player.direction);
    });
    allFood.forEach((food) => {
      food.draw();
      food.update();
    });
  }, 1000 / FPS);
};
