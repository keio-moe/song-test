<template lang="pug">
.copyright
  create-experiment(:service="service", v-if="stage === 0", @created="experimentCreated")
  el-card.experiment(v-if="stage === 1")
    div(slot="header", class="clearfix")
      el-form(label-width="80px", label-position="top")
        el-form-item(:label="$t('progress')")
          el-progress.progress(:text-inside="true", :stroke-width="18", :percentage="Number((progress * 100).toFixed(2))")
        el-form-item(:label="$t('records')", v-if="wavs.length > 0")
          div(v-for="wav in wavs" :key="wav.label")
            p.label
              | {{ wav.label }}:
            audio(controls)
              source(:src="wav.entity" type="audio/mpeg")
        el-form-item(:label="$t('lyrics')", v-if="lyrics.length > 0")
          div(v-for="lyric in lyrics" :key="lyric.label")
            p.label
              | {{ lyric.label }}:
            p(style="white-space: pre-line;")
              | {{ fullLyrics[lyric.entity] }}
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('similarity')")
        div(:style="{display: 'flex'}")
          span
            | {{ $t('different') }}
          el-slider.similarity(v-model="similarity", :style="{flex: 1}")
          span
            | {{ $t('identical') }}
        div(style="margin: 20px 0;")
      el-form-item(:label="$t('infringe')")
        el-switch(v-model="infringe", :active-text="$t('infringe')", :inactive-text="$t('notInfringe')")
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  h2.finish(v-if="stage === 2")
    | {{ $t('experimentFinished') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Slider, Switch } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';
import fullLyrics from '@/assets/copyrigh_lyrics';


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
    'el-slider': Slider,
    'el-switch': Switch,
  },
})

export default class Copyright extends Vue {
  private subtype: string = '';
  private service: string = '';
  private username: string = '';
  private stage: number = 0;
  private fullLyrics = fullLyrics;

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
    this.similarity = 50;
    this.infringe = false;
    const query: string = queryString.stringify({
      username: this.username,
    });
    const resp = await this.restClient.get<Entry<CopyrightEntry>>(`experiments/${this.service}?${query}`);
    if (resp.statusCode === 404) {
      this.stage = 2;
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
</style>
