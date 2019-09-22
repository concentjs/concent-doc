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
      firstName(firstNameNew, firstNameOld)=> { 
        console.log(`firstName changed from ${firstNameOld} to ${firstNameNew}`);
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
        immediate: true,//配置状态时，就触发此fn
      }
    }
  }
});
```

同`模块computed`一样，建议为模块单独定义一个watch文件，导出来给模块用，代码结构按更细粒度的职责分类有利于阅读和维护。
```js
// code in model/foo/watch.js
export function firstName(firstNameNew, firstNameOld)=> { 
  console.log(`firstName changed from ${firstNameOld} to ${firstNameNew}`);
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
  immediate: true,//配置状态时，就触发此fn
}
```

::: error-zh | 改写默认的depKeys
和模块computed一样，当retKey和stateKey同名时，不可以在显示的设定depKeys时重写默认的depKeys
:::
错误定义
```js{4}
// 'firstName'隐含对应的默认depKeys是['firstName']，不可将其改写为['lastName']
export const firstName = {
  fn:(firstName)=> console.log('changed'),
  depKeys: ['lastName'], // wrong !!!
}
```

## watch触发时机
`watch`定义当各个`stateKey`的值发生变化时，要触发的回调。
- 模块状态配置完成时，watch默认是不会被触发的（这一点区别于`模块computed`）,除非人工设置`immediate`为true
- 当`stateKey`的值为非`primitive`类型时，如果没有使用解构语法总是返回一个新的对象，`watch`回调也不会被触发，触非人工设置`compare`为false，表示只要对某个`stateKey`设了值就触发回调
- `模块watch`触发流程是在`模块computed`之后

![run-module](/concent-doc/img/cc-run-module.png)

## 修改默认配置
当用户不显示的定义`immediate`和`compare`时，`immediate`默认值是`false`，`compare`默认值是`true`，用户可以在启动concent时，设置新的默认值。
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