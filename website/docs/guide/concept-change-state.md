# 状态变更

concent 内置了很多友好的更新状态 api，支持用户按具体场景而选择不同的方式提交新的状态。

## setState

基于最传统的方式提交新状态

```js
import { run, register, useConcent } from "concent";

run({
  counter: {
    state: { count: 1 }
  }
});

@register("counter")
class ClassComp extends React.Component {
  state = { privCount: 1 };
  addCount = () => this.setState({ count: this.state.count + 1 });
  addPrivCount = () => this.setState({ privCount: this.state.privCount + 1 });
  render() {
    const { count, privCount } = this.state; //合成后的state
    return (
      <div>
        count: {count} privCount: {privCount}
        <button onClick={this.addCount}>addCount</button>
        <button onClick={this.addPrivCount}>addPrivCount</button>
      </div>
    );
  }
}

function FnComp() {
  const ctx = useConcent({ module: "counter", state: { privCount: 0 } });
  const {
    state: { count, privCount },
    setState
  } = ctx;
  const addCount = () => this.setState({ count: count + 1 });
  const addPrivCount = () => this.setState({ privCount: privCount + 1 });

  return (
    <div>
      count: {count} privCount: {privCount}
      <button onClick={addCount}>addCount</button>
      <button onClick={addPrivCount}>addPrivCount</button>
    </div>
  );
}
```

推荐使用 setup 替代, 将方法收集到 settings 里

```js
const setup = ctx => {
  return {
    addCount: () => ctx.setState({ count: ctx.state.count + 1 }),
    addPrivCount: () => ctx.setState({ privCount: ctx.state.privCount + 1 })
  };
};
const iState = () => ({ privCount: 0 });

@register({ module: "counter", state: iState })
class ClassComp extends React.Component {
  render() {
    const { count, privCount, settings } = this.state; //合成后的state
    return (
      <div>
        count: {count} privCount: {privCount}
        <button onClick={settings.addCount}>addCount</button>
        <button onClick={settings.addPrivCount}>addPrivCount</button>
      </div>
    );
  }
}

function FnComp() {
  const ctx = useConcent({ module: "counter", state: { privCount: 0 } });
  const {
    state: { count, privCount },
    settings
  } = ctx;

  return (
    <div>
      count: {count} privCount: {privCount}
      <button onClick={settings.addCount}>addCount</button>
      <button onClick={settings.addPrivCount}>addPrivCount</button>
    </div>
  );
}
```

> 下面的示例都将基于`setup`来书写，同时由于 class 组件和 function 组件 api 调用时完全等效的，不再提供 class 组件写法示例。

## sync

`sync`api 是基于`setState`封装的语法糖函数，调用它会返回一个新的函数，用于绑定 dom 事件让开发者快速并方便的修改单个状态 key 的值
假设我们有如下一个函数组件

```js
const iState = ()=>{
  visible: true,
  name:'',
  info: {addr:'', age:''},
  cards:[{id:1, name:'card1'}, {id:2, name:'card2'}]
}
```

使用`sync`生成函数绑定在 dom 上，`sync`会自动提取`event`的值来修改指定 key 的状态

```js
function FnComp() {
  const ctx = useConcent({ state: iState });
  const { state, sync } = ctx;

  return (
    <div>
      <input value={state.name} onChange={sync("name")} />
      <input value={state.info.addr} onChange={sync("info.addr")} />
      <input value={state.info.age} onChange={sync("info.age")} />
      <input value={state.cards[0].name} onChange={sync("cards.0.name}")} />
      <input value={state.cards[1].name} onChange={sync("cards.1.name}")} />
    </div>
  );
}
```

使用固定的值修改状态

```js
  <button onClick={sync('color', 'red')}>to red</button>
  <button onClick={sync('color', 'blue')}>to blue</button>
```

对输入的值自动转为整型

```js
const { syncInt } = useConcent({ state: iState });

<input value={state.info.age} onChange={syncInt("info.age")} />;
```

对已经存在的布尔值自动取反

```js
const { syncBool } = useConcent({ state: iState });

<input value={state.visible} onChange={syncBool("visible")} />;
```

## set

`set`api 也是基于`setState`封装的语法糖函数，调用它可以快速方便的修改单个 key 的值

