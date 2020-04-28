# on
定义监听的事件名和对应的回调

## 函数签名定义
```ts
type EventDesc = {
  name: string,
  identity?: string,
};
type EventName = string;
type Identity = string;

function on(
  event: EventName | [EventName, Identity] | EventDesc,
  cb: (...args: any[]) => void
): void
```

## 参数解释
### 当event类型为`EventName`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 监听的事件名 | | EventName
args | 接收到的不定长参数 | undefined | any[]

### 当event类型为`[EventName, Identity]`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 监听的事件名，设定的标识符，组件的不同实例可以设定不同的标识来监听同一个事件名  | | [EventName, Identity]
args | 接收到的不定长参数 | undefined | any[]

## 如何使用
在任意地方，通过实例上线文ctx.on来监听事件
### 定义事件监听
```js
// ******************* Class Component ***************
@register()
class Bar1 extends ReactComponent {
  $$setup(ctx){
    ctx.on('nameChanged', name=>{
      ctx.setState({name});
    })
  }
}

// ******************* Function Component ***************
const setup = ctx=>{
  ctx.on('nameChanged', name=>{
    ctx.setState({name});
  })
};
const iState = {name:''};
function Bar2(){
  const { state:{name} } = useConcent({setup, state:iState});
  return <h1>{name}</h1>;
}

```
### 设定标识定义事件监听
```js
@register()
class Bar1 extends ReactComponent {
  $$setup(ctx){
    ctx.on(['nameChanged', 'flag1'], name=>{
      console.log('trigger nameChanged flag1 callback');
    });
    ctx.on(['nameChanged', 'flag2'], name=>{
      console.log('trigger nameChanged flag2 callback');
    });
  }
}
```