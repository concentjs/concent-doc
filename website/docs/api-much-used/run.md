# run

`run`函数负责载入用户定义的模块配置并启动`concent`，所有其他顶层函数的调用都必须在调用`run`之后才能调用，建议将启动函数封装成一个脚本`runConcent.js`，在你的app入口处调用`import './runConcent'`
> 启动一定要在入口文件头部引用其他cc组件前先执行，所以通常为了保险起见，可以放入口函数的第一行触发执行

```js
import './runConcent';
import ReactDOM from 'react-dom';
import App from 'App';

ReactDOM.render(<App />, document.getElementById('root'))
```

## 如何使用
从`concent`模块里可直接导出`run`接口使用
```js
import { run } from 'concent';
run();
```

或使用默认导出
```js
import cc from 'concent';
cc.run();
```

run接口支持传入两个可选参数`moduleConf`和`options`
```ts
declare function run(
  moduleConf?: { [moduleName:string]?: ModuleConf },
  options?: RunOptions,
):void;
```

`moduleConf`包含`state`、`reducer`、`computed`、`watch`、`lifecycle`五个选项，其中`state`是必需的，其他时可选配的

定义一个标准的counter模块
```js
import { run } from '';
run({
  counter: {
    state: {/** state definition */},
    reducer: {/** reducer definition */},
    computed: {/** computed definition */},
    watch: {/** watch definition */},
    lifecycle: {/** lifecycle definition */},
  }
})
```

如同在[核心概念/模块](/guide/concept-module)里提到的，在大型的工程里，推荐将模块按职责更细粒度的拆分为一个个独立的文件，更有利于项目理解和维护
```
|_models
  |_counter
  | |_state.js
  | |_reducer.js
  | |_computed.js
  | |_watch.js
  | |_lifecycle.js
  | |_index.js
  |
  |_index.js // 导出所有 models
```

models/counter/index.js导出counter模块定义
```js
import state from "./state";
import * as reducer from "./reducer";
import * as computed from "./computed";
import * as watch from "./watch";
import * as lifecycle from "./lifecycle";

export default { state, reducer, computed, watch, lifecycle };
```

models/index.js导出所有模块
```js
import { default as counter } from './counter';
```

runConcent.js里仅需要载入导出模块即可
```js
import { run } from 'concent';
import * as models from 'models';

run(models);
```

### 定义模块state
为`counter`模块定义state
```js
run({
  counter: { state: { num:1, numBig:100 } }
})
```
此处也可写为函数式写法
```js
run({
  counter: { state: ()=>({ num:1, numBig:100 }) }
})
```
::: tip | 模块克隆
当我们需要使用到模块克隆功能时，被克隆的源模块状态定义必需是函数式写法
:::

在models/counter/state.js定义后导出
```js
export default ()=>({ num:1, numBig:100 });
```

### 定义模块reducer
`reducer`项是可选配的，因为`setState`可直接修改模块状态
```js
function CounterDemo(){
  const { state, setState } = useConcent('counter');
  const addNum = ()=> setState({num: state.num + 1});
}
```

但是当我们的业务逻辑复杂时，更推荐将这种修改逻辑提升到模块reducer，以达到视图和业务逻辑解耦的目的
```js
run({
  counter: { 
    reducer: {
      addNum(payload, moduleState){
        return {num: moduleState.num + 1}
      },
    }  
  }
})
```

定义一个异步的reducer函数
```js
run({
  counter: { 
    reducer: {
      async asyncAddNum(payload, moduleState){
        await delay(1000);
        return {num: moduleState.num + 1}
      },
    }  
  }
})
```

视图里通过`mr`或`moduleReducer`触发reducer调用
```js
function CounterDemo(){
  const { state, mr } = useConcent('counter');
  return <button onClick={mr.addNum}>{state.num}</button>;
}
```

视图里通过`dispatch`触发reducer调用
```js
function CounterDemo(){
  const { state, dispatch } = useConcent('counter');
  return <button onClick={()=>dispatch('addNum')}>{state.num}</button>;
}
```

::: tip | 推荐使用mr触发调用
除非是动态化参数触发ruducer调用，否则都应当优先考虑使用mr触发调用reducer，从而避免字符串参数无法获得良好的类型推导的劣势
:::

