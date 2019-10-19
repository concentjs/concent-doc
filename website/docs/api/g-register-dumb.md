# registerDumb
`registerDumb`是基于[CcFragment](/api/g-cc-fragment)封装的工厂函数，创建并返回一个CcFragment组件。

## 函数签名定义
```ts
function registerDumb(
  option?: string | RegisterOption,
  ccClassKey?: string
) => (comp: ReactClass) => CcFragmentWrapper;
```