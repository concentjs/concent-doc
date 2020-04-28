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
  <img src="/img/install-concent.png" width="780px" style="margin:0 auto"/>
</div> -->

<h2 style="font-weight:300; width:100%; text-align:center; margin: 66px 0;">
  Let's <span style="font-weight:600;" >start</span>
</h2>

```js{3}
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { run, register, useConcent, registerDumb } from 'concent';

run({
  foo: {// declared a module named 'foo'
    state: { greeting: 'hello concent' },
    reducer: { ... }
  }
})

// three ways of creating component, multi ways to change state
function HookFnComp() {
  const ctx = useConcent('foo');
  const { state: { greeting }, sync } = ctx;
  return <input value={greeting} onChange={sync('greeting')} />
}

const RenderPropsComp = registerDumb('foo')(...);

@register('foo')
class HocClassComp extends Component {...}

function App() {
  return (
    <>
      <HookFnComp />
      <HocClassComp />
      <RenderPropsComp />
    </>
  )
}
ReactDom.render(<App />, document.getElementById('root'));
```
<br />
<a class="seeDemoCode cake" href="https://stackblitz.com/edit/concent-doc-home-demo">click here to experience this demo</a>
<div style="width:100%;display:flex;">
<iframe style="width:1200px;height:820px;margin:0 auto" src="https://stackblitz.com/edit/concent-doc-home-demo"></iframe>
</div>


<a class="exploreMore" href="./guide/first-sight">
  Explore <span style="font-weight:600;">more</span>
</a>


