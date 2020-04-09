
## 加统计代码
```js
<script>
  var _mtac = {};
  (function() {
    var mta = document.createElement("script");
    mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500698304");

    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
  })();
</script>
```


## 注意事项1
开发运行的时候，刚启动时首先从 website/static/concent-doc目录拷贝所有资源到 website/public/concent-doc下，
**在调试过程中**，直接向website/public/concent-doc目录下添加资源即可看到实时效果，但是要注意：
所以npm run start 和 build 都是先copy website/public/concent-doc目录下正确的所有资源至website/static/concent-doc下做个备份，然后再交给gatsby命令去后面的动作，gatsby会用website/static/concent-doc的文件去做相关构建，这时候资源就是正确的了！

调试开发启动过程如下:
- copy website/public/concent-doc/* to website/static/concent-doc
> 如果缺少这一步，如`website/static`目录下的文件已过时，则则后面的`getsby develop`流程1将造成文件丢失
- getsby develop
> 1 清空 website/public
> 2 复制 website/static到website/public
> 3 开始webpack-dev-server启动流程

同理构建过程第一步也是`copy website/public/concent-doc/* to website/static/concent-doc`,确保资源总是正确的


## 注意事项1

doc 文档里使用了 `#`后 下一个标题必需是`##`, 否则点击搜索条会报错undefined