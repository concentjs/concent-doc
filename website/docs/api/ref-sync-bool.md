# syncBool
生成一个绑定了某个stateKey的布尔值取反函数
::: warning-zh | 布尔值
stateKey对应的值类型是布尔类型才能正确取反
:::

## 函数签名定义
```ts
function syncBool(
  stateKey: string,
  renderKey?: string,
  delay?: number, 
): void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
stateKey | 欲绑定的stateKey名称，包含点符号表示多层key路径 | | String
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如何使用
除了不能显示的设定value，使用方式和`sync`一样，更多使用方式请[查看sync](/api/ref-sync)
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
    const { syncBool } = this.ctx;
    return (
      <div>
        <input type="radio" check={checked} onChange={syncBool('checked')} />
        <input type="radio" check={info.checked} onChange={syncBool('info.checked')} />
      </div>
    );
  }
}

```