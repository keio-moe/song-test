<template lang="pug">
.home
  .routes
    a.route(v-for="route in routes", :href="route.src")
      | {{ $t(route.title) }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface RouteDefinition {
  title: string;
  src: string;
}

@Component({
  name: 'Home',
})
export default class Home extends Vue {
  private routes: RouteDefinition[] = [
    {
      title: 'Indian Music Experiment',
      src: '/experiments/indian_music_evaluation',
    },
    {
      title: 'Aesthetics Experiment',
      src: '/experiments/aesthetics',
    },
    // {
    //   title: 'copyrightWorkshop',
    //   src: '/experiments/copyright/workshop',
    // },
    {
      title: 'Full Copyright',
      src: '/experiments/copyright/full',
    },
    {
      title: 'New Copyright Workshop',
      src: '/experiments/copyright/new_workshop',
    },
    // {
    //   title: 'worldMusic',
    //   src: '/experiments/worldmusic/full/evaluation',
    // },
    {
      title: 'World Music Workshop',
      src: '/experiments/worldmusic/workshop/evaluation',
    },
    // {
    //   title: 'worldMusicWorkshopRank',
    //   src: '/experiments/worldmusic/workshop/rank',
    // },
    // {
    //   title: 'worldMusicWorkshopSimilarity',
    //   src: '/experiments/worldmusic/workshop/similarity',
    // },
    // {
    //   title: 'worldMusicYamaha',
    //   src: '/experiments/worldmusic/yamaha/evaluation',
    // },
  ];
}
</script>

<style lang="stylus" scoped>
.routes
  display flex
  flex-direciton row
  min-width 400px
  max-width 800px
  margin 0 auto
  flex-wrap wrap
  a.route
    text-transform uppercase
    width 40%
    font-size 24px
    color white
    text-decoration none
    padding 3rem 1rem
    background-color #42b983
    border-radius 5px
    border 1px solid #42b983
    height 10rem
    margin 5px
  a.route:hover
    background-color white
    color #42b983
</style>
