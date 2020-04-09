# 事件

## 概述
所有concent组件实例均能够在定义事件监听、发射事件和主动取消事件

## 事件监听
更多使用方式请点击[查看实例on api](/api/ref-on)

### 定义普通事件监听
在`setup`函数体内定义普通事件监听

```js
const setup = ctx=>{
  ctx.on('someEvent', (p1, p2, p3)=>{
    console.log(p1, p2, p3);
  })
}
```

### 定义携带id的事件监听
在`setup`函数体内定义携带id的事件监听
```js
const setup = ctx=>{
  ctx.on(['someEvent', ctx.props.productId], (p1, p2, p3)=>{
  // or ctx.on({name:'someEvent', identity:ctx.props.productId}, (p1, p2, p3)=>{
    console.log(p1, p2, p3);
  })
}
```
::: tip | 事件延迟触发
由于setup的执行时机是在组件初次渲染之前，当组件定义完监听事件但还未挂载时，如果此时实例接收到了事件则会主动暂存起来，直到实例挂载完毕再去触发事件监听回调
:::

## 发射事件
更多使用方式请点击[查看实例emit api](/api/ref-emit)

### 发射普通事件
使用实例api `emit`和顶层api `emit`均可发射普通事件

```js
import { useConcent, emit } from 'concent';

// 在组件里定义发射函数去发射
function FnComp(){
  const { emit } = useConcent();
  const emitEvent = ()=>emit('someEvent', 1, 2, 3);
  return <button onClick={emitEvent}>emit</button>;
}

// 通过顶层api直接发射
emit('someEvent', 1, 2, 3);
```

### 发射携带id的事件
通过携带id的事件进一步筛选接收事件的目标

```js
import { useConcent, emit } from 'concent';

// 在组件里定义发射函数去发射
function FnComp(){
  const { emit } = useConcent();
  const emitEvent = ()=>emit(['someEvent', 'id_1'], 1, 2, 3);
  return <button onClick={emitEvent}>emit</button>;
}

// 通过顶层api直接发射
emit(['someEvent', 'id_1'], 1, 2, 3);
```

## 取消事件监听
更多使用方式请点击[查看实例off api](/api/ref-off)

### 取消普通事件监听

```js
import { useConcent } from 'concent';

function FnComp(){
  const { off } = useConcent();
  // 当前实例主动取消someEvent监听事件
  const offEvent = ()=>off('someEvent');
  return <button onClick={offEvent}>off</button>;
}
```

### 取消携带id的事件监听

```js
import { useConcent } from 'concent';

function FnComp(props){
  const { off } = useConcent();
  // 当前实例主动取消someEvent监听事件
  const offEvent = ()=>off(['someEvent', props.productId]);

  return <button onClick={offEvent}>off</button>;
}

// 推荐将其定义在setup里
const setup = ctx=>{
  return {
    offEvent: ()=>ctx.off(['someEvent', ctx.props.productId]),
  }
}

function FnCompBetter(props){
  const { settings } = useConcent({props});// 透传props
  return <button onClick={settings.offEvent}>off</button>
}
```

::: tip | 组件销毁，监听自动取消
如果不是为了特殊的业务逻辑，你不需要人工去取消事件监听，因为在组件销毁之前，实例会主动取消相关事件的监听
:::