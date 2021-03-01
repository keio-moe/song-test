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
      title: 'aesthetics',
      src: '/experiments/aesthetics',
    },
    // {
    //   title: 'copyrightWorkshop',
    //   src: '/experiments/copyright/workshop',
    // },
    {
      title: 'copyrightFull',
      src: '/experiments/copyright/full',
    },
    {
      title: 'copyrightNewWorkshop',
      src: '/experiments/copyright/new_workshop',
    },
    // {
    //   title: 'worldMusic',
    //   src: '/experiments/worldmusic/full/evaluation',
    // },
    {
      title: 'worldMusicWorkshop',
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
    {
      title: 'indianMusic',
      src: '/experiments/indian_music_evaluation',
    },
  ];
}
</script>

<style lang="stylus" scoped>
.routes
  text-align center
  a.route
    display block
    margin 40px 0
    font-size 24px
    color #42b983
</style>
