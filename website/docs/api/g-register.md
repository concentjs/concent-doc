# register

`register`函数负责将用户的普通`react类`注册成为`cc类`，变成`cc类`后，你的组件实例将获得更多的能力，具体请参考实例api章节

## 函数签名定义

```js
type RegisterOption = {
  module?:string,
  watchedKeys?: '*' | string[], //default *
  storedKeys?: '*' | string[],
  isSingle?:boolean
}

type Register = (
  option?: string | RegisterOption,
  ccClassKey?: string
) => (comp: ReactClass) => ConcentClass;
```

## 参数解释
### 当option类型为string
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
option | 注册参数 | `'$$default'` | `string`
ccClassKey | 不设定时，concent会自动生成一个，每一个cc类都必须有一个类名，通常这个名字可以和你的react类名保持一致，以便于理解，你的cc组件渲染到界面上后，react dom tree里看到的标签名字来自于你这里定义的名字 |  | `string` or `undefined`

### 当option类型为`RegisterOption`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-
option | 注册参数 |  | `RegisterOption`
option.module | 实例所属模块 | `$$default` | `string`
option.watchedKeys | 实例观察的`stateKey`范围，不设定时默认为`'*'`，表示所属模块的任意一个key发生变化都会触发当前实例渲染 | `'*'` | `string[]` or `'*'`
option.storedKeys | 组件销毁后，如果希望挂载回来时状态能够恢复回来，设置想要存储的key | [] | `string[]` or `undefined`
option.isSingle | 表示是否允许改cc类实例话多次，默认是false，允许一个cc类有多个cc实例 | `false` | `boolean` or `undefined`

> 理解`storedKeys`这一点要注意实例的stateKey分为3类   
1 watchedKeys 从所属模块状态的所有key里，挑选要观察的key    
2 storedKeys 表示不属于watchedKeys，但是希望被存储的key   
3 temporaryKeys 则表示随着组件卸载就丢失状态的key   
所以实例里的state是合成出来的，由module、self 两部分state合成得出


## 如何使用
假设store的state定义为如下，有3个模块:`foo`、`bar`、`$$global`
```js
run({
  foo:{
    state:{
      f1:1,
      f2:2
    }
  },
  bar:{
    state:{
      b1:11,
    }
  }
  $$global{
    state:{
      theme:'red'
    }
  }
})
```

### 注册成为指定模块的类
注册一个类Foo，观察和共享foo模块的f1值变化，我们在其构造器里申明一个初始的state
```js
import { register } from 'concent';
@register('Foo', {module:'foo', watchedKeys:['f1']})
class Foo extends Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      f1:100,
      f2:200,
      age:22
    };
  }
  render(){
    // 初次渲染打印：{f1:1, f2:2, age:22}
    console.log(this.state);
  }
}
```
可以看到f1尽管在constructor里申明了值为100, f2为200，但是打印的时候f1的值将从`store`里恢复为1，f2恢复为2,这是因为组件属于`foo`模块，该模块的所有转态都会被合并到state里。

### 观察其他模块的key变化
每一个cc类除了能够观察自己所属模块的key值变化，也能够观察其他模块的key值变化，其他模块的将从`this.$$connectedState`里获取
```js
import { register } from 'concent';
@register('Foo', {
  module:'foo', 
  watchedKeys:['f1'], 
  connect:{bar:'*'}}, //连接到bar模块，观察它的所有key值变化，
)
class Foo extends Component{
  render(){
    // 打印为：{b1:11}
    console.log(this.$$connectedState.bar);
  }
}
```
> 如果注册成为cc类时不指定模块，将被默认属于`$$default`模块，所以如果这个类不属于任何模块，但是同时观察和多个模块的key值变化，请使用[connect](api-top-connect)替代

## setState
成为cc类后，setState将得到增强，你的调用方式和原来一样，只是扩展了2个参数
```js
this.setState(partialState:object, cb:function, delay:number, identity:string)
```
在你的render里写入
```js
render(){
  return (
    <div>
      <label>{this.state.name}</label>
      <input value={this.state.age} onChange={(e)=>this.setState({age:e.currentTarget.value})}/>
    </div>
  );
}
```
如果你在别的地方实例化多个`Foo`，它们之间任意一个改变了age的值，另一个组件都将同步到数据并渲染
```js
<div>
  <Foo />
  <Foo />
</div>
```
如果我们对第三个参数写入delay值3000ms，其他组件将延迟3秒后同步到数据并发生变化
```js
<input value={this.state.age} onChange={(e)=>this.setState({age:e.currentTarget.value}, null, 3000)}/>
```
[了解更多关于setState](/api/ref-set-state)

## forceUpdate
同样的，cc的实例调用`forceUpdate`除了会强制触发属性当前实例的重渲染，当前实例观察的key所属模块下的其他cc实例也会被一起强制触发渲染
```js
this.forceUpdate(cb:function, delay:number, identity:string)
```
[了解更多关于forceUpdate](/api/ref-force-update)

## 其他实例api
其他实例api请点击左侧导航查看

## 在线示例
### [示例1](https://stackblitz.com/edit/ccapi-top-register-1?file=index.js)
演示cc类和react类的区别，以及帮助你理解
> * `watchedKeys`、`storedKeys`的作用
> * 实例的状态是被`concent`合成后交给实例的

### [示例2](https://stackblitz.com/edit/ccapi-top-register-2?file=index.js)
演示一个指定了具体模块同时也观察其他模块的cc类，帮助你理解
> 每个cc类都有自己的专属模块，数据从state上获取，如果想观察其他模块的变化，需要定义`connect`参数，实例可以从`$$connectedState`上获取