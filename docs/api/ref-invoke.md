# invoke
触发自定义的函数去修改模块的状态，使用方法和`dispatch`一样，唯一不同的是`dispatch`调用的是`reducer`里定义的函数，`invoke`调用的是自定义函数

## 函数签名定义
```ts
type PartialStateFn = (
  payload: any, moduleState: ModuleState, actionCtx: ActionCtx
) => Promise<object | undefined>

function invoke(
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
- 普通的调用
```js

function myUpdate(name, moduleState, actionCtx){
  return { name }
}

@register('foo')
class Foo extends ReactComponent {
  updateName = (e)=>{
    this.ctx.invoke(myUpdate, e.currentTarget.value);
  }
  render(){
    return <input value={this.state.name} onChange={this.updateName} />;
  }
}
```
- 形成调用链
```js

function updateAge(age, moduleState, actionCtx){
  return { age }
}

function updateName(name, moduleState, actionCtx){
  return { name }
}

async function updateNameAndAge({name, age}, moduleState, actionCtx ){
  await actionCtx.invoke(updateName, name);
  await actionCtx.invoke(updateAge, age);
}

@register('foo')
class Foo extends ReactComponent {
  updateNameAndAge = ()=>{
    this.ctx.invoke(updateNameAndAge, {name:'newName', age:'newAge'});
  }
}
```
- 和dispatch混搭调用
```js
function updateName(name, moduleState, actionCtx){
  return { name }
}

async function updateNameAndAge({name, age}, moduleState, actionCtx ){
  await actionCtx.invoke(updateName, name);
  // 表示调用实例上下文携带的所属模块的reducer下的updateAge函数
  await actionCtx.dispatch('updateAge', age);
}

```