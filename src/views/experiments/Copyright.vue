<template lang="pug">
.copyright
  .privacy(v-if="stage === 0", :style="{ padding: '20px' }")
    p
      | このプロジェクトでは、音楽著作権侵害評価の公平性と効率性を向上させるための比較方法と計算方法の発見を目指しています。私たちは著作権のためのアルゴリズムを開発し、法的な判断をできるかどうかを検証していきます。 
    p
      | この実験では、楽曲比較と歌詞比較の２種類あります。楽曲比較では、２曲（A：原告、B：被告）を聴いていただきます。ヘッドフォンから流れてくる音楽を聞いて、「類似性」と「判決評価」を回答してください。所要時間は、合計2時間程度です。
    p
      |「類似性」では、聴いていただいた２曲がどのくらい似ていると感じたか評価していただきます。「判決判断」では、あなたが裁判官として被告の楽曲が原告の著作権を侵害しているかどうかを答えていただきます。判決を判断する際に以下を参考にしてください。
    p
      | “B：被告の楽曲がA：原告が著作権を侵害しているか判断するためには、曲が実質的に類似しているかどうかが重要です。原告の楽曲におけるオリジナルの表現と被告の楽曲におけるアイデアの表現 が、実質的に類似していて共通するかどうかです。 オリジナルの表現とは、原告の楽曲独自のものであり、ジャンルや音楽一般に共通するものではありません。 類似性の量は、量的にも質的にも有意でなければなりません。つまり侵害を認められる場合、被告の楽曲は、原告のオリジナルの表現の多くの部分をコピーするか、原告の楽曲の短いながらも重要な部分をコピーしています。“
    p
      | また、歌詞比較では楽曲の歌詞だけを比較して、音源比較と同じく「類似性」と「判決評価」を回答していただきます。
    p
      | この研究に協力するかどうかは、あなたの自由意思で決定してください。この研究への参加に同意いただけない場合にも、あなたがなんらかの不利益を被ることは決してありません。また、一度同意した後でいつでも同意を取り消すことができ、それによる不利益もありません。実験を中止した場合には、中止するまでに得られたデータ(紙媒体・電子ファイル)や解析結果 を破棄し、それ以降の研究には一切使用いたしません。ただし、取り消し要求された時点で公表済みの解析結果がある場合は、このデータを破棄できませんのでご承知おきください。
    el-button(type="primary", @click="stage = 1")
      | 同意する
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
        div(:style="{display: 'flex'}")
          span
            | {{ $t('different') }}
          el-slider.similarity(v-model="similarity", :style="{flex: 1}")
          span
            | {{ $t('identical') }}
      el-form-item(:label="$t('infringeQuestion')")
        el-switch(v-model="infringe", :active-text="$t('infringe')", :inactive-text="$t('notInfringe')")
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t('submit') }}
  h2.finish(v-if="stage === 3")
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
</style>
