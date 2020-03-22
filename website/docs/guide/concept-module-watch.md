# 模块watch
`watch`定义当各个`stateKey`的值发生变化时，要触发的回调。
```ts
type WatchFn = (
  oldVal:any,
  newVal:any, 
  fnCtx:FnCtx,
)=> void;

type WatchFnDesc = {
  fn: WatchFn,
  compare?: boolean,
  immediate?: boolean,
  depKeys?: string[],
}

type WatchValueDef = WatchFn | WatchFnDesc;
```
读者可fork此[在线示例](https://stackblitz.com/edit/hook-setup?file=CounterSetupComputedWatch.js)做修改来加深理解。

## 定义watch
我们可以在子模块配置`watch`属性的对象里定义回调，key就是`retKey`，value就是`watch函数`或`watch描述体`。
```js
import { run } from 'concent';

run({
  foo:{
    state: {...},
    watch:{
      firstName(n, o)=> { 
        console.log(`firstName changed from ${n.firstName} to ${o.firstName}`);
      },
      fullName:{
        fn:(newState)=> {
          console.log(`any value of firstName or lastName changed will trigger this`);
        },
        depKeys: ['firstName', 'lastName'],
      },
      lastName:{
        fn:(newState)=> {
          console.log(`fn will been triggered when value of lastName changed`);
        },
        immediate: true,// 载入模块配置时，就触发此watch函数
      }
    }
  }
});
```

同`模块computed`一样，建议为模块单独定义一个watch文件，导出来给模块用，代码结构按更细粒度的职责分类有利于阅读和维护。
```js
// code in models/foo/watch.js
export function firstName(n, o)=> { 
  console.log(`firstName changed from ${n.firstName} to ${o.firstName}`);
}

export const fullName = {
  fn:(newState)=> {
    console.log(`any value of firstName or lastName changed will trigger this`);
  },
  depKeys: ['firstName', 'lastName'],
}

export const lastName = {
  fn:(newState)=> {
    console.log(`fn will been triggered when value of lastName changed`);
  },
  immediate: true,// 载入模块配置时，就触发此watch函数
}
```

## watch触发时机
`watch`定义当各个`stateKey`的值发生变化时，要触发的回调。
- 模块状态配置完成时，watch默认是不会被触发的（这一点区别于`模块computed`）,除非人工设置`immediate`为true
- 当`stateKey`的值为非`primitive`类型时，如果没有使用解构语法总是返回一个新的对象，`watch`回调也不会被触发，触非人工设置`compare`为false，表示只要对某个`stateKey`设了值就触发回调
- `模块watch`触发流程是在`模块computed`之后

![run-module](/concent-doc/img/cc-run-module.png)

## 依赖收集
模块观察函数的依赖收集收集依然是载入模块配置时，在执行完所有的计算函数之后，去执行`immediate`为true的所有观察函数，**但是watch函数默认的immediate值是false**，这是因为watch函数的本质是观察某个写状态发送改变时执行一些异步任务，初次配置模块状态时，不算作是有状态发生改变，所以为了正确的收集到依赖，用户需要显示的配置`immediate`为true，因函数上下文`fnCtx`会携带一个标记告诉用户此次执行是不是首次执行，可以利用此标记跳出具体的业务逻辑执行函数

```js
export const flChanged = {
  fn: (n, o, f)=>{
    // 收集到此watch函数的依赖列表 ['firstName', 'lastName']
    const { firstName, lastName } = n;

    // 首次执行，跳出函数
    if(f.isFirstCall) return;

    // do some staff with firstName lastName
  },
  // 设置为true，让载入模块配置时，有机会执行此函数
  immediate: true,
}
```

也可以基于`defImmediateWatch`来封装此函数

```js
import { defImmediateWatch } from 'defImmediateWatch';

export const flChanged = defImmediateWatch((n, o, f)=>{
  const { firstName, lastName } = n;
  if(f.isFirstCall) return;
  // do some staff with firstName lastName
});
```

## 依赖标记   
watch函数也支持依赖标记，这样就不需要设置`immediate`为true来触发依赖收集行为了

```js
export const flChanged = {
  fn: (n, o, f)=>{
    const { firstName, lastName } = n;
    // do some staff with firstName lastName
  },
  depKeys: ['firstName', 'lastName'],
}
```

等同于调用`defWatch`达到同样的效果
```js
import { defWatch } from 'defImmediateWatch';

export const flChanged = defWatch((n, o, f)=>{
  const { firstName, lastName } = n;
  if(f.isFirstCall) return;
  // do some staff with firstName lastName
}, ['firstName', 'lastName']);
```

## 修改默认配置
当用户不显示的定义观察函数的`immediate`值和`compare`值时，`immediate`默认值是`false`，`compare`默认值是`true`，用户可以在启动concent时，设置新的默认值。

```js
import { run } from 'concent';

run(
  //store配置
  {
    foo:{},
    bar:{},
  },
  //可选配置
  {
    watchCompare: false,//修改模块watch的compare默认值
    watchImmediate: true,//修改模块watch的immediate默认值
  }
);
```

> 因为此配置是全局的，对所有模块都生效，所有修改默认值前，要明确的知道修改带来的结果是不是自己想要的效果，从而避免一些额外的bug。