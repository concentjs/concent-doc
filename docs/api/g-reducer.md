# reducer
成员`reducer`是一个属性，其值是一个包含了所有子模块`reducer函数`的对象。

## 代码里使用
```js
import { reducer } from 'concent';

// reducer.${moduleName}.${reducerFnName}
reducer.foo.changeName('newName');
```
> 大多数时候都应该优先选择用**实例上下文**`ctx`触发`reducer`函数，除非在一些特殊场合上下文没有`ctx`，才考虑用`全局reducer`去触发`reducer函数`
```js
// better
ctx.dispatch('changeName', 'newName');
ctx.reducer.foo.changeName('newName');
```

## console里使用
reducer挂载在`window.cc.reducer`下。
```
> cc.reducer.foo.changeName('newName')
```