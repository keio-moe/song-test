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
        el-slider.similarity(v-model="overlap")
        slider-span(left="Solo", middle="Standard", right="Multiple Textures")
      el-form-item(:label="$t('creativity')")
        el-slider.similarity(v-model="creativity")
        slider-span(left="Unfamiliar", middle="Sounds familiar", right="Have heard before")
      el-form-item(:label="$t('likeness')")
        el-slider.similarity(v-model="likeness")
        slider-span(left="Dislike", middle="Ambivalent", right="Like")
      el-form-item(:label="$t('tempo')")
        el-slider.similarity(v-model="tempo")
        slider-span(left="Slow", middle="Standard", right="Fast")
      el-form-item(:label="$t('consonance')")
        el-slider.similarity(v-model="consonance")
        slider-span(left="Dissonant", middle="Neutral", right="Consonant")
      el-form-item(:label="$t('emotion')")
        el-slider.similarity(v-model="emotion")
        slider-span(left="Negative", middle="Neither", right="Positive")
      el-form-item(:label="$t('decoration')")
        el-slider.similarity(v-model="decoration")
        slider-span(left="Solo", middle="Standard", right="Multiple Textures")
      el-form-item(:label="$t('range')")
        el-slider.similarity(v-model="range")
        slider-span(left="Overall Low Pitch", middle="Standard", right="Overall High Pitch")
      el-form-item(:label="$t('quality')")
        el-slider.similarity(v-model="quality")
        slider-span(left="Low", middle="Standard", right="High")
      el-form-item(:label="$t('rhythm')")
        el-slider.similarity(v-model="rhythm")
        slider-span(left="Irregular", middle="Neither", right="Regular")
      el-form-item(:label="$t('excitingness')")
        el-slider.similarity(v-model="excitingness")
        slider-span(left="Calming", middle="No Change", right="Exciting")
      el-form-item(:label="$t('groove')")
        el-slider.similarity(v-model="groove")
        slider-span(left="Cannot find a beat", middle="No effect", right="Can move to the beat")
      el-form-item(:label="$t('timbre')")
        el-slider.similarity(v-model="timbre")
        slider-span(left="Dark", middle="Normal", right="Bright")
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  a.route(v-if="stage === 2 && subtype !== 'yamaha'", :href="'/experiments/worldmusic/' + subtype + '/similarity'")
    h2
      | {{ $t('evaluationToSimilarity') }}
  a.route(v-if="stage === 2 && subtype === 'yamaha'", :href="'/experiments/worldmusic/' + subtype + '/rank'")
    h2
      | Similarity Experiment Finished, Go To Triple Experiment
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
    'slider-span': () => import('@/components/SliderSpan.vue'),
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
  private subtype: string = '';
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

  private mounted() {
    this.subtype = this.$route.params.subtype;
    switch (this.subtype) {
      case 'workshop':
        this.service = 'world_music_workshop_evaluation';
        break;
      case 'full':
        this.service = 'world_music_evaluation';
        break;
      case 'yamaha':
        this.service = 'world_music_yamaha_evaluation';
        break;
      default:
        this.service = '';
    }
  }

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
