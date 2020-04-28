# off
取消事件监听。
::: tip | 自动取消监听
concent会在每一个实例销毁前自动取消掉实例对应的相关事件监听，所以大多数时候你不休要人工调用`off`来取消监听（除非有特殊的业务逻辑）
:::

## 函数签名定义
```ts
type EventDesc = {
  name: string,
  identity?: string,
};
type EventName = string;
type Identity = string;

function off(
  event: EventName | [EventName, Identity] | EventDesc,
): void
```

## 参数解释
### 当event类型为`EventName`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 取消监听的事件名 | | EventName

### 当event类型为`[EventName, Identity]`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 取消监听的指定标识的事件名  | | [EventName, Identity]

## 如何使用
在任意地方，通过实例上线文ctx.off来监听事件
### 定义事件监听
```js
@register()
class Bar1 extends ReactComponent {
  $$setup(ctx){
    ctx.on('nameChanged', ()=> console.log('nameChanged'));
  }

  offNameChangedEv = ()=>{
    this.ctx.off('nameChanged');
  }

  render(){
    return <button onClick={this.offNameChangedEv}>off</button>
  }
}

```