---
heroImage: /favicon.png
# actionText: Get Started →
# actionLink: /guide/first-sight
home: true
showStar: true
# features:
#   - title: 高性能
#     details: Feature1 Details...
#   - title: Feature2
#     details: Feature2 Details...
#   - title: Feature3
#     details: Feature3 Details...
---

<a class="getStarted" href="./guide/first-sight">
  Get Started ➜
</a>


<div style="display:flex; flex-wrap: wrap; justify-content: center;">

  <a href='https://www.npmjs.com/package/concent' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/package-json/v/concentjs/concent/master.svg?label=npm%20version' alt='npm version' height='22px' style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/npm/dw/concent.svg?label=downloads' alt='downloads' height='22px'  style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/commit-activity/m/concentjs/concent.svg' alt='commit activity' height='22px' style="max-width:200px;"/>
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/npm/l/concent.svg' alt='license:MIT' height='22px' style="max-width:200px;" />
  </a>

  <a href='#' style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/followers/fantasticsoul.svg?style=social' alt='followers' height='22px' style="max-width:200px;" />
  </a>

  <a href='https://github.com/concentjs/concent' target="blink" style='margin: 0 0.5rem;'>
  <img src='https://img.shields.io/github/stars/concentjs/concent.svg?style=social' alt='concent star' height='22px' style="max-width:200px;"/>
  </a>
</div>

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">What can <span style="font-weight:600;" >Concent</span> offer you</h2>
<div style="display:flex; justify-content:flex-start; flex-flow: row wrap;">

  <div class="featureWrap">
    <div class="featureImgBase featureImg1 fibs1"></div>
    <h2>simple core api</h2>
    <p class="featureContent">
      use 'run' to load model configuration, use 'register' to decorate class component, or use 'useConcent' to decorate function component.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg2 fibs2"></div>
    <h2>zero-cost-use</h2>
    <p class="featureContent">
      no [Provider] any more, the decorated component can be interactive with store by [setState] directly.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg3 fibs3"></div>
    <h2>friendly model configuration</h2>
    <p class="featureContent">
      except state, you can also define reducer、computed、watch and init optionally to cover all your scene.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg4 fibs4"></div>
    <h2>flexible data consumption granularity</h2>
    <p class="featureContent">
      your can consume multi model data with state key level dependency.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg5 fibs4"></div>
    <h2>progressive</h2>
    <p class="featureContent">
      except setState, you can also use dispatch or invoke to change state, separate your business logic and ui completely.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg6 fibs3"></div>
    <h2>enhance component ability</h2>
    <p class="featureContent">
      support ref level computed 、watch、emit&on、setup etc.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg7 fibs2"></div>
    <h2>highly consistent coding experience</h2>
    <p class="featureContent">
      no matter class component or function component, they can enjoy the same api call.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg8 fibs1"></div>
    <h2>high performance rendering mechanism</h2>
    <p class="featureContent">
      working based on dependency mark、ref collection and state broadcast，built-in renderKey、lazyDispatch、delayBroadcast feature.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg9 fibs1"></div>
    <h2>clean dom hierarchy</h2>
    <p class="featureContent">
      use reverse inheritance strategy for class component by default, to let your react dom tree keep clean.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg10 fibs2"></div>
    <h2>middleware and plugin is supported</h2>
    <p class="featureContent">
      allow user customize middleware to intercept data changing behavior to do something else, allow user customize plugin to enhance concent ability.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg11 fibs3"></div>
    <h2>de-centralization model configuration</h2>
    <p class="featureContent">
      allow user call configure api to configure you model definition, that means you can publish your component to npm with model.
    </p>
  </div>

  <div class="featureWrap">
    <div class="featureImgBase featureImg12 fibs4"></div>
    <h2>model clone</h2>
    <p class="featureContent">
      allow user clone new model by existed model, to meet the abstract factory need.
    </p>
  </div>

</div>

___
<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  How to <span style="font-weight:600;" >install</span>
</h2>

```bash
npm install concent --save

//or 

yarn add concent
```

<!-- <div style="text-align: center;">
  <img src="/concent-doc/img/install-concent.png" width="780px" style="margin:0 auto"/>
