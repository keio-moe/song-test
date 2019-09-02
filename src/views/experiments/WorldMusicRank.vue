<template lang="pug">
.world-music-rank
  create-experiment(:service="service", v-if="stage === 0", @created="experimentCreated")
  el-card.experiment(v-if="stage === 1")
    div(slot="header", class="clearfix")
      el-form(label-width="80px", label-position="top")
        el-form-item(:label="$t('progress')")
          el-progress.progress(:text-inside="true", :stroke-width="18", :percentage="Number((progress * 100).toFixed(2))")
        el-form-item(:label="$t('records')", v-if="wavs.length > 0")
          div(v-for="wav in wavs", :key="wav.entity")
            p.label
              | {{ wav.label }}:
            audio.audio(controls)
              source(:src="wav.entity", type="audio/mpeg")
    el-form(label-width="80px", label-position="top")
      el-form-item(label="最も違う曲を選んでください")
        el-radio(v-model="rank" :label="0")
          | A
        el-radio(v-model="rank" :label="1")
          | B
        el-radio(v-model="rank" :label="2")
          | C
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  a.route(v-if="stage === 2", :href="'/experiments/worldmusic/' + subtype + '/similarity'")
    h4
      | トリプル評価実験が終了いたしました。ペア実験をやってない場合、こちらへご覧ください。
  a.route(v-if="stage === 2", href="https://docs.google.com/forms/d/e/1FAIpQLSdpBNYxHR-noyTN75OtSyT45NPWusxT51mDlSgVPcekXQUnQg/viewform")
    h4
      | トリプルとペア実験両方完成した場合、アンケートを記入してください。ご協力ありがとうございました。
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Radio, Switch } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';
import { isNullOrUndefined } from 'util';


interface Entry<T> {
  experiment: string;
  data: T;
}

interface Labeled<T> {
  label: string;
  entity: T;
}

interface WorldMusicSimilarityEntry {
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
    'el-radio': Radio,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-progress': Progress,
    'el-switch': Switch,
  },
})

export default class Copyright extends Vue {
  private subtype: string = '';
  private service: string = 'world_music_rank';
  private username: string = '';
  private stage: number = 0;

  private progress: number = 0;
  private wavs: Array<Labeled<string>> = [];
  private entityId: number = 0;

  private rank: number = 0;
  private likeness: number = 50;

  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private mounted() {
    this.subtype = this.$route.params.subtype;
    switch (this.subtype) {
      case 'workshop':
        this.service = 'world_music_workshop_rank';
        break;
      case 'full':
        this.service = 'world_music_rank';
        break;
      case 'yamaha':
        this.service = 'world_music_yamaha_rank';
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
    this.rank = 0;

    const query: string = queryString.stringify({
      username: this.username,
    });
    const resp = await this.restClient.get<Entry<WorldMusicSimilarityEntry>>(`experiments/${this.service}?${query}`);
    if (resp.statusCode === 404) {
      // Evaluation finished
      this.stage = 2;
      return;
    }
    this.progress = resp.result!.data.progress;
    this.wavs = resp.result!.data.wavs;
    this.entityId = resp.result!.data.id;
  }

  private async onSubmit() {
    document.body.querySelectorAll('audio').forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    await this.restClient.replace(`experiments/${this.service}`, {
      username: this.username,
      id: this.entityId,
      option: this.rank,
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
.audio
  width 100%
  border-radius 2em
</style>
