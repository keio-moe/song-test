<template lang="pug">
.copyright
  create-experiment(:service="service", v-if="stage === 0", @created="experimentCreated")
  el-card.experiment(v-if="stage === 1")
    el-form(label-width="80px")
      el-form-item(label="Records")
        div(v-for="wav in wavs" :key="wav")
          audio(controls)
            source(:src="wav" type="audio/mpeg")
      el-form-item(label="Similarity")
        el-slider(v-model="similarity")
      el-form-item(label="Infringe")
        el-checkbox(v-model="infringe")
          | Infringe
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | Submit
  h2.finish(v-if="stage === 2")
    | Experiment Finished
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Button, Card, Checkbox, Form, FormItem, Input, Slider } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import * as queryString from 'query-string';
import consts from '@/consts';


interface Entry<T> {
  experiment: string;
  data: T;
}

interface CopyrightEntry {
  wavs: string[];
  id: number;
}

@Component({
  name: 'Copyright',
  components: {
    'create-experiment': () => import('@/components/CreateExperiment.vue'),
    'el-button': Button,
    'el-card': Card,
    'el-checkbox': Checkbox,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-slider': Slider,
  },
})

export default class Copyright extends Vue {
  private subtype: string = '';
  private service: string = '';
  private username: string = '';
  private stage: number = 0;

  private wavs: string[] = [];
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
    const resp = await this.restClient.get<Entry<CopyrightEntry>>(`/experiments/${this.service}?${query}`);
    if (resp.statusCode === 404) {
      this.stage = 2;
      return;
    }
    this.wavs = resp.result!.data.wavs;
    this.entityId = resp.result!.data.id;
  }

  private async onSubmit() {
    await this.restClient.replace(`/experiments/${this.service}`, {
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
  width 50%
  margin 0 25%
.finish
  text-align center
  margin-top 200px
</style>
