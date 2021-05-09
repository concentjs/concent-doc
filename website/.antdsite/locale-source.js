


const sidebarConf = {
  '/guide/': [
    'first-sight',
    'quick-start',
    // '',//对应guide文件夹下的README.md
    {
      title: '核心概念',
      'title.en': 'Core Concept',
      collapsable: false,
      children: [
        'concept-module',
        'concept-module-state',
        'concept-module-reducer',
        'concept-module-computed',
        'concept-module-watch',
        'concept-module-init',
        'concept-module-lifecycle',
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
  '/api-much-used/': [
    {
      title: '全局api',
      collapsable: false,
      children: [
        'run',
        'register',
        'useConcent',
      ]
    },
    {
      title: '实例api',
      collapsable: false,
      children: [
        'setState',
      ]
    },
    {
      title: '代码示范',
      collapsable: true,
      children: [
        'setState',
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
      'title.en': 'Global api',
      collapsable: false,
      children: [
        'g-run',
        'g-configure',
        'g-register',
        'g-register-dumb',
        'g-register-hook-comp',
        'g-cc-fragment',
        'g-use-concent',
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
  ],
  '/eco-sys/': [
    'intro',
    'react-router-concent',
    'plugin-loading',
    'plugin-redux-devtool',
  ],
  '/release-log/': [
    'intro',
  ],
  '/lab/': [
    'intro',
  ]
}

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
      { text: '⚙️Api(常用)', link: '/api-much-used/run' },
      { text: '⚙️Api(全)', link: '/api/explain' },
      { text: '☘️生态系统', link: '/eco-sys/intro' },
      { text: ' 🖋发布日志', link: '/release-log/intro' },
      { text: ' 🔍实验室', link: '/lab/intro' },
      { text: 'GitHub', link: 'https://github.com/concentjs/concent', important: true }
    ],
    en: [
      { text: '📍Guide', link: '/guide/first-sight' },
      { text: '⚙️Api(much used)', link: '/api-much-used/run' },
      { text: '⚙️Api(whole)', link: '/api/explain' },
      { text: '☘️EcoSys', link: '/eco-sys/intro' },
      { text: ' 🖋ReleaseLog', link: '/release-log/intro' },
      { text: ' 🔍Lab', link: '/lab/intro' },
      { text: 'GitHub', link: 'https://github.com/concentjs/concent', important: true }
    ]
  },
  //边栏
  sidebar: {
    // 在 config.js 里 为自动按语言来处理前缀
    cn: sidebarConf,
    en: sidebarConf,
  }
}
