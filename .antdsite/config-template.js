module.exports = {
  base: '/',

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'concent',
      description: '一个可预测、0入侵、渐进式、高性能的增强型状态管理方案，power your react！'
    },
    '/en/': {
      lang: 'en-US',
      title: 'concent',
      description: "a predictable、zero-cost-use、progressive、high performance's enhanced state management solution, power your react"
    }
  },

  logo: '/favicon.png',
  footer: 'MIT Licensed | Copyright © concentjs (author: fantasticsoul)',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    logo: '/favicon.png',

    locales: {
      '/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
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
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
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
    },


    themeColors: {
      'primary-color': '#0094bd'
    },

    //获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: 'Last Updated'

  }
};
