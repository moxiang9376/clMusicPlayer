import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "homePage",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/homePage.vue"),
    },
    {
      path: "/wheels",
      name: "wheels",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/wheels.vue"),
    },
    {
      path: "/musicInfo",
      name: "musicInfo",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/musicInfo.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/test.vue"),
    },
    // {
    //   path: '/',
    //   name: 'test',
    //   component: () => import(/* webpackChunkName: "about" */ './views/test.vue'),
    // },
  ],
});
