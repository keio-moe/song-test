<template lang="pug">
.aesthetics
  .privacy(v-if="stage === 0", :style="{ padding: '20px' }")
    a.route(href="https://forms.gle/do5sUcSyRRb5GQk16", target="_black", @click="stage = 1")
      | 実験前アンケート
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
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('pleasantQuestion')")
        el-radio(v-model="pleasant" :label="0")
          | {{ $t('pleasant0') }}
        el-radio(v-model="pleasant" :label="1")
          | {{ $t('pleasant1') }}
        el-radio(v-model="pleasant" :label="2")
          | {{ $t('pleasant2') }}
        el-radio(v-model="pleasant" :label="3")
          | {{ $t('pleasant3') }}
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('consonantQuestion')")
        el-radio(v-model="consonant" :label="0")
          | {{ $t('consonant0') }}
        el-radio(v-model="consonant" :label="1")
          | {{ $t('consonant1') }}
        el-radio(v-model="consonant" :label="2")
          | {{ $t('consonant2') }}
        el-radio(v-model="consonant" :label="3")
          | {{ $t('consonant3') }}
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('beautifulQuestion')")
        el-radio(v-model="beautiful" :label="0")
          | {{ $t('beautiful0') }}
        el-radio(v-model="beautiful" :label="1")
          | {{ $t('beautiful1') }}
        el-radio(v-model="beautiful" :label="2")
          | {{ $t('beautiful2') }}
        el-radio(v-model="beautiful" :label="3")
          | {{ $t('beautiful3') }}
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


interface Entry<T> {
  experiment: string;
  data: T;
}

interface Labeled<T> {
  label: string;
  entity: T;
}

interface AestheticsEntry {
  progress: number;
  wavs: Array<Labeled<string>>;
  lyrics: Array<Labeled<string>>;
  id: number;
}

@Component({
  name: 'Aesthetics',
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

export default class Aesthetics extends Vue {
  private subtype: string = '';
  private service: string = '';
  private username: string = '';
  private stage: number = 0;

  private progress: number = 0;
  private wavs: Array<Labeled<string>> = [];
  private entityId: number = 0;
  private pleasant: number = 0;
  private consonant: number = 0;
  private beautiful: number = 0;

  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private mounted() {
    this.service = 'aesthetics';
  }

  private experimentCreated(username: string) {
    this.username = username;
    this.stage = 2;
    this.nextEntity();
  }

  private async nextEntity() {
    this.pleasant = 0;
    this.consonant = 0;
    this.beautiful = 0;

    const query: string = queryString.stringify({
      username: this.username,
    });
    const resp = await this.restClient.get<Entry<AestheticsEntry>>(`experiments/${this.service}?${query}`);
    if (resp.statusCode === 404) {
      this.stage = 3;
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
      pleasant: this.pleasant,
      consonant: this.consonant,
      beautiful: this.beautiful,
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
