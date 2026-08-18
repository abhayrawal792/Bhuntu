// Exactly twenty games are retained. Every other game-like route is removed from the birthday sequence.
export const RETAINED_GAMES = [
  { route: '/quiz', title: 'The One Game Abu Made for Samjhana', mechanic: 'personal quiz' },
  { route: '/cooking-game', title: 'A Birthday Table for Sanu', mechanic: 'cooking memory' },
  { route: '/photo-puzzle-3d', title: 'Put Our Favorite Photo Back Together', mechanic: 'photo puzzle' },
  { route: '/love-maze', title: 'Finding the Way Back to You', mechanic: 'memory maze' },
  { route: '/couple-bingo', title: 'The Little Things We Notice', mechanic: 'couple bingo' },
  { route: '/love-crossword', title: 'A Crossword Made of Our Clues', mechanic: 'romantic crossword' },
  { route: '/love-languages-quiz', title: 'The Language of Your Huss', mechanic: 'love-language quiz' },
  { route: '/love-constellation-painter', title: 'Paint a Constellation for Sanzu', mechanic: 'constellation painting' },
  { route: '/romantic-karaoke', title: 'Karaoke Night for Bhuntu', mechanic: 'romantic karaoke' },
  { route: '/love-rhythm-game', title: 'The Rhythm of Our Calls', mechanic: 'rhythm game' },
  { route: '/love-butterfly-catcher', title: 'Catch a Wish for Babe', mechanic: 'butterfly catcher' },
  { route: '/love-tetris-block-puzzle', title: 'Build Another Little Memory Tower', mechanic: 'romantic block puzzle' },
  { route: '/heartbeat-drum-pad', title: 'The Rhythm of Abu Missing You', mechanic: 'rhythm memory' },
  { route: '/sweet-proposal-simulator', title: 'The Future Abu Keeps Imagining', mechanic: 'future simulator' },
  { route: '/love-doodle-canvas', title: 'Draw a Little Heart for Bhuntu', mechanic: 'doodle canvas' },
  { route: '/love-firework-painter', title: 'Paint the Sky with Abu’s Wishes', mechanic: 'firework painter' },
  { route: '/love-wordle', title: 'Words Abu Saves for Samjhana', mechanic: 'word puzzle' },
  { route: '/emoji-art-canvas', title: 'Draw the Feeling Abu Cannot Say', mechanic: 'romantic art canvas' },
  { route: '/love-scratch-card', title: 'Scratch Open a Note from Abu', mechanic: 'scratch reveal' },
  { route: '/love-tetris', title: 'Build a Tower from Our Little Memories', mechanic: 'romantic block puzzle' },
];

export const RETAINED_GAME_ROUTES = RETAINED_GAMES.map((game) => game.route);
export const RETAINED_GAME_BY_ROUTE = Object.fromEntries(RETAINED_GAMES.map((game) => [game.route, game]));
