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
  快速开始 ➜
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

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">使用<span style="font-weight:600;" >Concent</span> 你将享受到</h2>
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

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  初体验<span style="font-weight:600;" >Concent标准应用</span>
</h2>
<div class="summaryContent textLeft">
  这是一个标准的concent应用示例，基于type标注让整个工程的可阅读性和可维护性大幅上升，欢迎体验、fork并修改。
</div>
<div class="summaryContentJump">
  如是新用户，建议滚动至下方，阅读快速上手，领悟Concent核心理念来提高你的react开发体验吧^_^
</div>
<br />

<div style="width:100%;display:flex;">
<iframe style="width:1440px;height:860px;margin:0 auto" src="https://codesandbox.io/s/concent-guide-xvcej"></iframe>
</div>
<br/>
<a class="seeDemoCode cake" href="https://codesandbox.io/s/concent-guide-xvcej">访问此示例（js版本）</a>
<br/>
<a class="seeDemoCode cake" href="https://codesandbox.io/s/concent-guide-ts-zrxd5">访问此示例（ts版本）</a>

___
<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  如何<span style="font-weight:600;" >安装</span>
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
  快速<span style="font-weight:600;">上手</span>
</h2>

<h3 class="seeDemoCode textLeft">
  定义模块状态
</h3>
<br />

<div class="summaryContent textLeft">
  concent推崇模块化的管理整个应用的状态，以便让巨大的状态树得以按场景或业务精准地拆分为更小的分支，利于维护和扩展。
</div>
<br />

```js
import { run } from 'concent';

run({
  counter: {
    state: { num: 1, numBig: 100 },
  }
});
```

<br />
<h3 class="seeDemoCode textLeft">
  组件消费&修改模块状态
</h3>
<br />

<div class="summaryContent textLeft">
  依托运行时的依赖收集机制，所有实例在每一轮渲染期间读取模块状态时，concent将收集到它们需要被重渲染的数据依赖关系，从而实现精确更新，将需要人工介入的组件优化负担降低为0。
</div>
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/img/cc-re-render-process.png"/>
</div>
<div class="summaryContent textLeft">
  下面示例定义了组件所属的模块为counter，在组件内部调用setState时，除了触发自己重渲染，数据还将提交到store里的couner模块下，之后concent会将其分发到其他同属于counter模块的实例。
</div>
<br />

```js
import { register, useConcent } from 'concent';

@register('counter')
class DemoCls extends React.Component{
  inc = ()=> this.setState({num: this.state.num + 1})
  render(){
    // 此处读取了num，表示当前实例的渲染依赖列表是 ['num']
    const { num } = this.state;
    // render logic
  }
}

function DemoFn(){
  const { state, setState } = useConcent('counter');
  const inc = ()=> setState({num: state.num + 1});
  // render logic
}
```

<div class="summaryContent textLeft">
  state由私有状态和模块状态合成而来，我们可在组件上定义非模块的key来声明私有状态，当然了我们也可以从moduleState里只获取与模块相关的数据
</div>

```js
// privNum是一个模块里不存在的key，初始化实例时不会被模块状态所覆盖
const privState = ()=> ({privNum: 1000});

@register('counter')
class DemoCls extends React.Component{
  state = privState()
  render(){
    const { state, moduleState } = this.ctx;// this.ctx.state === this.state
  }
}

function DemoFn(){
  const { state, moduleState } = useConcent({module:'counter', state:privState });
}
```

<br />
<h3 class="seeDemoCode textLeft">
  渲染组件
</h3>
<br />

<div class="summaryContent textLeft">
  调用run接口配置模块数据，启动concent之后，concent会自己生成一份全局上下文并独立维护着，用于管理组件实例与模块直接的关系，因其不依赖react的Context api，所以接入concent无需对顶层根组件包裹Provider，做到真正的无感知接入和即插即用。
</div>
<br />

```jsx
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div>
      <ClsComp />
      <FnComp />
    </div>
  </React.StrictMode>,
  rootElement
);
```

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  <span style="font-weight:600;">进阶</span>了解
</h2>

<h3 class="seeDemoCode textLeft">
  定义模块reducer
</h3>
<br />

<div class="summaryContent textLeft">
  如果修改状态之前，需要做业务逻辑处理才能得到欲修改的状态，推荐将其写到模块reducer里(可以是同步的，也可以是异步的)，解耦ui渲染与业务逻辑。
</div>
<div class="summaryContentTip">
为了让concent总是处于最高的性能模式下运行，reducer里仅需要返回部分状态，即修改了什么则返回什么，方便concent通知关心这些变化的实例重渲染。
</div>
<br />

