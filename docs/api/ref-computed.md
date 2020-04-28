# computed
对指定的结果key设定回调函数和stateKey依赖列表，当stateKey依赖类列表里任意stateKey发生变化时，触发回调

::: tip | 优先考虑使用模块computed
如果是对模块状态里的stateKey定义computed，优先考虑使用模块computed，因为实例computed是每一个实例都会触发自己的computed定义，而模块computed只会触发一次
:::

## 函数签名定义
```ts
type ComputedFn = (
  oldVal:any,
  newVal:any, 
  fnCtx:FnCtx,
)=> any;

type ComputedFnDesc = {
  fn: ComputedFn,
  compare?: boolean,
  depKeys?: string[] | '*',
}


function computed(
  retKey: string,
  cb: ComputedFn,
): void;

function computed(
  retKey: string,
  computedDesc: ComputedFnDesc
): void;

function computed(multiComputed: {
  [retKey: string]: ComputedFn | ComputedFnDesc,
}): void;

function computed( fn: (ctx:RefCtx)=>{
  [retKey: string]: ComputedFn | ComputedFnDesc,
} ); void;
```

## 参数解释
- 重载1 `js>>>computed(retKey, cb):void`

名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
retKey | 在`ctx.refComputed`里的结果key，当retKey和stateKey同名时，不用显示的设定depKeys | | String
cb | 当depKeys里任意一个stateKey对应值发生变化时，要触发的计算函数，返回结果按retKey收集到`ctx.refComputed`下 | | ComputedFn

- 重载2 `js>>>computed(retKey, computedDesc):void`

名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
retKey | 见重载1的解释 | | String
computedDesc | 计算函数描述体 | | ComputedFnDesc
computedDesc.fn | 当depKeys里任意一个stateKey对应值发生变化时，要触发的计算函数，返回结果按retKey收集到`ctx.refComputed`下 | | Function
computedDesc.compare | 是否比较新旧值，默认true，设置对象类型的值时，注意reducer里要写为`js>>>return {info: {...info}}`，才会触发对info这个stateKey设定的计算函数，如果需要写为`js>>>return {info}`也能触发，这可以设定compare为false，表示只要设置了info这个stateKey的值，就触发其计算函数 | true | Boolean
computedDesc.depKeys | stateKey依赖列表，如果声明的retKey非stateKey时，必需显示的设定depKeys；设置为`*`表示任意一个stateKey发生变化都将触发计算函数 | [`${retKey}`] | String[] | '*'

- 重载3 `js>>>computed(multiComputed):void`
一次性定义多个retKey和其计算函数

- 重载4 `js>>>computed(fn):void`
函数式的定义多个retKey和其计算函数

## 如何使用
`computed`在`setup`里完成定义，[查看在线示例](https://stackblitz.com/edit/cc-computed)
```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { run, register } from 'concent';


run({
  foo: {
    state: {
      title: 'default title',
    },
    computed: {
      title(title) {
        return title.split('').reverse();
      }
    }
  }
});


@register('foo')
class Demo extends Component {

  state = {
    firstName: 'Jim',
    lastName: 'Green',
    privTitle: 'privTitle',
    info: {
      email: 'xx.@concent.com',
      age: 12,
      sex: 1,
      address: 'bj',
    }
  }

  $$setup(ctx){
    const { computed } = ctx;

    //一次性定义多个
    computed({
      title(title) {
        return title + '_^_^';
      },
      privTitle(privTitle){
        return privTitle + '_!!!';
      }
    });

    //定义fullName，触发时机依赖于firstName和lastName任意一个发生变化
    computed('fullName', (newState)=>{
      return `${newState.firstName}_${newState.lastName}`;
    }, ['firstName', 'lastName']);

    //对object类型的stateKey info设定compare为false
    computed('info', {
      fn(info, old, fnCtx){
        return Object.keys(info).map(k=>info[k]).join(' | ');
      },
      compare: false,//info 是object类型，设定为不做比较，只要set了就触发computed
    });

  }
  render() {
    const { title, privTitle, firstName, lastName, info } = this.state;
    const { title: reversedTitle } = this.ctx.moduleComputed;
    const { title: titleCu, privTitle: privTitleCu, fullName, info:infoCu } = this.ctx.refComputed;
    const sync = this.ctx.sync;

    return (
      <div style={{ margin: '8px', padding: '12px', border: '1px solid red' }}>
        <input value={title} onChange={e => this.setState({ title: e.currentTarget.value })} />
        <div className="row">
          <span className="title">module computed:</span> <span>{reversedTitle}</span>
        </div>
        <div className="row">
          <span className="title">class computed:</span> <span>{titleCu}</span>
        </div>
        <div className="row">
          <span className="title">privTitle refComputed:</span> <span>{privTitleCu}</span>
          <input value={privTitle} onChange={sync('privTitle')} />
        </div>
        <div className="row">
          <span className="title">fullName refComputed:</span> <span>{fullName}</span>
          <br />
          firstName:<input value={firstName} onChange={sync('firstName')} /> 
          <br />
          lastName:<input value={lastName} onChange={sync('lastName')} />
        </div>
        <div className="row">
          <span className="title">info refComputed:</span> <span>{infoCu}</span>
          <br />
          info.email:<input value={info.email} onChange={sync('info.email')} /> 
          <br />
          info.age:<input value={info.age} onChange={sync('info.age')} />
          <br />
          info.address:<input value={info.address} onChange={sync('info.address')} />
        </div>
      </div>
    );
  }
}

```