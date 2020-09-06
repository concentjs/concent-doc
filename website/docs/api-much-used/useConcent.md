# useConcent
为函数组件注册模块信息，concent实例化组件时会读取注册信息生成相应的实例上下文
> useConcent的使用方法和参数含义和resgister一样的，两者区别是register服务于类组件，useConcent服务于函数组件


## 如何使用
从`concent`模块里可直接导出`useConcent`接口使用
```js
import { useConcent } from 'concent';

function Demo(){
  useConcent();
}
```

或从默认导出里调用`useConcent`
```js
import cc from 'concent';

function Demo(){
  cc.useConcent();
}
```

### 注册所属模块
注册组件属于`foo`模块，`useConcent`会返回当前组件的实例上下文

```js
// 写法1
function Demo(){
  const ctx = useConcent('foo');
}

// 写法2
function Demo(){
  const ctx = useConcent({module:'foo'});
}
```

读取`foo`模块的数据

```js
function Demo(){
  const { state } = useConcent({module:'foo'});
}
```

修改`foo`模块的数据

```js
function Demo(){
  const { setState } = useConcent({module:'foo'});
  const changeName = (e)=> setState({name: e.target.value});
}
```

如果模块reducer里已提供对应的方法，推荐调用`mr`、`dispatch`去触发修改

```js
const { mr, dispatch } = useConcent({module:'foo'});
const changeName = e=> mr.changeName(e.target.value)
const changeName2 = e=> dispatch('changeName', e.target.value)
```

### 连接其他模块
当组件需要消费多个模块的数据时，可使用`connect`参数来声明要连接的多个模块

连接`bar`和`baz`两个模块，通过`ctx.connectedState`获取目标模块的数据
```js
function Demo(){
  const { connectedState: { bar, baz } } = useConcent({ connect: ['bar', 'baz'] });
}
```

如果模块reducer里已提供对应的方法，推荐通过调用`cr`、`dispatch`去触发模块reducer方法修改数据
```js
 const { cr, dispatch } = useConcent({ connect: ['bar', 'baz'] });
// cr 是 connectedReducer 的缩写
const changeName = e=> cr.bar.changeName(e.target.value);
const changeName2 = e=> dispatch('bar/changeName', e.target.value);
```

### 即属于某个模块也连接多个模块
支持同时配置`module`和`connect`来满足组件即属于某个模块也连接多个模块的场景

即属于`foo`模块也连接`bar`、`baz`两个模块
```js
@register({module:'foo', connect:['bar', 'baz']})
function Demo(){
  const { state, connectedState } = useConcent({module:'foo', connect:['bar', 'baz']});
}
```
