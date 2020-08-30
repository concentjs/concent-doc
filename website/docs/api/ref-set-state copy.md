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
原始的`this.setState`已被保存到`this.ctx.reactSetState`上，当用户调用setState时，会先走concent内部自身的逻辑，根据组件注册信息确定需不需要派发状态到其他实例，然后再触发调用当前实例的reactSetState更新自身的状态
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

::: tip | state是有模块状态和私有状态合成而得
类组件里的`this.state`(即`this.ctx.state`)，以及函数组件里`ctx.state`都是又组件实例的私有状态和模块状态合成而得。
:::

基于`setState`，使用传统 hook 语法来组织修改状态代码当前组件实例的状态

```js
import { useConcent } from "concent";

const iState = () => ({ privName: "name"});

function SetPrivStateFn() {
  const { state, setState } = useConcent({ state: iState });
  const changePrivName = e => setState({ privName: e.target.value });

  return <input value={state.privName} onChange={changePrivName} />
}
```

基于`setState`，结合[setup](/guide/concept-ref-setup)，将修改状态的方法一次性封装起来，组件 ui 可通过实例上下文的`settings`属性来调用已定义方法

```js
export const iState = () => ({ privName: "name" });

export const setup = ctx => {
  ctx.initState(iState());
  const changePrivName = e => ctx.setState({ privName: e.target.value });
  return { changePrivName };
};

function BetterPrivStateFn() {
  const { state, settings: se } = useConcent({ setup });

  return <input value={state.privName} onChange={se.changePrivName} />
}
```

### 修改类组件私有状态

用户可配置`jsconfig.json`来开启不稳定状态的装饰规则来装饰类组件，此处直接使用函数写法包裹类组件

```js
import { register } from "concent";

export const SetPrivStateCls = register()(
  class extends React.Component {
    state = iState();
    changePrivName = e => {
      this.setState({ privName: e.target.value });
      // 等效于写为
      // this.ctx.setState({ privName: e.target.value }); 
    }
    render() {
      // return ui...
    }
  }
);
```

结合[setup](/guide/concept-ref-setup)定义方法，渲染时 ui 通过`settings`属性获取已定义方法来做绑定

```js
const iState = () => ({ privName: "name" });

const setup = ctx => {
  ctx.initState(iState());
  const changePrivName = e => ctx.setState({ privName: e.target.value });
  return { changePrivName };
};

const BetterSetPrivStateCls = register({ setup })(
  class extends React.Component {
    render() {
      const { state, settings: se } = this.ctx;
      // return ui...
    }
  }
);
```

### 修改函数组件模块状态

我们在启动 concent 时定义一个模块`foo`

```js
import { run } from "concent";

run({
  foo: {
    state: {
      name: "concent",
      age: "19",
      hobbies: ["react", "js"],
      isTrusted: true
    }
  }
});
```

通过`useConcent`传递模块名定义当前当前组件所属模块

```js
export function SetModuleStateFn() {
  // 定义当前组件属于foo模块，concent将整个foo模块的状态注入到state里
  const { state, setState } = useConcent("foo");
  const changeName = e => setState({ name: e.target.value });
  const changeAge = e => setState({ age: e.target.value });

  // return ui...
}
```

当然此处也可以结合[setup](/guide/concept-ref-setup)将方法一次性做好静态定义

```js
export const setup = ctx => {
  const changeName = e => ctx.setState({ name: e.target.value });
  const changeAge = e => ctx.setState({ age: e.target.value });
  return { changeName, changeAge };
};

function BetterSetModuleStateFn() {
  const { state, settings: se } = useConcent({ module: "foo", setup });
  // return ui...
}
```

### 修改类组件模块状态

通过`register`接口注册类组件时定义所属模块

```js
// 注册该类组件属于foo模块，concent将整个foo模块的状态
// 注入到this.state、this.ctx.state里
const SetModuleStateCls = register("foo")(
  class extends React.Component {
    // this.setState 可替换为 this.ctx.setState
    changePrivName = e => this.setState({ name: e.target.value });
    changePrivMsg = e => this.setState({ age: e.target.value });
    render() {
      // return ui...
    }
  }
);
```

