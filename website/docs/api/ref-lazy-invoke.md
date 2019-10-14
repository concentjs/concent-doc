# lazyInvoke
使用lazy机制触发自定义的函数去修改模块的状态，使用方式和`invoke`一样。
> 类似于`lazyDispatch`和`dispatch`之间的关系，前者使用lazy机制去触发reducer函数，后者直接触发reducer函数。

## 函数签名定义
```ts
type PartialStateFn = (
  payload: any, moduleState: ModuleState, actionCtx: ActionCtx
) => Promise<object | undefined>

function lazyInvoke(
  customizedFn: PartialStateFn,
  payload?:any, 
  renderKey?:string
  delay?:number, 
): Promise<object | undefined>
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
customizedFn | 用户定义的函数，自定义函数和reducer函数并没有什么区别，唯一不同的前者没有定义在`reducer`里，后者定义在`reducer`里了 | | Function
payload | 透传的参数 | | any
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如何使用
通过实例上下文调用
```js

function updateName(name){
  return {name};
}

async function updateAge(age){
  await api.updateAge(age);
  return {age};
}

async function updateInfo(info){
  await api.updateInfo(info);
  return {info};
}

//整个myUpdate函数调用结束，才触发ui渲染
function myUpdate({name, age, info}, moduleState, actionCtx){
  await actionCtx.invoke(updateName, name);
  await actionCtx.invoke(updateAge, age);
  await actionCtx.invoke(updateInfo, info);
}

@register('foo')
class Foo extends ReactComponent {
  myUpdate = (toUpdate)=>{
    this.ctx.lazyInvoke(myUpdate, toUpdate);
  }
  render(){
    // ...
  }
}
```