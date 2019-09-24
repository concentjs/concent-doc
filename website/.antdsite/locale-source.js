

module.exports = {
  // 多语言下拉菜单的标题
  selectText: {
    cn: '选择语言',
    en: 'Languages',
  },
  // 该语言在下拉菜单中的标签
  label: {
    cn: '简体中文',
    en: 'English',
  },
  // 编辑链接文字
  editLinkText: {
    cn: '在 GitHub 上编辑此页',
    en: 'Edit this page on GitHub',
  },
  // Service Worker 的配置
  serviceWorker: {
    cn: {
      updatePopup: {
        message: "发现新内容可用.",
        buttonText: "刷新"
      }
    },
    en: {
      updatePopup: {
        message: "New content is available.",
        buttonText: "Refresh"
      }
    }
  },
  // 当前 locale 的 algolia docsearch 选项
  algolia: {
    cn: {},
    en: {}
  },
  // 顶部导航
  nav: {
    cn: [
      { text: '📍指引', link: '/guide/first-sight' },
      { text: '⚙️Api', link: '/api/explain' },
      { text: '☘️生态系统', link: '/eco-sys' },
      { text: ' 🖋发布日志', link: '/release-log' },
      { text: ' 🔍实验室', link: '/lab' },
      { text: 'GitHub', link: 'https://github.com/concentjs/concent', important: true }
    ],
    en: [
      { text: '📍Guide', link: '/guide/first-sight' },
      { text: '⚙️Api', link: '/api/explain' },
      { text: '☘️EcoSys', link: '/eco-sys' },
      { text: ' 🖋ReleaseLog', link: '/release-log' },
      { text: ' 🔍Lab', link: '/lab' },
      { text: 'GitHub', link: 'https://github.com/concentjs/concent', important: true }
    ]
  },
  //边栏
  sidebar: {
    cn: {
      '/guide/': [
        'first-sight',
        'quick-start',
        // '',//对应guide文件夹下的README.md
        {
          title: '核心概念',
          collapsable: false,
          children: [
            'concept-module',
            'concept-module-state',
            'concept-module-reducer',
            'concept-module-computed',
            'concept-module-watch',
            'concept-module-init',
            'concept-ref-ctx',
            'concept-ref-setup',
            'concept-ref-computed',
            'concept-ref-watch',
            'concept-ref-effect',
            'concept-event',
            'concept-change-state',
            'concept-action-ctx',
            'concept-fn-ctx',
            'concept-concent-ctx',
            'concept-middleware',
            'concept-plugin',
          ]
        },
        {
          title: '教程&实战',
          collapsable: false,
          children: [
            'demo-show-all-features',
            'demo-1',
            'demo-2',
          ]
        },
      ],
      '/api/': [
        'explain',//对应api文件夹下的README.md
        {
          title: '实例api',
          collapsable: false,
          children: [
            'ref-set-state',
            'ref-force-update',
            'ref-set-module-state',
            'ref-set-global-state',
            'ref-dispatch',
            'ref-lazy-dispatch',
            'ref-invoke',
            'ref-lazy-invoke',
            'ref-sync',
            'ref-sync-bool',
            'ref-sync-int',
            'ref-set',
            'ref-set-bool',
            'ref-emit',
            'ref-on',
            'ref-off',
            'ref-setup',
            'ref-computed',
            'ref-watch',
            'ref-effect',
            'ref-execute',
          ]
        },
        {
          title: '全局api',
          collapsable: false,
          children: [
            'g-run',
            'g-configure',
            'g-register',
            'g-register-dumb',
            'g-cc-fragment',
            'g-use-concent',
            'g-register-hook-comp',
            'g-set-state',
            'g-set-global-state',
            'g-set',
            'g-get-state',
            'g-get-global-state',
            'g-get-computed',
            'g-get-global-computed',
            'g-dispatch',
            'g-lazy-dispatch',
            'g-reducer',
            'g-lazy-reducer',
            'g-emit',
            'g-execute',
            'g-clear-context-if-hot',
          ]
        },
      ]
    },
    en: {
      '/en/guide/': [
        'quick-start',
        {
          title: '教程&实战',
          collapsable: false,
          children: [
            'demo-show-all-features',
            'demo-1',
            'demo-2',
          ]
        }
      ],
      '/api/': [

      ]
    }
  }
}
