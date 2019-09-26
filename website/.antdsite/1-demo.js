import React, { Component } from 'react';
import { register } from 'concent';

@register('foo')
class HelloComp extends Component {
  changeName = (e) => {
    // this.setState({name:e.currentTarget.value})

    this.ctx.dispatch('changeName', e.currentTarget.value);
    // or this.ctx.dispatch('changeNameAsync', e.currentTarget.value);
    // or this.ctx.dispatch('changeNameCompose', e.currentTarget.value);
  }
  render() {
    const { name, age, hobbies } = this.state;
    return (
      <div>
        name: <input value={name} onChange={this.changeName} />
        age: {age}
        hobbies: {hobbies.map((v, idx) => <span key={idx}>{v}</span>)}
      </div>
    );
  }
}

import { getState } from 'concent';

@register({ module: 'foo', watchedKeys: ['age'] })
class FooComp extends Component {
  submit() {
    //这个值才是最新的
    const { name, hobbies } = getState('foo');
  }
}

const foo = {
  state: { ... },
  reducer: {
    changeName(name) {
      return { name };
    },
    async changeNameAsync(name) {
      await api.track(name);
      return { name };
    },
    async changeNameCompose(name, moduleState, actionCtx) {
      await actionCtx.setState({ loading: true });
      await actionCtx.dispatch('changeNameAsync', name);
      return { loading: false };
    }
  }
}

export function changeName(name) {
  return { name };
}

export async function changeNameAsync(name) {
  await api.track(name);
  return { name };
}

export async function changeNameCompose(name, moduleState, actionCtx) {
  await actionCtx.setState({ loading: true });
  await actionCtx.dispatch(changeNameAsync, name);
  return { loading: false };
}

@register('foo')
class HelloComp extends Component {
  changeName = (e) => {
    // this.setState({name:e.currentTarget.value})

    this.ctx.dispatch('changeName', e.currentTarget.value);
    // or this.ctx.dispatch('changeNameAsync', e.currentTarget.value);
    // or this.ctx.dispatch('changeNameCompose', e.currentTarget.value);
  }
}

//当age发生变化时，对age做计算,
export function age(newVal, oldVal) {
  return newVal * 2;
}
//因为依赖key只有一个且和计算结果key同名，就可以像上面这样写
//等同于写为 export const age = {fn:..., depKeys:['age']}

//对firstName, lastName任意一个值发生变化时，计算新的fullName
export const fullName = {
  fn(newState, oldState, fnCtx) {
    // fnCtx.setted查看提交的状态key列表
    // fnCtx.changed查看提交的状态key列表里发生了变化的key列表
    // fnCtx.retKey查看当前函数的计算结果对应key，当前示例为 fullName
    return `${newState.firstName}_${newState.lastName}`;
  },
  depKeys: ['firstName', 'lastName'],//这里定义触发fullName计算的依赖key列表
}


@register('foo')
class HelloComp extends Component {
  $$setup(ctx) {
    ctx.watch('type', (newType) => {
      ctx.dispatch('fetchDataWhileTypeChanged', newType);
    });
  }
  render() {
    return (
      <select value={this.state.type} onChange={this.ctx.sync('type')}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    );
  }
}

// code in models/foo/computed.js

//hobbies是一个数组
export function hobbies(newVal, oldVal) {
  return newVal * 2;
}

// code in models/foo/reducer.js
export function addHobby(hobby, moduleState) {
  const { hobbies } = moduleState;
  hobbies.push(hobby);
  return { hobbies };
}

export const hobbies = {
  fn(newVal, oldVal) {
    return newVal * 2;
  },
  compare: false,
}

@register({ module: 'bar', connect: ['foo', 'baz'] })
class BarComp extends Component {
  render() {
    const bazState = this.state;
    const { fooState, bazState } = this.connectedState;
  }
}

@register('foo')
class HelloComp extends Component {
  $$setup(ctx) {
    //call ctx
  }
  render() {
    const {
      refComputed, moduleComputed, connectedComputed,
      connectedState, state, settings, dispatch, sync
      // etc ...
    } = ctx;
    // return ui
  }
}

// ----------------------------
import { useConcent } from 'concent';
const setup = ctx => {
  //call ctx
}

function HelloHookComp() {
  const ctx = useConcent({ module: 'foo', setup });
  const {
    refComputed, moduleComputed, connectedComputed,
    connectedState, state, settings, dispatch, sync
    // etc ...
  } = ctx;
  // return ui
}

docs
├─ README.md
├─ foo.md
├─ nested
│  └─ README.md
└─ zh
   ├─ README.md
   ├─ foo.md
   └─ nested
      └─ README.md



<script>
var _mtac = {};
(function() {
    var mta = document.createElement("script");
    mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500698304");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
})();
</script>