> 大多数时候推荐使用 sync，省去自动提取目标值的步骤

对某个 key 赋值

```js
function FnComp() {
  const ctx = useConcent({ state: iState });
  const { state, set } = ctx;

  const changeName = e => set("name", e.target.value);
  const changeAddr = e => set("info.age", e.target.value);

  return (
    <div>
      <input value={state.name} onChange={changeName} />
      <input value={state.info.addr} onChange={changeAddr} />
    </div>
  );
}
```

对某个 key 的布尔值取反

```js
const { setBool } = useConcent({ state: iState });

<input value={state.visible} onChange={() => setBool("visible")} />;
```

## dispatch

dispatch 运行开发者调用 reducer 方法，既支持字符串调用，也支持函数引用调用

一个独立的 dispatch 调用

```js
import { run } from 'concent';

const loginModel =  {
    state: {name:'', age:2},
    reducer:{
      changeName(name){
        return {name};
      }
    }
  };

run({
  login:loginModel,
})


const setup = ctx=>{
  return {
    changeName : (e)=> ctx.dispatch('changeName', e.target.value),
    // 直接基于函数引用调用
    changeNameByRef : (e)=> ctx.dispatch(loginModel.reducer.changeName, e.target.value),
    // 直接基于注入到实例上的reducer调用
    changeNameByModuleReducer = (e)=>ctx.moduleReducer.changeName(e.target.value)
  }
}

function FnComp(){
  const ctx = useConcent({ module:'login', setup });
  const {settings, state} = ctx;

  return (
    <div>
      <p>{state.name}</p>
      <button onClick={settings.changeName}>change name</button>
    </div>
  );
}
```

一个组合了多个 dispatch 的调用
> 此时推荐将模块reducer函数写在一个单独的文件里在暴露出来，这样可以方便的直接基于函数引用来调用用一个模块的其他reducer函数

```js
// code in models/login/reducer.js
export async function changeAge(age) {
  await api.updateName(age);
  return { age };
}

export async function changeName(name) {
  await api.updateName(name);
  return { name };
}

export async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.dispatch(changeAge, age);
  await actionCtx.dispatch(changeName, name);
}
```

一个组合了多个dispatch、同时自己也返回新的片段状态的调用

```js
export async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });
  await actionCtx.dispatch(changeAge, age);
  await actionCtx.dispatch(changeName, name);
  return { loading: false }; // or actionCtx.setState({loading:false});
}
```

一个穿插了调用 invoke 方法的调用

```js
// 注，此时changeAge并没有暴露出去，不是一个reducer方法
async function changeAge(age){
  return {age}
}

export async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });

  // 此处如果使用dispatch调用，concent发现changeAge不是一个reducer方法，内部会自动转为invoke调用
  await actionCtx.invoke(changeAge, age);

  await actionCtx.dispatch(changeName, name);
  return { loading: false }; // or actionCtx.setState({loading:false});
}
```

## invoke

invoke 允许开发开发者调用函数修改状态，且 invoke 的使用体验是和 reducer 一样的，可以自由组合，更为强大的是，reducer 和 invoke 之间也是可以相互调用的

一个独立的 invoke 调用

```js
function changeName(name) {
  return { name };
}

const setup = ctx => {
  return {
    changeName: e => ctx.invoke(changeName, e.target.value)
  };
};
```

一个异步的的 invoke 调用

```js
async function changeName(name) {
  await api.updateName(name);
  return { name };
}
```

一个组合了多个 invoke 的调用

```js
async function changeAge(age) {
  await api.updateName(age);
  return { age };
}

async function changeName(name) {
  await api.updateName(name);
  return { name };
}

async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.invoke(changeAge, age);
  await actionCtx.invoke(changeName, name);
}
```

一个组合了多个 invoke、同时自己也返回新的片段状态的调用

```js
async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });
  await actionCtx.invoke(changeAge, age);
  await actionCtx.invoke(changeName, name);
  return { loading: false }; // or actionCtx.setState({loading:false});
}
```

一个穿插了调用 reducer 方法的调用

```js
async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });
  await actionCtx.invoke(changeAge, age);
  //此时实例属于某个某块，且模块里定义了changeName方法
  await actionCtx.dispatch("changeName", name);
  return { loading: false };
}
```
