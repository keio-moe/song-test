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
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="overlap", :style="{flex: 1}")
      el-form-item(:label="$t('creativity')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="creativity", :style="{flex: 1}")
      el-form-item(:label="$t('likeness')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="likeness", :style="{flex: 1}")
      el-form-item(:label="$t('tempo')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="tempo", :style="{flex: 1}")
      el-form-item(:label="$t('consonance')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="consonance", :style="{flex: 1}")
      el-form-item(:label="$t('emotion')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="emotion", :style="{flex: 1}")
      el-form-item(:label="$t('decoration')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="decoration", :style="{flex: 1}")
      el-form-item(:label="$t('range')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="range", :style="{flex: 1}")
      el-form-item(:label="$t('quality')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="quality", :style="{flex: 1}")
      el-form-item(:label="$t('rhythm')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="rhythm", :style="{flex: 1}")
      el-form-item(:label="$t('excitingness')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="excitingness", :style="{flex: 1}")
      el-form-item(:label="$t('groove')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="groove", :style="{flex: 1}")
      el-form-item(:label="$t('timbre')")
        div(:style="{display: 'flex'}")
          el-slider.similarity(v-model="timbre", :style="{flex: 1}")
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
