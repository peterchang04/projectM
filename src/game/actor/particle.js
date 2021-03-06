import physics from '../decorator/_physics.js';
import globals from '../../utils/globals';
import drawable from '../decorator/_drawable.js';
import perf from '../../utils/perf.js';

export default class Particle {
  constructor(initialObj = {}) { /* e.g. { x,y,w,h,d,s } */ let p = perf.start('Particle.constructor');
    // set initial values
    for (const key in initialObj) {
      this[key] = initialObj[key];
    }
    drawable.add(this);
    physics.add(this);

    // add a fn to the draws queue
    this.drawParticle = function(context) {  let p = perf.start('Particle.drawParticle');
      context.beginPath();
      context.arc(
        this.x, this.y,
        this.w * globals.viewport.pixelRatio / 2,
        0,
        globals.constants.PI2
      );
      context.fillStyle = this.c || '#fff';
      if (this.opacity) context.fillStyle = `rgba(255,255,255,${this.opacity})`;
      context.fill();

      if (this.trail) {
        for (let i = 0; i < this.trail; i++) {
          const opacityMod = this.opacity / (this.trail + 1);
          context.beginPath();
          context.arc(
            this.x - (this.distX * (i+1) * 2 * globals.viewport.pixelRatio),
            this.y - (this.distY * (i+1) * 2 * globals.viewport.pixelRatio),
            this.w * globals.viewport.pixelRatio / 2,
            0,
            physics.PI2
          );
          context.fillStyle = '#fff';
          if (this.opacity) context.fillStyle = `rgba(255,255,255,${this.opacity - (opacityMod * (i+1))})`;
          context.fill();
        }
      }
      perf.stop('Particle.drawParticle', p);
    };
    this.draws.push('drawParticle');
    perf.stop('Particle.constructor', p);
  }
}
