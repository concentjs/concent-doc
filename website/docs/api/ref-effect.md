# effect
定义实例的副作用函数，触发时机是在渲染完毕后，当依赖stateKey列表里任意一个对应值发生变化时，其副作用函数就触发，在类组件里使用可以替代`componentDidMount`、`componentDidUpdate`，在函数组件使用可以替代`useEffect`

::: tip | 与watch区别
watch触发时机是在渲染前，需要定义retKey，effect触发在渲染后，不需要定义retKey
:::

## 函数签名定义
```ts
function effect(
  cb: (refCtx: RefCtx, isFirstCall: boolean)=>void,
  depKeys?: string[],
  compare?: boolean,
  immediate?: boolean,
):void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
cb | 回调函数 | | Function
depKeys | 依赖stateKey列表 | undefined | string[]
compare | 是否对objet型的值做比较，默认是false，表示只要set了就触发，需注意如果设置为true，需要基于immutable写法去做对象修改 | false | boolean
immediate | 是否立即执行 | true | Boolean

## 如何使用
`effect`在`setup`里完成定义，使用体验上和`useEffect`很像，不同的是`depKeys`传递的是stateKey的名称，而非具体的值
### 每次渲染后都执行
```js
const setup = ctx=>{
  //定义一个每一轮渲染后都执行的副作用函数
  ctx.effect(()=>{
    console.log('trigger every render');
  });
}

function Foo(){
  useConcent({setup});
  // return ui
}
```

### 模拟componentDidMount
仅在首次渲染结束后执行，此种写法可以模拟`componentDidMount`
```js
const setup = ctx=>{
  //第二为参数传递空数组
  ctx.effect(()=>{
    console.log('trigger every render');
  }, []);
}
```

### 模拟componentDidUpdate
除了首次渲染之外，每次渲染后都执行，此种写法可以模拟`componentDidUpdate`
```js
const setup = ctx=>{
  //写法1：
  //不传第第二位参数本表示每次渲染都执行，通过isDidMount来控制首次渲染不执行业务逻辑
  ctx.effect((ctx, isDidMount)=>{
    if(!isDidMount){
      console.log('mock componentDidUpdate');
    }
  });

  //写法2:
  //设定第二位参数为null，第三位参数immediate为false，控制首次渲染不执行其回调
  ctx.effect((ctx, isDidMount)=>{
    console.log('mock componentDidUpdate');
  }, null, false);
}
```

### 设定依赖stateKey列表
当具体stateKey列表里任意一个对应值发生变化时触发执行
```js
const setup = ctx=>{
  //stateKey可是是带模块前缀的
  ctx.effect((ctx, isDidMount)=>{
    console.log(`if belong module's state key 'name' or 'age' or connectModule otherModule's 'key1' value changed,trigger this`);
  }, ['name', 'age', 'otherModule/key1']);

}
```
::: warning-zh | depKeys范围
depKeys里声明的stateKey必需是组件所属的模块或者所连接的模块里的stateKey
:::