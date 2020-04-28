# 实例watch

## 概述
通过`ctx`为组件实例创建的观察函数称之为实例watch，同模块watch一样，当定义的依赖列表里有对应的stateKey值发生变化时，才会执行观察函数

通过下图我们可以看出，如果组件定义了setup，setup里定义了watch，实例watch被触发的时机有两个：
* 初始化组件的整个过程中，执行完setup之后，在首次渲染之前，所有的设置了immediate为true的watch函数都会被触发(默认是false)
* 之后的组件存在期，修改状态之后，按depKeys定义触发相对应的watch函数

![ref-watch](/img/ref-watch-attention.png)

> 尽管实例watch可以对模块里的stateKey定义计算函数，但是任何情况下都应该优先考虑使用模块watch，因为模块watch在状态改变时才可能触发执行一次，而实例watch是每个实例都可能触发执行一次，所以仅当需要对私有状态定义观察函数时，才对其定义实例watch

## 定时实例watch
实例watch定义在setup里完成定义。  
更多使用方式请点击[查看实例watch api](/api/ref-watch)
### hoc class
在函数体内的setup块里定义`实例watch`
```js
import { register } from 'concent';

@register('foo')
class Comp extends React.Component{
  state = {privField: 2};

  $$setup(ctx){//等同于this.ctx
    ctx.watch('privField', (newState, oldState, fnCtx)=>{
      console.log(`privField changed from ${newState.privField} to ${newState.privField}`);
    })
  }
}
```

在函数体外的setup函数块里定义`实例computed`
```js
import { register } from 'concent';

const setup = ctx=>{
  ctx.watch('privField', (newState, oldState, fnCtx)=>{
    console.log(`privField changed from ${newState.privField} to ${newState.privField}`);
  })
}

@register({module:'foo', setup})
class Comp extends React.Component{
  state = {privField: 2};
  render(){
    return 'your ui'
  }
}
```

### hook component
通过`useConcent`传入setup定义函数来实现`实例computed`定义的触发
```js
import { useConcent } from 'concent';

const setup = ctx=>{
  ctx.watch('privField', (newState, oldState, fnCtx)=>{
    console.log(`privField changed from ${newState.privField} to ${newState.privField}`);
  })
}

const iState = {privField: 'content'};

function Comp(){
  const ctx = useConcent({state:iState, setup});
  return 'your ui'
}
```