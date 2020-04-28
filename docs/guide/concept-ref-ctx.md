# 实例上下文

每一个组件实例都持有一个引用`ctx`指向concent为其构建的**实例上下文对象**，`ctx`在实例的初始化阶段完成构建，并被精心的索引起来保管在**concent全局上下文**中，直到实例被销毁，才会将其从**全局上下文**删除。

concent基于**依赖标记**、**引用收集**、**状态分发**原理工作，如下图所示，在`run`阶段配置好各个模块的定义（包含`configure`接口定义的模块），`register`阶段为各个组件标记好所属的模块（包含`useConcent`接口），观察的`stateKey`范围，当整个应用从根节点开始渲染时，所有的组件实例就按照模块、模块下的类这样的目录结构被索引起来，任何一个实例发起状态变更操作时，`ctx`上携带的模块信息可以让concent知道怎样将提交的状态精确的分发到其他实例上。
![cc-rrr](/img/cc-rrr.png)

**实例上下文**`ctx`是concent非常重要的一个概念，所有的实例api、相关状态、计算结果等都挂载在此对象上，从而让concent能够提供很多新的特性功能，增强`rect`组件，而不只是做**状态管理**。

## 获取实例上下文
### 类组件里获取
```javascript
import { register } from 'concent';

@register('foo')
class CounterComp extends Component {
  render() {
    const ctx = this.ctx;
  }
}
```
### RenderProps组件里获取
不定义`mapProps`情况下，concent默认直接将`ctx`交给render函数
```js
import { registerDumb } from 'concent';

const CounterRenderPropsComp = registerDumb('counter')(ctx => {
  //return ui
})
```
定义了`mapProps`，concent将`mapProps`返回结果交给render函数，但是我们可以在`mapProps`参数里拿到`ctx`, 然后透传给render函数
```js
import { registerDumb } from 'concent';

const mapProps = ctx=>{
  return {
    ctx,
    onItemChange: cityId=> ctx.dispatch('changeCity', cityId),
  };
}

//解构出mapProps透传的ctx
const UI = ({ctx, onItemChange}) => {
  //return ui
}

const CounterRenderPropsComp = registerDumb({module:'counter', mapProps})(UI);
```

### 函数组件里获取
使用`useConcent`钩子函数，直接就能获取到当前组件的`ctx`引用
```js
import { useConcent } from 'concent';

function CounterHookComp() {
  const ctx = useConcent('counter');
  // return ui
}
```

## ctx内容
### 属性
- ctx.state   
获取实例的状态，对于类组件来说，`js>>>this.state`和`js>>>this.ctx.state`指向的是同一个引用
- ctx.moduleState   
获取组件所属模块的状态
- ctx.globalState
- ctx.connectedState
- ctx.moduleComputed
- ctx.connectedComputed
- ctx.globalComputed
- ctx.refComputed

- ctx.type
- ctx.module
- ctx.reducerModule
- ctx.ccClassKey
- ctx.ccKey
- ctx.ccUniqueKey
- ctx.renderCount
- ctx.initTime
- ctx.storedKeys
- ctx.watchedKeys
- ctx.connect
- ctx.ccOption

### 方法
- ctx.reactSetState
- ctx.reactForceUpdate
- ctx.setState
- ctx.setModuleState
- ctx.setGlobalState
- ctx.forceUpdate
- ctx.dispatch
- ctx.lazyDispatch
- ctx.invoke
- ctx.lazyInvoke
- ctx.sync
- ctx.syncBool
- ctx.syncInt
- ctx.set
- ctx.setBool
- ctx.emit
- ctx.on
- ctx.off
- ctx.execute
- ctx.computed
- ctx.watch
- ctx.effect