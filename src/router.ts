import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(
        /* webpackChunkName: "home" */
        /* webpackMode: "lazy" */
        './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(
        /* webpackChunkName: "about" */
        /* webpackMode: "lazy" */
        './views/About.vue'),
    },
    {
      path: '/experiments/copyright/:subtype',
      name: 'copyright',
      component: () => import(
        /* webpackChunkName: "copyright" */
        /* webpackMode: "lazy" */
        './views/experiments/Copyright.vue'),
    },
  ],
});
