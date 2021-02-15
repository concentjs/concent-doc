const localeSource = require('./locale-source');

function getLocaleThemeConf(localeKey) {
  const confItemKeys = ['selectText', 'label', 'editLinkText', 'serviceWorker', 'algolia', 'nav', 'sidebar'];
  const localeThemeConf = {};
  confItemKeys.forEach(k => {
    localeThemeConf[k] = localeSource[k][localeKey]
  });
  return localeThemeConf;
}

const base = '/concent-doc/';

let noEndSlashBase = base;
if (base.length > 2 && base.startsWith('/') && base.endsWith('/')) {
  noEndSlashBase = base.substr(0, base.length - 1);
}

module.exports = {
  base,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'CONCENT',
      description: '内置依赖收集，可预测、零入侵、渐进式、高性能的react开发框架'
    },
    '/en/': {
      lang: 'en-US',
      title: 'CONCENT',
      description: "Build-in dependency collection, a predictable、zero-cost-use、progressive、high performance's react develop framework"
    }
  },

  logo: '/favicon.png',
  footer: 'MIT Licensed | Copyright © concentjs (author: fantasticsoul)',
  head: [
    ['link', { rel: 'icon', href: `${noEndSlashBase}/favicon.png` }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: `${noEndSlashBase}/my-style.css` }],
  ],
  themeConfig: {
    logo: '/favicon.png',

    locales: {
      '/': getLocaleThemeConf('cn'),
      '/en/': getLocaleThemeConf('en'),
    },


    themeColors: {
      'primary-color': '#0094bd'
    },

    //获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: 'Last Updated'

  }
};
