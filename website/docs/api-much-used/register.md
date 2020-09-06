# register

注册类组件的模块信息，concent实例化组件时会读取注册信息生成相应的实例上下文


## 如何使用
从`concent`模块里可直接导出`register`接口使用
```js
import { register } from 'concent';

register()(class extends React.Component{/** class defenition*/})
// 如配置了装饰器语法支持，可写为
@register()
class extends React.Component{/** class defenition*/}
```

或从默认导出里调用`register`
```js
import cc from 'concent';

cc.register();
```

### 注册所属模块
注册组件属于`foo`模块

```js
// 写法1
@register('foo')
class extends React.Component{/** class defenition*/}

// 写法2
@register({module:'foo'})
class extends React.Component{/** class defenition*/}
```

::: tip | $$default模块
当register里不写任何所属模块时，组件实例默认属于内置的$$default模块，如果用户没有人工定义$$default模块的状态，则组件的state不会被合入模块状态
:::


组件内部通过`this.state`获取`foo`模块数据

```js
@register('foo')
class extends React.Component{
  render(){
    const state = this.state;
  }
}
```

也可通过`this.ctx.state`获取，两者是等效的

```js
const state = this.ctx.state;
```

::: tip | 合成的state
state是由模块状态与私有状态合成而来，所以用户可以在组件里扩展和模块状态不重名的其他state key来作为私有状态
:::

组件内部可通过`this.setState`或`this.ctx.setState`修改`foo`模块数据

```js
changeName = e=> this.setState({name: e.target.value})
```

如果模块reducer里已提供对应的方法，推荐调用`mr`、`moduleReducer`、`dispatch`去触发修改

```js
// mr 是 moduleReducer 的缩写
changeName = e=> this.ctx.mr.changeName(e.target.value)
changeName = e=> this.ctx.moduleReducer.changeName(e.target.value)
changeName = e=> this.ctx.dispatch('changeName', e.target.value)
```

### 连接其他模块
当组件需要消费多个模块的数据时，可使用`connect`参数来声明要连接的多个模块

连接`bar`和`baz`两个模块，通过`ctx.connectedState`获取目标模块的数据
```js
@register({connect:['bar', 'baz']})
class extends React.Component{
  render(){
    const { bar, baz } = this.ctx.connectedState;
  }
}
```

通过调用`ctx.setModuleState`去修改目标模块的数据

```js
changeName = e=> this.ctx.setModuleState('bar', {name: e.target.value})
```

如果模块reducer里已提供对应的方法，推荐通过调用`cr`、`connectedReducer`、`dispatch`去触发模块reducer方法修改数据
```js
// cr 是 connectedReducer 的缩写
changeName = e=> this.ctx.cr.bar.changeName(e.target.value)
changeName = e=> this.ctx.connectedReducer.bar.changeName(e.target.value)
changeName = e=> this.ctx.dispatch('bar/changeName', e.target.value)
```

### 即属于某个模块也连接多个模块
支持同时配置`module`和`connect`来满足组件即属于某个模块也连接多个模块的场景

即属于`foo`模块也连接`bar`、`baz`两个模块
```js
@register({module:'foo', connect:['bar', 'baz']})
class extends React.Component{
  render(){
    const { bar, baz } = this.ctx.connectedState;
  }
}
```
