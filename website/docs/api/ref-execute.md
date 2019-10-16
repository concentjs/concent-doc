# execute
`execute`定义执行回调，配合顶层api `execute`使用

## 函数签名定义
```ts

function execute(
  cb: (...args?: any[])=>void 
): void
```

## 如何使用
实例`execute`在`setup`里完成定义，给欲定义execute的组件显示的声明一个ccClassKey，方便顶层api指定目标触发execute回调
- 定义execute
```js
@register('foo', 'Foo')
class Foo extends Component{
  $$setup(ctx){
    ctx.execute((p1, p2)=>{
      console.log(p1, p2);
    })
  }
} 
```
- 触发execute
```js
import { execute, executeAll } from 'concent';

execute('Foo', 1, 2);//触发Foo组件所有实例的execute回调
executeAll(1, 2);//触发所有组件的execute回调（如果有定义）
```
> 当然，你也可以打开console，输入`js>>>cc.execute`去调用顶层api
