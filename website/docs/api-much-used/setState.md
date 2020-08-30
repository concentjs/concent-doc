# setState

修改组件实例的状态，修改行为会不会同时引发其他实例渲染，取决于
- 当前组件的注册模块信息 
- 模块下有没有其它实例存在
- 提交的状态有没有包含模块状态

类组件里调用`this.ctx.setState`和`this.setState`是等效的
```js
@register('foo')
class FooComp extends Component{
  change1 = ()=> this.setState({name:'call by setState'})
  change2 = ()=> this.ctx.setState({name:'call by ctx.setState'})
}
```
::: tip | 被接管的setState
原始的`this.setState`已被保存到`this.ctx.reactSetState`上，当用户调用setState时，会先走concent内部自身的逻辑，根据组件注册信息确定需不需要同步状态到其他实例，然后再触发调用当前实例的reactSetState更新自身的状态
:::

::: warning-zh | 不要私自调用reactSetState
除非你明确的知道你做的什么以及明白其后果：如果你提交的状态里包含有模块状态，模块状态值不会存储到store和同步到其他实例上。
:::

函数组件则可通过`useConcent`返回的实例上下文上解构出`setState`

```js
function FooFnComp(){
  const { state, setState } = useConcent('foo');
  const changeName = ()=> setState({name:'call by setState'});
}
```

## 如何使用

### 修改状态
调用方式和react原生setState保持一致

传递新的片段状态
```js
setState({ name: 'newName' });
```

传递updater
```js
setState((prev)=>({ name: prev.name + 'newName' }));
```

传递新的片段状态，并查看修改后的状态
```js
setState({ name: 'newName' }, (newState)=>{
  console.log(newState.name);
});
```

### 修改状态并延时同步
当指定了`delay`值时（单位ms），会在最近一次修改完毕的`delay`时间后再同步状态到其它实例上
> 适用于高频率修改模块状态但不想发生频繁同步行为的场景，如input框的输入

```js
// 写法1
setState({ name: 'newName' }, null, {delay:1000});

// 写法2
setState({ name: 'newName' }, null, '', 1000);
```

### 携带renderKey修改
concent有一个依赖追踪机制，视图里解构state时就确定了当前视图的读依赖，但是仅限于第一层key，所以是希望用户尽量把数据拍平的，如果存在多层结构，为了做到更精确的渲染，组件实例化时标记id，则表示当前实例的renderkey就是这个id，通常id就是map数据结构里的key名字，表示当前组价渲染数据是这个key下的整个对象。

模块状态，生成一个list，一个map
```js
const makeState = ( list )=>{
  return {
    list,
    map: list.reduce((m, item)=>{
      m[item.id] = item;
      return m;
    }, {}),
  }
}

run({
  foo: {
    state: makeState([{id:1, name:'xx', age:12}, {id:2, name:'yy', age:19}])
  }
})
```

Item组件，透传props给useConcent，以确保实例的`renderKey`是`props.id`
```js
function Student(props){
  const { state } = useConcent({module:'foo', props});
  const student = state.map[props.id];
  return (
    <div>
      name: {student.name}
      age: {student.age}
    </div>
  );
}
```

List容器组件，实例化Student组件时，声明id，以确报它的实例上下文携带的`renderKey`就是id值
```js
function StudentList(){
  const { list } = useConcent('foo');
  return list.map((v, i)=> <Student key={v.id} id={v.id} />);
}
```

做完以上准备工作后，我们看下面示例`changeName`内部，仅修改自己的名字后，调用setState，加上`renderKey`值为id值，表示此处修改查找出所有关心`map`变化的实例后，仅触发renderKey为传递的renderKey值(此处是id)的实例重渲染
```js
function Student(props){
  const { state, setState } = useConcent({module:'foo', props});
  const student = state.map[props.id];
  const changeName = ()=>{
    const map = state.map;
    const id = props.id;
    map[id].name = 'newName';
    setState({map}, null, id);
    // 也可写为
    // setState({map}, null, {renderKey:id});
    // setState({map}, null, [id]);
  }
}
```