```js
run({
  counter: { 
    state: {/** ... */},
    reducer: {
      inc(payload, moduleState) {
        return { num: moduleState.num + 1 };
      },
      async asyncInc(payload, moduleState) {
        await delay();
        return { num: moduleState.num + 1 };
      }
    },
  },
});
```

<div class="summaryContent textLeft">
  组件内部可通过ctx.mr直接调用模块reducer里的方法。(mr是moduleReducer的缩写)
</div>

```js
//  --------- 对于类组件 -----------
changeNum = () => this.setState({ num: 10 })
// ===> 修改为
changeNum = () => this.ctx.mr.inc(10);// or this.ctx.mr.asynInc(10)

//当然这里也可以写为ctx.dispatch调用，不过更推荐用上面的moduleReducer直接调用
//this.ctx.dispatch('inc', 10); // or this.ctx.dispatch('asynInc', 10)

//  --------- 对于函数组件 -----------
const { state, mr } = useConcent("counter");// useConcent 返回的就是ctx
const changeNum = () => mr.inc(20); // or ctx.mr.asynInc(10)

//对于函数组将同样支持dispatch调用方式
//ctx.dispatch('inc', 10);  // or ctx.dispatch('asynInc', 10)
```

<br />
<h3 class="seeDemoCode textLeft">
  定义模块计算
</h3>
<br />

<div class="summaryContent textLeft">
  当需要用模块状态作为输入再次计算新的结果时，我们可以在定义模块时添加computed属性，定义目标计算函数。
</div>
<div class="summaryContent textLeft">
  注意下面的示例中，当从计算函数的参数列表解构出相关的计算参与状态值时，就确定了当前计算函数需要被再次触发计算的依赖关系列表，这是非常用户的符合代码书写直觉的，所写即所得，没有任何其他的语法干扰。
</div>
<br />


```js
run({
  counter: {
    state: { num: 1, numBig: 100 },
    computed: {
      numx2: ({num}) => num * 2,
      numSumBig: ({num, numBig}) => num + numBig,
    },
  }
});
```

<br />
<h3 class="seeDemoCode textLeft">
  组件消费模块计算结果
</h3>
<br />

<div class="summaryContent textLeft">
  依赖收集机制对模块计算结果依然有效，所有实例在每一轮渲染期间组件读取模块计算结果时，concent将收集到它们对模块状态的依赖列表
</div>
<br />

```js
// 在类组件里读取模块状态
const { moduleComputed } = this.ctx;
// 在函数组件里读取模块状态
const { moduleComputed } = useConcent('counter');

const { numx2, numSumBig } = moduleComputed;// 按需解构目标计算结果
```

<br />
<h3 class="seeDemoCode textLeft">
  连接多个模块
</h3>
<br />

<div class="summaryContent textLeft">
  所有concent组件只允许属于某一个模块，如需消费多个模块的数据和调用多个模块的方法时，可使用connect来完成。
</div>
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/img/cc/cc-class-and-instance-state.png"/>
</div>

<div class="summaryContent textLeft">
  当某个实例读取connectedState.moduleName下的数据时，concent将收集它到对所连接模块的依赖列表，同时组件可以使用cr.moduleName调用目标模块的reducer方法（cr即connectedReducer缩写），也可以使用setModuleState(moduleName, newPartialState)来直接修改目标模块的数据
</div>

```js
@register({module:'counter', connect:['foo', 'bar']})
class ClsComp extends React.Component{
  render(){
    const { connectedState, cr, setModuleState } = this.ctx;
    const { foo, bar } = connectedState;
    const changeFooState = e=> cr.foo.changeSomeKey({key: e.target.value});
  }
}

function FnComp(){
  const {cr, connectedState,setModuleState } = useConcent({module:'counter', connect:['foo', 'bar']});
  const { foo, bar } = connectedState;
  const changeFooState = e=> cr.foo.changeSomeKey({key: e.target.value});
}
```

<br />
<h3 class="seeDemoCode textLeft">
  全局模块
</h3>
<br />

<div class="summaryContent textLeft">
  concent内置了一个全局模块$$global，无论组件有没有connect到$$global，都会自动将全局模块的状态注入到实例上下文的globalState里，因为concernt内置的依赖收集机制，实例不读取它的值则不会因全局状态的改变而触发重渲染。
</div>

```js
run({
  $$global:{// 重新全局模块状态，不写的话默认是空对象 {}
    state: {theme:'green'}
  }
})

// 类组件和函数组件读取globalState的目标状态
const { globalState } = this.ctx;
const { globalState } = useConcent();
```

<br />
<h3 class="seeDemoCode textLeft">
  方便的顶层api
</h3>
<br />

<div class="summaryContent textLeft">
在脱离ui范围的时候，concent允许用户使用顶层api修改状态。
</div>

