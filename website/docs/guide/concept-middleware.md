# 中间件

中间件是一个普通的函数，配置在在启动时的`runOptions.middlewares`属性下

```js
import { run } from 'concent';
run({}, {
  middlewares: [
    (midCtx, next)=>{
      console.log('I am a middleware function');
      next();
    },
  ]
})
```

它们的执行时机是当用户发生任何状态变更行为时，计算出的最终状态值按序穿过所以中间件后，再提交到store并分发到具体的各个目标实例

> 中间将是按middlewares里函数的放置顺序执行的

::: warning | 不要忘记next调用
每一个中间件都必须调用next函数来驱动下一个中间件函数的执行，否则会造成ui更新无效
:::

## 参数解释
`midCtx`中间件上下文提供了一系列参数，方便开发者知道更多关于某次状态修改行为的细节

名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
calledBy | 状态通过什么方式修改 | | 'dispatch' 'setState' 'setModuleState' 'forceUpdate' 'invoke' 'sync'
 type | 当calledBy为'dispatch'时，调用的reducer方法名 | | String
 payload | 当calledBy为'dispatch'时，传递给reducer方法的载荷参数 | | any
 renderKey | 当calledBy为'dispatch'时，携带的渲染目标key | '' | String 
 fnName | 当calledBy为'invoke'时，调用的自定义函数名 | | String
 ccUniqueKey | 通过实例上下文发起状态修改调用时的实例唯一id | '' | String
 committedState | 提交的状态 | | Object
 sharedState | 共享给其他实例的状态 | | Object
 refModule | 通过实例上下文发起状态修改调用时的实例的所属模块 | | String
 module | 修改的状态所属模块 | | String
 modState | 改变提交状态的值 | | `(key:string, value:any)=>void`


## 强行修改提交状态
通过`midCtx.modState`接口可以强行修改提交状态，谨慎使用该接口，你需要明确知道该操作带来的危险后果，通常用于修改一些与业务无关的状态值

```js
const oneMiddleware = (midCtx, next)=>{
  midCtx.modState('updateTime', Date.now());
}
```