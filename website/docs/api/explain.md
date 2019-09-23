# Api导读
虽然concent为实例构造的`ctx`上注入了很多新特性api，但是一开始你可以不需要全部了解，只需要学会一下几点
- 知道使用`run`中心化的配置模块，`configure`去中心话的配置模块
- 知道使用`register`、`registerDumb`、`useConcent`来注册组件
- 知道使用`setState`、`dispatch`修改状态
在此基础上，根据使用场景需要了解其他api从而逐步全盘掌握concent

## 实例api
在**实例上下文**`ctx`里调用的api，[阅读更多关于实例上下文](/guide//concept-ref-ctx)

## 全局api
从`concent`包里直接导出，可以在任何地方调用的api
```js
import {
  run,
  register,
  configure,
  getState,
  //... etc
} from 'concent';
```
> 除了代码里导出使用，concent将api同时也挂载到了`window.cc`属性下，读者可以打开浏览器console，输入`cc`回车，查看或使用api，仅作为开发时的辅助功能，方便通过控制台快速验证和收集反馈。
