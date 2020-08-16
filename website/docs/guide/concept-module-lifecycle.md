# 模块lifecycle_[v2.9+]
提供`initState`、`initStateDone`、`loaded`、`mounted`、`willUnmount`五个可选的生命周期函数

### initState
适合做一些异步的初始化状态工作
```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export async function initState(){
  const data = await api.fetData();
  return data;
}
```

### initStateDone
`initState`执行结束后的业务逻辑
```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export function initStateDone(dispatch, moduleState){
  dispatch(rd.nextStep);
}
```

### loaded
模块载入完毕时执行的工作，当我们的异步状态初始化工作需要放置到`reducer`内部方便可重用时，推荐使用`loaded`替代`initState`
```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export function loaded(dispatch, moduleState){
  dispatch(rd.initState);//调用reducer里的状态初始化函数
}
```

### mounted
当该模块的第一个组件挂载完毕时需要触发的函数，和`loaded`的最大区别是执行时机不同，`mounted`是由组件实例挂载完毕驱动触发，而`loaded`是模块载入完毕就触发执行。

当你的状态初始化流程是依赖组件实例存在时才开始执行，则可考虑`mounted`替代`loaded`

```js
// code in models/foo/lifecyle.js
import * as rd from './reducer';

export function mounted(dispatch, moduleState){
  dispatch(rd.initState);//调用reducer里的状态初始化函数
}
```

`mounted`默认只触发一次，即组件如果销毁再次挂载回来并不会触发，如果需要满足条件时反复执行，则需要返回false
```js
export function mounted(dispatch, moduleState){
  dispatch(rd.initState);
  return false;
}
```

### willUnmount
当该模块的最后一个组件卸载时需要触发的函数，通常用于清理工作，如果需要满足条件时反复执行，需要返回false
```js
export function willUnmount(dispatch, moduleState){
  dispatch(rd.clearUp);
  return false;
}
```

![run-module](/concent-doc/img/cc-run-module-v1.png)
> 结合这5个函数，你可以完全吧实例里处理处理模块逻辑的生命周期函数逻辑迁移到`lifecycle`里