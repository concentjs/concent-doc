# setup
在组件初次渲染之前做一次设置操作，返回的结果将收集在`ctx.settings`里

## 函数签名定义
```ts
function setup(
  ctx: RefCtx
): object | undefined
```
`ctx`即是concent为每一个实例构造的上下文对象。

## 如何使用
类组件和函数组件皆可以使用`setup`，它们获得的`ctx`对象是完全一样的，故两种组件写法不存在差异。
- 类组件使用setup
```js
@register({module:'foo', connect:{bar:'*'}})
class Foo extends ReactComponent {
  $$setup(ctx){
    // ctx 和 this.ctx指向的是同一个对象引用
    ctx.computed('name', (name)=>{return `_${name}_`});
    ctx.computed('fullName', (newState)=>{
      return `${newState.name}_${newState.lastName}`
    }, ['name', 'lastName']);

    ctx.watch('name', (name)=>{console.log('name changed')});
    ctx.watch('fullName', (newState)=>{
      console.log('name or lastName changed')
    }, ['name', 'lastName']);

    ctx.effect(()=>{
      console.log('will been triggered while name changed after render')
    }, ['name']);
    ctx.effect(()=>{
      console.log('will only been triggered after first render')
    }, []);
    ctx.effect(()=>{
      console.log('will been triggered after every render')
    });
  }
  render(){
    const { name, fullName } = this.ctx.refComputed;
    // ...
  }
}
```
- function组件使用setup 

> 相比传统的function组件写法，利用setup在首次渲染前只执行一次和返回结果收集到`ctx.settings`里的特性，使用setup将能够对组件的各种处理函数实现静态定义。

```js
const setup = ctx=>{
  // define computed watch effect on by calling
  // ctx.computed ctx.watch ctx.effect ctx.on

  // returning result will been collect to ctx.settings
  return {
    updateName: e=> ctx.setState({name: e.currentTarget}),
    updateAge: e=> ctx.dispatch('updateAge', e.currentTarget)
  }
}

function Foo(){
  const ctx = useConcent({module:'foo', setup});
  const { name, fullName } = ctx.refComputed;
  const { updateName, updateAge } = ctx.settings;
  // ... 将updateName updateAge直接传递给ui的相关回调
}
```
查看[实例setup](/guide/concept-ref-setup)了解更多关于`setup`