# 模块init
当你的某个字模块`state`是需要异步的被赋值的时候，可以对其定义`init`函数，返回的状态将被合并到`state`里，如果此时此模块下已经实例化了一些组件，init返回的状态也会被分发到各个实例上。

## 定义init函数
init函数可是普通函数、生成器函数、或者async函数。
### 在run接口里配置
```js
import { run } from 'concent';

run({
  foo:{
    state: {...},
    init: async ()=>{
      const rawState = await api.fetchState();
      //handle rawState
      const newState = handleFooState(rawState);
      return newState;
    }
  }
});
```
### 在configure接口里配置
用`configure`接口配置，适合为一些独立的`组件model`、`页面model`配置`init`函数
```js
import { configure } from 'concent';

configure('foo', {
  state: {...},
  init: async ()=>{
    const rawState = await api.fetchState();
    //handle rawState
    const newState = handleFooState(rawState);
    return newState;
  }
});

```
###  独立导出init
同`模块computed`一样，建议为模块单独定义一个init文件，导出来给模块用，代码结构按更细粒度的职责分类有利于阅读和维护。
```js
// code in model/foo/init.js
export default async ()=>{
    const rawState = await api.fetchState();
    //handle rawState
    const newState = handleFooState(rawState);
    return newState;
  }
}
```
::: warning | init返回了模块state里没有声明的stateKey
如果模块state定义是{a:1, b:3, c:3}, init返回的是{c:33, d:4}, d会被丢弃，同时控制台会输出警告，模块state最终会是{a:1, b:3, c:33}
:::

## init触发时机
每个模块的`init`函数只会被执行一次，将在`模块watch`配置完毕之后执行，返回的状态会被concent分发到对应的实例上。

![run-module](/concent-doc/img/cc-run-module.png)
> 当init函数内部有等待时间较长的异步调用时，相关组件实例挂载完毕读取的是最初定义的模块状态，直到init函数执行结束才会被再次刷新，拿到最新的状态。