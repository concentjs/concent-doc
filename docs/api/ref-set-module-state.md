# setModuleState
修改指定模块的状态。

## 函数签名定义
```ts
function setModuleState(
  module: string,
  partialState: object, 
  callback?: (newFullState: object) =>void, 
  renderKey?:string
  delay?:number, 
): void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
module | 模块名称 | | String
partialState | 提交的新部分状态 | | Object
callback | 新部分状态合并后触发的回调函数 | undefined | Function
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如何使用
除了多增加一个模块参数，具体使用方法和`setState`相同，[点击了解setState](/api/ref-set-state)
```js
@register({module:'foo', connect:{bar:'*', baz:'*'}}, 'Foo');
class Foo extends Component{
  reRenderCurrentUI = (e)=>{
    this.setModuleState('bar', {name:'newName'});

    this.setModuleState('bar', {name:'newName'}, (newState)=>{
      console.log(newState);
    });

    this.setModuleState('otherModule', {name:'newName'});

  }
}
```
::: tip | 模块参数范围
模块参数范围是所有有效的模块名，不局限与自己的所属模块，和自己的连接模块。
:::