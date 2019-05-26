<template lang="pug">
.home
  .routes
    a.route(v-for="route in routes", :href="route.src")
      | {{ route.title }}
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
      title: 'Copyright Experiment (Workshop)',
      src: '/experiments/copyright/workshop',
    },
    // {
    //   title: 'Copyright Experiment (Full)',
    //   src: '/experiments/copyright/full',
    // },
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
