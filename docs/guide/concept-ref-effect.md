# 实例effect

## 概述
得益于`setup`函数能够被类组件和实例组件初次渲染前都能够被执行，且仅执行一次，`setup`函数定义的副作用函数可以达到统一类组件和函数组件生命周期的效果。   

如下图里3处箭头所指向的红框处，是触发`effect`执行的时机，此图里虽然描述的是`class组件`的生命周期，但是因为`function组件`组件里通过`useEffect`完全的对等模拟出`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`3个生命周期函数，所以concent提供的`effect`函数能够封装`class组件`和`function组件`的生命周期方法并对外提供一致的定义方式，使得用户可以采用更简单的编程模型来处理复杂的场景。


![ref-watch](/img/ref-effect-attention.png)

## 定义实例effect
下面代码示例演示类组件和函数组件如何共享生命周期函数定义。  
更多使用方式请点击[查看实例effect api](/api/ref-effect)
```js
import React, { useState, Component } from "react";
import { register, run, useConcent } from "concent";
run({
  counter: {
    state: { count: 12, msg: "--" },
  }
});

const setup = ctx => {
  console.log("setup仅在初次渲染之前执行一次");

  ctx.effect((ctx, isFirstCall) => {
    console.log('每一轮都会执行，等效于didMount + didUpdate');
  });

  //mock didUpdate
  ctx.effect((_, isFirstCall) => {
    console.log('除首次之外每一轮都会执行，等效于didUpdate');
    console.log(ctx.type, isFirstCall);
  ,null,false);
  //设置第三位参数为null，表示无任何依赖，每一轮都执行
  //设置第四位参数为false，表示初次渲染的时候不执行

  //mock didMount
  ctx.effect(() => {
    console.log('等效于didMount');
    console.log(ctx.type);
    return () => console.log('返回清理函数，等效于willUnmount');
  }, []);
  //设置第三位参数依赖数组为[]，表示仅首次渲染执行

  ctx.effect((ctx, isFirstCall) => {
    console.log('仅count值发生变化时才执行, 该函数会在首次渲染完毕后执行');
  }, ['count']);
  //注意这里传递的是stateKey名称，concent会自动
  //比较上一刻的count值和此刻是否不同来决定是否触发副作用函数

 ctx.effect((ctx, isFirstCall) => {
    console.log(`仅count值发生变化时才执行, 该函数会在首次渲染完毕后不会执行, ` +
    `因第四位参数immediate设置为了false`);
  }, ['count'], false);

  // effectProps 和 effect等效，只不过依赖数组传递的是propsKey名称
  ctx.effectProps(()=>{
    console.log('首次渲染完毕后会触发执行，之后tag变化才会执行');
  }, ['tag']);
  ctx.effectProps(()=>{
    console.log('首次渲染完毕后会并不会执行，之后tag变化才会执行');
  }, ['tag'], false);

  return {
    add: () => ctx.setState({count: ctx.state.count + 1})
};

// 定义类属于counter模块并传入setup
@register({ module: "counter", setup })
class Counter extends Component {
  render() {
    console.log("%c Counter", "color:green");
    const {
      settings: { add }
    } = this.ctx;
    return (
      <div style={{border:'1px solid silver', margin:'12px'}}>
        {this.state.count}
        <button onClick={add}>add</button>
      </div>
    );
  }
}

function FnCounter(props) {
  console.log("%c FnCounter", "color:green");
// 使用useConcent 定义函数组件属于counter模块并传入setup
  const ctx = useConcent({ module: "counter", setup, props });
  const {
    settings: { add }
  } = ctx;

  return (
    <div style={{border:'1px solid silver', margin:'12px'}}>
      {ctx.state.count}
      <button onClick={add}>add</button>
    </div>
  );
}

export default function App() {
  const [tag, setTag] = useState('---');
  return (
    <div className="App">
      <Counter tag={tag} />
      <FnCounter tag={tag} />
      <button style={{color:'red', fontWeight:800, padding:'6px'}} onClick={()=>setTag(Date.now())}>
        change tag to see ctx.effectProps's effect
      </button>
    </div>
  );
}

```


<a target="blink" class="seeDemoCodeOfArticle" style="background-image:/img/edit-on-codesandbox.png"
href="https://codesandbox.io/s/concent-guide-xvcej">在线编辑(拷贝App3-setup文件内容至App查看效果)</a>      


