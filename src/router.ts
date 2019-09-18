import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/homePage',
      name: 'homePage',
      component: () => import(/* webpackChunkName: "about" */ './views/homePage.vue'),
    },
    {
      path: '/wheels',
      name: 'wheels',
      component: () => import(/* webpackChunkName: "about" */ './views/wheels.vue'),
    },
    {
      path: '/',
      name: 'test',
      component: () => import(/* webpackChunkName: "about" */ './views/test.vue'),
    },

  ],
});
