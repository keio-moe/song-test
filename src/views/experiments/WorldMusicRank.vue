<template lang="pug">
.world-music-rank
  create-experiment(:service="service", v-if="stage === 0", :defaultUsername="defaultUsername", @created="experimentCreated")
  el-card.experiment(v-if="stage === 1")
    div(slot="header", class="clearfix")
      el-form(label-width="80px", label-position="top")
        el-form-item(:label="$t('progress')")
          el-progress.progress(:text-inside="true", :stroke-width="18", :percentage="Number((progress * 100).toFixed(2))")
        el-form-item(:label="$t('records')", v-if="wavs.length > 0")
          div(v-for="wav in wavs", :key="wav.entity")
            p.label
              | {{ wav.label }}:
            mutual-audio(controls, :src="wav.entity" type="audio/mpeg")
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
  a.route(v-if="stage === 2 && flag === 0", :href="'/experiments/worldmusic/' + subtype + '/similarity/' + username + '/1'")
    h4
      | The triplet experiment is over. When you are ready, please begin the pairwise evlauation section.
  a.route(v-if="stage === 2  && flag === 1", :href="'/experiments/indianmusic/' + subtype + '/evaluation'")
    h4
      | Both parts of the world music evaluation are over. When you are ready, please begin the Indian pop music evaluation experiment.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Radio, Switch } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';
import MutualAudio from '@/components/MutualAudio.vue';
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
  name: 'WorldMusicRank',
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
    'mutual-audio': MutualAudio,
  },
})

export default class WorldMusicRank extends Vue {
  private subtype: string = '';
  private flag: number = 0;
  private defaultUsername: string = '';
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
    this.flag = Number(this.$route.params.flag);
    this.defaultUsername = this.$route.params.id;
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
      case 'india':
        this.service = 'indian_music_evaluation';
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
</style>
