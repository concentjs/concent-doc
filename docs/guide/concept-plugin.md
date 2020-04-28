# 插件

插件是一个普通的json对象，只要满足`{install: (on:CcPluginOn)=>{name:string}}`类型，即可配置在在启动时的`runOptions.plugins`属性下，每一个插件对象必需暴露一个`install`接口，该接口的回调参数里提供一个`on`句柄，用于监听`concent`运行时发射的各种信号并做处理，方便按需扩展一些非业务逻辑，提供给其他开发者使用

![](/img/cc-state-broadcast-process.png)


## 定义一个插件

```js
import { run, cst } from 'concent';

const myPlugin = {
  install: (on)=>{
    on(cst.SIG_FN_START, (data)=>{

    })

    on(cst.SIG_STATE_CHANGED, (data)=>{
      
    })

    return {name:'myPlugin'};
  },
}

run({}, {
  plugins: [
    myPlugin,
  ]
})
```

## 参数解释

### 运行时信号
当前版本concent一共暴露了6个信号，信号常量可以从`cst`里导出来方便开发者写插件时使用，以`SIG_***`开头

```js
import { cst } from 'concent';
const { 
  SIG_FN_START, SIG_FN_END, SIG_FN_QUIT,
  // etc
} = cst;
```

常量描述 | <div style="width:250px;">描述</div> | 值 | 类型
-|-|-|-
 SIG_FN_START | 修改状态的函数开始执行时 | 10 | number
 SIG_FN_END | 修改状态的函数执行结束时 | 11 | number
 SIG_FN_QUIT | 修改状态的函数中途退出时(该功能暂未实现) | 12 | number
 SIG_FN_ERR | 修改状态的函数执行出错时 | 13 | number
 SIG_MODULE_CONFIGURED | 有新模块配置时 | 14 | number
 SIG_STATE_CHANGED | 有修改状态的行为发生时 | 15 | number

### 监听函数
`install`接口的参数列表里提供了一了`on`接口，可以多次调用它监听不同信号来处理具体的业务逻辑

`on`接口类型描述
```ts
function ccPluginOn(
  sig: string | string[], 
  callback: (data: { sig: string, payload: any }) => void
: void;
```

- 当`sig`为 `SIG_FN_START`、`SIG_FN_END`、`SIG_FN_ERR`时，`data.payload`类型描述为

名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
 isSourceCall | 是否是源头调用（通常由实例上下文发起的调用） | | boolean 
 calledBy | 状态通过什么方式修改 | | 'dispatch' 'setState' 'setModuleState' 'forceUpdate' 'invoke' 'sync'
 module | 修改的目标模块 | | string
 chainId | 调用链id | | string 
 fn | 调用的业务函数 | | Function

- 当`sig`为 `SIG_MODULE_CONFIGURED`时，`data.payload`类型描述为`string`,表示配置的模块名


- 当`sig`为 `SIG_STATE_CHANGED`时，`data.payload`类型描述为

名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
 calledBy | 状态通过什么方式修改 | | 'dispatch' 'setState' 'setModuleState' 'forceUpdate' 'invoke' 'sync'
 type | 当calledBy为`dispatch`时，目标reducer函数的方法名 | | string 
 module | 修改的目标模块 | | string
 committedState | 提交的状态 | | object 
 sharedState | 共享的状态 | | object
 ccUniqueKey | 触发状态修改行为的实例（如果是由实例触发） | | string
 renderKey | 修改状态时指定的renderKey | | string