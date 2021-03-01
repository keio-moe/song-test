<template lang="pug">
.world-music-evaluation
  div(v-if="stage === 0")
    iframe.frame(src="https://hideodaikoku.github.io/feat-explanation/")
    create-experiment(:service="service", @created="experimentCreated")
  el-card.experiment(v-if="stage === 1")
    div(slot="header", class="clearfix")
      el-form(label-width="80px", label-position="top")
        el-form-item(:label="$t('progress')")
          el-progress.progress(:text-inside="true", :stroke-width="18", :percentage="Number((progress * 100).toFixed(2))")
        el-form-item(:label="$t('records')", v-if="wavs.length > 0")
          div(v-for="wav in wavs" :key="wav.entity")
            p.label
              | {{ wav.label }}:
            mutual-audio(controls, :src="wav.entity" type="audio/mpeg")
    el-form.questionnaire(label-width="80px", label-position="top")
      el-form-item(:label="$t('worldMusicFeature1')")
        el-radio(v-model="decoration", :label="0")
          | {{ $t('worldMusicLow1') }}
        el-radio(v-model="decoration", :label="50")
          | {{ $t('worldMusicMedium1') }}
        el-radio(v-model="decoration", :label="100")
          | {{ $t('worldMusicHigh1') }}
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  h2(v-if="stage === 2")
    | Experiment Finished
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Radio, Slider, Switch } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';
import MutualAudio from '@/components/MutualAudio.vue';


interface Entry<T> {
  experiment: string;
  data: T;
}

interface Labeled<T> {
  label: string;
  entity: T;
}

interface WorldMusicEvaluationEntry {
  progress: number;
  wavs: Array<Labeled<string>>;
  id: number;
}

@Component({
  name: 'Copyright',
  components: {
    'create-experiment': () => import('@/components/CreateExperiment.vue'),
    'slider-span': () => import('@/components/SliderSpan.vue'),
    'el-button': Button,
    'el-card': Card,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-progress': Progress,
    'el-radio': Radio,
    'el-slider': Slider,
    'el-switch': Switch,
    'mutual-audio': MutualAudio,
  },
})

export default class Copyright extends Vue {
  private service: string = 'indian_music_evaluation';
  private username: string = '';
  private stage: number = 0;
  private progress: number = 0;
  private wavs: Array<Labeled<string>> = [];
  private entityId: number = 0;

  private overlap: number = 50;
  private creativity: number = 50;
  private likeness: number = 50;
  private tempo: number = 50;
  private consonance: number = 50;
  private emotion: number = 50;
  private decoration: number = 50;
  private range: number = 50;
  private quality: number = 50;
  private rhythm: number = 50;
  private excitingness: number = 50;
  private groove: number = 50;
  private timbre: number = 50;
  private instrument_vocals: number = 50;
  private instrument_overlap: number = 50;
  private instrument_tone_blend: number = 50;
  private instrument_rhythm_blend: number = 50;

  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private experimentCreated(username: string) {
    this.username = username;
    this.stage = 1;
    this.nextEntity();
  }

  private async nextEntity() {
    this.overlap = 50;
    this.creativity = 50;
    this.likeness = 50;
    this.tempo = 50;
    this.consonance = 50;
    this.emotion = 50;
    this.decoration = 50;
    this.range = 50;
    this.quality = 50;
    this.rhythm = 50;
    this.excitingness = 50;
    this.groove = 50;
    this.timbre = 50;
    this.instrument_vocals = 50;
    this.instrument_overlap = 50;
    this.instrument_tone_blend = 50;
    this.instrument_rhythm_blend = 50;

    const query: string = queryString.stringify({
      username: this.username,
    });
    const resp = await this.restClient.get<Entry<WorldMusicEvaluationEntry>>(`experiments/${this.service}?${query}`);
    if (resp.statusCode === 404) {
      this.stage = 2;
      return;
    }
    this.progress = resp.result!.data.progress;
    this.wavs = resp.result!.data.wavs;
    this.entityId = resp.result!.data.id;
  }

  private goToManual() {
    window.open('https://hideodaikoku.github.io/feat-explanation/', '_blank');
  }

  private async onSubmit() {
    await this.restClient.replace(`experiments/${this.service}`, {
      username: this.username,
      id: this.entityId,
      overlap: this.overlap,
      creativity: this.creativity,
      likeness: this.likeness,
      tempo: this.tempo,
      consonance: this.consonance,
      emotion: this.emotion,
      decoration: this.decoration,
      range: this.range,
      quality: this.quality,
      rhythm: this.rhythm,
      excitingness: this.excitingness,
      groove: this.groove,
      timbre: this.timbre,
      instrument_vocals: this.instrument_vocals,
      instrument_overlap: this.instrument_overlap,
      instrument_tone_blend: this.instrument_tone_blend,
      instrument_rhythm_blend: this.instrument_rhythm_blend,
    });
    this.nextEntity();
    window.scrollTo(0, 0);
  }
}
</script>

<style lang="stylus" scoped>
.experiment
  width 70%
  margin 0 15%
.frame
  width 70%
  margin 0 15%
  height 700px
  border 0
.finish
  text-align center
  margin-top 200px
.similarity
  padding 0 5%
.progress
  margin-top 12px
.label
  font-weight bold
.route
  text-align center
  display block
  margin 40px 0
  font-size 24px
  color #42b983
.questionnaire
  height 36vh
  overflow-y scroll
</style>
