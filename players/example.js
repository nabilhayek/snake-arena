import Snake from '../js/classes/snake.js';

const Example = new Snake(
  '#ff0000',
  'example',
  (mySnake, allSnakes, allFoods) => {
    // choose a direction to move by passing 'up', 'down', 'left', or 'right' to the move function
    // mySnake.move('up');
  }
);

export default Example;
