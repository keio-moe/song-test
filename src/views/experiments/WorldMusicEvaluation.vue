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
        small
        | What kind of embellishment does the melody have?
        br
        el-radio(v-model="decoration", :label="0")
          | {{ $t('worldMusicLow1') }}
        el-radio(v-model="decoration", :label="50")
          | {{ $t('worldMusicMedium1') }}
        el-radio(v-model="decoration", :label="100")
          | {{ $t('worldMusicHigh1') }}
      el-form-item(:label="$t('worldMusicFeature2')")
        small
        | How much does this track make you want to dance?
        br
        el-radio(v-model="groove", :label="0")
          | {{ $t('worldMusicLow2') }}
        el-radio(v-model="groove", :label="50")
          | {{ $t('worldMusicMedium2') }}
        el-radio(v-model="groove", :label="100")
          | {{ $t('worldMusicHigh2') }}
      el-form-item(:label="$t('worldMusicFeature3')")
        small
        | How familiar are you with this track?
        br
        el-radio(v-model="creativity", :label="0")
          | {{ $t('worldMusicLow3') }}
        el-radio(v-model="creativity", :label="50")
          | {{ $t('worldMusicMedium3') }}
        el-radio(v-model="creativity", :label="100")
          | {{ $t('worldMusicHigh3') }}
      el-form-item(:label="$t('worldMusicFeature4')")
        small
        | How much do you like this track? 
        br
        el-radio(v-model="likeness", :label="0")
          | {{ $t('worldMusicLow4') }}
        el-radio(v-model="likeness", :label="50")
          | {{ $t('worldMusicMedium4') }}
        el-radio(v-model="likeness", :label="100")
          | {{ $t('worldMusicHigh4') }}
      el-form-item(:label="$t('worldMusicFeature5')")
        small
        | How pleasant is this track to your ears?
        br
        el-radio(v-model="consonance", :label="0")
          | {{ $t('worldMusicLow5') }}
        el-radio(v-model="consonance", :label="50")
          | {{ $t('worldMusicMedium5') }}
        el-radio(v-model="consonance", :label="100")
          | {{ $t('worldMusicHigh5') }}
      el-form-item(:label="$t('worldMusicFeature6')")
        small
        | Does this track make you feel positive or negative emotions?
        br
        el-radio(v-model="emotion", :label="0")
          | {{ $t('worldMusicLow6') }}
        el-radio(v-model="emotion", :label="50")
          | {{ $t('worldMusicMedium6') }}
        el-radio(v-model="emotion", :label="100")
          | {{ $t('worldMusicHigh6') }}
      el-form-item(:label="$t('worldMusicFeature7')")
        small
        | How much does this track excite you? 
        br
        el-radio(v-model="excitingness", :label="0")
          | {{ $t('worldMusicLow7') }}
        el-radio(v-model="excitingness", :label="50")
          | {{ $t('worldMusicMedium7') }}
        el-radio(v-model="excitingness", :label="100")
          | {{ $t('worldMusicHigh7') }}
      el-form-item(:label="$t('worldMusicFeature8')")
        small
        | How widely does this song vary between a high and a low pitch?
        br
        el-radio(v-model="range", :label="0")
          | {{ $t('worldMusicLow8') }}
        el-radio(v-model="range", :label="50")
          | {{ $t('worldMusicMedium8') }}
        el-radio(v-model="range", :label="100")
          | {{ $t('worldMusicHigh8') }}
      el-form-item(:label="$t('worldMusicFeature9')")
        small
        | How good or bad is the sound quality of this track?
        br
        el-radio(v-model="quality", :label="0")
          | {{ $t('worldMusicLow9') }}
        el-radio(v-model="quality", :label="50")
          | {{ $t('worldMusicMedium9') }}
        el-radio(v-model="quality", :label="100")
          | {{ $t('worldMusicHigh9') }}
      el-form-item(:label="$t('worldMusicFeature10')")
        small
        | How fast or slow is the track?
        br
        el-radio(v-model="tempo", :label="0")
          | {{ $t('worldMusicLow10') }}
        el-radio(v-model="tempo", :label="50")
          | {{ $t('worldMusicMedium10') }}
        el-radio(v-model="tempo", :label="100")
          | {{ $t('worldMusicHigh10') }}
      el-form-item(:label="$t('worldMusicFeature11')")
        small
        | How regular is the rhyhthm?
        br
        el-radio(v-model="rhythm", :label="0")
          | {{ $t('worldMusicLow11') }}
        el-radio(v-model="rhythm", :label="50")
          | {{ $t('worldMusicMedium11') }}
        el-radio(v-model="rhythm", :label="100")
          | {{ $t('worldMusicHigh11') }}
      el-form-item(:label="$t('worldMusicFeature12')")
        small
        | How many voices do you hear at once?
        br
        el-radio(v-model="timbre", :label="0")
          | {{ $t('worldMusicLow12') }}
        el-radio(v-model="timbre", :label="50")
          | {{ $t('worldMusicMedium12') }}
        el-radio(v-model="timbre", :label="100")
          | {{ $t('worldMusicHigh12') }}
      el-form-item(:label="$t('worldMusicFeature13')")
        small
        | How many voices do you hear at once?
        br
        el-radio(v-model="overlap", :label="0")
          | {{ $t('worldMusicLow13') }}
        el-radio(v-model="overlap", :label="50")
          | {{ $t('worldMusicMedium13') }}
        el-radio(v-model="overlap", :label="100")
          | {{ $t('worldMusicHigh13') }}
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  a.route(v-if="stage === 2 && random === 0", :href="'/experiments/worldmusic/' + subtype + '/similarity/' + username + '/0'")
    h2.explanation
      | The songwise evaluation section is over. When you are ready, please click to start the pairwise evaluation section of the experiment.
  a.route(v-if="stage === 2 && random === 1", :href="'/experiments/worldmusic/' + subtype + '/rank/' + username + '/0'")
    h2
      | The songwise evaluation section is over. When you are ready, please click to start the triplet evaluation section of the experiment.
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
  private subtype: string = '';
  private service: string = 'world_music_evaluation';
  private username: string = '';
  private stage: number = 0;

  private random: number = Math.floor(Math.random() * 2);

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
  font-weight 700
.route
  text-align center
  display block
  width 50rem
  padding 1rem
  border-radius 5px
  margin 3rem auto
  background-color #42b983
  color white
  text-decoration none
  cursor pointer
.explanation
  font-size 1.5rem
</style>
