# 快速上手

## 模块初览
![cc-module](/concent-doc/img/cc-module.png)
在concent里，提供一个全局唯一的`store`，而`store`是由多个模块一起组成的，**模块**是一个非常重要的概念，每个模块又分别由`state`、`reducer`、`computed`、`watch`、`init`组成。

::: tip | 注意
除了state是必需的，其他都是可选项，按需配置就好
:::
* `state`定义模块下的数据。
* `reducer`定义模块修改数据的业务逻辑，因为对于concent来说，`setState`就可以修改模块的数据，所以`reducer`不是必需的，对于简单的业务逻辑你可以直接使用`setState`来完成数据修改，但是通常项目的功能会越来越复杂，而修改数据前的处理过程代码就对应着我们的业务逻辑，这时候为了解耦业务逻辑与ui渲染，建议将其抽离到`reducer`，[了解更多关于reducer](/guide/concept-module-reducer)。
* `computed`定义各个`stateKey`的值发生变化时，要触发的计算函数，并将其结果缓存起来，仅当`stateKey`的值再次变化时，才会触发计算，[了解更多关于computed](/guide/concept-module-computed)。
* `watch`定义各个`stateKey`的值发生变化时，要触发的回调函数，仅当`stateKey`的值再次变化时，才会触发，通常用于一些异步的任务处理，[了解更多关于watch](/guide/concept-module-watch)。
* `init`可以对`state`完成一次异步的初始化过程，如果模块的`state`是需要异步的被赋值的时候，可以对其定义`init`函数，返回的状态将被合并到`state`里，如果此时此模块下已经实例化了一些组件，init返回的状态也会被分发到各个实例上，[了解更多关于init](/guide/concept-module-init)。

