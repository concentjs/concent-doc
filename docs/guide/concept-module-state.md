# 模块state

## 定义state
模块的state只是一个普通的javascript对象，按照你的业务需求定义即可，传递给模块配置的`state`属性。
```js
import { run } from 'concent';

run({
  foo:{
    state:{
      name: '',
      isEmpty: true,
      age: 222,
      hobbies: [],
      info: {}
    }
  }
});
```

## 全局state
concent内置了一个全局模块`$$global`，默认是一个空模块，你可以重写其`state`。
```js{4}
import { run } from 'concent';

run({
  $$global:{//重写内置模块的状态
    state:{
      themeColor:'red',
    }
  }
});
```

## 获取state
concent class组件可以从[实例上下文](/guide/concept-ref-ctx)`ctx`上相关属性去获取到：   
`js>>>this.state`或者`js>>>this.ctx.state`获取state、    
`js>>>this.ctx.moduleState`获取属于的模块state、    
`js>>>this.ctx.globalState`获取内置的全局state、    
`js>>>this.ctx.connectedState.{moduleState}`获取连接的模块state。   
对于使用了`useConcent`钩子函数的function组件，一样的也是从`ctx`上获取，唯一的区别是function组件里不存在`this`关键字，所以`实例state`直接从`ctx`上获取。
```js{3}
import { useConcent } from 'concent';

function FuncComp(){
  const ctx = useConcent('foo');// 返回当前组件的实例上线文对象
  const { state, moduleState, globalState, connectedState } = ctx;
}
```

> 属于某模块的组件，整个`模块state`将会合并到`实例state`上，如果组件没有对`state`做额外的字段扩展的话，`state`和 `moduleState`是一样的，如果做了额外的字段扩展（相当于私有的属性，不会被共享出去），那么只能从`实例state`上取到这些额外的字段值。   
> `globalState`取到的值总是最新，但是如果组件没有主动连接`$$global`模块的话，`$$global`模块的值发生变更是不会触发其渲染的，所以如果你的ui渲染不需要`$$global`数据参与，只是业务逻辑需要使用到`$$global`数据，则不需要主动连接到`$$global`模块。

![cc-module](/img/cc-assign-module-state.png)
