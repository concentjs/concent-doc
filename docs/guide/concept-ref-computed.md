# 实例computed

## 概述
通过`ctx`为组件实例创建的计算函数称之为实例computed，同模块computed一样，当对应的stateKey依赖列表里有值发生变化时，才会触发计算

通过下图我们可以看出，如果组件定义了setup，setup里定义了computed，实例computed被触发的时机有两个：
* 初始化组件的整个过程中，执行完setup之后，则开始执行setup里定义好的computed函数，即首次渲染之前，所有的computed函数都会被触发
* 修改状态之后，按depKeys定义触发相对应的computed函数，即首次渲染之后，按需触发部分computed函数

![ref-computed](/img/ref-computed-process.png)
[查阅api文档了解更多实例computed使用方法](/api/ref-computed)

> 尽管实例computed可以对模块里的stateKey定义计算函数，但是任何情况下都应该优先考虑使用模块computed，因为模块computed在状态改变时只会计算一次，而实例computed是每个实例都会单独计算一次，所以仅当需要对私有状态定义计算函数时，才对其定义计算函数

## 定义实例computed
实例computed定义在setup里完成定义。[查看实例computed api](/api/ref-computed)
### hoc class
在函数体内的setup块里定义`实例computed`
```js
import { register } from 'concent';

@register('foo')
class Comp extends React.Component{
  state = {privField: 2};

  $$setup(ctx){//等同于this.ctx
    ctx.computed('privField', (newState, oldState, fnCtx)=>{
      return newState.privField*2;
    })
  }
  
  render(){
    // 从refComputed获取计算结果
    const { privField } = this.ctx.refComputed;
  }
}
```

在函数体外的setup函数块里定义`实例computed`
```js
import { register } from 'concent';

const setup = ctx=>{
  ctx.computed('privField', (newState, oldState, fnCtx)=>{
    return newState.privField*2;
  })
}

@register({module:'foo', setup})
class Comp extends React.Component{
  state = {privField: 2};
  render(){
    // 从refComputed获取计算结果
    const { privField } = this.ctx.refComputed;
  }
}
```

### hook component
通过`useConcent`传入setup定义函数来实现`实例computed`定义的触发
```js
import { useConcent } from 'concent';

const setup = ctx=>{
  ctx.computed('privField', (newState, oldState, fnCtx)=>{
    return newState.privField*2;
  })
}

const iState = {privField: 'content'};

function Comp(){
  const ctx = useConcent({state:iState, setup});
  // 从refComputed获取计算结果
  const { privField } = ctx.refComputed;
}
```
