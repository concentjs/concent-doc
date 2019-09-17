# 模块reducer

## 定义reducer函数
`reducer`对象里是一个个`reducer函数`的集合，key就是函数名称，value就是`reducer函数`， 负责生成并返回新的**部分状态**，也可以不做任何返回动作，仅仅只是组合调用其他的`reducer函数`。

类型定义：
```typescript
type reducer = (
  payload: any, moduleState: ModuleState, actionCtx: ActionCtx
) => Promise<any>
```
> - `reducer函数`可以是纯函数，可以是`async`函数，也可以是生成器函数    
> - 可以返回一个**部分状态**，可以调用其他`reducer函数`后再返回一个部分状态，也可以啥都不返回，   
只是组合其他`reducer函数`来调用。    

在`run`接口里对`foo`模块配置`reducer`   
```js{3}
const foo = {
  state: { ... },
  reducer: {
    changeName(name) {
      return { name };
    },
    async changeNameAsync(name) {
      await api.track(name);
      return { name };
    },
    async changeNameCompose(name, moduleState, actionCtx) {
      await actionCtx.setState({ loading: true });
      await actionCtx.dispatch('changeNameAsync', name);
      return { loading: false };
    },
    *changeNameGen(){
      yield api.track(name);
      return { name };
    }
  }
}
```
::: tip | 关于actionCtx.setState
所有的模块reducer里如果没有定义setState函数，concent会自动为其生成一个，书写actionCtx.setState(state)等同于书写actionCtx.dispatch('setState', state);
:::

建议的做法是将reducer函数独立放一个文件，在暴露出来给module配置，这样的reducer里函数间的相互调用可以不用基于字符串了，同时因为concent的module是包含多个可选定义项的，分离它们有利于后期维护和扩展。
```
├── modules
    ├── foo
        ├── state.js
        ├── reducer.js
        ├── computed.js
        ├── watch.js
        ├── init.js
        ├── index.js
    ├── bar
        ├── ...
```
此时reducer文件里，调用可以基于函数引用了
```js{13}
// code in models/foo/reducer.js
export function changeName(name) {
  return { name };
}

export async function  changeNameAsync(name) {
  await api.track(name);
  return { name };
}

export async function changeNameCompose(name, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });
  await actionCtx.dispatch(changeNameAsync, name);//基于函数引用调用
  return { loading: false };
}
```

## 调用reducer函数
### 实例上dispatch触发
在类组件实例里直接通过实例的`this.ctx.dispatch`触发
```js
@register('foo')
class FooComp extends Component {
  changeName = (e)=>{
    // this.setState({name:e.currentTarget.value})

    this.ctx.dispatch('changeName', e.currentTarget.value);
    // or this.ctx.dispatch('changeNameAsync', e.currentTarget.value);
    // or this.ctx.dispatch('changeNameCompose', e.currentTarget.value);
  }
}
```
在类组件实例里直接通过实例的`this.ctx.settings`去呼叫预先定义好的函数触发
```js
@register('foo')
class FooComp extends Component {
  $$setup(ctx){
    return {
      changeName : e=> ctx.dispatch('changeName', e.currentTarget.value),
      changeNameAsync : e=> ctx.dispatch('changeNameAsync', e.currentTarget.value),
      changeNameCompose : e=> ctx.dispatch('changeNameCompose', e.currentTarget.value),
    };
  }
  render(){
    //将它们绑定在具体的dom上
    const { changeName, changeNameAsync, changeNameCompose } = this.ctx.settings;
  }
}
```
在函数组件实例里直接通过实例的`ctx.dispatch`触发
```js
function FooComp(){
  //从useConcent接口返回的实例上下文里解构出dispatch
  const { dispatch } = useConcent('foo');

 //将它们绑定在具体的dom上
  const changeName = e=> ctx.dispatch('changeName', e.currentTarget.value);
  const changeNameAsync = e=> ctx.dispatch('changeNameAsync', e.currentTarget.value);
  const changeNameCompose = e=> ctx.dispatch('changeNameCompose', e.currentTarget.value);
}
```
在函数组件实例里直接通过实例的`ctx.settings`去呼叫预先定义好的函数触发
```js
//定义setup，该函数只会在组件初次渲染前被调用一次
const setup = ctx=>{
  return {
    changeName : e=> ctx.dispatch('changeName', e.currentTarget.value),
    changeNameAsync : e=> ctx.dispatch('changeNameAsync', e.currentTarget.value),
    changeNameCompose : e=> ctx.dispatch('changeNameCompose', e.currentTarget.value),
  };
}

function FooComp(){
  //从useConcent接口返回的实例上下文里解构出settings
  const { settings } = useConcent({module:'foo', setup});

  //将它们绑定在具体的dom上
  const { changeName, changeNameAsync, changeNameCompose } = this.ctx.settings;
}
```

### 实例上reducer触发
在实例上，除了`dispatch`接口基于字符串的方式去定位具体的`reducer`函数，也提供   
`js>>>ctx.reducer.{moduleName}.{functionName}`的方式去调用具体的`reducer函数`。
::: warning | ctx.reducer调用限制
出于性能考虑，concent不会为所有实例绑定所有模块的reducer函数到上下文实例中，所以你只能调用组件所属模块或者所连接模块的reducer函数，如果想调用其他模块的reducer函数，请使用dispatch
:::

class组件调用`js>>>ctx.reducer.{moduleName}.{functionName}`
```js
@register('foo')
class FooComp extends Component {
  $$setup(ctx){
    return {
      changeName : e=> ctx.reducer.foo.changeName(e.currentTarget.value),
    };
  }
}
```

