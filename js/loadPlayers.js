import Player from '../players/player.js';
import Example from '../players/example.js';

const loadPlayers = () => {
  const players = [Player, Example];
  return players;
};

export default loadPlayers;
