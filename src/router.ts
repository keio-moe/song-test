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
      path: '/experiments/aesthetics',
      name: 'aesthetics',
      component: () => import(
        /* webpackChunkName: "aesthetics" */
        /* webpackMode: "lazy" */
        './views/experiments/Aesthetics.vue'),
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
      path: '/experiments/indianmusic/:subtype/evaluation',
      name: 'indian_music_evaluation',
      component: () => import(
        /* webpackChunkName: "worldmusic_evaluation" */
        /* webpackMode: "lazy" */
        './views/experiments/IndianMusicEvaluation.vue'),
    },
    {
      path: '/experiments/worldmusic/:subtype/similarity/:id/:flag',
      name: 'worldmusic_similarity',
      component: () => import(
        /* webpackChunkName: "worldmusic_similarity" */
        /* webpackMode: "lazy" */
        './views/experiments/WorldMusicSimilarity.vue'),
    },
    {
      path: '/experiments/worldmusic/:subtype/rank/:id/:flag',
      name: 'worldmusic_rank',
      component: () => import(
        /* webpackChunkName: "worldmusic_rank" */
        /* webpackMode: "lazy" */
        './views/experiments/WorldMusicRank.vue'),
    },
    {
      path: '/experiments/indian_music_evaluation',
      name: 'indian_music',
      component: () => import(
        /* webpackChunkName: "indian_music" */
        /* webpackMode: "lazy" */
        './views/experiments/IndianMusicEvaluation.vue'),
    },
  ],
});
