<template lang="pug">
.world-music-evaluation
  create-experiment(:service="service", v-if="stage === 0", @created="experimentCreated")
  el-card.experiment(v-if="stage === 1")
    div(slot="header", class="clearfix")
      el-form(label-width="80px", label-position="top")
        el-form-item(:label="$t('progress')")
          el-progress.progress(:text-inside="true", :stroke-width="18", :percentage="Number((progress * 100).toFixed(2))")
        el-form-item(:label="$t('records')", v-if="wavs.length > 0")
          div(v-for="wav in wavs" :key="wav.entity")
            p.label
              | {{ wav.label }}:
            audio(controls)
              source(:src="wav.entity" type="audio/mpeg")
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('overlap')")
        div
          el-slider.similarity(v-model="overlap")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Solo
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Standard
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Multiple Textures
      el-form-item(:label="$t('creativity')")
        div
          el-slider.similarity(v-model="creativity", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Unfamiliar
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Sounds familiar
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Have heard before
      el-form-item(:label="$t('likeness')")
        div
          el-slider.similarity(v-model="likeness", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Dislike
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Ambivalent
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Like
      el-form-item(:label="$t('tempo')")
        div
          el-slider.similarity(v-model="tempo", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Slow
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Standard
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Fast
      el-form-item(:label="$t('consonance')")
        div
          el-slider.similarity(v-model="consonance", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Dissonant
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Neutral
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Consonant
      el-form-item(:label="$t('emotion')")
        div
          el-slider.similarity(v-model="emotion", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Negative
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Neither
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Positive
      el-form-item(:label="$t('decoration')")
        div
          el-slider.similarity(v-model="decoration", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Solo
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Standard
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Multiple Textures
      el-form-item(:label="$t('range')")
        div
          el-slider.similarity(v-model="range", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Overall Low Pitch
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Standard
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Overall High Pitch
      el-form-item(:label="$t('quality')")
        div
          el-slider.similarity(v-model="quality", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Low
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Standard
            span(:style="{width: '200px', 'text-align': 'right'}")
              | High
      el-form-item(:label="$t('rhythm')")
        div
          el-slider.similarity(v-model="rhythm", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Iregular
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Neither
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Regular
      el-form-item(:label="$t('excitingness')")
        div
          el-slider.similarity(v-model="excitingness", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Calming
            span(:style="{flex: 1, 'text-align': 'center'}")
              | No Change
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Exciting
      el-form-item(:label="$t('groove')")
        div
          el-slider.similarity(v-model="groove", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Cannot find a beat
            span(:style="{flex: 1, 'text-align': 'center'}")
              | No effect
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Can move to the beat
      el-form-item(:label="$t('timbre')")
        div
          el-slider.similarity(v-model="timbre", :style="{flex: 1}")
          div(:style="{display: 'flex'}")
            span(:style="{width: '200px'}")
              | Dark
            span(:style="{flex: 1, 'text-align': 'center'}")
              | Normal
            span(:style="{width: '200px', 'text-align': 'right'}")
              | Bright
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  a.route(v-if="stage === 2", href="/experiments/worldmusic/similarity")
    h2
      | {{ $t('evaluationToSimilarity') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Slider, Switch } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';


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
    'el-button': Button,
    'el-card': Card,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-progress': Progress,
    'el-slider': Slider,
    'el-switch': Switch,
  },
})

export default class Copyright extends Vue {
  private service: string = 'world_music_evaluation';
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
    });
    this.nextEntity();
  }
}
</script>

<style lang="stylus" scoped>
.experiment
  width 70%
  margin 0 15%
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
</style>
