module.exports = {
  title: 'concent',
  description: '一个可预测、0入侵、渐进式、高性能的增强型状态管理方案，power your react！',
  logo: 'favicon.png',
  footer: 'MIT Licensed | Copyright © concentjs (author: fantasticsoul)',
  head: [['link', { rel: 'icon', href: 'favicon.png' }]],
  themeConfig: {
    logo: 'favicon.png',
    themeColors: {
      'primary-color': '#0094bd'
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/concentjs/concent',
        important: true
      }
    ],
    sidebar: {
      '/guide/': [
        'introduction',
        {
          title: 'page-collapsed',
          children: ['page-collapsed']
        },
        {
          title: 'page-group-exapmle',
          collapsable: false,
          children: [
            {
              title: 'group-1',
              children: ['group-1-item']
            },
            {
              title: 'group-2',
              children: ['group-2-item']
            }
          ]
        }
      ]
    }
  }
};
