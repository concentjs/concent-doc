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

<a class="getStarted" href="./guide/first-sight">
  Get Started ➜
</a>


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
      run载入模块配置，register注册类组件，useConcent注册函数组件。
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg2 fibs2"></div>
    <h2>0入侵成本接入</h2>
    <p class="featureContent">
      无根Provider包裹，注册后的组件setState即可更新store。
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
      支持实例级别computed、watch定义；支持组件emit&on；支持setup特性实现composition api.
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
      启用Proxy在运行时动态收集每一个组件的最新依赖列表，保证最小粒度更新，同时内置renderKey、lazyDispatch、delayBroadcast等高级特性满足更复杂的更新场景。
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
<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  How to <span style="font-weight:600;" >install</span>
</h2>

```bash
npm install concent --save

//or 

yarn add concent
```

<!-- <div style="text-align: center;">
  <img src="/concent-doc/img/install-concent.png" width="780px" style="margin:0 auto"/>
</div> -->

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  <span style="font-weight:600;">Key features</span> preview
</h2>

<a class="seeDemoCode textLeft" rel="noopener" target="blank" href="https://codesandbox.io/s/hello-concent-pzde3?file=/src/App.js:50-92">
  ❤️Enjoy <span style="font-weight:600;" >composition api</span>  with 🔥dependency collection🔥
</a>
<br />

```js{3}
import { run, useConcent } from "concent";

run();// 启动concent

const setup = ctx => {
  const { initState, computed, watch, setState } = ctx;
  // 初始化实例状态
  initState({ count: 0 });
  // 定义计算函数，这里的依赖是count，仅当count变化，触发此函数重新计算
  computed("doubleCount", n => n.count * 2);
  // 定义观察函数，这里的依赖是count，仅当count变化，会弹此提示
  watch("count", (n, o) => alert(`from ${o.count} to ${n.count}`));
  // 打包方法返回，将被收集到settings里
  return {
    inc: () => setState({ count: ctx.state.count + 1 }),
    dec: () => setState({ count: ctx.state.count - 1 })
  };
};

function Counter(){
  // 这些是从实例上下文里解构出来的属性
  const { state, refComputed, settings } = useConcent({ setup });
  return (
    <>
      <h1>{state.count}</h1>
      <h1>{refComputed.doubleCount}</h1>
      <button onClick={settings.inc}>inc</button>
      <button onClick={settings.dec}>dec</button>
    </>
  );
}
```
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/article-img/rmc-comparison/3.png"/>
</div>

<br /> 
<a class="seeDemoCode textLeft" rel="noopener" target="blank" href="https://codesandbox.io/s/hello-concent-shared-cu1i9">
  ❤️Easily <span style="font-weight:600;" >share state</span>  and <span style="font-weight:600;" >reuse logic</span> between class and function
</a>
<br />

```js{5}
import { run, useConcent } from "concent";

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

run({// 载入模块配置启动concent
  counter: {
    state: { count: 0 },// 【必需】，定义模块状态
    reducer: {
      async complexUpdate(p, m, ac) {
        await delay();
        await ac.setState({ count: m.count + 10 });
        await delay();
        return { count: m.count + 10 };
      },
      simpleUpdate(p, m) {
        return { count: m.count - 100 };
      }
    },
    computed: {// 【可选】，定义模块计算
      doubleCount: n => n.count * 2,
      quadrupleCount: (n, o, f) => f.cuVal.doubleCount * 2,
    },
    watch: {// 【可选】，定义模块观察
      count: (n, o) => alert(`from ${o.count} to ${n.count}`)
    }
  }
});

const setup = ctx => {
  return {
    inc: () => ctx.setState({ count: ctx.state.count + 1 }),
    dec: () => ctx.setState({ count: ctx.state.count - 1 })
  };
};

function Counter() {
  const { state, moduleComputed, moduleReducer, settings } = 
    useConcent({ setup, module: "counter" });
  return <div> ui ... </div>
}

@register({ setup, module: "counter" })
class ClassCounter extends React.Component{
  render(){
    const { state, moduleComputed, moduleReducer, settings } = this.ctx;
    return <div> ui ... </div>
  }
}
```
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/article-img/rmc-comparison/cc-unified-lifecycle-en.png"/>
</div>

<br /> 
<br /> 
<div style="width:100%;display:flex;">
<iframe style="width:1440px;height:860px;margin:0 auto" src="https://codesandbox.io/s/concent-guide-xvcej"></iframe>
</div>
<br/>
<a class="seeDemoCode cake" href="https://codesandbox.io/s/concent-guide-xvcej">Experience standard js concent project</a>
<br/>
<a class="seeDemoCode cake" href="https://codesandbox.io/s/concent-guide-ts-zrxd5">Experience standard ts concent project</a>


<a class="exploreMore" href="./guide/first-sight">
  Explore <span style="font-weight:600;">more</span>
</a>


