# useConcent

`useConcent`函数负责将用户的普通react函数组件注册成为concent组件，并返回实例上下文

## 导出方式
从concent里可直接导出并使用

```js
import { useConcent } from 'concent';
```

或从默认导出里调用

```js
import cc from 'concent';

// 在函数组件里调用 cc.useConcent
```

## 注册属于某个模块

```js
function Test(){
  const ctx = useConcent('foo');
  console.log(ctx.state);// 获得foo模块和私有状态合并后的状态
  console.log(ctx.moduleState);// 获得foo模块状态
}
```

此处也可写为对象形式

```js
const ctx = useConcent({module:'foo'});
```

当不传递任何参数时，当前组件属于内置的`$$default`模块

```js
const ctx = useConcent();
```

## 注册组件到其他模块

```js
function Test(){
  const ctx = useConcent({connect:['bar']});
  console.log(ctx.connectedState.bar);// 获得bar模块的状态
}
```

## 注册组件即属于某个模块又连接其他模块

```js
function Test(){
  const ctx = useConcent({module: 'foo', connect:['bar']});
}
```

## 配合setup使用

[查看更多关于setup](/api/ref-setup)

```js
const setup = ctx => {
  ctx.effect(()=>{
    console.log('didMount');
    return ()=> console.log('clear up');
  }, []);

  return {
    changeFoo: ()=> ctx.setState({fkey1: 'newVal'}),
     // mr === moduleReducer
    changeFooKey1: ()=> ctx.mr.changeFooKey1('payloadVal'),
    changeBar: ()=> ctx.setModuleState('bar', {barkey1: 'newValforBar'}),
    // cr.bar === connectedReducer.bar
    changeBarKey1: ()=> ctx.cr.bar.changeBarKey1('payloadValForBar'),
  }
}

function Test(){
  const ctx = useConcent({module: 'foo', connect:['bar'], setup});
}

```

如需在setup内部获取到组件的props，需要通过`useConcent`透传

```js
const setup = ctx=>{
  console.log(ctx.props);
}

function Test(props){
  const ctx = useConcent({ setup, props});// 透传props
}

```