import { createI18n } from 'vue-i18n';
import cookie from 'vue-cookies';
import zh from './zh-cn';
import en from './en';

const lang = (cookie.get('lang') || (navigator.language ? navigator.language : navigator.userLanguage)).toLowerCase();

const i18n = createI18n({
  locale: lang.split('-')[0] || 'en',
  messages: {
    zh,
    en
  }
});

export default i18n;
