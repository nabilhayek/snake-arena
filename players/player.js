import Snake from '../js/classes/snake.js';

const Player = new Snake(
  '#ff0000',
  'player1',
  (mySnake, allSnakes, allFoods) => {
    // choose a direction to move by passing 'up', 'down', 'left', or 'right' to the move function
    // mySnake.move('up');
  }
);

export default Player;
