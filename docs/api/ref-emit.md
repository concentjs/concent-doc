# emit
发射事件，触发监听了相应事件名的组件执行其回调

## 函数签名定义
```ts
type EventDesc = {
  name: string,
  identity?: string,
};
type EventName = string;
type Identity = string;

function emit(
  event: EventName | [EventName, Identity] | EventDesc,
  ...args？: any[]
): void
```

## 参数解释
### 当event类型为`EventName`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 发射的事件名 | | EventName
args | 透传的不定长参数 | undefined | any[]

### 当event类型为`[EventName, Identity]`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 发射的事件名，指定的标识名| | [EventName, Identity]
args | 透传的不定长参数 | undefined | any[]

### 当event类型为`EventDesc`
名称 | <div style="width:250px;">描述</div> |  默认值  | 类型 
-|-|-|-  
event | 事件对象描述 | | EventDesc
event.name | 事件名 | | EventDesc
event.identity | 事件标识 | undefined | String

## 如何使用
在任意地方，通过实例上线文ctx.emit来触发事件发射
### 发射普通事件名
```js
// ******************* Class Component ***************
@register() //仅仅只是支持，不设定任何模块名
class Bar1 extends ReactComponent {
  $$setup(ctx){
    //推荐咋setup里完成事件监听，代替componentDidMount
    ctx.on('nameChanged', name=>{
      ctx.setState({name});
    })
  }

  render(){
    return <h1>{name}</h1>;
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

// ************* Demo Component to show emit ************
@register('foo')
class Foo extends ReactComponent {
  changeAndEmitName = (e)=>{
    const name = e.currentTarget.value;
    this.setState({name});
    this.ctx.emit('nameChanged', name);
  }

  render(){
    const { name } = this.state;
    return (
      <input value={name} onChange={this.changeAndEmitName} />
    );
  }
}
```
### 发射带标识的事件名
```js
// ************* store configuration ************
run({
  foo:{
    state:{
      books: [
        {id:1, name:'b1'},
        {id:2, name:'b2'},
      ]
    },
    computed:{
      //将books转换为map，key：id，value：book
      books(books){
        return books.reduce((map, cur)=>{
          map[cur.id] = cur;
          return map;
        },{})
      }
    }
  }
})

// ************* one Item ************
const setup = ctx=>{
  //用id当identity，监听同一个事件名
  ctx.on(['nameChanged', ctx.props.id], name=>{
    ctx.setState({name});
  })
};
function Item(props){
  const { state:{books}, moduleComputed } = useConcent({module:'foo', setup, props});
  const bookId_book_ = moduleComputed.books;
  const targetBook = bookId_book_[props.id];

  return <h1>{targetBook.name}</h1>;
}

// ************* Demo Component to show emit ************
@register('foo')
class Foo extends ReactComponent {
  state = {tmpName:''}

  randomChangeBookName(e){
    const name = e.currentTarget.value;
    const books = this.state.books;
    const ranIdx = parseInt(Math.random() * this.state.books.length);
    //随机抽一个id作为identity发射事件
    this.ctx.emit(['nameChanged', books[ranIdx].id], name);
  }

  render(){
    const { name } = this.state;
    return (
      <div>
        <input value={inputAge} onChange={this.randomChangeBookName} />
        {this.state.books.map(v=>{
          return <Item key={v.id} id={v.id} />
        })}
      </div>
    );
  }
}
```