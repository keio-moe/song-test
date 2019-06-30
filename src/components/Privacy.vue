<template lang="pug">
.create-experiment
  el-card.card
    el-form(label-width="80px")
      el-form-item(label="License")
        el-input(:placeholder="$t('usernamePrompt')", v-model="username")
      el-form-item
        el-button(type="primary", @click="onSubmit")
          | {{ $t("submit") }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button, Card, Form, FormItem, Input, Message, MessageBox } from 'element-ui';
import * as rm from 'typed-rest-client/RestClient';
import consts from '@/consts';

@Component({
  name: 'CreateExperiment',
  components: {
    'el-button': Button,
    'el-card': Card,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
  },
})
export default class CreateExperiment extends Vue {
  @Prop(String) private service!: string;
  private username: string = '';
  private restClient: rm.RestClient = new rm.RestClient(window.navigator.userAgent, consts.host);

  private async onSubmit() {
    if (this.username.length === 0) {
      // Empty Username
      Message({
        message: this.$t('usernameAlert') as string,
        type: 'error',
      });
      return;
    }

    try {
      const res = await this.restClient.create(`experiments/${this.service}`, {
        username: this.username,
      });
      if (res.statusCode === 404) {
        Message({
          message: this.$t('requirementsNotMatch') as string,
          type: 'error',
        });
        return;
      }
      this.$emit('created', this.username);
    } catch (err) {
      if (err.statusCode === 409) {
        MessageBox.confirm(this.$t('usernameConflict') as string, this.$t('continue') as string, {
          confirmButtonText: this.$t('continue') as string,
          cancelButtonText: this.$t('cancel') as string,
          type: 'warning',
        }).then(() => {
          this.$emit('created', this.username);
        }).catch(() => {
          // Do nothing here
        });
        return;
      }
      throw err;
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  width 70%
  margin 0 15%
</style>