**在models/counter/reducer.js**里定义后再导出，并使用**组合reducer**的形式
```js
export async function asyncAddNum(payload, moduleState){
  await delay(1000);
  return {num: moduleState.num + 1}
}

export async function asyncAddNumBig(payload, moduleState){
  await delay(1000);
  return {num: moduleState.numBig + 100}
}

export async function addNumAngNumBig(payload, moduleState, actionCtx){
  await actionCtx.dispatch(asyncAddNum);
  await actionCtx.dispatch(asyncAddNumBig);
}
```

视图里调用组合的reducer
```js
function CounterDemo(){
  const { state, mr } = useConcent('counter');
  return <button onClick={mr.addNumAngNumBig}>{state.num}</button>;
}
```

[了解更多关于模块reducer](/guide/concept-module-reducer)

### 定义模块computed
模块计算函数用于管理衍生数据，当我们需要对一些状态做2次计算并将其结果缓存，在其相应的输入状态不发生改变时，视图可始终消费已缓存数据，则推荐定义此选项

```js
run({
  counter: { 
    computed: {
      numx2({num}){
        return num * 2;
      },
    }  
  }
})
```

::: tip | 计算函数依赖收集
模块computed会在模块载入时，全部执行一遍，首次执行时，从参数里解构的`num`就是`numx2`这个计算结果的输入依赖，即仅当`num`发生改变时，才会触发此计算函数执行
:::

复用计算结果
```js
run({
  counter: { 
    computed: {
      numx2: ({num})=> num * 2,
      numBigPlusNumx2: ({numBig}, o, fnCtx)=> numBig + fnCtx.cuVal.numx2,
    }  
  }
})
```

::: tip | 复用计算结果的依赖收集
因为`numx2`这个结果的依赖是`num`，而`numBigPlusNumx2`又使用了`numx2`的结果作为输入参与计算，所以`numBigPlusNumx2`最终的依赖是`numBig`和`num`
:::

**在models/counter/computed.js**里定义后再导出
```js
export function numx2({num}){
  return num * 2;
}

export function numBigPlusNumx2({numBig}, o, fnCtx){
  return numBig + fnCtx.cuVal.numx2;
}
```

[了解更多关于模块computed](/guide/concept-module-computed)

### 定义模块watch
当监听到某些stateKey发生变化，需要做一些异步的任务处理时，可定义模块watch

watchKey和stateKey同名时，默认就是对这个stateKey做watch监听
```js
run({
  counter: { 
    watch: {
      num: (n, o)=> console.log(`change from ${o.num} to ${n.num}`);
    }  
  }
})
```

不同名时，需要定义depKeys参数，来表示需要关心这些stateKey的变化
```js
import { run, defWatch } from 'concent';

run({
  counter: { 
    watch: {
      numChange: defWatch((n, o)=>{
        console.log(`change from ${o.num} to ${n.num}`);
      }, ['num']);// or { depKeys:['num'] }
    }  
  }
})
```

::: tip | 为何需要人工定义依赖
因为默认情况下，模块watch在模块载入时，所有watch函数是不会被执行的
:::

像模块computed那样，当解构参数是能够确定依赖，传递immediate为true即可

```js
run({
  counter: { 
    watch: {
      numChange: defWatch((n, o, f)=>{
        const newNum = n.num, oldNum = o.num;// 这里触发依赖收集
        if(f.isFirstCall) return;// 如需首次不执行，使用isFirstCall标记即可
        console.log(`change from ${o.num} to ${n.num}`);
      }, { immediate:true });
    }  
  }
})
```

**在models/counter/watch.js**里定义后再导出
```js
import { defWatch } from 'concent';

export function num(n, o){
   console.log(`change from ${o.num} to ${n.num}`);
}

export const numChange = defWatch((n, o, f)=>{
  const newNum = n.num, oldNum = o.num;// 这里触发依赖收集
  if(f.isFirstCall) return;// 如需首次不执行，使用isFirstCall标记即可
  console.log(`change from ${o.num} to ${n.num}`);
}, { immediate:true })
```


[了解更多关于模块watch](/guide/concept-module-watch)

### 定义模块lifecycle
lifecycle里的方法帮助用户做一些和模块相关的、和实例相关的状态异步初始化工作

#### initState
定义initState，用于模块状态的状态异步初始化工作
```js
run({
  counter: { 
    lifecycle: {
      initState: async()=>{
        await delay();
        return { num:2, numBig: 200 };
      }
    }  
  }
})
```

