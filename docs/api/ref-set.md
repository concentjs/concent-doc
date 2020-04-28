# set
更新指定stateKey的值

## 函数签名定义
```ts
type SetCallback = (
  value: any, 
  keyPath: string, 
  setContext: {moduleState:object, fullKeyPath:string},
) => object;

function sync(
  stateKey: string,
  value?: SetCallback | any, 
  renderKey?:string,
  delay?:number, 
): void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
stateKey | 欲绑定的stateKey名称，包含点符号表示多层key路径 | | String
value | 欲更新的值，如果传递的是event对象，从event.currentTarget.value里取；如果是一个函数，则取函数返回的值；其他类型则直接当做要更新的值 | undefined | SetCallback or Any
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如果使用
`set`和`sync`的区别是前者需要用户调用一次后就触发更新视图，后者调用一次后只是生成一个函数，将生成的函数再调一次才触发更新视图，其他使用方式和`sync`一样，更多使用方式请[查看sync](/api/ref-sync)
```js

run({
  foo:{
    state:{
      name:'',
      info:{
        name:''
      }
    }
  },
  bar:{
    state:{
      info:{
        name:''
      }
    }
  }
})

@register({module:'foo', connect:{bar:'*'}})
class Foo extends ReactComponent {

  render(){
    const { name, info } = this.state;
    const { bar } = this.connectedState;
    const { set } = this.ctx;

    return (
      <div>
        <input value={name} onChange={e=> set('name', e)} />
        <input value={info.name} onChange={e=> set('info.name', e)} />
        {/** 更新bar模块下的 info.name */}
        <input value={bar.info.name} onChange={e=> set('bar/info.name', e)} />
      </div>
    );
  }
}

```