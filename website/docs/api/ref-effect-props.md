# effectProps
定义实例的副作用函数，触发时机是在渲染完毕后，当依赖propKey列表里任意一个对应值发生变化时，其副作用函数就触发，在类组件里使用可以替代`componentDidMount`、`componentDidUpdate`，在函数组件使用可以替代`useEffect`

::: tip | 与effect区别
effect比较的是`state`状态key，effectProps是`props`属性key
:::

## 函数签名定义
```ts
function effectProps(
  cb: (refCtx: RefCtx, isFirstCall: boolean)=>void,
  depPropKeys?: string[],
  immediate?: boolean,
):void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
cb | 回调函数 | | Function
depPropKeys | 依赖propKey列表 | undefined | string[]
immediate | 是否立即执行 | true | Boolean

## 如何使用
`effect`在`setup`里完成定义，使用体验上和`useEffect`很像，不同的是`depPropKeys`传递的是propKey的名称，而非具体的值
### 指定关心的propKey变化
```js
const setup = ctx=>{
  //定义一个每一轮渲染后都执行的副作用函数
  ctx.effectProps(()=>{
    console.log('trigger when any of propKey1,propKey2 changed');
  }, ['propKey1', 'propKey2']);
}

function Foo(props){
  // !!! 注意透传 props
  useConcent({setup, props});
  // return ui
}
```

::: warning-zh | 需要透传props
注意不要忘了透传props，否则会照成 effectProps 失效
:::
