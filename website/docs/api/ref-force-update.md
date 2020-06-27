# forceUpdate
强制触发当前实例重新渲染，当然了，关注当前实例所属模块状态变化的其他实例也会被触发重新渲染。

::: warning-zh | reactForceUpdate
可以调用`ctx.reactForceUpdate`强制触发重渲染，不建议这么做，除非你明确的知道你做的什么以及明白其后果（真的只会触发当前实例渲染了）
:::

## 函数签名定义
```ts
function forceUpdate(
  callback?: (currentState: object) =>void, 
  renderKey?:string,
  delay?:number, 
): void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
callback | 回调函数，区别于原始的forceUpdate，参数列表里会透传实例的当前状态 | undefined | Function
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如何使用
具体使用方法和`setState`相同，[点击了解setState](/api/ref-set-state)
```js
@register({module:'foo', connect:['bar', 'baz']}, 'Foo');
class Foo extends Component{
  reRenderCurrentUI = (e)=>{
    this.forceUpdate();//等同于调用this.ctx.forceUpdate

    this.forceUpdate(state=>{
      console.log(state);
    });
  }
}
```