<div class="summaryContent textLeft">
👉使用setState   
</div>

```js
import { getState, setState } from "concent";

console.log(getState('counter').num);// log: 1
setState('counter', {num:10});// 修改counter模块num值
console.log(getState('counter').num);// log: 10
```

<div class="summaryContent textLeft">
👉使用 dispatch，dispatch会返回一个promise，所以我们需要在外部包裹一个async
</div>

```js
import { getState, dispatch } from "concent";

(async ()=>{
  console.log(getState("counter").num);// log 1
  await dispatch("counter/inc");
  console.log(getState("counter").num);// log 2
  await dispatch("counter/asyncInc");
  console.log(getState("counter").num);// log 3
})()
```

<div class="summaryContent textLeft">
👉使用 reducer，run接口定义的reducer集合已被concent集中管理起来，并允许用户以reducer.moduleName.methodName的方式直接发起调用
</div>

```js
import { getState, reducer as ccReducer } from "concent";

(async ()=>{
  console.log(getState("counter").num);// log 1
  await ccReducer.counter.inc();
  console.log(getState("counter").num);// log 2
  await ccReducer.counter.asyncInc();
  console.log(getState("counter").num);// log 3
})()
```

<div class="summaryContent textLeft">
为了方便用户快速验证开发过程中的一些思路，这些api已绑定到window.cc下，用户可打开浏览器console，输入 cc. 即可开始直接调用这些api，除了cc，还可通过window.sss查看整个状态树，window.cccc查看整个计算结果树。
</div>


<br />
<h3 class="seeDemoCode textLeft">
  事件
</h3>
<br />

<div class="summaryContent textLeft">
  所有组件实例可以在setup里定义监听的事件，方便不同节点快速唤起一些低耦合的的业务方法
</div>

```js
const setup = ctx=>{
  // 监听普通事件
  ctx.on('evName', (p1, p2)=>{/** 处理业务 */});
  // 监听带id的事件，适用于有多个实例的组件，需按业务id触发具体回调时
  ctx.on(['identityEvName', ctx.props.id], (p1, p2)=>{/** 处理业务 */})
}
```

<div class="summaryContent textLeft">
  实例内部可通过ctx.emit发射事件，其他地方通过顶层api发射事件
</div>

```js
import { emit } from 'concent';

emit('someEvent', 1, 2 )
emit(['someIdentityEvent', 'id1'], 1, 2 )

const setup = ctx=>{
  const triggerEmit = ()=> ctx.emit('someEvent', 1, 2);
  const triggerIdentityEmit = ()=> ctx.emit('someIdentityEvent', 1, 2);
  // 打包返回到settings里给ui绑定
  return { triggerEmit, triggerIdentityEmit};
}
```

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  其他<span style="font-weight:600;">关键特性</span>
</h2>

<a class="seeDemoCode textLeft" rel="noopener" target="blank" href="https://codesandbox.io/s/hello-concent-pzde3?file=/src/App.js:50-92">
  ❤️ 使用<span style="font-weight:600;" >组合api</span>
</a>
<div class="summaryContent textLeft">
  得益于setup接口只会在组件初次渲染之前执行一次的特性，可以在其内部使用组合api帮助我们将函数组件里每一轮渲染需要声明的临时闭包函数提升为静态函数
</div>

```js
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


<br /> 
<a class="seeDemoCode textLeft" rel="noopener" target="blank" href="https://codesandbox.io/s/hello-concent-shared-cu1i9">
  ❤️统一<span style="font-weight:600;" >类组件</span>和<span style="font-weight:600;" >函数组件</span>生命周期
</a>
<div class="summaryContent textLeft">
  setup可同时作用于类组件与函数组件，提供的effect接口统一适配了函数和类的生命周期接口。
</div>
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/article-img/rmc-comparison/cc-unified-lifecycle-en.png"/>
</div>

<div class="summaryContent textLeft">
  用户可以完全用函数组件的副作用思想去管理类组件的生命周期业务逻辑。
</div>

```js
const setup = ctx => {
  ctx.effect(() => {/**业务代码*/}, ["num"]);// 声明依赖名称即可

  ctx.effect(() => {
    return () => {
      // 返回一个清理函数， 等价于componentWillUnmout
    };
  }, []);// 依赖为空数组，仅在首次渲染完毕后执行一次
};
```

<div class="summaryContent textLeft">
  类组件和函数组件都可装配此setup函数，共用生命周期业务逻辑
</div>

```js
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

<br/>
<a class="seeDemoCode cake" href="https://juejin.im/post/5deb43256fb9a0166316c3e9">了解更多关于effect和组件生命周期统一</a>

<a class="exploreMore" href="./guide/first-sight">
  Explore <span style="font-weight:600;">more</span>
</a>
