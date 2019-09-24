---
heroImage: /favicon.png
actionText: Get Started →
actionLink: /guide/first-sight
home: true
showStar: true
# features:
#   - title: 高性能
#     details: Feature1 Details...
#   - title: Feature2
#     details: Feature2 Details...
#   - title: Feature3
#     details: Feature3 Details...
---

<div style="display:flex; flex-wrap: wrap; justify-content: center;">

  <a href='https://www.npmjs.com/package/concent' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/package-json/v/concentjs/concent/master.svg?label=npm%20version' alt='npm version' height='22px' style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/npm/dw/concent.svg?label=downloads' alt='downloads' height='22px'  style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/commit-activity/m/concentjs/concent.svg' alt='commit activity' height='22px' style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/npm/l/concent.svg' alt='license:MIT' height='22px' style="max-width:200px;" />
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/followers/fantasticsoul.svg?style=social' alt='followers' height='22px' style="max-width:200px;" />
  </a>

  <a href='https://github.com/concentjs/concent' target="blink" style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/stars/concentjs/concent.svg?style=social' alt='concent star' height='22px' style="max-width:200px;"/>
  </a>
</div>

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">What can <span style="font-weight:600;" >Concent</span> offer you</h2>
<div style="display:flex; justify-content:flex-start; flex-flow: row wrap;">

  <div class="featureWrap">
    <div class="featureImgBase featureImg1 fibs1"></div>
    <h2>极简核心api</h2>
    <p class="featureContent">
      run载入模块配置，register注册组件
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg2 fibs2"></div>
    <h2>0入侵成本接入</h2>
    <p class="featureContent">
      无需Provider包裹，被注册后的组件setState调用就接通store。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg3 fibs3"></div>
    <h2>贴心模块配置</h2>
    <p class="featureContent">
      模块提供state、reducer、watch、computed和init 5个选项，支持按需定义，覆盖所有业务场景。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg4 fibs4"></div>
    <h2>数据消费粒度灵活</h2>
    <p class="featureContent">
      支持组件跨多个模块消费数据，定义key级别的变更依赖。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg5 fibs4"></div>
    <h2>渐进式</h2>
    <p class="featureContent">
      除setState之外，还支持dispatch、invoke提交数据变更，同时让ui视图与业务逻辑彻底解耦。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg6 fibs3"></div>
    <h2>组件能力增强</h2>
    <p class="featureContent">
      支持实例级别computed、watch定义；支持组件emit&on；支持setup特性。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg7 fibs2"></div>
    <h2>高度一致的编程体验</h2>
    <p class="featureContent">
      hoc、render props和hook 3种方式定义的组件均享有一致的api调用体验，相互切换代价为0。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg8 fibs1"></div>
    <h2>渲染性能出众</h2>
    <p class="featureContent">
      基于依赖标记、引用收集和状态分发原理工作，内置renderKey、lazyDispatch、delayBroadcast等特性。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg9 fibs1"></div>
    <h2>干净的dom层级</h2>
    <p class="featureContent">
      对于class组件，默认采用反向继承策略，让react dom树的层级结构保持简洁与干净。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg10 fibs2"></div>
    <h2>扩展中间件与插件</h2>
    <p class="featureContent">
      支持定义中间件拦截所有的数据变更提交记录做额外处理，也支持自定义插件接收运行时的各种信号，增强concent能力。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg11 fibs3"></div>
    <h2>去中心化配置模块</h2>
    <p class="featureContent">
      支持任意地方调用configure接口动态配置模块，方便就近配置模块，且能够独立打包组件发布npm。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg12 fibs4"></div>
    <h2>模块克隆</h2>
    <p class="featureContent">
      支持对已定义模块进行克隆运行时是完全独立的新模块，满足抽象工厂函数等高维度抽象。
    </p>
  </div>

</div>

___
<div>
  <h2 style="border-left:5px solid #0094bd;border-bottom:2px solid #0094bd; width:190px; padding-left:19px; color:#0094bd">如何安装</h2>
</div>

<div style="text-align: center;">
  <img src="/concent-doc/img/install-concent.png" width="780px" style="margin:0 auto"/>
</div>

<div>
  <h2 style="border-left:5px solid #0094bd;border-bottom:2px solid #0094bd; width:190px; padding-left:19px; color:#0094bd">开始使用</h2>
</div>

```js{3}
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { run, register, useConcent } from 'concent';                

run({
  foo: {
    state: { greeting: 'hello concent' }
  }
})

function Comp1() {
  const { state: { greeting } } = useConcent('foo');
  return <h1>{greeting}</h1>
}

@register('foo')
class Comp2 extends Component {
  render() {
    const { greeting } = this.state;
    return <h1>{greeting}</h1>
  }
}

function App() {
  return (
    <>
      <Comp1 />
      <Comp2 />
    </>
  )
}
ReactDom.render(<App />, document.getElementById('root'));
```

<div style="text-align: center;">
  <a href="./guide/first-sight" style="font-size:52px"> 🔥 🔥 🔥<span style="font-size:16px;line-height:52px;vertical-align: text-bottom; padding-left:12px;">探索更多</span> 🔥 🔥 🔥</a>
</div>



