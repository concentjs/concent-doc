# Group2 item

The item in group 122.

```js
// code in run-cc.js
import {run} from 'concent';

run(
  {
    foo:{
      state:{
        f1:1,
        f2:2,
      },
      reducer:{
        //reducer返回一个新的片断状态用于触发改模块的cc实例渲染
        updateF1({payload:f1}){
          return {f1};
        },
        //reducer不强制返回一个新的片断状态，可以通过dispatch调用组合其他reducer函数来完成具体的业务逻辑
        uploadF1:async ({dispatch, payload:f1})=>{
          await api.uploadF1(f1);
          await dispatch('updateF1', f1);
        }
      },
      watch:{
        f1(newVal, oldVal){
          //做一些其他的异步操作
        }
      },
      computed:{
        f1(newVal, oldVal){
          //对f1值做计算，当f1发生变化时，触发此函数，计算的值会缓存起来，在cc实例里通过this.$$moduleComputed取到
          return newVal*100;
        }
      },
      init:async(){
        const f1 = await api.getDataFromBackEnd();
        return {f1}
      }
    }
  }
);

```
