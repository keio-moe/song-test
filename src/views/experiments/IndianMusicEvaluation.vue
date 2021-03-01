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
      el-form-item(v-for="id in 18", :key="id", :label="formModel(id).feature")
        el-radio(v-model="formModel(id).model", :label="0")
          | {{ formModel(id).low }}
        el-radio(v-model="formModel(id).model", :label="50")
          | {{ formModel(id).medium }}
        el-radio(v-model="formModel(id).model", :label="100")
          | {{ formModel(id).high }}
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

  private ornamentation: number = 50;
  private grooviness: number = 50;
  private familiarity: number = 50;
  private liking: number = 50;
  private consonance: number = 50;
  private valence: number = 50;
  private excitement: number = 50;
  private soundQuality: number = 50;
  private tempo: number = 50;
  private rhythmicRegularity: number = 50;
  private vocalRange: number = 50;
  private vocalTension: number = 50;
  private vocalTexture: number = 50;
  private nonVocalInstruments: number = 50;
  private instrumentVocalOverlap: number = 50;
  private instrumentOverlap: number = 50;
  private instrumentToneBlend: number = 50;
  private instrumentRhythmBlend: number = 50;

  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private experimentCreated(username: string) {
    this.username = username;
    this.stage = 1;
    this.nextEntity();
  }

  private async nextEntity() {
    this.ornamentation = 50;
    this.grooviness = 50;
    this.familiarity = 50;
    this.liking = 50;
    this.consonance = 50;
    this.valence = 50;
    this.excitement = 50;
    this.soundQuality = 50;
    this.tempo = 50;
    this.rhythmicRegularity = 50;
    this.vocalRange = 50;
    this.vocalTension = 50;
    this.vocalTexture = 50;
    this.nonVocalInstruments = 50;
    this.instrumentVocalOverlap = 50;
    this.instrumentToneBlend = 50;
    this.instrumentRhythmBlend = 50;

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

  // private goToManual() {
  //   window.open('https://hideodaikoku.github.io/feat-explanation/', '_blank');
  // }

  private formModel(id: number) {
    return {
      model: (this as any)[this.$t(`indianMusicModel${id}`).toString()],
      feature: this.$t(`indianMusicFeature${id}`),
      low: this.$t(`indianMusicLow${id}`),
      medium: this.$t(`indianMusicMedium${id}`),
      high: this.$t(`indianMusicHigh${id}`),
    };
  }

  private async onSubmit() {
    await this.restClient.replace(`experiments/${this.service}`, {
      username: this.username,
      id: this.entityId,
      ornamentation: this.ornamentation,
      grooviness: this.grooviness,
      familiarity: this.familiarity,
      liking: this.liking,
      consonance: this.consonance,
      valence: this.valence,
      excitement: this.excitement,
      sound_quality: this.soundQuality,
      tempo: this.tempo,
      rhythm_regularity: this.rhythmicRegularity,
      vocal_range: this.vocalRange,
      vocal_tension: this.vocalTension,
      vocal_texture: this.vocalTexture,
      non_vocal_instruments: this.nonVocalInstruments,
      instrument_vocal_overlap: this.instrumentVocalOverlap,
      instrument_overlap: this.instrumentOverlap,
      instrument_tone_blend: this.instrumentToneBlend,
      instrument_rhythm_blend: this.instrumentRhythmBlend,
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
