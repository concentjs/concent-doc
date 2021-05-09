# API custom

虽然 concent 为实例构造的`ctx`上注入了很多新特性 api，但是一开始你可以不需要全部了解，只需要学会以下几点就可以顺畅的使用 concent。

- 知道使用`run`中心化的配置模块，`configure`去中心化的配置模块
- 知道使用`register`、`registerDumb`、`useConcent`注册组件
- 知道使用`setState`、`dispatch`修改状态  
  在此基础上，根据使用场景需要了解其他 api 从而逐步全盘掌握 concent

## 实例 api

在**实例上下文**`ctx`里调用的 api，[点击查看更多关于实例上下文](/guide//concept-ref-ctx)

```js
@register("foo")
class Foo extends React.Component {
  $$setup(ctx) {
    // ctx即实例上下文
  }
  render() {
    const ctx = this.ctx; // ctx即实例上下文
  }
}

const setup = (ctx) => {
  // ctx即实例上下文
  ctx.effect(() => {
    // do some staff
  }, []);
};

function FooFn() {
  // ctx即实例上下文
  const ctx = useConcent({ module: "foo", setup });
}
```

## action 上下文 api

在**reducer 函数**的第三位参数`actionCtx`里调用的 api，通常我们需要在一个 reducer 函数里调用其他 reducer 函数形成调用链时需要用到`actionCtx`

```js
// code in models/foo/reducer.js
export async function doOtherStaff(age) {
  await api.updateAge(age);
  return { age }; // 更新模块state里的age字段
}

export function doSomeStaff(payload, moduleState, actionCtx) {
  //第3位参数actionCtx即是我们所指的action上下文
  actionCtx.setState({ loading: true });
  actionCtx.dispatch(doOtherStaff, payload.age);
  return { name: payload.name }; // 更新模块state里的name字段
}
```

## fn 上下文 api

在模块 computed、模块 watch、实例 computed、实例 watch 这些地方的回调函数的第三位参数即是函数上下文`fnCtx`，通常我们在函数体需要再次修改其他模块 computed 值或者模块 state 值的时候的时候需要用到`fnCtx`

- 模块 computed 里使用`fnCtx`

```js
// code in models/foo/computed.js
import { defComputed, defComputedVal } from "concent";

// 对模块computed结果容器里定义一个静态值，key为bookExceedLimit，value为false
// 它不依赖任何depKeys来触发改变，但可以通过fnCtx.commitCu来修改它
export const bookExceedLimit = defComputedVal(false);

export const validCount = defComputed(
  (newState, oldState, fnCtx) => {
    const validCount = newState.filter((v) => v.valid).length;

    if (validCount > 10) {
      fnCtx.commitCu({ bookExceedLimit: true }); //修改bookExceedLimit值
    }
    if (validCount > 20) {
      fnCtx.commit({ bookNoStock: true }); //修改模块state里bookNoStock的值
    }

    return validCount;
  },
  ["books"]
);
```

- 模块 watch 里使用`fnCtx`

```js
// code in models/foo/watch.js
import { defWatch, defWatchImmediate } from "concent";

export const booksChange = defWatchImmediate(
  (newState, oldState, fnCtx) => {
    // 此处使用fnCtx动态修改模块computed结果容器里的值
    // ...逻辑略
  },
  ["books"]
);
```

- 实例 computed 里使用`fnCtx`

```js
const setup = (ctx) => {
  ctx.computed("books", (newState, oldState, fnCtx) => {
    // 此处使用fnCtx动态修改模块computed结果容器里的值
  });
};
```

## 全局 api

从`concent`包里直接导出，可以在任何地方调用的 api

```js
import {
  run,
  register,
  configure,
  getState,
  //... etc
} from "concent";
```

> 除了代码里导出使用，concent 将 api 同时也挂载到了`window.cc`属性下，读者可以打开浏览器 console，输入`cc`回车，查看或使用 api，仅作为开发时的辅助功能，方便通过控制台快速验证和收集反馈。
