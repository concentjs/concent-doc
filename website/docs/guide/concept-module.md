# 模块

![cc-module](/concent-doc/img/cc-module.png)
在concent里，提供一个全局唯一的`store`，而`store`是由多个模块一起组成的，**模块**是一个非常重要的概念，每个模块又分别由`state`、`reducer`、`computed`、`watch`、`init`组成。

## run，载入配置
定义好各个模块后，传递给`run`接口第一位参数作为启动concent的store配置项，concent启动后会维护这一个全局唯一的`ConcentContext`对象，里面负责存储各种配置信息，以及暴露底层api接口。   
> 必需先启动concent，才能开始渲染你的react应用根节点，除了`run`的调用时机的限制，concent并不需要在你的根app外面包一层`Provider`来提供store上下文等其他信息，所有的concent组件实例化后都会创建一个`RefContext`实例上下文对象，所有的实例接口都由`RefContext`提供。   

一个典型的concent应用启动流程如下图所示

![cc-run-module](/concent-doc/img/cc-run-module.png)

伪代码如下
```js
import React, { Component } form 'react';
import { run, useConcent, register } from 'concent';
import reduxDevToolPlugin from 'concent-plugin-redux-devtool';
import loadingPlugin from 'concent-plugin-loading';

const storeConfig = {
  foo:{//foo模块定义
    state:{},//必填
    reducer:{...},//可选
    computed:{...},//可选
    watch:{...},//可选
    init:async ()=>{...},//可选
  },
  bar:{...},
  otherModule:{...},
}

//options，可选参数，用于定义其他配置，如中间件、插件等
const options = {
  middlewares:[
    (stateInfo, next)=>{
      console.log(stateInfo);
      next();
    }
  ],
  plugins:[
    loadingPlugin,
    reduxDevToolPlugin,
  ]
};

run(storeConfig, options);

class Foo extends Component{
  render(){
    const ctx = this.ctx;//实例上下文
    // return ui
  }
}
const CcFoo = register('foo')(Foo);

function Bar(){
  const ctx = useConcent('foo');//实例上下文
  // return ui
}

function App(){
  return (
    <div>
      <CcFoo>
      <Bar>
    </div>
  );
}

```

## configure，分离式配置模块
`run`接口提供了中心化的配置模块统一入口，可以一次性配置多个模块，通常来说`business model`与业务精密相关，它们的数据会被多个组件共同消费，所以这种中心化式的配置方式适合于集中管理这些业务model，但是`page model`、`component model`等model通常是和组件紧密结合在一起的，遵循就近配置的原则方便查看和修改代码，同时也利于按功能和边界组织代码文件结构，所以concent也支持调用`configure`接口来分离式的配置单个模块定义。
> 调用`run`之后，才能调用`configure`接口，所以哪怕你没有任何需要中心化配置的模块，你也需要0参数调用`run`来启动concent。

一个典型的独立配置model的组件文件夹结构
```
src
├─ ...
└─ page
│  ├─ login
│  │  ├─ model.js
│  │  └─ Login.js
│  └─product
│  
└─ component
   └─ ConfirmDialog
      ├─ model.js
      └─ index.js
```
推荐进一步将model.js写为文件夹，在内部定义`state`、`reducer`、`computed`、`watch`、`init`,在导出合成在一起组成一个完整的model定义，这样不仅显得各自的职责分明，防止代码膨胀看变成一个巨大的`model`对象，同时`reducer`独立定义后，内部函数相互`dispatch`调用时可以直接基于引用而非字符串了。
```js{4}
src
├─ ...
└─ page
│  ├─ login
│  │  ├─ model /写为文件夹
│  │  │  ├─ state.js
│  │  │  ├─ reducer.js
│  │  │  ├─ computed.js
│  │  │  ├─ watch.js
│  │  │  ├─ init.js
│  │  │  └─ index.js
│  │  └─ Login.js
│  └─ product ...
│  
└─ component
   └─ ConfirmDialog
      ├─ model
      └─ index.js
```
现在我们可以在 `js>>> page/login/model/index.js`里合成模块并并暴露配置接口.
```js
//code in page/login/model/index.js
import { configure } from 'concent';
import state from './state.js'; 
import * as reducer from './reducer.js'; 
import * as computed from './computed.js'; 
import * as watch from './watch.js'; 
import init from './init.js'; 

export const loginModule = {state, reducer, computed, watch, init};

export const configureLoginModule = ()=>{
  //配置模块，命名为login
  configure('login', loginModule);
}

```
然后在 `js>>> page/Login.js`里导入模块调用`configureLoginModule`以便触发`configure`调用。
```js
//code in page/login/Login.js
import React, { Component } from 'react';
import { register } from 'concent';
import { configureLoginModule } from './model';

configureLoginModule();//触发configure调用

//注册该组件属于login模块
register('login')
export default class Login extends Component{

}
```

## 模块克隆
如果想创建一个新模块，并复用某个已有模块的全部配置，可以使用`cloneModule`达到目的。
> `cloneModule`支持对已存在模块重写`state`、`reducer`、`watch`、`computed`的部分配置，以及替换`init`函数，可以根据你的需要来决定是否重写。

```js
import { cloneModule } from 'concent';
import { loginModule } from '/page/login/model';

//完全克隆
cloneModule('ghostLogin', loginModule);

//选择性的覆盖掉某些原配置的克隆
const state = { token:'newInitValue' };
const reducer = {
  login(){ ... }
};
const computed = {...};
const watch = {...};
const init = async ()=>{...};
cloneModule('anotherGhostLogin', loginModule, { state, reducer, computed, watch, init });

```

## 默认模块
任何不指定模块的组件，会默认属于concent的内置模块`$$default`，如果你不显式的定义它的配置的话，它是一个空模块。
> 在不配置`$$default`模块的情况下，达到了`实例state`和`模块state`相互独立的效果，实例的`this.setState`将不会触发模块数据变更。

## 全局模块
concent内置了一个全局模块`$$global`，如果你不显式的定义它的配置的话，它也是一个空模块。
> 当你重写它的配置并传递给`run`接口后，实例的`this.setGlobalState`方法和`this.globalState`属性将很方便的和`$$global`模块打通，当然你可以定义一个自己的global模块`myGlobal`，只不过需要自己显式的指定模块名去触发`myGlobal`模块的数据变更    
>使用dispatch: `js>>>this.ctx.dispatch('myGlobal/fooMethod')`    
>使用setModuleState: `js>>>this.ctx.setModuleState('myGlobal', {name:'1', age:2})`    