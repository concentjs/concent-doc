# lazyDispatch
启用lazy模式调用reducer函数，函数签名、使用方法与[dispatch](/api/ref-dispatch)完全一致，唯一的不同就是`lazyDispatch`将[reducer函数调用链](/guide/concept-module-reducer#reducer%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E9%93%BE)上的所有返回状态做缓存，直到调用链结束才一次性提交。

## 如何使用
通过实例上下文调用
- HOC Class
```js
@register('foo')
class Foo extends ReactComponent {
  render(){
    return <button onClick={()=> this.ctx.lazyDispatch('complexUpdate')}>复杂的更新</button>;
  }
}
```
- RenderProps
```js
const Foo = registerDumb('foo')(ctx=>{
  return <button onClick={()=> ctx.lazyDispatch('complexUpdate')}>复杂的更新</button>;
})
```
- HookFunction
```js
const Foo = function(){
  const ctx = useConcent('foo');
  return <button onClick={()=> ctx.lazyDispatch('complexUpdate')}>复杂的更新</button>;
}
```
- HookCompositionApi
```js
const Foo = registerHookComp({
  module:'foo',
  render(ctx){
    return <button onClick={()=> ctx.lazyDispatch('complexUpdate')}>复杂的更新</button>;
  }
});
```
[HookCompositionApi在线示例](https://stackblitz.com/edit/concent-register-hook-comp)