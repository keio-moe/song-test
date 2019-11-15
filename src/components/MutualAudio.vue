<template lang="pug">
audio.audio(:controls="controls", @play="onPlay", @end="onEnd")
  source(:src="src", :type="type")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as rm from 'typed-rest-client/RestClient';
import consts from '@/consts';

@Component({
  name: 'CreateExperiment',
  components: {},
})
export default class CreateExperiment extends Vue {
  @Prop(String) private src!: string;
  @Prop(String) private type!: string;
  @Prop(Boolean) private controls !: boolean;

  private async onPlay(obj: any) {
    const self = obj.target;
    document.body.querySelectorAll('audio').forEach((audio) => {
      if (audio !== self) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }

  private onEnd(obj: any) {
    console.log(obj);
  }
}
</script>

<style lang="stylus" scoped>
.audio
  width 100%
  border-radius 2em
</style>
