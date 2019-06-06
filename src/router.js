import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Pilot from './components/page/Pilot.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pilot',
      component: Pilot,
    },
    {
      path: '/join',
      component: Home,
    },
  ],
});
