import Vue from 'vue';
import Router from 'vue-router';

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
    {
      path: '/experiments/worldmusic/:subtype/evaluation',
      name: 'worldmusic_evaluation',
      component: () => import(
        /* webpackChunkName: "worldmusic_evaluation" */
        /* webpackMode: "lazy" */
        './views/experiments/WorldMusicEvaluation.vue'),
    },
    {
      path: '/experiments/worldmusic/:subtype/similarity',
      name: 'worldmusic_similarity',
      component: () => import(
        /* webpackChunkName: "worldmusic_similarity" */
        /* webpackMode: "lazy" */
        './views/experiments/WorldMusicSimilarity.vue'),
    },
  ],
});
