# 函数上下文
函数上下文指的是`computed`函数或者`watch`调用的目标函数的第三位参数，由concent负责生成并传入，主要负责读取触发对应函数时的一些上下文信息

### 出现在模块computed&watch

```js
const loginModel =  {
    state: {name:'', age:2},
    computed: {
      //第三位参数即是函数上下文
      fullName(newState, oldState, fnCtx){
        // fnCtx.setted 触发该函数时逻辑提交的片断状态keys ['name', 'age']
        // fnCtx.changed 触发改函数时逻辑改变的片断状态keys ['name', 'age']
        // fnCtx.committedState 触发改函数时逻辑改变的片断状态 {name:'new', age:2}

        return `new_${newState.name}`
      }
    },
    watch:{
      nameChanged:{
        //第三位参数即是函数上下文
        fn:(newState, oldState, fnCtx)=>{
          console.log('nameChanged');
        },
        depKeys:['name'],
      }
    }
  };

run({
  login:loginModel,
})

```


### 出现在实例computed&watch

```js
const setup = ctx=>{
  // 回调第三位参数即是函数上下文
  ctx.computed('fullName', (newState, oldState, fnCtx)=>{
     return `new_${newState.name}`
  })

// 回调第三位参数即是函数上下文
  ctx.watch('nameChanged', (newState, oldState, fnCtx)=>{
    console.log('nameChanged');
  }, ['name']);
}
```