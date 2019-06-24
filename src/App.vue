<template lang="pug">
#app
  #nav
    router-link(to='/')
      | {{ $t("home") }}
    el-select.select(placeholder="🌐 Select Language", v-model="lang", @change="onLanguageChange")
      el-option(label="English", value="en-us")
      // el-option(label="हिंदी (WIP)", value="hi-in")
      el-option(label="日本語", value="ja-jp")
      // el-option(label="简体中文", value="zh-cn")
      // el-option(label="繁體中文", value="zh-tw")
  router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Select, Option } from 'element-ui';

@Component({
  name: 'App',
  components: {
    'el-select': Select,
    'el-option': Option,
  },
})
export default class App extends Vue {
  private lang: string = '';

  private onLanguageChange() {
    this.$i18n.locale = this.lang;
    window.localStorage.setItem('language', this.lang);
  }
}
</script>

<style lang="stylus">
body
  font-family 'Avenir', "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983

.select
  margin 0 0 0 20px
</style>