对于类组件来说，一样可以结合[setup](/guide/concept-ref-setup)将方法一次性做好静态定义

```js
const setup = ctx => {
  const changeName = e => ctx.setState({ name: e.target.value });
  const changeAge = e => ctx.setState({ age: e.target.value });
  return { changeName, changeAge };
};

const BetterSetModuleStateCls = register({ module: "foo", setup })(
  class extends React.Component {
    render() {
      const { state, settings: se } = this.ctx;
      // return ui...
    }
  }
);
```

## 代码演示

> 此处代码演示开始，总是使用推荐结合[setup](/guide/concept-ref-setup)的方式来组织代码

### 结合 callback 修改状态

`setState`第二位可选参数`callback`可以总是拿到最新的状态

```
setState: (partialState:object, callback?:(newState)=>void)
```

对于类组件来说要注意，原始的`setState`第二为参数`callback`的是无这个特性的

函数组件写法

```js
const setup = ctx => {
  ctx.initState(iState());
  const changePrivName = e => {
    ctx.setState({ privName: e.target.value }, newState => {
      ctx.setState({ privMsg: newState.privName + "_msg" });
    });
  };
  const changePrivMsg = e => ctx.setState({ privMsg: e.target.value });
  return { changePrivName, changePrivMsg };
};

function SetPrivStateCb() {
  const { state, settings: se } = useConcent({ setup });
  // return ui...
}
```

类组件写法

```js
const SetPrivStateCbCls = register({ setup })(
  class extends React.Component {
    render() {
      const { state, settings: se } = this.ctx;
      // return ui...
    }
  }
);
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

## 如何使用

### 在 Class 里调用

#### 直接调用

在 class 里使用时，如果忽略其`renderKey`和`delay`参数的话，使用方式和体验的 reactClass 是一致的

```js
@register({module:'foo', connect:['bar', 'baz']}, 'Foo');
class Foo extends Component{
  changeBarName = (e)=>{
    //修改name
    this.setState({name:e.currentTarget.value});

    //修改name, 回调里拿到最新的的state
    this.setState({name:e.currentTarget.value}, state=>{
      console.log(state);
    });

    //concent为每一个实例都构建了一个上下文，this.setState等同于调用this.ctx.setState
    this.ctx.setState({name:e.currentTarget.value});
  }
}
```

#### 带 renderKey 调用

当实例携带`renderKey`调用时，concent 会去寻找和传递的`renderKey`值一样的实例触发渲染，而每一个 cc 实例，如果没有人工设置`renderKey`的话，默认的`renderKey`值就是`ccUniqueKey`(即每一个 cc 实例的唯一索引)，所以当我们拥有大量的消费了 store 某个模块下同一个 key 如`sourceList`（通常是 map 和 list）下的不同数据的组件时，如果调用方传递的`renderKey`就是自己的`ccUniqueKey`, 那么`renderKey`机制将允许组件修改了`sourceList`下自己的数据同时也只触发自己渲染，而不触发其他实例的渲染，这样大大提高这种 list 场景的渲染性能。

```js
// code in model/product/reducer.js
export function changeName({name, pid}, moduleState){
  const list = moduleState.list;
  const target = list.find(v=> v.id===pid);
  target.name = name;
  return {list};
}

//code in page/product/ProductItem.js
@register({module:'product', watchedKeys:['list']})
class ProductPage extends Component{
  changeName = (e)=>{
    //修改name，传递自己的`ccUniqueKey`作为`renderKey`
    //虽然list遍历出来生成的其他ProductItem虽然同样观察key `list`的变化
    //但是它们将不会被触发渲染
    this.setState({name:e.currentTarget.value}, null, this.ctx.ccUniqueKey);
  }

  render(){
    const pid = this.props.pid;
    const productItem = this.state.list[pid];//取自己的数据渲染

    return (
      <div>
        {productItem.name}
        <input onChange={this.changeName}/>
      </div>
    );
  }
}