查看更多关于`renderKey`示例：[示例1](https://codesandbox.io/s/render-key-dwrx1)、[示例2](https://codesandbox.io/s/example-modular-renderkey-s371m)

## 修改行为

### 仅修改私有状态
当组件没有任何声明具体的注册模块信息时，`setState`仅修改自身的状态（即私有状态）

```js
@register()
class FooComp extends Component{
  state = { privName: 'priv name' };
  changePriv = ()=> this.setState({privName:'new name'})
}

function FooFnComp(){
  const { state, setState } = useConcent({ state: { privName: 'priv name' } });
  const changePriv = ()=> setState({privName:'new name'});
}
```

::: tip | 默认属于$$default模块
所有未声明所属模块的组件都默认属于`$$default`模块，该模块状态为空，所以实例提交的状态仅修改自己，并不会触发其他实例渲染，除非用户显示的重定义的`$$default`模块状态，并在提交的状态了包含了`$$default`模块状态的key。
:::

### 仅修改模块状态
当组件未声明任何私有状态，并声明属于某个具体模块时，如果提交的状态包含有模块状态，则会存储到store，并派发给其他同属于这个模块的实例

```js
@register('foo')
class FooComp extends Component{
  changeName = ()=> this.setState({name:'new name'})
}

function FooFnComp(){
  const { state, setState } = useConcent('foo');
  const changeName = ()=> setState({name:'new name'});
}
```

### 既修改私有状态也修改模块状态
当组件声明任何有私有状态，并声明属于某个具体模块时，如果提交的状态即包含有模块状态也包含有私有状态，则将模块状态存储到store并派发给其他同属于这个模块的实例，私有状态仅派发给当前触发`setState`调用的实例上

```js
@register('foo')
class FooComp extends Component{
  state = { privName: 'priv name' };
  changeName = ()=> this.setState({privName: 'priv', name:'pub'})
}

function FooFnComp(){
  const { state, setState } = useConcent({ module: 'foo', state: { privName: 'priv name' } });
  // log state: { name: 'foo',  privName: 'priv name' }
  const changeName = ()=> setState({privName: 'priv', name:'pub'})
}
```

::: tip | state是由模块状态和私有状态合成而得
类组件里的`this.state`(即`this.ctx.state`)，以及函数组件里`ctx.state`都是由组件实例的私有状态和模块状态合成而得。
:::


## 代码演示

### 简单的 hello world
```jsx
import { run, useConcent } from 'concent';

run({
  hello:{
    state:{
      greeting: 'hello world',
    }
  }
})

function Hello(){
  const { state, setState } = useConcent('hello');
  const change = e=> setState({greeting:e.target.value});
  return <input value={state.greeting} onChange={change} />
}
```

## 在线 IDE 演示

<a href="https://codesandbox.io/s/ref-set-state-pr7ew" target="_blank" rel="noopener">
<img src="/concent-doc/img/edit-on-codesandbox.png" width="280px" style="margin:0 auto"/>
</a>
<br/>
<br/>

<div style="width:1200px;display:flex;transform:translateX(-19%)">
<iframe style="width:1440px;height:760px;margin:0 auto" 
  src="https://codesandbox.io/embed/ref-set-state-pr7ew?fontsize=14&&codemirror=1" 
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
</iframe>
</div>

## 函数签名定义

```ts
function setState(
  partialState: object,
  callback?: (newFullState: object) => void,
  renderKey?: string,
  delay?: number
): void;
```

<a href="https://stackblitz.com/edit/hook-setup" target="_blank">
<img src="/concent-doc/img/edit-on-stackblitz.png" width="280px" style="margin:0 auto"/>
</a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://stackblitz.com/edit/hook-setup" target="_blank">
<img src="/concent-doc/img/edit-on-codesandbox.png" width="280px" style="margin:0 auto"/>
</a>

## 参数解释

| 名称         | <div style="width:250px;">描述</div> | 默认值    | 类型     |
| ------------ | ------------------------------------ | --------- | -------- |
| partialState | 提交的新部分状态                     |           | Object   |
| callback     | 新部分状态合并后触发的回调函数       | undefined | Function |
| renderKey    | 触发渲染的目标渲染 Key               | null      | String   |
| delay        | 广播延迟时间，单位(ms)               | 0         | Number   |

