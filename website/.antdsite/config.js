const localeSource = require('./locale-source');

function getLocaleThemeConf(localeKey) {
  const confItemKeys = ['selectText', 'label', 'editLinkText', 'serviceWorker', 'algolia', 'nav', 'sidebar'];
  const localeThemeConf = {};
  confItemKeys.forEach(k => {
    localeThemeConf[k] = localeSource[k][localeKey]
  });
  return localeThemeConf;
}

module.exports = {
  base: '/concent-doc/',

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'concent',
      description: '一个可预测、0入侵、渐进式、高性能的增强型状态管理方案。'
    },
    '/en/': {
      lang: 'en-US',
      title: 'concent',
      description: "a predictable、zero-cost-use、progressive、high performance's enhanced state management solution"
    }
  },

  logo: '/favicon.png',
  footer: 'MIT Licensed | Copyright © concentjs (author: fantasticsoul)',
  head: [
    ['link', { rel: 'icon', href: '/concent-doc/favicon.png' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: '/concent-doc/my-style.css' }],
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