//code in page/product/container.js
@register('product')
class ProductPage extends Component{
  render(){
    return (
      <div>
        this.state.list.map((v)=>{
          return <ProductItem key={v.pid} pid={v.pid} />
        });
      </div>
    );
  }
}
```

#### 带 delay 调用

当属于模块`foo`的某个 cc 组件实例修改状态时，默认情况下`concent`是实时将状态分发到其他关系这些状态变化的实例的，如果有一些状态变化非常频繁，且关心这个状态变化的组件很多时，可以使用 delay 参数，延迟状态的分发从而提高渲染性能。

delay 的值单位是毫秒，表示状态变化之后多少毫秒内，如果没有新的状态输入，才将最后这份状态分发到其他实例

> 注意当前实例总是实时的收到最新状态的，只有其他实例才是延迟收到

```js
// code in models/foo/state.js
export default {
  name: ""
};

// code in models/foo/reducer.js
export function changeName(name, moduleState) {
  return { name };
}

// code in pages/foo/MyInput.js
@register("foo")
class MyInput extends Component {
  changeName = e => {
    //没有新的状态输入的3秒后，才将状态分发给其他实例
    this.setState({ name: e.currentTarget.value }, null, null, 3000);
  };

  render() {
    return <input onChange={this.changeName} />;
  }
}

// code in pages/foo/index.js
@register("foo")
class Foo extends Component {
  render() {
    return (
      <div>
        {/** 其中任何一个MyInput产生输入行为，然后停止输入行为3秒后，其他实例将收到最新的输入 */}
        <MyInput />
        <MyInput />
        <MyInput />
        <MyInput />
      </div>
    );
  }
}
```

### 在 RenderProps 里调用

#### 基于 registerDumb 创建的组件

```js
export default registerDumb("foo")(ctx => {
  const changeName = e => ctx.setState({ name: e.currentTarget.name });
  return <input value={ctx.state.name} onChange={this.changeName} />;
});

//定义mapProps, SFC组件props指向mapProps返回的结果
const mapProps = ctx => {
  const changeName = e => ctx.setState({ name: e.currentTarget.name });
  return { name: ctx.state.name, changeName };
};
export default registerDumb({ module: "foo", mapProps })(
  ({ changeName, name }) => {
    return <input value={name} onChange={this.changeName} />;
  }
);

//将api定义提升到setup，只触发一次定义
const setup = ctx => {
  const changeName = e => ctx.setState({ name: e.currentTarget.name });
  return { changeName };
};
const mapProps = ctx => {
  return { name: ctx.state.name, changeName: ctx.settings.changeName };
};
export default registerDumb({ module: "foo", mapProps, setup })(
  ({ changeName, name }) => {
    return <input value={name} onChange={this.changeName} />;
  }
);
```

#### 基于 CcFragment 创建的组件

```js
//将api定义提升到setup，只触发一次定义
const setup = ctx => {
  const changeName = e => ctx.setState({ name: e.currentTarget.name });
  return { changeName };
};
const mapProps = ctx => {
  return { name: ctx.state.name, changeName: ctx.settings.changeName };
};
export default () => (
  <CcFragment
    module="foo"
    mapProps={mapProps}
    setup={setup}
    render={({ changeName, name }) => {
      return <input value={name} onChange={this.changeName} />;
    }}
  />
);
```

### 在 Hook 里调用

#### 在 hook 组件里定义并调用

```js
import { useConcent } from "concent";
export default function MyInput() {
  const { state, setState } = useConcent("foo");
  const changeName = e => ctx.setState({ name: e.currentTarget.name });
  return <input value={state.name} onChange={changeName} />;
}
```

#### 提升到 setup

```js
import { useConcent } from "concent";

const setup = ctx => {
  const changeName = e => ctx.setState({ name: e.currentTarget.name });
  return { changeName };
};
export default function MyInput() {
  const { state, settings } = useConcent({ module: "foo", setup });
  return <input value={state.name} onChange={settings.changeName} />;
}
```
