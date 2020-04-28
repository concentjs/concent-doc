# configure
配置指定的模块，区别于`run`接口集中式的一次性配置所有的模块定义，`configure`可以独立的为某个模块配置相关参数，且能够被调用多次。
```js
import { run, configure } from 'concent';
import { book, product, login, pay } from './models';

run({
  book,
  product,
  login,
  pay,
})

// ***************** 等同于写为 ****************

run();

configure('book', book);
configure('product', product);
configure('login', login);
configure('pay', pay);
```
::: warning-zh | configure调用时机
configure接口必须是在concent启动之后才能调用，否则concent会抛出运行时错误
:::

## 函数签名定义
```ts
function configure(
  module: string,
  moduleConfig: {
    state: object,
    reducer?: {
      [fnName: string]: PartialStateFn,
    },
    computed?: {
      [retKey: string]: ComputedFnDesc,
    },
    watch?: {
      [retKey: string]: WatchFnDesc,
    },
    init?: ()=> object,
  }
):void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
module | 模块名称 | | String
moduleConfig | 模块相关的配置 |  | ModuleConfig
moduleConfig.state | 模块状态 | 无，必需传入 | Object
moduleConfig.reducer | reducer函数集合 | undefined | ReducerDef
moduleConfig.computed | computed函数集合 | undefined | ComputedDef
moduleConfig.watch | watch函数集合 | undefined | WatchDef
moduleConfig.init | 模块状态的异步初始化函数 | undefined| Function

## 如何使用
在concent启动后，即可在任意地方调用configure配置模块定义
```js
import { configure } from 'concent';

configure('foo', {
  state: { name: 'name' },
  reducer: {
    changeName(name){
      return {name};
    }
  },
  // etc
});
```
更好的做法是，将模块定义相关参数独立放置在各个文件中，然后统一导出，交给configure接口配置
```
|_pages
  |_Home
  | |_model // 页面model
  | | |_state.js
  | | |_computed.js
  | | |_watch.js
  | | |_reducer.js
  | | |_init.js
  | | |_index.js // 此处书写configure调用
  | |_index.js // 这里导入model，触发configure调用
  | |_Header.js
  | |_Content.js
  | |_Footer.js
  |
  |_UserDetail
    |_ ...
```
index.js里导入model各种定义项，调用`configure`配置模块
```js
// ------------- code in pages/Home/model/index.js ------------
import state from './state';
import * as reducer from './reducer';
import * as computed from './computed';
import * as watch from './watch';
import init from './init';
import { configure } from 'concent';

// 配置home模块定义
configure('home', {
  state,
  reducer,
  computed,
  watch,
  init,
});

// ------------- code in pages/Home/index.js ------------
import './model';//导入模块，触发configure调用
```

## 何时使用
定义一些`页面model`、`组件model`，而非跨多个组件消费的`业务model`时，它们因为是组件独享的模块，代码放置的位置跟着组件一起走，方便就近查看和修改，此时可以使用`configure`接口配置模块定义，无需在`run`接口集中式的配置。
> 使用了`configure`接口的组件，可以独立发布到npm，意味着别人的concent应用引用了你的组件，既可以自动载入你的组件模块定义。