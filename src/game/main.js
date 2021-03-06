import backgroundCanvas from './canvas/backgroundCanvas.js';
import backgroundGridCanvas from './canvas/backgroundGridCanvas.js';
import steeringCanvas from './canvas/steeringCanvas.js';
import shipCanvas from './canvas/shipCanvas.js';
import $g from '../utils/globals.js';
import canvasText from '../utils/canvasText.js';
import perf from '../utils/perf.js';
import Ship from '../game/actor/ship.js';

const stats = {
  updateCount: 0,
  lastDraw: null, // epoch ms from Date.now()
  renderCount: 0,
};

const actors = {};
const bullets = {};
const canvas = {};

function init() {
  // get the shipView's dimensions
  $g.viewport.update(document.getElementById('shipView').offsetWidth, document.getElementById('shipView').offsetHeight);

  // identify canvases
  canvas.ships = document.getElementById('canvas_ships').getContext('2d');
  canvas.bullets = document.getElementById('canvas_bullets').getContext('2d');

  // register myShip with constants
  $g.game.myShip = new Ship({ mX: 0, mY: 0, angle: 90, d: 0 }); // 35 55

  // init dependencies
  canvasText.init();
  shipCanvas.init();
  backgroundCanvas.init();
  backgroundGridCanvas.init();
  steeringCanvas.init();

  // start the update loop
  clearInterval(stats.loopId);
  stats.loopId = setInterval(() => {
    update();
  }, 16.66 /* 60 fps updates */ );

  // start the draw loop;
  draw();
}

function update() { let p = perf.start('main.update');
  stats.updateCount++;
  backgroundCanvas.update(stats.updateCount);
  shipCanvas.update(stats.updateCount);
  perf.stop('main.update', p);
}

// draws at the refresh rate of device monitor. Mostly 60, but could be 100+
function draw() { let p = perf.start('main.draw');
  stats.lastDraw = Date.now();
  backgroundCanvas.draw();
  backgroundGridCanvas.draw();
  shipCanvas.draw();
  steeringCanvas.draw();
  perf.stop('main.draw', p);
  requestAnimationFrame(draw);
}

export default { init };
