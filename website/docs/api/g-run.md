# run

`run`函数负责载入用户定义的模块配置并启动`concent`,所有其他顶层函数的调用都必须在调用`run`之后才能调用，建议将启动函数封装成一个脚本`run-cc.js`,在你的app入口处调用`import './run-cc'`
> 启动一定要在入口文件头部引用其他cc组件前先执行，所以通常为了保险起见，可以放入口函数的第一行触发执行

## 函数签名定义
```ts
run(
  //模块配置
  moduleConf: {
    [module:string]:{
      state:object,
      reducer?:{
        [fnName:string]: PartialStateFn,
      },
      watch?:{
        [stateKey:string]: WatchFn | WatchFnDesc,
      },
      computed?:{
        [stateKey:string]: ComputedFn | ComputedFnDesc,
      },
      init?:()=>any
    }
  },
  //其他额外配置
  option: {

  }
);
```

## 如何使用
定义两个模块,`foo`、`bar`
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
        f1(newVal, oldVal){
          //做一些其他的异步操作
        }
      },
      computed:{
        f1(newVal, oldVal){
          //对f1值做计算，当f1发生变化时，触发此函数，计算的值会缓存起来，在cc实例里通过this.$$moduleComputed取到
          return newVal*100;
        }
      },
      init:async(){
        const f1 = await api.getDataFromBackEnd();
        return {f1}
      }
    }
  }
);

```

## 最佳实践
### 定义各个子模块
如同在[核心概念/模块](/guide/concept-module)里提到的，在大型的工程里，我们将模块拆分为一个个独立的文件，按职责更细粒度的拆分文件更有利于项目理解和维护
```
|_models
  |_global
  | |_state.js
  | |_computed.js
  | |_watch.js
  | |_reducer.js
  | |_init.js
  | |_index.js
  |
  |_foo
    |_state.js
    |_reducer.js
    |_index.js
```
然后再把各个文件导出为一个个模块model在交给run函数，run函数封装在一个名为`run-cc.js`的脚本
- state文件
```js
//code in models/global/state.js
export getInitialState = ()=>{
  return {
    theme:'red'
  }
}

export default getInitialState();
```
> 通常都建议在state里放一个getInitialState函数暴露出去，方便做状态清理之用

- reducer文件
```js
//code in models/global/reducer.js
export function setTheme(theme){
  return {theme}
}

export async function uploadTheme(theme){
  await api.uploadTheme(theme);
  return {theme}
}
```

- computed文件
>这里面定义的是模块级别的computed函数，如果需要定义类级别的watch，可以在class里重写`$$computed`

```js
//code in models/global/computed.js
export function theme(newVal, oldVal){
  //做一些其他的异步操作
}

//对象式定义computed函数
export const myTheme = {
  fn: (newState, oldState)=>{
    return `border: ${newState.borderWidth} solid ${newState.theme}`;
  },
  depKeys:['theme', 'borderWidth']
}
```
[了解更多模块computed](/guide/concept-module-computed)

- watch文件
>这里面定义的是模块级别的watch函数，如果需要定义类级别的watch，可以在class里重写`$$watch`

```js
//code in models/global/watch.js
export function theme(newVal, oldVal){
  //做一些其他的异步操作
}
```
[了解更多模块watch](/guide/concept-module-watch)

- init文件
```js
//code in models/global/init.js
export default async function(){
  const data = await api.getData();
  return data;
}
```

app顶部引入改脚本
```js
import './runConcent';

render(<App />)
```