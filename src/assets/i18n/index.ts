import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enUS from './en-us';
import hiIN from './hi-in';
import jaJP from './ja-jp';
import zhCN from './zh-cn';
import zhTW from './zh-tw';

Vue.use(VueI18n);

export default new VueI18n({
  locale: window.localStorage.getItem('language') || navigator.language.toLowerCase(),
  fallbackLocale: 'en-us',
  messages: {
    'en-us': enUS,
    'hi-in': hiIN,
    'ja-jp': jaJP,
    'zh-cn': zhCN,
    'zh-tw': zhTW,
  },
});