function组件调用`js>>>ctx.reducer.{moduleName}.{functionName}`
```js
//定义setup，该函数只会在组件初次渲染前被调用一次
const setup = ctx=>{
  return {
    changeName : e=> ctx.reducer.foo.changeName(e.currentTarget.value),
  };
}

function FooComp(){
  //从useConcent接口返回的实例上下文里解构出的settings取到changeName
  const { settings: {changeName} } = useConcent({module:'foo', setup});
}
```

### reducer函数内部触发
concent会为每一个`reducer函数`的第三个参数注入`actionCtx`对象，使用此`actionCtx.dispatch`来触发其他的`reducer`函数
```js{4}
// code in models/foo/reducer.js
export async function changeNameCompose(name, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });
  await actionCtx.dispatch(changeNameAsync, name);//基于函数引用调用
  return { loading: false };
}
```

### 全局上下文dispatch触发
concent暴露了顶层接口`dispatch`，可以直接使用`js>>>dispatch(type:string, payload:any)`来触发具体的reducer函数
```js
import cc, { dispatch } from 'concent';

cc.dispatch('foo/changeName', 'newName');
// or
dispatch('foo/changeName', 'newName');
```
::: tip | 全局上下文dispatch、实例上下文dispatch 区别
1 全局上下文dispatch必需指定具体的模块，实例上下文dispatch可以不用指定具体的默认，默认调用自己的所属模块。    
2 全局上下文dispatch触发的函数生成的新状态不能包含私有状态，实例上下文dispatch触发的函数生成的新状态可以包含实例的私有状态。
:::

### 全局上下文reducer触发
支持调用`js>>>reducer.{moduleName}.{functionName}`触发reducer
```js
import cc, { reducer } from 'concent';

reducer.foo.changeName('newName');
// or
cc.reducer.foo.changeName('newName');
```
> 全局上下文reducer、实例上下文reducer区别同上

## reducer函数调用链
reducer函数的源头触发一定是从实例上下文ctx.dispatch或者全局上下文cc.dispatch（or cc.reducer）开始的，呼叫某个模块的某个reducer函数，然后在其reducer函数内部再触发的其他reducer函数的话，会形成一个调用链，正常情况下每一个返回了新的**部分状态**的reducer函数都会触发一次相关实例渲染，这本来也是符合我们预期的结果，但是如果遇到某些特殊场景，我们的`reducer函数`粒度拆得很细很原子，每一个都负责独立更新某一个和某几个key的值，以便更灵活的组合它们来完成高度复用的目的，虽然代码结构上变优雅了，但是因为这些`reducer函数`多了之后其实会触发多次渲染，而每一个`reducer函数`仅更新了一两个值。   
concent针对这种调用链提供**lazy**特性，以既能够达到缩小渲染次数，又支持`reducer函数`细粒度拆分的理想效果。

以下reducer调用链调用未启用**lazy**特性之前
```js
//reducer fns
export async function updateAge(id){
  // ....
  return {age: 100};
}

export async function trackUpdate(id){
  // ....
  return {trackResult: {}};
}

export async function fetchStatData(id){
  // ....
  return {statData: {}};
}

// compose other reducer fns
export async function complexUpdate(id, moduleState, actionCtx) {
  await actionCtx.dispatch(updateAge, id);
  await actionCtx.dispatch(trackUpdate, id);
  await actionCtx.dispatch(fetchStatData, id);
}
```
触发的源头代码
```js
// in your view
<button onClick={()=> ctx.dispatch('complexUpdate', 2)}>复杂的更新</button>
```
触发的更新流程如下图所示
![dispatch](/concent-doc/img/cc-dispatch.png)

启动**lazy**只需要在源头调用处将`dispatch`替换为`lazyDispatch`
```js
// in your view
<button onClick={()=> ctx.lazyDispatch('complexUpdate', 2)}>复杂的更新</button>
```
则触发的更新流程将变为
![dispatch](/concent-doc/img/cc-lazy-dispatch.png)

concent将延迟reducer函数调用链上所有`reducer函数`触发ui更新的时机，仅将他们返回的新**部分状态**按模块分类合并后暂存起来，最后的源头函数调用结束时才一次性的提交到`store`并触发相关实例渲染。

当然`lazyScope`也是可以自定义的，不一定非要在源头函数上就开始启用延迟特性。
```js
// in your view
const a=  <button onClick={()=> ctx.dispatch('complexUpdateWithLoading', 2)}>复杂的更新</button>

// in your reducer
export async function complexUpdateWithLoading(id, moduleState, actionCtx) {
  //这里会实时的触发更新
  await actionCtx.setState({ loading: true });

  //从这里开始启用lazy特性，complexUpdate函数结束前，其内部的调用链都不会触发更新
  await actionCtx.lazyDispatch(complexUpdate, id);

  //这里返回了一个新的部分状态，也会实时的触发更新
  return { loading: false };
}

```
当然触发示例上触发`lazy`除了`lazyDispatch`，调用还有    
`js>>>ctx.lazyReducer.{moduleName}.{fnName}(payload:any)`    
全局上下文也可以触发`lazy`    
`js>>>cc.lazyReducer.{moduleName}.{fnName}(payload:any)`   
`js>>>cc.lazyDispatch(type:string, payload:any)`   

> 为了方便读者进一步理解**lazy**特性，[可以点击此处查看在线示例](https://stackblitz.com/edit/concent-lazy-dispatch)