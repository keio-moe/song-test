<template lang="pug">
.copyright
  .privacy(v-if="stage === 0", :style="{ padding: '20px' }")
    p(style="white-space: pre-line")
      | {{ $t('copyrightLicense') }}
    el-button(type="primary", @click="stage = 1")
      | {{ $t('agree') }}
  create-experiment(:service="service", v-if="stage === 1", @created="experimentCreated")
  el-card.experiment(v-if="stage === 2")
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
        el-form-item(:label="$t('lyrics')", v-if="lyrics.length > 0")
          div(v-for="lyric in lyrics" :key="lyric.entity")
            p.label
              | {{ lyric.label }}:
            p(style="white-space: pre-line;")
              | {{ fullLyrics[lyric.entity] }}
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('similarityQuestion')")
        el-radio(v-model="similarity" :label="0")
          | {{ $t('similar0') }}
        el-radio(v-model="similarity" :label="25")
          | {{ $t('similar1') }}
        el-radio(v-model="similarity" :label="50")
          | {{ $t('similar2') }}
        el-radio(v-model="similarity" :label="75")
          | {{ $t('similar3') }}
        el-radio(v-model="similarity" :label="100")
          | {{ $t('similar4') }}
      el-form(label-width="80px", label-position="top")
        el-form-item(:label="$t('infringeQuestion')")
          el-radio(v-model="infringe" :label="false")
            | {{ $t('notInfringe') }}
          el-radio(v-model="infringe" :label="true")
            | {{ $t('infringe') }}
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  h2.finish(v-if="stage === 3")
    | {{ $t('experimentFinished') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Radio, Switch } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';
import fullLyrics from '@/assets/copyright_lyrics';
import newWorkshopLyrics from '@/assets/copyright_new_workshop_lyrics';


interface Entry<T> {
  experiment: string;
  data: T;
}

interface Labeled<T> {
  label: string;
  entity: T;
}

interface CopyrightEntry {
  progress: number;
  wavs: Array<Labeled<string>>;
  lyrics: Array<Labeled<string>>;
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
    'el-radio': Radio,
    'el-switch': Switch,
  },
})

export default class Copyright extends Vue {
  private subtype: string = '';
  private service: string = '';
  private username: string = '';
  private stage: number = 0;
  private fullLyrics = {};

  private progress: number = 0;
  private wavs: Array<Labeled<string>> = [];
  private lyrics: Array<Labeled<string>> = [];
  private entityId: number = 0;
  private similarity: number = 50;
  private infringe: boolean = false;

  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private mounted() {
    this.subtype = this.$route.params.subtype;
    switch (this.subtype) {
      case 'workshop':
        this.service = 'copyright_workshop';
        break;
      case 'full':
        this.service = 'copyright_full';
        this.fullLyrics = fullLyrics;
        break;
      case 'new_workshop':
        this.service = 'copyright_new_workshop';
        this.fullLyrics = newWorkshopLyrics;
        break;
      default:
        this.service = '';
    }
  }

  private experimentCreated(username: string) {
    this.username = username;
    this.stage = 2;
    this.nextEntity();
  }

  private async nextEntity() {
    this.similarity = 50;
    this.infringe = false;
    const query: string = queryString.stringify({
      username: this.username,
    });
    const resp = await this.restClient.get<Entry<CopyrightEntry>>(`experiments/${this.service}?${query}`);
    if (resp.statusCode === 404) {
      this.stage = 3;
      return;
    }
    this.progress = resp.result!.data.progress;
    this.lyrics = resp.result!.data.lyrics;
    this.wavs = resp.result!.data.wavs;
    this.entityId = resp.result!.data.id;
  }

  private async onSubmit() {
    await this.restClient.replace(`experiments/${this.service}`, {
      username: this.username,
      id: this.entityId,
      similarity: this.similarity,
      infringe: this.infringe,
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
