

@register('foo')
class Foo extends Component{
  changeName(){
    this.setState(   {name: e.currentTarget.value});
  }
}