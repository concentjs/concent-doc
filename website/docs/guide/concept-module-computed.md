# 模块computed
`computed`定义当各个`stateKey`的值发生变化时，要触发的计算函数，并将其结果缓存起来，仅当`stateKey`的值再次变化时，才会触发计算。
```ts
type ComputedFn = (
  oldVal:any,
  newVal:any, 
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

## 定义computed
我们可以在模块`computed`属性的对象里定义计算，key就是获取计算结果的`retKey`，value就是`computed函数`或`computed描述体`。
```js
import { run } from 'concent';

run({
  foo:{
    state: {...},
    computed:{
      firstName(firstName)=> firstName.split('').reverse().join(''),
      fullName:{
        fn:(newState)=> `${newState.firstName}_${newState.lastName}`,
        depKeys: ['firstName', 'lastName'],
      }
    }
  }
});

```
当然，建议的做法是为模块单独定义一个计算函数文件，导出来给模块用
```js
// code in model/foo/computed.js
export function firstName(firstName){
  return firstName.split('').reverse().join('');
}

export const fullName = {
  fn:(newState)=> `${newState.firstName}_${newState.lastName}`,
  depKeys: ['firstName', 'lastName'],
}
```

### computed函数
当触发计算的依赖`stateKey`长度只有一个，且`retKey`和列表里的唯一元素同名时，我们可以直接定义`computed函数`,而不用显式的申明`stateKey`依赖列表
```js
// 推荐此写法，更简短
export function firstName(firstName){
  return firstName.split('').reverse().join('');
}

//等同于如下写法，显式的申明依赖列表，当firstName的值发生变化时，触发fn计算，结果收集到firstName下
export const firstName = {
  fn:(newState)=> `${newState.firstName}_${newState.lastName}`,
  depKeys: ['firstName'],
}
```
### computed描述体
当触发计算的依赖`stateKey`有多个，或者`retKey`名字和长度为1的依赖`stateKey`里的元素不同命时，需要显示的`stateKey`依赖列表
```js
//当firstName和lastName任意一个发生变化时，触发fn计算函数，结果收集到fullName下
export const fullName = {
  fn:(newState)=> `${newState.firstName}_${newState.lastName}`,
  depKeys: ['firstName', 'lastName'],
}
```

`retKey`和`stateKey`不同名时
```js
// code in model/foo/computed.js
export const shortName = {
  fn:(firstName)=> firstName.substr(0,5),
  depKeys: ['firstName'],
}

export const prefixedName = {
  fn:(firstName)=> `^_^${firstName}`,
  depKeys: ['firstName'],
}

/************************************************/

// code in page/foo/index.js
import { useConcent } from 'concent';

export default Foo(){
  const { moduleComputed } = useConcent('foo');
  //获取结果
  const {shortName, prefixedName} = moduleComputed;
}

```
当然，以上写法也可以就用`firstName`作为`retKey`来定义计算函数，这样就不用显示的申明依赖的`stateKey`了
```js
// code in model/foo/computed.js
export function firstName(firstName){
  return {
    shortName: firstName.substr(0,5),
    prefixedName: `^_^${firstName}`,
  }
}

/************************************************/

// code in page/foo/index.js

export default Foo(){
  const { moduleComputed } = useConcent('foo');
  //'firstName'是retKey，从它对应的值里解构出shortName, prefixedName
  const {shortName, prefixedName} = moduleComputed.firstName;
}
```
::: error-zh | retKey错误定义
当stateKey依赖列表长度是1，且唯一元素的名字不和模块的stateKey同名时，不可以将retKey写为stateKey
:::
错误定义
```js{4}
// 'firstName'隐含对应的depKeys是['firstName']，不可将其改写为['lastName']
export const firstName = {
  fn:(firstName)=> firstName.substr(0,5),
  depKeys: ['lastName'], // wrong !!!
}
```

## 触发计算
计算的触发时机有两个
- 模块被加载时，所有计算函数都会被触发(和该模块下有没有相关的组件被实例化没有关系)
- 模块的某些状态被改变时，这些状态key对应的计算函数被依次触发

::: tip | 注意
key对应的应该是primitive类型的（如number, string, boolean），如果是object型，则需要总是返回新的引用才能触发计算
:::
```js{13}
// code in models/foo/computed.js

//hobbies在模块状态里对应的值是一个数组
export function hobbies(hobbies, oldVal) {
  return hobbies.length * 2;
}

// code in models/foo/reducer.js
export function addHobby(hobby, moduleState){
  const { hobbies } = moduleState;
  hobbies.push(hobby);
  // return { hobbies };不会触发hobbies的计算函数
  return { hobbies: [...hobbies] };//正确的写法
}
```
如果需要`js>>>return { hobbies }`能触发计算，可将其计算定义写为计算描述体，并设置compare为false，只要对这个key设了值就触发计算
```js{3}
export const hobbies = {
  fn: (hobbies) => hobbies.length * 2,
  compare: false,//不做比较，只要片段状态里对设了`hobbies`的值，就触发计算
}
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
  }
}
```
- function组件里获取
```js
import { useConcent } from 'concent';

export default Foo(){
  const { moduleComputed } = useConcent('foo');
}
```
- RenderProps组件里获取
```js
import { registerDumb } from 'concent';

registerDumb('foo')(ctx=>{
  const { moduleComputed } = ctx;
});

```