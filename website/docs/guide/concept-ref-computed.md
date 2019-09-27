# 实例computed

通过`ctx`为组件实例创建的计算函数称之为实例computed，同模块computed一样，当对应的stateKey依赖列表里有值发生变化时，才会触发计算
> 尽管实例compiuted可以对模块里的stateKey定义计算函数，但是任何情况下都应该优先考虑使用模块computed，因为模块computed在状态改变时只会计算一次，而实例computed是每个实例都会单独计算一次，所以仅当需要对私有状态定义计算函数时，才对其定义计算函数

![ref-computed](/concent-doc/img/ref-computed-process.png)

## 定义computed
实例computed定义在setup里完成定义。[查看更多关于实例computed](/api/ref-computed)
### hoc class
```js
import { regiser } from 'concent';

@regiser('foo')
class Comp extends React.Component{
  state = {privField: 'content'};

  $$setup(ctx){//等同于this.ctx
    ctx.computed('privField', (newVal, oldVal, fnCtx)=>{
      return newVal*2;
    })
  }
  
  render(){
    // 从refComputed获取计算结果
    const { privField } = this.ctx.refComputed;
  }
}
```
### hook component
```js
import { useConcent } from 'concent';

const setup = ctx=>{
  ctx.computed('privField', (newVal, oldVal, fnCtx)=>{
    return newVal*2;
  })
}

const iState = {privField: 'content'};

function Comp(){
  const ctx = useConcent({state:iState, setup});
  // 从refComputed获取计算结果
  const { privField } = ctx.refComputed;
}
```