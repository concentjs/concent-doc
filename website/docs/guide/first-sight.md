# 初体验
以下代码片段将展示concent slogan里的特性，方便你快速了解它与其它状态管理的巨大差异。

## 0入侵
> 使用concent，可以在你原始react组件一行代码不改动的情况下，直接接入状态管理。    

<div>
  <h2 class="L2Title">❤️0入侵</h2>
</div>

<h3 class="L3Title">启动concent，载入模块配置</h3>

```javascript
import { run } from 'concent';
run({
  counter: {//定义counter模块
    state: { count: 1 },//state定义，必需
  },
})
```


<h3 class="L3Title">定义类组件</h3>

```javascript
import { register } from 'concent';
//注册成为Concent Class组件，指定其属于counter模块
@register('counter')
class CounterComp extends Component {
  render() {
    const { count } = this.state;
    return (
      <div>
        count: {count}
        <button onClick={() => this.setState({count: count+1})}>inc</button>
        <button onClick={() => this.setState({count: count-1})}>dec</button>
      </div>
    );
  }
}
```
<div style="text-align:center;">
  <h3 style="color:#0094bd">代码0改动接入concent</h3>
  <img style="width:100%;max-width:780px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:780px;transform:translateY(-6px)" controls="controls" autoPlay="none">
    <source src="/concent-doc/video/zero-cost-use.mov" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

## 渐进式
> 得益于concent灵活的api设计，允许你逐步的解耦渲染逻辑与业务逻辑，让组件保持只输出视图的最小职责，彻底提高代码的可阅读性与可维护性。    

<div>
  <h2 class="L2Title"> 🌟渐进式</h2>
</div>

<h3 class="L3Title">新增reducer定义</h3>

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
  },
})
```

<h3 class="L3Title">通过dispatch修改状态</h3>

```js
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
<div style="text-align:center;">
  <h3 style="color:#0094bd">逐步解耦业务逻辑与ui渲染</h3>
  <img style="width:100%;max-width:780px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:780px;transform:translateY(-6px)" controls="controls">
    <source src="/concent-doc/video/step-by-step.mov" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

> 对于concent来说，Hoc class, renderProps, hook 三种组件写法是高度统一的，对于concent来说，它们只是渲染的载体，注入的**实例上下文对象**`ctx`才是concent的灵魂，让你可以在它们3种形态之间丝滑的任意切换，所以你大可以不用担心class组件与function组件怎么共享代码以及怎么共享业务逻辑。

<h3 class="L3Title">定义为RenderProps组件</h3>

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

<h3 class="L3Title">定义为Hook组件</h3>

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


## 高性能
> 基于**依赖标记**、**引用收集**和**状态分发**原理工作，内置`renderKey`、`lazyDispatch`、`delayBroadcast`等特性，从状态提交那一刻，concent就精确的知道怎么样缩小渲染范围、减少渲染次数、降低渲染频率，保证大型react工程的极致的渲染效率。

<div>
  <h2 class="L2Title">⚡️高性能</h2>
</div>

<h3 class="L3Title">renderKey</h3>
<div style="text-align:center;">
  <h3 style="color:#0094bd">缩小长列表渲染范围</h3>
  <img style="width:100%;max-width:780px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:780px;transform:translateY(-6px)" controls="controls">
    <source src="/concent-doc/video/render-key.mov" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

