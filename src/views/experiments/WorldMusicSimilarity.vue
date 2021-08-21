<template lang="pug">
.world-music-similarity
  create-experiment(:service="service", v-if="stage === 0", :defaultUsername="defaultUsername", @created="experimentCreated")
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
    el-form(label-width="80px", label-position="top")
      el-form-item(:label="$t('similarity')")
        el-radio(v-model="similarity", :label="0")
          | {{ $t('similar0') }}
        el-radio(v-model="similarity", :label="25")
          | {{ $t('similar1') }}
        el-radio(v-model="similarity", :label="50")
          | {{ $t('similar2') }}
        el-radio(v-model="similarity", :label="75")
          | {{ $t('similar3') }}
        el-radio(v-model="similarity", :label="100")
          | {{ $t('similar4') }}
      el-form-item(:label="$t('likeness')")
        el-radio(v-model="likeness", :label="0")
          | I like A a lot more than B
        el-radio(v-model="likeness", :label="25")
          | I like A a little more than B
        el-radio(v-model="likeness", :label="50")
          | I like both A and B just the same
        el-radio(v-model="likeness", :label="75")
          | I like B a little more than A
        el-radio(v-model="likeness", :label="100")
          | I like B a lot more than A
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  a.route(v-if="stage === 2 && flag === 0", :href="'/experiments/worldmusic/' + subtype + '/rank/' + username + '/0'")
    h4
      | The pairwise evaluation experiment is over. When you are ready, please proceed to the triplet evaluation section.
  a.route(v-if="stage === 2  && flag === 1", :href="'/experiments/indianmusic/' + subtype +'/evaluation' + username + '/1'")
    h4
      | Both parts of the world music evaluation are over. When you are ready, please begin the Indian pop music evaluation experiment.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Progress, Radio, Slider, Switch } from 'element-ui';
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
  name: 'WorldMusicSimilarity',
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
  private flag: number = 0;
  private defaultUsername: string = '';
  private service: string = 'world_music_similarity';
  private username: string = '';
  private stage: number = 0;

  private progress: number = 0;
  private wavs: Array<Labeled<string>> = [];
  private entityId: number = 0;

  private similarity: number = 50;
  private likeness: number = 50;

  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private mounted() {
    this.subtype = this.$route.params.subtype;
    this.flag = Number(this.$route.params.flag);
    this.defaultUsername = this.$route.params.id;
    switch (this.subtype) {
      case 'workshop':
        this.service = 'world_music_workshop_similarity';
        break;
      case 'full':
        this.service = 'world_music_similarity';
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
    this.likeness = 50;

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
      similarity: this.similarity,
      likeness: this.likeness,
    });
    this.nextEntity();
    window.scrollTo(0, 0);
  }
}
</script>

<style lang="stylus" scoped>
.experiment
  width 90%
  margin 0 auto
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
  width 50rem
  padding 1rem
  border-radius 5px
  margin 3rem auto
  background-color #42b983
  color white
  text-decoration none
  cursor pointer
</style>
