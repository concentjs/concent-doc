# 实例setup

`setup`是针对组件实例提供的一个非常重要的特性，在类组件和函数组件里都能够被使用，它会在组件首次渲染之前会被触发执行一次，其返回结果收集在`ctx.settings`里，之后便不会再被执行，所以可以在其中定义`实例computed`、`实例watch`、`实例effect`等钩子函数，同时也可以自定义其他的业务逻辑函数并返回，方便组件使用。
> 利用setup只执行一次的特性，可以让函数组件省去重复渲染期间，重复生成临时闭包函数，同时需要手动调用`useCallback`等辅助优化函数

[查阅api文档了解更多关于setup](/api/ref-setup)

## 未接入store对比

- 一个传统的函数组件
```js
function TraditionalFnComp() {
  const [count, setCount] = useState(0);

  //重复渲染期间匿名函数被反复重创建
  const inc = () => setCount(count + 1);
  const dec = () => setCount(count - 1);

  //第二位参数传递具体的值来决定要不要执行副作用函数
  useEffect(() => {
    console.log('count changed');
  }, [count]);

  return (
    <div>
      count: {count}
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
}
```
- 接入setup的函数组件
```js

const setup = ctx => {
  //效果等同于useEffect, 在组件渲染完毕之后执行
  //第二位参数传递名称就可以了，concent会自动对比这个key的值是否发生变化
  ctx.effect(() => {
    console.log('count changed');
  }, ['count']);

  //返回结果收集在settings里
  return {
    inc: () => ctx.setState({ count: ctx.state.count + 1 }),
    dec: () => ctx.setState({ count: ctx.state.count - 1 }),
  }
}

const iState = { count: 0 };//初始的状态值
function TraditionalFnComp() {
  const { 
    state: { count }, settings: { inc, dec } 
  } = useConcent({ setup, state: iState });

  return (
    <div>
      count: {count}
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
}
```

## 接入store
接入store非常方便，仅仅是声明所属模块就可以了，如下示例，假设我们已配置`counter`模块，然后就可以很快接入
```js

const setup = ctx => {
  ctx.effect(() => {
    console.log('count changed');
  }, ['count']);

  return {
    inc: () => setCount({ count: ctx.state.count + 1 }),
    dec: () => setCount({ count: ctx.state.count - 1 }),
    incStoreCount: () => ctx.setState({ count: ctx.state.storeCount + 1 }),
    decStoreCount: () => ctx.setState({ count: ctx.state.storeCount - 1 }),
    //如果逻辑复杂，抽离到了reducer，也可以写为
    // incStoreCount: () => ctx.dispatch('inc'),
    // decStoreCount: () => ctx.dispatch('dec'),
  }
}

const iState = { count: 0 };//此state相当于组件的私有状态
function HookFnComp() {
  const { 
    state: { count, storeCount }, settings: { inc, dec, incStoreCount, decStoreCount } 
  } = useConcent({ module:'counter', setup, state: iState });

  return (
    <div>
      count: {count}
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
      storeCount: {storeCount}
      <button onClick={incStoreCount}>+</button>
      <button onClick={decStoreCount}>-</button>
    </div>
  );
}
```

## 增强组件功能
`setup`提供了一个独立的空间，配合传递的**实例上下文对象**`ctx`，来对组件实现功能增强。
```js
const setup = ctx => {
  //count变化时的副作用函数，第二位参数可以传递多个值，表示任意一个发生变化都将触发此副作用
  ctx.effect(() => {
    console.log('count changed');
  }, ['count']);
  //每一轮渲染都会执行
  ctx.effect(() => {
    console.log('trigger every render');
  });
  //仅首次渲染执行的副作用函数
  ctx.effect(() => {
    console.log('trigger only first render');
  }, []);

  //定义实例computed，因每个实例都可能会触发，优先考虑模块computed
  ctx.computed('count', (newVal, oldVal, fnCtx)=>{
    return newVal*2;
  });

 //定义实例watch，区别于effect，执行时机是在组件渲染之前
 //因每个实例都可能会触发，优先考虑模块watch
  ctx.watch('count', (newVal, oldVal, fnCtx)=>{
    //发射事件
    ctx.emit('countChanged', newVal);
    api.track(`count changed to ${newVal}`);
  });

  //定义事件监听，concent会在实例销毁后自动将其off掉
  ctx.on('changeCount', count=>{
    ctx.setState({count});
  });

  return {
    inc: () => setCount({ count: ctx.state.count + 1 }),
    dec: () => setCount({ count: ctx.state.count - 1 }),
  };
}


```