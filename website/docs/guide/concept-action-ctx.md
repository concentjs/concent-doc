# action上下文

action上下文指的是`reducer`函数或者`invoke`调用的目标函数的第三位参数，由concent负责生成并传入，主要负责串联调用其他`reducer`函数或自定义函数

## 出现在reducer函数里
```js
// code in models/login/reducer.js

// 此处只关心第一位参数payload，所以忽略第三位参数actionCtx
export async function changeAge(age) {
  await api.updateName(age);
  return { age };
}

// 此处只关心第一位参数payload，所以忽略第三位参数actionCtx
export async function changeName(name) {
  await api.updateName(name);
  return { name };
}

// 此处使用actionCtx来组合调用其他reducer函数
export async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.dispatch(changeAge, age);
  await actionCtx.dispatch(changeName, name);
}
```

## 出现在自定义函数里
```js
async function changeAge(age) {
  await api.updateName(age);
  return { age };
}

async function changeName(name) {
  await api.updateName(name);
  return { name };
}

// 此处使用actionCtx来组合调用其他自定义函数
async function changeAgeAndName({ name, age }, moduleState, actionCtx) {
  await actionCtx.invoke(changeAge, age);
  await actionCtx.invoke(changeName, name);
}
```