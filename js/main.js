import Snake from './classes/snake.js';
import Food from './classes/food.js';
import { allFood } from './classes/food.js';
import { allSnakes } from './classes/snake.js';

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
import loadPlayers from './loadPlayers.js';

export const drawBackground = () => {
  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const h = new Food('#00ff00');
const FPS = 6;

window.onload = () => {
  setInterval(() => {
    drawBackground();
    h.draw();
    allSnakes.forEach((player) => {
      const food = allFood[0];
      player.draw();
      player.update();
      player.move(player.direction);
    });
    allFood.forEach((food) => {
      food.draw();
      food.update();
    });
  }, 1000 / FPS);
};