</div> -->

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  <span style="font-weight:600;">Key features</span> preview
</h2>

<a class="seeDemoCode textLeft" rel="noopener" target="blank" href="https://codesandbox.io/s/hello-concent-pzde3?file=/src/App.js:50-92">
  ❤️Enjoy <span style="font-weight:600;" >composition api</span>  with 🔥dependency collection🔥
</a>
<br />

```js{3}
import { run, useConcent } from "concent";

run();// startup concent

const setup = ctx => {
  const { initState, computed, watch, setState } = ctx;
  // init ref state
  initState({ count: 0 });
  // defined a computed fn, here dep is count, 
  // only count value changed will trigger this computed fn execute again
  computed("doubleCount", n => n.count * 2);
  // defined a watch fn, here dep is count, 
  // only count value changed will trigger this watch fn execute again
  watch("count", (n, o) => alert(`from ${o.count} to ${n.count}`));
  // return packed methods, they will been collected to ctx.settings
  return {
    inc: () => setState({ count: ctx.state.count + 1 }),
    dec: () => setState({ count: ctx.state.count - 1 })
  };
};

function Counter(){
  // deconstruct from ref ctx
  const { state, refComputed, settings } = useConcent({ setup });
  return (
    <>
      <h1>{state.count}</h1>
      <h1>{refComputed.doubleCount}</h1>
      <button onClick={settings.inc}>inc</button>
      <button onClick={settings.dec}>dec</button>
    </>
  );
}
```
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/article-img/rmc-comparison/3.png"/>
</div>

<br /> 
<a class="seeDemoCode textLeft" rel="noopener" target="blank" href="https://codesandbox.io/s/hello-concent-shared-cu1i9">
  ❤️Easily <span style="font-weight:600;" >share state</span>  and <span style="font-weight:600;" >reuse logic</span> between class and function
</a>
<br />

```js{5}
import { run, useConcent } from "concent";

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

run({// startup concent with module configuration
  counter: {
    state: { count: 0 },// 【neccessary】，define module state
    reducer: {
      async complexUpdate(p, m, ac) {
        await delay();
        await ac.setState({ count: m.count + 10 });
        await delay();
        return { count: m.count + 10 };
      },
      simpleUpdate(p, m) {
        return { count: m.count - 100 };
      }
    },
    computed: {// 【optional】，define module computed
      doubleCount: n => n.count * 2,
      quadrupleCount: (n, o, f) => f.cuVal.doubleCount * 2,
    },
    watch: {// 【optional】，define module watch
      count: (n, o) => alert(`from ${o.count} to ${n.count}`)
    }
  }
});

const setup = ctx => {
  return {
    inc: () => ctx.setState({ count: ctx.state.count + 1 }),
    dec: () => ctx.setState({ count: ctx.state.count - 1 })
  };
};

function Counter() {
  const { state, moduleComputed, moduleReducer, settings } = 
    useConcent({ setup, module: "counter" });
  return <div> ui ... </div>
}

@register({ setup, module: "counter" })
class ClassCounter extends React.Component{
  render(){
    const { state, moduleComputed, moduleReducer, settings } = this.ctx;
    return <div> ui ... </div>
  }
}
```
<div style="text-align:center;">
<img style="max-width:780px" src="https://raw.githubusercontent.com/fantasticsoul/assets/master/article-img/rmc-comparison/cc-unified-lifecycle-en.png"/>
</div>

<br /> 
<br /> 
<div style="width:100%;display:flex;">
<iframe style="width:1440px;height:860px;margin:0 auto" src="https://codesandbox.io/s/concent-guide-xvcej"></iframe>
</div>
<br/>
<a class="seeDemoCode cake" href="https://codesandbox.io/s/concent-guide-xvcej">Experience standard js concent project</a>
<br/>
<a class="seeDemoCode cake" href="https://codesandbox.io/s/concent-guide-ts-zrxd5">Experience standard ts concent project</a>


<a class="exploreMore" href="./guide/first-sight">
  Explore <span style="font-weight:600;">more</span>
</a>



