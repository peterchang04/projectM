import { cloneDeep } from 'lodash';
import perf from '../../utils/perf.js';

const temp = {};
/* list all used properties here. Used to cross-reference check in decorate.js & set defaults */
const properties = {
  temp: {}, // for entity specific temp memory space
  inits: [], // function names to init with, populated by other decorators probably
  type: 0, // type support
};

function getProperties() {
  return properties;
}

function add(obj) { perf.start('_entity.add');
  Object.assign(obj, cloneDeep(properties)); // merge properties
  obj.init = init;
  perf.stop('_entity.add');
}

function init(initialObj) { perf.start('_entity.init'); // run own init functions
  // add it to a queue if it isn't already there
  if (!(this.id in $g.game[$g.whichBank[this.className]])) {
    $g.game[$g.whichBank[this.className]][this.id] = this;
  }
  // apply initialObj to this
  Object.assign(this, initialObj); // merge properties

  this.applyType();
  // run init functions
  this.inits.map((word) => {
    this[word](initialObj);
  });
  perf.stop('_entity.init');
}

export default { add, getProperties };