# 模块computed
`computed`可以定义多个计算结果键`retKey`，每一个`retKey`对应一个计算函数，首次载入模块时，将按定义顺序依次执行完所有的计算函数并将其结果缓存起来。

```ts
type ComputedFn = (
  oldState:any,
  newState:any, 
  fnCtx:FnCtx,
)=> any;

type ComputedFnDesc = {
  fn: ComputedFn,
  compare?: boolean,
  depKeys?: string[],
}

type ComputedValueDef = ComputedFn | ComputedFnDesc;
```
读者可fork此[在线示例](https://stackblitz.com/edit/cc-computed)做修改来加深理解。

## 依赖收集
在首次载入模块执行完所有计算函数时，依赖收集系统将收集到各个计算函数的依赖列表`depKeys`，此后对于任意一个`retKey`来说，仅当它的`depKeys`里的对应的值再次变化时，才会再次触发它的计算函数

我们可以在子模块`computed`属性的对象里定义计算，key就是获取计算结果的`retKey`，value就是`computed函数`或`computed描述体`。

```js
import { run } from 'concent';

run({
  foo:{
    state: {
      firstName:'Jim',
      lastName:'Green',
      nickName:'xx',
    },
    computed:{
      // firstName收集到的的依赖是 ['firstName']
      firstName: (n)=> n.firstName.split('').reverse().join(''),
      // fullName收集到的依赖是 ['firstName', 'lastName']
      fullName: (n)=> `${n.firstName}_${n.lastName}`,
      // funnyName基于fullName的计算结果做2次计算，收集到的依赖是 ['nickName', 'firstName', 'lastName']
      funnyName: (n, o, f)=> `${n.nickName}_${f.cuVal.fullName}`,
    }
  }
});
```

当然，建议的做法是为模块单独定义一个计算函数文件，导出来给模块用

```js
// code in models/foo/computed.js
export function firstName(newState){
  return newState.firstName.split('').reverse().join('');
}

export function fullName(newState){
  return `${newState.firstName}_${newState.lastName}`;
}

// 这里的函数书写顺序很重要，因为funnyName需要用到fullName计算结果，必需写在fullName函数之后
export function funnyName(n, o, f){
  return `${n.nickName}_${f.cuVal.fullName}`;
}
```

## 依赖标记
对于复杂的计算函数，用户需要将参与计算的因子提前声明在函数块的头部，方便concent载入模块执行完所以的计算函数时收集正确的依赖
> concent只会在首次执行所有的计算函数时收集计算依赖，此后便不再有收集行为产生，所以要求用户提前把所有可能参与计算的因子声明在函数块的头部

**错误的复杂计算示例**    

```js
// 收集的依赖可能是 ['nickName', 'lastName']
// 也可能是 ['nickName', 'firstName']
export function complexName(n, o, f){
  if(n.nickName == 'xx'){
    return `${n.nickName}_${n.lastName}`;
  }else{
    return `${n.nickName}_${n.firstName}`;
  }
}
```

如果用户明确依赖关系的话，concent支持使用`depKeys`参数人工标记依赖关系列表，以上示例可修正为

```js
export const complexName = {
  fn:()=>{
    if(n.nickName == 'xx'){
      return `${n.nickName}_${n.lastName}`;
    }else{
      return `${n.nickName}_${n.firstName}`;
    }
  },
  depKeys:['nickName', 'firstName', 'firstName']
}
```

如果不想显示的标记依赖，则需要按照约定将参与计算的因子提前声明在函数块的头部，所以正确的复杂计算示例应该如下

```js
export function complexName(n, o, f){
  const { firstName, lastName, nickName } = n;
  if(nickName == 'xx'){
    return `${nickName}_${lastName}`;
  }else{
    return `${nickName}_${firstName}`;
  }
}
```

## 同名计算键
如果计算键的名字和模块状态里的某个`stateKey`同名，则会为`retKey`自动生成一个包含此`stateKey`的依赖列表

```js
// code in models/foo/computed.js

// 此函数体内没有用到任何其他计算因子参与计算，因`retKey`和`stateKey`同名，
// concent为它的生成的依赖列表为['firstName']
export firstName(){
  return `just_for_fun_${Date.now()}`;
}
```

如果想要关闭此规则，需要显示的传递`depKeys`为空列表

```js
export const firstName = {
  fn:()=>{
    return `just_for_fun_${Date.now()}`;
  },
  depKeys:[], //显示的指定依赖列表为空
}
```

当然了，这里也支持调用`defComputed`来封装此函数

```js
import { defComputed } from 'concent';
// defComputed(fn:Function, depKeys?:string[], compare?:boolean, sort?:number)

export const firstName = defComputed(()=>{
  return `just_for_fun_${Date.now()}`;
}, [])
```

此时`firstName`变成了一个固定的计算结果，初次计算完毕后，没有任何机会再触发它的变化了，可以进一步使用`defComputedVal`改写

```js
import { defComputedVal } from 'concent';
// defComputedVal(fn:Function, compare?:boolean, sort?:number)

export const firstName = defComputedVal(`just_for_fun_${Date.now()}`);
```


## 触发计算
计算的触发时机有两个    
- 模块被加载时，所有计算函数都会被触发(和该模块下有没有相关的组件被实例化没有关系)
- 模块的某些状态被改变时，按各个`retKey`依赖列表挑出需要执行的计算函数并逐个执行

::: tip | 注意
key对应的应该是primitive类型的（如number, string, boolean），如果是object型，则需要总是返回新的引用才能触发计算
:::

```js{13}
// code in models/foo/computed.js

//hobbies在模块状态里对应的值是一个数组
export function hobbies(n, o) {
  return n.hobbies.length * 2;
}

// **********************************************

// code in models/foo/reducer.js

export function addHobby(hobby, moduleState){
  const { hobbies } = moduleState;
  hobbies.push(hobby);
  // return { hobbies };不会触发hobbies的计算函数
  return { hobbies: [...hobbies] };//正确的写法
}
```

如果需要`js>>>return { hobbies }`能触发计算，可将其计算定义写为计算描述体，并设置compare为false，表示只要对这个key设了值就触发计算

```js{3}
export const hobbies = {
  fn: (n) => n.hobbies.length * 2,
  compare: false,//不做比较，只要片段状态里对设了`hobbies`的值，就触发计算
}
```

或者启动concent时，全局配置`computedCompare`参数为`false`，表示只要有设值行为就触发计算
> 该配置对所有模块的计算函数均有效，如果此时想针对某些计算函数失效，单独为其配置compare为true即可

```js
run({
  foo:{...},
},{
  computedCompare: false, // 默认为true
})
```

## 获取计算结果

通过实例上下文`ctx.moduleComputed`属性下的对象去获取，该对象的key就是computed里定义的各个`retKey`。

- 类组件里获取

```js
import { register } from 'concent';

@register('foo')
class Foo extends Components{
  render(){
    const moduleComputed = this.ctx.moduleComputed;

    return <h1>{moduleComputed.fullName}</h1>
  }
}
```

::: tip | 动态的依赖收集
渲染函数里的依赖收集是每一轮渲染过程中都在实时收集的，如上面例子，因fullName的依赖是['firstName', 'lastName']，所以当前实例的依赖是['firstName', 'lastName']，当用户额外加一个开关，在某一次渲染不再读取fullName时，则当前实例依赖列表为空，这意味着其他任意地方修改了模块的firstName值时，尽管触发了模块计算函数fullName重计算，但是不会触发改实例重渲染
:::

```js
@register('foo')
class Foo extends Components{
  state = {show:true};
  render(){
    const { show } = this.state;
    const { moduleComputed, syncBool }= this.ctx;

    return (
      <div>
        {/**当show为false时，当前实例的依赖列表为空*/}
        {show ? <h1>{moduleComputed.fullName}</h1> : ''}
      </div>
    )
  }
}
```

- function组件里获取

```js
import { useConcent } from 'concent';

export default Foo(){
  const { moduleComputed } = useConcent('foo');

  return <h1>{moduleComputed.fullName}</h1>
}
```

失去依赖的函数组件写法示范

```js
const iState = ()=>({show:true});
export default Foo(){
  const {
    state, moduleComputed, syncBool 
  } = useConcent({module:'foo', state:iState});

  return (
    <div>
      {/**当show为false时，当前实例的依赖列表为空*/}
      {state.show ? <h1>{moduleComputed.fullName}</h1> : ''}
    </div>
  )
}
```
