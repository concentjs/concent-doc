# setState

注册为 cc 组件后，提供的`setState`方法已不再是 react 提供的原始的`setState`，如果用户想触发原始的`setState`，可以调用`ctx.reactSetState`，**_但是强烈不建议这么做_**，除非你明确的知道你做的什么以及明白其后果。

当属于`foo`模块的组件实例调用`setState`提交新片段状态之后，除了传递给当前实例触发其重渲染，`concent`还会分析这份片段状态并提取出属于`foo`模块描述范围的状态，然后将找出其他同样属于`foo`模块或者连接到`foo`模块的组件实例，并将提取出来的状态分发到这些实例上触发它们重渲染。

## 代码演示(区分有无 setup)

实例上下文的`state`是组件所属模块状态和私有状态浅合并后的结果

- 当不定义组件所属模块时，实例上下文的`state`可当做是当前组件实例的私有状态。

  > 未定义所属模块时，任何组件都默认属于`$$default`模块，而`$$default`模块在没有重写的情况下拥有一个空状态，所以此时组件实例的`state`完全可以当做私有状态使用

- 当指定了组件所属模块时，实例上下文的`state`由于是组件所属模块状态和私有状态浅合并后的结果，所以实例调用`setState`传递的状态可能既包含模块又包含实例状态，concent 除了将整个新的片段状态传递给当前实例，还会尝试从中提取模块状态片段，并将其分发到其他属于此模块或者连接到此模块并对这些状态有依赖的组件实例上。

### 修改函数组件私有状态

基于`setState`，使用传统 hook 语法来组织修改状态代码当前组件实例的状态

```js
import { useConcent } from "concent";

const iState = () => ({ privName: "name", privMsg: "msg" });

function SetPrivStateFn() {
  const { state, setState } = useConcent({ state: iState });
  const changePrivName = e => setState({ privName: e.target.value });
  const changePrivMsg = e => setState({ privMsg: e.target.value });

  return (
    <div className="demoWrap">
      <div>
        privName:
        <input value={state.privName} onChange={changePrivName} />
      </div>
      <div>
        privName:
        <input value={state.privMsg} onChange={changePrivMsg} />
      </div>
    </div>
  );
}
```

基于`setState`，结合[setup]('/guide/concept-ref-setup')，将修改状态的方法一次性封装起来，组件 ui 可通过实例上下文的`settings`属性来调用已定义方法

```js
export const iState = () => ({ privName: "name", privMsg: "msg" });

export const setup = ctx => {
  ctx.initState(iState());
  const changePrivName = e => ctx.setState({ privName: e.target.value });
  const changePrivMsg = e => ctx.setState({ privMsg: e.target.value });
  return { changePrivName, changePrivMsg };
};

function BetterPrivStateFn() {
  const { state, settings: se } = useConcent({ setup });

  return (
    <div className="betterDemoWrap">
      <div>
        privName:
        <input value={state.privName} onChange={se.changePrivName} />
      </div>
      <div>
        privName:
        <input value={state.privMsg} onChange={se.changePrivMsg} />
      </div>
    </div>
  );
}
```

### 修改类组件私有状态

用户可配置`jsconfig.json`来开启不稳定状态的装饰规则来装饰类组件，此处直接使用函数写法包裹类组件

```js
import { register } from "concent";

export const SetPrivStateCls = register()(
  class extends React.Component {
    state = iState();
    changePrivName = e => this.setState({ privName: e.target.value });
    changePrivMsg = e => this.setState({ privMsg: e.target.value });
    render() {
      // return ui...
    }
  }
);
```

结合[setup]('/guide/concept-ref-setup')定义方法，渲染时 ui 通过`settings`属性获取已定义方法来做绑定

```js
const iState = () => ({ privName: "name", privMsg: "msg" });

const setup = ctx => {
  ctx.initState(iState());
  const changePrivName = e => ctx.setState({ privName: e.target.value });
  const changePrivMsg = e => ctx.setState({ privMsg: e.target.value });
  return { changePrivName, changePrivMsg };
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

当然此处也可以结合[setup]('/guide/concept-ref-setup')将方法一次性做好静态定义

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

对于类组件来说，一样可以结合[setup]('/guide/concept-ref-setup')将方法一次性做好静态定义

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

> 此处代码演示开始，总是使用推荐结合[setup]('/guide/concept-ref-setup')的方式来组织代码

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
