# syncInt
生成一个更新所声明的stateKey值的函数，自动对其输入值做number类型转换
::: warning-zh | 关于float转换
`syncInt`只做parseInt转换，这意味输入过程中如'12.'会被立即转为'12'，如果想丢float输入做转换可使用最灵活的`sync`，重写syncCallback做自定转换规则
:::

## 函数签名定义
```ts
type SyncCallback = (
  value: any, 
  keyPath: string, 
  syncContext: {moduleState:object, fullKeyPath:string},
) => object;

function syncInt(
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
      selectedAge: 19,
      inputAge: 22,
    }
  }
})

@register('foo')
class Foo extends ReactComponent {
  render(){
    const { selectedAge, inputAge } = this.state;
    const { syncInt } = this.ctx;
    return (
      <div>
        <Select value={selectedAge} onChange={syncInt('selectedColor')} >
          <Option value={19}>19</Option>
          <Option value={22}>22</Option>
        </Select>
        <input value={inputAge} onChange={syncInt('inputAge')} />
      </div>
    );
  }
}

```