#### initStateDone
定义initStateDone，异步初始化完毕后，需要执行的进一步操作，通常搭配reducer一起工作
```js
run({
  counter: { 
    lifecycle: {
      initStateDone: async(dispatch)=>{
        dispatch('someReducerMethod');
      }
    }  
  }
})
```

#### loaded
模块载入完毕时需要触发的动作，通常用于替代`initState`，可将`initState`逻辑迁移到`reducer`里，然后通过`loaded`来触发
```js
run({
  counter: { 
    lifecycle: {
      loaded: async(dispatch)=>{
        dispatch('initState');
      }
    }  
  }
})
```

#### mounted
当前模块的第一个实例挂载完毕时触发，且仅触发一次，即当该模块的所有实例都销毁后，再次有一个实例挂载完毕，也不会触发了
```js
run({
  counter: { 
    lifecycle: {
      mounted: async(dispatch)=>{
        dispatch('initState');
      }
    }  
  }
})
```

如需反复触发，即只要满足模块的实例数从0到1时就触发，返回false即可
```js
run({
  counter: { 
    lifecycle: {
      mounted: async(dispatch)=>{
        dispatch('initState');
        return false;
      }
    }  
  }
})
```

在**models/counter/lifecyle.js**里，从**在models/counter/reducer.js**里导出函数直接调用
```js
import * as rd from '../reducer';

export function mounted(dispatch){
  dispatch(rd.initState);
  return false;
}
```

#### willUnmount
当前模块的最后一个实例将销毁时触发，且仅触发一次，即当该模块再次生成了很多实例，然后又全部销毁，也不会触发了
```js
run({
  counter: { 
    lifecycle: {
      willUnmount: async(dispatch)=>{
        dispatch('clearModuleState');
      }
    }  
  }
})
```

如需反复触发，即只要满足模块的实例数从有变为0时就触发，返回false即可
```js
run({
  counter: { 
    lifecycle: {
      willUnmount: async(dispatch)=>{
        dispatch('clearModuleState');
        return false;
      }
    }  
  }
})
```

在**models/counter/lifecyle.js**里，从**在models/counter/reducer.js**里导出函数直接调用
```js
import * as rd from '../reducer';

export function willUnmount(dispatch){
  dispatch(rd.clearModuleState);
  return false;
}
```

## 函数签名定义
```ts
run(
  //模块配置
  moduleConf: {
    [module:string]?:{
      state: object | ()=> object,
      reducer?:{
        [fnName:string]: PartialStateFn,
      },
      computed?:{
        [retKey:string]: ComputedFn | ComputedFnDesc,
      },
      watch?:{
        [retKey:string]: WatchFn | WatchFnDesc,
      },
      lifecycle?:{
        initState?: ()=>object,
        initStateDone?: (dispatch:IDispatch, moduleState:object)=>object,
        loaded: (dispatch:IDispatch, moduleState:object)=>object,
        mounted: (dispatch:IDispatch, moduleState:object)=>object,
        willUnmount: (dispatch:IDispatch, moduleState:object)=>object,
      }
    }
  },
  //其他额外配置
  options?: {
    middlewares: Mid[],
    plugins: Plugin[],
  }
);
```

## 简单的完整示例
定义模块`foo`
```javascript
// code in runConcent.js
import {run} from 'concent';

run(
  {
    foo:{
      state:{
        f1:1,
        f2:2,
      },
      reducer:{
        //reducer返回一个新的片断状态用于触发改模块的cc实例渲染
        updateF1({payload:f1}){
          return {f1};
        },
        //reducer不强制返回一个新的片断状态，可以通过dispatch调用组合其他reducer函数来完成具体的业务逻辑
        uploadF1:async ({dispatch, payload:f1})=>{
          await api.uploadF1(f1);
          await dispatch('updateF1', f1);
        }
      },
      watch:{
        f1(newState, oldState){
          //做一些其他的异步操作
        }
      },
      computed:{
        f1(newState, oldState){
          //对f1值做计算，当f1发生变化时，触发此函数，计算的值会缓存起来，在cc实例里通过this.$$moduleComputed取到
          return newState.f1*100;
        }
      },
      init: async()=>{
        const f1 = await api.getDataFromBackEnd();
        return {f1}
      }
    }
  }
);
```
