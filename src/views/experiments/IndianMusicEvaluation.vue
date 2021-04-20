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
    el-form.questionnaire(label-width="100px", size="medium", label-position="top")
      el-form-item(:label="formModel(1).feature", title="What kind of embellishment does the melody have? " class="form-label")
        el-radio(v-model="ornamentation", :label="0")
          | {{ formModel(1).low }}
        el-radio(v-model="ornamentation", :label="50")
          | {{ formModel(1).medium }}
        el-radio(v-model="ornamentation", :label="100")
          | {{ formModel(1).high }}
      el-form-item(:label="formModel(2).feature", title="How much does this track make you want to dance?" class="form-label")
        el-radio(v-model="grooviness", :label="0")
          | {{ formModel(2).low }}
        el-radio(v-model="grooviness", :label="50")
          | {{ formModel(2).medium }}
        el-radio(v-model="grooviness", :label="100")
          | {{ formModel(2).high }}
      el-form-item(:label="formModel(3).feature", title="How familiar are you with this track?" class="form-label")
        el-radio(v-model="familiarity", :label="0")
          | {{ formModel(3).low }}
        el-radio(v-model="familiarity", :label="50")
          | {{ formModel(3).medium }}
        el-radio(v-model="familiarity", :label="100")
          | {{ formModel(3).high }}
      el-form-item(:label="formModel(4).feature", title="How much do you like this track? " class="form-label")
        el-radio(v-model="liking", :label="0")
          | {{ formModel(4).low }}
        el-radio(v-model="liking", :label="50")
          | {{ formModel(4).medium }}
        el-radio(v-model="liking", :label="100")
          | {{ formModel(4).high }}
      el-form-item(:label="formModel(5).feature", title="How pleasant is this track to your ears? " class="form-label")
        el-radio(v-model="consonance", :label="0")
          | {{ formModel(5).low }}
        el-radio(v-model="consonance", :label="50")
          | {{ formModel(5).medium }}
        el-radio(v-model="consonance", :label="100")
          | {{ formModel(5).high }}
      el-form-item(:label="formModel(6).feature" , title="Does this track make you feel positive or negative emotions?" class="form-label")
        el-radio(v-model="valence", :label="0")
          | {{ formModel(6).low }}
        el-radio(v-model="valence", :label="50")
          | {{ formModel(6).medium }}
        el-radio(v-model="valence", :label="100")
          | {{ formModel(6).high }}
      el-form-item(:label="formModel(7).feature", title="How much does this track excite you? " class="form-label")
        el-radio(v-model="excitement", :label="0")
          | {{ formModel(7).low }}
        el-radio(v-model="excitement", :label="50")
          | {{ formModel(7).medium }}
        el-radio(v-model="excitement", :label="100")
          | {{ formModel(7).high }}
      el-form-item(:label="formModel(8).feature", title="How widely does this song vary between a high and a low pitch?" class="form-label")
        el-radio(v-model="vocalRange", :label="0")
          | {{ formModel(8).low }}
        el-radio(v-model="vocalRange", :label="50")
          | {{ formModel(8).medium }}
        el-radio(v-model="vocalRange", :label="100")
          | {{ formModel(8).high }}
      el-form-item(:label="formModel(9).feature", title="How good or bad is the sound quality of this track?" class="form-label")
        el-radio(v-model="soundQuality", :label="0")
          | {{ formModel(9).low }}
        el-radio(v-model="soundQuality", :label="50")
          | {{ formModel(9).medium }}
        el-radio(v-model="soundQuality", :label="100")
          | {{ formModel(9).high }}
      el-form-item(:label="formModel(10).feature", title="How fast or slow is the track?" class="form-label")
        el-radio(v-model="tempo", :label="0")
          | {{ formModel(10).low }}
        el-radio(v-model="tempo", :label="50")
          | {{ formModel(10).medium }}
        el-radio(v-model="tempo", :label="100")
          | {{ formModel(10).high }}
      el-form-item(:label="formModel(11).feature", title="How regular is the rhyhthm? " class="form-label")
        el-radio(v-model="rhythmicRegularity", :label="0")
          | {{ formModel(11).low }}
        el-radio(v-model="rhythmicRegularity", :label="50")
          | {{ formModel(11).medium }}
        el-radio(v-model="rhythmicRegularity", :label="100")
          | {{ formModel(11).high }}
      el-form-item(:label="formModel(12).feature", title="How much tension do you hear in the voice of the singer?" class="form-label")
        el-radio(v-model="vocalTension", :label="0")
          | {{ formModel(12).low }}
        el-radio(v-model="vocalTension", :label="50")
          | {{ formModel(12).medium }}
        el-radio(v-model="vocalTension", :label="100")
          | {{ formModel(12).high }}
      el-form-item(:label="formModel(13).feature", title="How many voices do you hear at once?" class="form-label")
        el-radio(v-model="vocalTexture", :label="0")
          | {{ formModel(13).low }}
        el-radio(v-model="vocalTexture", :label="50")
          | {{ formModel(13).medium }}
        el-radio(v-model="vocalTexture", :label="100")
          | {{ formModel(13).high }}
      el-form-item(:label="formModel(14).feature", title="How many instruments besides voices are present?" class="form-label")
        el-radio(v-model="nonVocalInstruments", :label="0")
          | {{ formModel(14).low }}
        el-radio(v-model="nonVocalInstruments", :label="50")
          | {{ formModel(14).medium }}
        el-radio(v-model="nonVocalInstruments", :label="100")
          | {{ formModel(14).high }}
      el-form-item(:label="formModel(15).feature", title="Do the instrumentals and vocals play the same melody? " class="form-label")
        el-radio(v-model="instrumentVocalOverlap", :label="0")
          | {{ formModel(15).low }}
        el-radio(v-model="instrumentVocalOverlap", :label="50")
          | {{ formModel(15).medium }}
        el-radio(v-model="instrumentVocalOverlap", :label="100")
          | {{ formModel(15).high }}
      el-form-item(:label="formModel(16).feature", title="How many instruments are playing at the same time?" class="form-label")
        el-radio(v-model="instrumentOverlap", :label="0")
          | {{ formModel(16).low }}
        el-radio(v-model="instrumentOverlap", :label="50")
          | {{ formModel(16).medium }}
        el-radio(v-model="instrumentOverlap", :label="100")
          | {{ formModel(16).high }}
      el-form-item(:label="formModel(17).feature", title="How well are the different timbres of the instruments blended" class="form-label")
        el-radio(v-model="instrumentToneBlend", :label="0")
          | {{ formModel(17).low }}
        el-radio(v-model="instrumentToneBlend", :label="50")
          | {{ formModel(17).medium }}
        el-radio(v-model="instrumentToneBlend", :label="100")
          | {{ formModel(17).high }}
      el-form-item(:label="formModel(18).feature", title="How well are the different rhythms of the instruments blended" class="form-label")
        el-radio(v-model="instrumentRhythmBlend", :label="0")
          | {{ formModel(18).low }}
        el-radio(v-model="instrumentRhythmBlend", :label="50")
          | {{ formModel(18).medium }}
        el-radio(v-model="instrumentRhythmBlend", :label="100")
          | {{ formModel(18).high }}
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
      rhythmic_regularity: this.rhythmicRegularity,
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
      });
  }
}
</script>

<style lang="stylus" scoped>
.experiment
  width 70%
  margin 0 auto
.frame
  width 70vw
  margin 0 15%
  height 100vh
  border 0
.finish
  text-align center
  margin-top 200px
.similarity
  padding 0 5%
.progress
  margin-top 12px
.label
  font-weight 600
.route
  text-align center
  display block
  margin 40px 0
  font-size 24px
  color #42b983
.form-label
  font-weight bold
  font-size 30px
</style>
