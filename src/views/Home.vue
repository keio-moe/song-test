<template lang='pug'>
.home
  .pdf
    iframe.file(src="/Experiment Consent Form.pdf")
  .v-checkbox
    input(type="checkbox", v-on:click="setActive(0)")
    .v-label I agree to the terms and conditions of mentioned above.
  .routes
    a.route(
      v-for="route in routes",
      :href="route.src",
      v-if="route.active == true"
    )
      | {{ $t(route.label) }}
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

interface RouteDefinition {
  title: string;
  label: string;
  src: string;
  active: boolean;
}

@Component({
  name: 'Home',
})
export default class Home extends Vue {
  private routes: RouteDefinition[] = [
    {
      title: 'worldMusicWorkshop',
      label: 'Start World Music Workshop',
      src: '/experiments/worldmusic/workshop/evaluation',
      active: false,
    },
    {
      title: 'indianMusic',
      label: 'Start Indian Music Experiment',
      src: '/experiments/indian_music_evaluation',
      active: false
    },
  ];
  private setActive(route: number) {
    this.routes[route].active = !this.routes[route].active;
  }
}
</script>

<style lang='stylus' scoped>
.pdf {
  margin: 2rem auto;
  width: 90vw;
  height: 70vh;

  iframe.file {
    width: 100%;
    height: 100%;
  }
}

.v-checkbox {
  display: flex;
  margin: 0 auto 2rem auto;
  justify-content: center;
}

.routes {
  display: flex;
  flex-direction: row;
  min-width: 400px;
  max-width: 800px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;

  a.route {
    text-transform: uppercase;
    font-size: 24px;
    color: white;
    text-decoration: none;
    padding: 1rem;
    background-color: #42b983;
    border-radius: 5px;
    border: 1px solid #42b983;
    margin: 5px;
  }

  a.route:hover {
    background-color: white;
    color: #42b983;
  }

  @media screen and (max-width: 600px) {
    width: 90vw;

    a.route {
      width: 100%;
    }
  }
}
</style>
