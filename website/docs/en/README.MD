---
heroImage: /favicon.png
actionText: Get Started →
actionLink: /guide/
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
  <img src='https://img.shields.io/github/issues/concentjs/concent.svg' alt='issues open' height='22px'   style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/npm/dw/concent.svg?label=downloads' alt='downloads' height='22px'  style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/last-commit/concentjs/concent.svg' alt='last commit' height='22px'  style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/commit-activity/m/concentjs/concent.svg' alt='commit activity' height='22px' style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/npm/l/concent.svg' alt='license:MIT' height='22px' style="max-width:200px;" />
  </a>
</div>

<div style="display:flex; flex-wrap: wrap; justify-content: center; margin-bottom:64px;">
  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/followers/fantasticsoul.svg?style=social' alt='followers' height='22px' style="max-width:200px;" />
  </a>
  <a href='https://github.com/concentjs/concent' target="blink" style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/stars/concentjs/concent.svg?style=social' alt='concent star' height='22px' style="max-width:200px;"/>
  </a>
</div>

<div style="display:flex; justify-content:flex-start; flex-flow: row wrap;">

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/01.png);"></div>
    <h2>极简的核心api</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      run负责载入模块配置，register负责注册你的react组件为concent组件
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/00.png);"></div>
    <h2>0入侵成本接入</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      无需Provider包裹，原始react组件被注册后，其setState就被赋予了接通store的能力。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/02.png);"></div>
    <h2>贴心的模块配置</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      模块定义提供state、reducer、watch、computed和init 5个选项，支持按需定义，覆盖你所有的业务场景。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/03.png);"></div>
    <h2>灵活的数据消费粒度</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      可指定组件所属模块变更依赖的任意状态key，同时还支持连接到其他模块去指定变更依赖的任意状态key，实现灵活的跨模块&细粒度的数据消费。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/04.png);"></div>
    <h2>渐进式</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      除setState之外，也支持dispatch、invoke提交数据变更，同时让ui视图与业务逻辑彻底解耦。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/05.png);"></div>
    <h2>组件能力增强</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      支持实例级别computed、watch定义；支持emit&on，让跨组件通通信更容易；支持setup特性，让函数组件拥有定义静态api的能力。
    </p>
  </div>



  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/06.png);"></div>
    <h2>高度一致的编程体验</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      hoc、render props和hook 3种方式定义的组件均享有一致的api调用体验，相互切换代价为0。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/07.png);"></div>
    <h2>渲染性能出众</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      基于依赖标记、引用收集和状态分发原理工作，内置renderKey、lazyDispatch、delayBroadcast等特性，保证大型react工程的渲染效率。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/08.png);"></div>
    <h2>干净的dom层级</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      对于class组件，默认采用反向继承策略，让react dom树的层级结构保持简洁与干净。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/09.png);"></div>
    <h2>支持扩展中间件与插件</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      允许用户定义中间件拦截所有的数据变更提交记录，做额外处理，也可以自定义插件，接收运行时的发出的各种信号，按需增强concent自身的能力。
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/11.png);"></div>
    <h2>去中心化的动态配置模块</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      启动concent后还支持任意地方调用configure接口动态配置模块，方便用户将组件和其模块定义放置在同一个文件夹并打包发布npm，方便别人直接引入你的concent组件
    </p>
  </div>

  <div style="width:25%; padding:0 10px; text-align:center">
    <div style="height: 80px;background-size: contain;background-position: center;background-repeat: no-repeat; background-image: url(/concent-doc/icon/10.png);"></div>
    <h2>模块克隆</h2>
    <p style="text-align:left;color:#697b8c; font-size:16px; line-height:22px">
      支持对已定义模块进行克隆，克隆出的模块在运行时是完全独立的，以满足用户使用抽象工厂函数动态创建属于不同模块的cc组件。
    </p>
  </div>

</div>

___
<div>
  <h2 style="border-left:5px solid #0094bd;border-bottom:2px solid #0094bd; width:190px; padding-left:19px; color:#0094bd">如何安装</h2>
</div>

```bash
npm i concent --save
```

<div>
  <h2 style="border-left:5px solid #0094bd;border-bottom:2px solid #0094bd; width:190px; padding-left:19px; color:#0094bd">如何使用</h2>
</div>

<h3 style="height:28px; line-height:28px; border-left:3px solid #0094bd;border-bottom:1px solid #0094bd; width:290px; padding-left:19px; margin-left:19px; color:#0094bd">启动concent，载入模块配置</h3>

```javascript
import { run } from 'concent';
run({
  counter: {//定义counter模块
    state: { count: 1 },//state定义，必需
    reducer: {//reducer函数定义，可选
      inc(payload, moduleState) {
        return { count: moduleState.count + 1 }
      },
      dec(payload, moduleState) {
        return { count: moduleState.count - 1 }
      }
    },
    // compouted, watch, init 可选
    //computed: { count:(newVal, oldVal)=> 10*newVal ) },
    //watch: { count:(newVal, oldVal)=> aleter(`count change to ${newVal}`) },
    //init: async ()=> { const newState = await api.getData(); return newState },
  },
})
```

<h3 style="height:28px; line-height:28px; border-left:3px solid #0094bd;border-bottom:1px solid #0094bd; width:290px; padding-left:19px; margin-left:19px; color:#0094bd">定义类组件</h3>

```javascript
import { register } from 'concent';
//注册成为Concent Class组件，指定其属于counter模块
@register('counter')
class CounterComp extends Component {
  render() {
    //ctx是concent为所有组件注入的上下文对象，携带为react组件提供的各种新特性api
    return (
      <div>
        count: {this.state.count}
        <button onClick={() => this.ctx.dispatch('inc')}>inc</button>
        <button onClick={() => this.ctx.dispatch('dec')}>dec</button>
      </div>
    );
  }
}
```

<h3 style="height:28px; line-height:28px; border-left:3px solid #0094bd;border-bottom:1px solid #0094bd; width:290px; padding-left:19px; margin-left:19px; color:#0094bd">定义RenderProps组件</h3>

```javascript
import { registerDumb } from 'concent';
const CounterRenderPropsComp = registerDumb('counter')(ctx => {
  return (
    <div>
      count: {ctx.state.count}
      <button onClick={() => ctx.dispatch('inc')}>inc</button>
      <button onClick={() => ctx.dispatch('dec')}>dec</button>
    </div>
  );
})
```

<h3 style="height:28px; line-height:28px; border-left:3px solid #0094bd;border-bottom:1px solid #0094bd; width:290px; padding-left:19px; margin-left:19px; color:#0094bd">定义Hook组件</h3>

```javascript
import { useConcent } from 'concent';
function CounterHookComp() {
  const ctx = useConcent('counter');
  return (
    <div>
      count: {ctx.state.count}
      <button onClick={() => ctx.dispatch('inc')}>inc</button>
      <button onClick={() => ctx.dispatch('dec')}>dec</button>
    </div>
  );
}
```

<div style="padding:2px 15%;text-align:center">
  <h2 style="color:#0094bd">Hello Concent</h2>
  <div style="width: 100%;max-width: 720px;height: 23px;background-image: url(/concent-doc/img/blockHeader.png); background-size: contain; margin: 0 auto;"></div>
  <video muted style="width:100%;maxWidth:720px;transform:translateY(-6px)" controls="controls" autoPlay="none">
    <source src="/concent-doc/video/cc-zero-cost.mov" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <br/>
  <a href="https://stackblitz.com/@fantasticsoul" target="blink" >更多示例列表</a>
</div>

