# setBool
对指定stateKey的布尔值取反
::: warning-zh | 布尔值
stateKey对应的值类型是布尔类型才能正确取反
:::

## 函数签名定义
```ts
function setBool(
  stateKey: string,
  renderKey?: string,
  delay?: number, 
): void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
stateKey | 欲更新的stateKey，包含点符号表示多层key路径 | | String
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如何使用
`setBool`和`syncBool`的区别是前者需要用户调用一次后就对stateKey值取反并触发更新视图，后者调用一次后只是生成一个函数，将生成的函数再调一次才对stateKey值取反并触发更新视图，其他使用方式和`syncBool`一样，更多使用方式请[查看syncBool(/api/ref-sync-bool)
```js

run({
  foo:{
    state:{
      checked: false,
      info:{
        checked: false,
      }
    }
  }
})

@register('foo')
class Foo extends ReactComponent {
  render(){
    const { checked, info } = this.state;
    const { setBool } = this.ctx;
    return (
      <div>
        <input type="radio" check={checked} onChange={()=> setBool('checked')} />
        <input type="radio" check={info.checked} onChange={()=> setBool('info.checked')} />
      </div>
    );
  }
}

```