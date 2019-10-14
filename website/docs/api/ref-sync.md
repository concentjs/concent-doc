# sync
直接生成一个绑定了某个stateKey的更新函数，这意味着你在遇到一些组件的动作只负责更新某个stateKey的场景时，不必单独写一句setState调用，可以使用`sync`接口生成一个更新stateKey对应值的函数。

## 函数签名定义
```ts
type SyncCallback = (value:any, keyPath:string, syncContext:{moduleState:object, fullKeyPath:string}) => object;

function sync(
  stateKey: string,
  value?: SyncCallback | any, 
  renderKey?:string
  delay?:number, 
): void
```

## 参数解释
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
stateKey | 欲绑定的stateKey名称 | | String
value | 欲绑定的值，不绑定任何值时，从调用处的第一位参数提取值，如果第一位参数传递的是event对象，从event.currentTarget.value里取，否则就第一位参数的值当做要更新的值；如果绑定了一个具体的值，值是函数则将函数的返回值当做要更新的对象，否则将将具体的值当做stateKey要更新的值 | undefined | SyncCallback or Any
renderKey | 触发渲染的目标渲染Key | null | String
delay | 广播延迟时间，单位(ms) | 0 | Number

## 如何使用
- 不设定value值，直接绑定在传入事件对象的原始dom回调上
```js

run({
  foo:{
    state:{
      name:'',
    }
  }
})

@register('foo')
class Foo extends ReactComponent {
  state = {privateName:''};

  render(){
    //name来自模块foo， privateName来自实例自己的定义
    const {name, privateName} = this.state;
    const { sync } = this.ctx;

    // input onChange回调为: event=>any, sync自动提取event的value值更新到声明的stateKey下
    // 注意，name是模块里的stateKey，它的变化将同步到其他的实例上（如果存在其他也消费name）
    // privateName是自己私有，它的变化仅仅影响当前ui重渲染
    return (
      <div>
        {/** input onChange回调为: event=>any, sync自动提取event的value值更新到name下 */}
        <input value={name} onChange={sync('name')} />
        <input value={privateName} onChange={sync('privateName')} />
      </div>
    );
  }
}

```
- 不设定value值，直接绑定在传入更新值的自定义dom回调上
```js
import { Select } from 'antd';

const { Option } = Select;

@register('foo')
class Foo extends ReactComponent {
  state = {selectedColor:''};

  render(){
    const {selectedColor} = this.state;
    const { sync } = this.ctx;

    // Select onChange回调为: selectedValue=>any, sync直接将selectedValue更新到selectedColor下
    return (
      <div>
        <Select value={selectedColor} onChange={sync('selectedColor')} >
          <Option value="red">red</Option>
          <Option value="blue">blue</Option>
        </Select>
      </div>
    );
  }
}
```
- 设定非function类型的value值，将其作为更新到声明的stateKey下的目标值
```js
@register('foo')
class Foo extends ReactComponent {
  state = {selectedColor:''};

  render(){
    const { sync } = this.ctx;

    // Select onChange回调为: selectedValue=>any, sync直接将selectedValue更新到selectedColor下
    return (
      <div>
        <button onChange={sync('selectedColor', 'blue')}>change to blue</button>
        <button onChange={sync('selectedColor', 'red')}>change to red</button>
      </div>
    );
  }
}
```
- 设定function类型的value值，将自动提取的值做二次封装
```js
import { Select } from 'antd';

const { Option } = Select;

//keyPath: 'selectedColor', fullKeyPath: 'foo/selectedColor'
const syncCb = (value, keyPath, {moduleState, fullKeyPath})=> {
  return {[keyPath]:value, msg:''}
}

@register('foo')
class Foo extends ReactComponent {
  state = {selectedColor:'', msg:''};

  render(){
    const {selectedColor} = this.state;
    const { sync } = this.ctx;

    return (
      <div>
      {/** 每次改变selectedColor，将msg清空 */}
        <Select value={selectedColor} onChange={sync('selectedColor', syncCb)} >
          <Option value="red">red</Option>
          <Option value="blue">blue</Option>
        </Select>
      </div>
    );
  }
}
```
- 对多层级结构的json传值
```js
@register('foo')
class Foo extends ReactComponent {
  state = { info:{ detail: {name:''} } };

  render(){
    const {selectedColor} = this.state;
    const { sync } = this.ctx;

    return (
      <div>
        <input value={this.state.info.detail.name} onChange={sync('info.detail.name')} />
      </div>
    );
  }
}
```
- 修改其他模块状态的值
```js
@register({module:'foo', connect:{'bar':'*'}})
class Foo extends ReactComponent {
  render(){
    const { sync } = this.ctx;
    
    return (
      <div>
        <input value={this.connectedState.bar.name} onChange={sync('bar/name')} />
      </div>
    );
  }
}
```