[点我查看视频源码](https://stackblitz.com/edit/concent-render-key)

<h3 class="L3Title">lazyDispatch</h3>
<div style="text-align:center;">
  <h3 style="color:#0094bd">减小渲染次数</h3>
  <img style="width:100%;max-width:780px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:780px;transform:translateY(-6px)" controls="controls">
    <source src="/concent-doc/video/lazy-dispatch.mov" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

[点我查看视频源码](https://stackblitz.com/edit/concent-lazy-dispatch)

<h3 class="L3Title">delayBroadcast</h3>
<div style="text-align:center;">
  <h3 style="color:#0094bd">降低渲染频率</h3>
  <img style="width:100%;max-width:780px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:780px;transform:translateY(-6px)" controls="controls">
    <source src="/concent-doc/video/delay-broadcast.mov" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

[点我查看视频源码](https://stackblitz.com/edit/concent-delay-broadcast)

## 增强react
> 有了**实例上线文**`ctx`，配合`setup`特性，concent可以非常从容自然的增强react组件功能，离开这些功能你依然能够开发react应用，但用上这些功能能你拥抱更好的开发范式，全面提升大型react工程的编码优化度和架构体验。    
>`setup`是针对组件实例提供的一个非常重要的特性，在类组件和函数组件里都能够被使用，它会在组件首次渲染之前会被触发执行一次，其返回结果收集在`ctx.settings`里，之后便不会再被执行，所以可以在其中定义`实例computed`、`实例watch`、`实例effect`等钩子函数，同时也可以自定义其他的业务逻辑函数并返回，方便组件使用。
利用setup只执行一次的特性，可以让函数组件省去重复渲染期间，重复生成临时闭包函数，同时需要手动调用`useCallback`等辅助优化函数

<div>
  <h2 class="L2Title">🛠增强react</h2>
</div>
<h3 class="L3Title">实例computed、watch、effect、emit&on etc...</h3>

```js
import { run, useConcent } from 'concent';

run({
  counter: {//定义counter模块
    state: {//【必需】定义state
      count: 1,
      msg: '',
    },
    reducer: {//【可选】定义reducer，解耦业务逻辑与ui渲染
      inc(num, moduleState, actionCtx) {
        return { count: moduleState.count + num };
      },
      changeMsg(msg, moduleState, actionCtx) {
        return { msg };
      },
      async complexInc(num, moduleState, actionCtx) {
        await api.track('inc');
        actionCtx.dispatch('inc', inc);
        actionCtx.dispatch('changeMsg', 'call complexInc');
      }
    },
    computed: {//【可选】定义模块计算函数
      count: count => count * 2,
      anyOneChange: {
        fn: (newState, oldState, fnCtx) => {
          const { changed } = fnCtx;
          return `${changed.join(',')} changed`
        },
        depKeys: ['count', 'msg'],
      }
    },
    watch: {//【可选】定义模块观察函数
      count: (count, oldVal) => console.log(`old ${oldVal} new ${count}`),
      anyOneChange: {
        fn: (newState, oldState, fnCtx) => {
          console.log(`${changed.join(',')} changed`);
        },
        depKeys: ['count', 'msg'],
      }
    },
    init: async () => {//【可选】异步的初始化模块状态
      const data = await api.fetchData();
      return data;
    }
  },
})

const setup = ctx => {
  //count变化时的副作用函数，第二位参数可以传递多个值，表示任意一个发生变化都将触发此副作用
  ctx.effect(() => {
    console.log('count changed');
  }, ['count']);
  //每一轮渲染都会执行
  ctx.effect(() => {
    console.log('trigger every render');
  });
  //仅首次渲染执行的副作用函数
  ctx.effect(() => {
    console.log('trigger only first render');
  }, []);

  //定义实例computed，因每个实例都可能会触发，优先考虑模块computed
  ctx.computed('count', ({count}, oldState, fnCtx) => {
    return count * 2;
  });

  //定义实例watch，区别于effect，执行时机是在组件渲染之前
  //因每个实例都可能会触发，优先考虑模块watch
  ctx.watch('count', ({count}, oldState, fnCtx) => {
    //发射事件
    ctx.emit('countChanged', newVal);
    api.track(`count changed to ${newVal}`);
  });

  //定义事件监听，concent会在实例销毁后自动将其off掉
  ctx.on('changeCount', count => {
    ctx.setState({ count });
  });

  return {
    inc: () => ctx.dispatch('inc', ctx.state.count + 1),
    complexInc: () => ctx.dispatch('complexInc', ctx.state.count + 1),
  };
}

const iState = { privCount: 0 };//此state相当于组件的私有状态
function HookFnComp() {
  const {
    state: { privCount, count, msg }, settings: { inc, dec, incStoreCount, decStoreCount }
  } = useConcent({ module: 'counter', setup, state: iState });

  return (
    <div>
      count: {count}
      msg: {msg}
      privCount: {privCount}
      <button onClick={inc}>+</button>
      <button onClick={complexInc}>+</button>
    </div>
  );
}
```

<div style="text-align:center;">
  <h3 style="color:#0094bd">拥抱更好的开发范式</h3>
  <img style="width:100%;max-width:780px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:780px;transform:translateY(-6px)" controls="controls">
    <source src="/concent-doc/video/enhance-react.mov" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

[点我查看视频源码](https://stackblitz.com/edit/cc-4-render-mode)