::: tip | 温馨提示
对于仅有一定react基础的用户，可以快速浏览以下内容，以便第一时间上手concent，而对于使用过redux，mobx等状态管理框架的用户，可以查看左侧教程&实战了解更多相关的内容，强烈推荐到stackblitz、codesandbox等在线IDE上编写代码以加深对api的理解
:::
[stackblitz：一个相对复杂的例子](https://stackblitz.com/edit/cc-multi-ways-to-wirte-code)   
[codesandbox：一个相对简单的例子](https://codesandbox.io/s/hook-setup-1wpl8)

## 创建store子模块
声明一个模块`foo`,只包含`state`定义
```js{1}
// code
const foo = {
  state: {
    name:'concent',
    firstName:'',
    lastName:'',
    age:0,
    hobbies:[]
  }
}
```

## 载入模块，启动concent
使用concent提供的`run`接口，配置模块启动concent。
```js
import { run } from 'concent';

run({ foo });
```

## 注册组件
书写一个class组件，使用使用concent提供的`register`接口，将其注册为concent组件，指定其属于`foo`模块。
```js{6}
import React, { Component } from 'react';
import { register } from 'concent';

@register('foo')
class HelloConcent extends Component {
  state = { name: 'this value will been overwrite by foo module state' }
  render() {
    const { name, age, hobbies } = this.state;
    return (
      <div>
        name: {name}
        age: {age}
        hobbies: {hobbies.map((v, idx) => <span key={idx}>{v}</span>)}
      </div>
    );
  }
}
```
指定组件属于foo模块后，concent会在组件初次渲染前将其所属模块的`js>>>state`合并到实例的`js>>>this.state`上，`实例state`里声明了和`js>>>模块state`同名的key的话，其值将会被覆盖，所以上面的示例里`js>>>state = { name: 'this value will been overwrite by foo module state' }`，其name值在render最终将是`js>>>模块state`里初始值`concent`;
::: tip-zh
当然，你可以声明额外的key在实例上，不同于模块state的key，这些key的值对于实例来说就是私有的，改变它们的值，不会影响到其他实例。
:::

## 添加修改数据行为
加入一个输入框，修改名称
> 为了不干扰演示，下面的示例将类里的多余的state声明去掉。

```js{4}
@register('foo')
class HelloConcent extends Component {
  changeName = (e)=>{
    this.setState({name:e.currentTarget.value})
  }
  render() {
    const { name, age, hobbies } = this.state;
    return (
      <div>
        name: <input value={name} onChange={this.changeName} />
        age: {age}
        hobbies: {hobbies.map((v, idx) => <span key={idx}>{v}</span>)}
      </div>
    );
  }
}
```

## 实例化组件
一切工作准备就绪，我们渲染多个`HelloConcent`看看效果吧。
```js
import ReactDOM from 'react-dom';

function App(){
  return (
    <div>
      <HelloConcent />
      <HelloConcent />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
```

<div style="text-align:center;">
  <a style="color:#0094bd" target="blink" href="https://stackblitz.com/edit/cc-course-hello-concent-simple">在线示例点我</a>
  <img style="width:100%;max-width:740px" src="/concent-doc/img/blockHeader.png" /><br />
  <video muted="" style="width:100%;max-width:740px;transform:translateY(-6px)" controls="controls" autoPlay="none">
    <source src="https://github.com/concentjs/cc-doc-video/blob/master/video/cc-zero-cost.mov?raw=true" type="video/mp4" />Your browser does not support the video tag.
  </video>
  <br />
</div>

## 运行时的依赖收集策略
concent组件在每一次渲染时都会收集当前渲染逻辑对数据的依赖列表，所以推荐渲染逻辑里遵循用到什么数据就解构什么的原则，让组件保持最小范围的依赖

```js
// 渲染未用到age，但只要age改变了依然会触发当前组价实例渲染
function BadCase(){
  const { state:{name, age} } = useConcent('foo');
  return <h1>only use name: {name} </h1>
}

// 删掉age，保持组件最小的依赖列表
function GoodCase(){
  const { state:{name} } = useConcent('foo');
  return <h1>only use name: {name} </h1>
}
```

如有条件判断渲染，采用延迟解构方式，让组件保持最小范围的依赖

```js
function BadCase(){
  const { state:{name, needShow, age} } = useConcent('foo');
  return <h1>use name: {name} {needShow? `or age ${age}`: ''}</h1>
}

function GoodCase(){
  const { state:{name, needShow} } = useConcent('foo');
  return <h1>use name: {name} {needShow? `or age ${stage.age}`: ''}</h1>
}
```

## 人工指定依赖

通过设定`watchedKeys`可以人工指定组件的依赖列表，从而替换掉默认的运行时依赖收集策略

::: tip-zh | 优先考虑依赖收集
人工指定会有额外的维护成本，推荐用户不指定watchedKeys，让concent采用默认的运行时依赖收集策略
:::

```js{1}
@register({ module: 'foo', watchedKeys: ['age'] })
class FooComp extends Component {
  render() {
    const { name, age, hobbies } = this.state;
  }
}
```

## 定义reducer
当我们提交变更数据前有不少的处理过程的时候，组件的代码会越来越臃肿，为了解耦业务逻辑也ui渲染，我们需要合理的剥离相关处理过程过程到`reducer`。   
在concent里，触发`reducer`特别简单，因为concent为每一个组件实例都构建了一个实例上下文对象`ctx`，该对象上提供了concent为组件能力增强的api，你可以用`js>>>this.ctx.dispatch('reducerFnName', payload)`直接呼叫reducer函数，从而避免各种`map***ToProps`和相关的配套`action`定义。    
- reducer函数可以是纯函数，也可以是`async`函数
- 可以返回一个部分状态，可以调用其他`reducer`函数后再返回一个部分状态，也可以啥都不返回，只是组合其他`reducer`函数来调用。

```ts
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
    }
  }
}
```
建议的做法是将reducer函数独立放一个文件，在暴露出来给module配置，这样的reducer里函数间的相互调用可以不用基于字符串了，同时因为concent的module是包含多个可选定义项的，分离它们有利于后期维护和扩展。
```
├── modules
    ├── foo
        ├── state.js
        ├── reducer.js
        ├── computed.js
        ├── watch.js
        ├── lifecycle.js
        ├── index.js
    ├── bar
        ├── ...
```

此时reducer文件里，可以基于函数引用调用其他reducer函数了

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

在组件里触发reducer

```js
@register('foo')
class HelloComp extends Component {
  changeName = (e)=>{
    // this.setState({name:e.currentTarget.value})

    // 替代dispatch字符串调用方式
    this.ctx.mr.changeName(e.currentTarget.value);
    // this.ctx.dispatch('changeName', e.currentTarget.value);
  }
}
```

## 定义模块computed
concent正确的修改数据行为是提交片段state，即变化了数据就提交什么，这与react的`setState`是一致的理念，真因为如此，concent可以精确的感知到哪些key的值发生了变化，所以允许你定义计算函数，concent会将其返回结果缓存起来。    
[了解更多关于computed](/guide/concept-computed)

```js
// code in models/foo/computed.js

//当age发生变化时，对age做计算,
export function age({age}) {
  return age * 2;
}

//对firstName, lastName任意一个值发生变化时，计算新的fullName
export function fullName(newState, oldState, fnCtx){
  // fnCtx.setted查看提交的状态key列表
  // fnCtx.changed查看提交的状态key列表里发生了变化的key列表
  // fnCtx.retKey查看当前函数的计算结果对应key，当前示例为 fullName
  return `${newState.firstName}_${newState.lastName}`;
}

// 更推荐上面的写法，在参数里解构时确定输入的数据依赖
export const fullName = {
  fn(newState, oldState, fnCtx) {
    // logic code
  },
  depKeys: ['firstName', 'lastName'],//这里定义触发fullName计算的依赖key列表
}
```

计算函数的依赖列表是定定义时就确定了的，我们需要尽可能早把需要参与计算的状态解构出来

```js
// good case
export function funnyName(newState, oldState, fnCtx){
  // 表示当前计算函数依赖是 firstName 和 lastName
  const { firstName, lastName } = newState;
  if(firstName.length > 20){
    return `${firstName}_${lastName}`;
  }else{
    return `${firstName}_2short`;
  }
}

// bad case
export function funnyName(newState, oldState, fnCtx){
  // 此函数的依赖可能是firstName lastName 或 firstName
  if(newState.firstName.length > 20){
    return `${newState.firstName}_${newState.lastName}`;
  }else{
    return `${newState.firstName}_2short`;
  }
}
```

获取模块computed计算结果
```js{4}
@register('foo')
class HelloComp extends Component {
  render() {
    const { age, fullName } = this.ctx.moduleComputed;
  }
}
```

::: tip | 注意
模块computed的初次计算在启动concent载入模块时就被触发了初次计算，和该模块下有没有相关的组件被实例化没有关系。   
key对应值的如果是primitive类型的（如number, string, boolean），能够通过浅比较得知有没有发生改变，如果是object型，默认走set语义，即返回了就代表改变了，如果需要严格走immutable语义，可以设置compare为true，表示对Object型值也做浅比较，此时就需要用户总是返回新的对象了
:::

```js{13}
// code in models/foo/computed.js

//hobbies是一个数组
export function hobbies(hobbies, oldVal) {
  return hobbies.length * 2;
}

// code in models/foo/reducer.js
export function addHobby(hobby, moduleState){
  const { hobbies } = moduleState;
  hobbies.push(hobby);

  // 以下两种写法均能触发计算函数
  return { hobbies };
  return { hobbies: [...hobbies] };
}
```

如果需要`js>>>return { hobbies }`不触发计算，则定义hobbies计算函数时，需要将其`compare`指定为`true`，表示对object类型的值做浅比较

```js
import { defComputed } from 'concent';

export const hobbies = defComputed(
  ({hobbies}) => hobbies.length * 2, 
  {compare: true},// 此时reducer里返回hobbies时，必需走immutable写法了
)
```

可打开`console`，输入`js>>>cc.setState('foo', {age:100})`或`js>>>cc.set('foo/age', 100)`去修改`foo`模块的age值，来测试触发`age`再次被计算。

## 定义模块watch

同computed一样，可以对key做一些watch定义，当key的值发生改变时触发其watch回调，适用于一些需要处理异步任务的场景。

```js
// code in models/foo/watch.js
import { defWatch } from 'concent';

// age和stateKey同名，表示当age发生变化时触发此函数
export function age() {
  api.track('ageChanged');
}

//对firstName, lastName任意一个值发生变化时，触发此函数
export const fullName = defWatch(
  (newState, oldState, fnCtx) => {
    // fnCtx.changed查看提交的状态key列表里发生了变化的key列表
    const { changed } = fnCtx;
    if(changed.includes('firstName'))api.track('firstNameChanged');
    if(changed.includes('lastName'))api.track('lastNameChanged');
  },
  // 人工定义触发fullName watch回调的依赖key列表
  depKeys: ['firstName', 'lastName'],
)

// 或写为解构时确定依赖
export function fullName2({firstName, lastName}, oldState, fnCtx){
  const { changed } = fnCtx;
  if(changed.includes('firstName'))api.track('firstNameChanged');
  if(changed.includes('lastName'))api.track('lastNameChanged');
}
```

## 定义模块lifecycle[v2.9+]
提供`initState`、`initStateDone`、`loaded`、`mounted`、`willUnmount`五个可选的生命周期函数

### initState
适合做一些异步的初始化状态工作
```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export async function initState(){
  const data = await api.fetData();
  return data;
}
```

### initStateDone
`initState`执行结束后的业务逻辑
```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export function initStateDone(dispatch, moduleState){
  dispatch(rd.nextStep);
}
```

### loaded
模块载入完毕时执行的工作，当我们的异步状态初始化工作需要放置到`reducer`内部方便可重用时，推荐使用`loaded`替代`initState`
```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export function loaded(dispatch, moduleState){
  dispatch(rd.initState);//调用reducer里的状态初始化函数
}
```

### mounted
当该模块的第一个组件挂载完毕时需要触发的函数，和`loaded`的最大区别是执行时机不同，`mounted`是由组件实例挂载完毕驱动触发，而`loaded`是模块载入完毕就触发执行。

当你的状态初始化流程是依赖组件实例存在时才开始执行，则可考虑`mounted`替代`loaded`

```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export function mounted(dispatch, moduleState){
  dispatch(rd.initState);//调用reducer里的状态初始化函数
}
```

`mounted`默认只触发一次，即组件如果销毁再次挂载回来并不会触发，如果需要满足条件时反复执行，则需要返回false
```js
export function mounted(dispatch, moduleState){
  dispatch(rd.initState);
  return false;
}
```

### willUnmount
当该模块的最后一个组件卸载时需要触发的函数，通常用于清理工作，如果需要满足条件时反复执行，需要返回false
```js
export function willUnmount(dispatch, moduleState){
  dispatch(rd.clearUp);
  return false;
}
```

## 跨多个模块的组件

如果我们的组件还要消费其他模块的数据，则需要注册是定义`connect`来**连接**其他模块，以便达到消费其他模块数据的目的。

::: tip | 注意
属于和连接是两个不同的概念，组件dispatch行为在没有指定目标模块时，都自动的修改的是自己模块数据，同时数据是诸如到this.state里的，而且一个组件只能属于一个模块，但是可以连接多个其他模块，连击的模块其数据是注入到this.ctx.connectedState.{moduleName}下的
:::
![connect](/concent-doc/img/cc-class-and-instance-state.png)

如下我们将定义一个`BarComp`，指定其属于`bar`模块，同时连接`foo`和`baz`模块

```js
@register({ module: 'bar', connect: ['foo', 'baz'] })
class BarComp extends Component {
  render() {
    const bazState = this.state;
    //获得连接模块的状态
    const { foo:fooState, bar:bazState } = this.ctx.connectedState;
    //获得连接模块的计算结果
    const { foo:fooCu, baz:bazCu } = this.ctx.connectedComputed;
  }
}
```

如果我们需人工挑选`foo`模块的部分key做观察，而`baz`模块保持默认的依赖收集策略，则可以写为   

`js>>>@register({ module: 'bar', connect: {foo:['key1', 'key2'], baz:'-'} })`   

如果不指定组件属于任何模块，仅连接其他模块，则可写为    

`js>>>@register({ connect: {foo:['key1', 'key2'], baz:'-'} })`   

> 此时组件会被concent指定属于内置模块`$$default`，这是一个空模块，除非你显式地去重定义该模块相关配置项，在没有对`$$default`模块重定义前，组件里的`this.state`和`模块state`将不再有关联，组件的`this.setState`也不再能够触发修改`模块state`的数据，组件自定义的`state`相当于变成完全私有的了。

上述示例中，注册的组件都指定了**属于**`bar`模块，所以实例上下文对象调用`js>>>this.ctx.dispatch('reducerFnName', payload)`时，知道触发的是`bar`模块的`reducer`函数，去修改`bar`模块的数据。

```js
  this.ctx.dispatch('changeName', 'newName');
  //等同于写为
  this.ctx.dispatch('bar/changeName', 'newName');

  // 推荐写为直接调用的方式
  this.ctx.moduleReducer.changeName('newName');
  // or
  this.ctx.mr.changeName('newName');

  //如果我们要显示的去触发其他模块的reducer函数，可以写为
  this.ctx.dispatch('foo/changeName', 'newName');
```

调用其他模块的方法时，推荐使用`js>>>this.ctx.connectedReducer.{moduleName}` 或其缩写 `js>>>this.ctx.cr.{moduleName}` 来发起调用

```js
this.ctx.dispatch('foo/changeName', 'newName');
// 改为
this.ctx.cr.foo.changeName('newName');
```

## 定义setup
`setup`定义是针对实例的，触发时机是组件构造器函数执行结束后，组件将要首次渲染前，所以只会被执行一次，其返回结果将搜集到`js>>>this.ctx.settings`里，配合上下文对象提供的`effect`api，还可以达到在类里**消灭生命周期函数**的效果  
```js{3}
@register('foo')
class HelloComp extends Component {
  $$setup(ctx) {//$$setup会将ctx传递到参数列表里，和this.ctx是同一个对象

    //第二为参数是依赖key名称列表，填写空表示只在首次渲染结束后触发一次，模拟componentDidMount
    ctx.effect(ctx => {
      // api.fetchData()
    }, []);

    //不传递第二位参数的话，每一次组件渲染结束后都会触发其执行
    ctx.effect(ctx => {
      // trigger after every render
    });

    //第二为参数依赖key名称列表指定了name，
    ctx.effect(ctx => {
      // 首次渲染结束时，触发此副作用函数执行
      // 之后只要name变化，就会在组件渲染结束后触发此副作用函数执行
    }, ['name']);

    //第三位参数immediate默认是true，设置为false
    ctx.effect(ctx => {
      // 首次渲染结束时，不触发此副作用函数执行
      // 之后只要name变化，就会在组件渲染结束后触发此副作用函数执行
    }, ['age'], false);

    //第二为参数依赖key名称列表设定了多个值
    ctx.effect(ctx => {
      // 首次渲染结束时，不触发此副作用函数执行
      // 之后只要name或者age任意一个发生变化时，会在组件渲染结束后触发此副作用函数执行
    }, ['age', 'name'], false);

    const changeName = e => ctx.dispatch('changeName', e.currentTarget.value);

    return { changeName };
  }
  render() {
    //可用于绑定在ui上
    const { changeName } = this.ctx.settings;
    return <input value={this.state.name} onChange={changeName} />
  }
}
```

## 定义实例computed
和`模块computed`不同，`实例computed`是针对实例的，每一个实例都会触发自己的计算函数，当你的不同实例需要有不同的计算逻辑的时候，才需要定义`实例computed`，因为`实例computed`只能定义一次，结合上面提到的`setup`，我们可以在`setup`里完成定义，其计算结果将从`js>>>this.ctx.refComputed`里获得
```js{17}
@register('foo')
class HelloComp extends Component {

  $$setup(ctx) {
    ctx.computed('name', ({name}) => {
      return name.split('').reverse().join();
    });

    ctx.computed('fullName', (newState) => {
      return `${newState.firstName}_${newState.lastName}`
    });
  }

  render() {
    // 从refComputed里获得计算结果
    const { name: reversedName } = this.ctx.refComputed;
  }
}
```

## 定义实例watch
同样的，我们也可以对实例定义`watch`，以方便处理一些异步任务，如以下示例，当type发生变化时，抓取一次数据

```js
@register('foo')
class HelloComp extends Component {
  $$setup(ctx) {
    ctx.watch('type', ({type})=>{
      ctx.dispatch('fetchDataWhileTypeChanged', type);
    });
  }
  render() {
    //这里用了一个sync语法糖函数，自动将onChange事件里的value值同步到state.type下
    return (
      <select value={this.state.type} onChange={this.ctx.sync('type')}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    );
  }
}
```

::: tip | 注意
实例watch和实例effect执行时机不一样，前者是指组件渲染前触发，后者是指组件渲染后触发
:::

## 拥抱hook，定义函数组件
concent之所以成为**渐进式**的框架，是因为在类组件里的所有概念，都可以平滑的过度到hook函数组件，使用`useConcent`接口，可以让它们拥有完全一致的api调用体验，`useConcent`返回一个实例上下文对象`ctx`，和类里的`this.ctx`无论是数据结构还是使用方式都是一模一样的。
```js
import { register } from 'concent';

@register('foo')
class HelloComp extends Component {
  $$setup(ctx) {
    //call ctx.effect、ctx.computed、ctx.watch etc
  }
  render() {
    const {
      refComputed, moduleComputed, connectedComputed,
      connectedState, state, settings, dispatch, sync
      // etc ...
    } = ctx;
    // return ui
  }
}

// ----------------------------
import { useConcent } from 'concent';

const setup = ctx => {
  //call ctx.effect、ctx.computed、ctx.watch etc
}

function HelloHookComp() {
  const ctx = useConcent({ module: 'foo', setup });
  const {
    refComputed, moduleComputed, connectedComputed,
    connectedState, state, settings, dispatch, sync
    // etc ...
  } = ctx;
  // return ui
}
```