## 背景

在平常的项目开发中，有些数据需要存储在浏览器本地缓存中，通常存储在这两种存储中：

- **localStorage：** 存储容量 5M
- **sessionStorage：** 存储容量 5M

所以会有一些项目因为存储的数据过大，超过存储容量，导致报错，影响了项目的正常运行，影响用户体验。

## indexedDB

其实还有另外一种本地存储方式：**indexedDB** ，他的具备以下特点：

- **容量大：** 大于等于 250M
- **异步操作：** 与 Storage 不同，indexedDB 的操作是异步的，不会阻塞其他代码运行
- **支持多种存储类型：** 基础类型、对象、ArrayBuffer、Blob
- **支持事务：** 操作过程有错误，会直接回滚，不影响原有数据
- **同源限制：** 与 Storage 一样，受同源限制

## sunshine-storage

这是一个解决 Storage 存储空间过小而出现的库，他的特点体现在：

- **支持降级：** 优先使用 indexedDB，如果浏览器不支持则自动降级为 Storage(可选 localStorage、sessionStorage)
- **异步操作：** 无论是 indexedDB，还是 Storage，操作都是异步
- **使用方式：** 使用方式与 Storage 方式相同，主要支持以下方法
  - getItem：获取数据
  - setItem：设置数据
  - clear：清除数据
  - length：获取长度
  - key：获取 key
  
## 使用

### 安装

首先需要安装库

```js
// npm
npm install sunshine-storage
// yarn
yarn add sunshine-storage
// pnpm
pnpm i sunshine-storage
```

### 操作

接着就可以开始用异步的方式去使用，这样的话性能更好

```ts
import storage from 'sunshine-storage';

// 创建实例
const sg = storage.createInstance({
  name: 'mydb',
});

// 设值
sg.setItem('name', 'lsx').then(() => {
  // 取值
  sg.getItem('name').then((res) => {
    console.log(res); // 'lsx'

    // 获取长度
    console.log(sg.length); // 1

    // 根据索引获取key
    sg.key(0).then((key) => {
      console.log(key); // name

      // 清除
      sg.clear().then(() => {
        console.log(sg.length); // 0
      });
    });
  });
});
```

如果你觉得这样嵌套太麻烦，也可以使用 async/await 的语法去使用

```ts
const fn = async () => {
  // 设值
  await sg.setItem('name', 'lsx');
  // 取值
  console.log(await sg.getItem('name'));
  // 获取长度
  console.log(sg.length);
  // 根据索引获取key
  console.log(await sg.key(0));
  // 清除
  await sg.clear();
  console.log(sg.length);
};
fn();
```

### 自定义 Storage

创建实例时，除了传入 name，还可以传入：

- **storage：** Storage 的类型，如 localStorage、sessionStorage，默认为 localStorage，可不传
- **prefix：** Storage key 的后缀，可不传
- **suffix：** Storage key 的后缀，可不传

这三个参数，只有在浏览器不支持 indexedDB，降级为 Storage 时才有意义，由于 indexedDB 可以用 name 来进行隔离，但是 Storage 不行，所以使用了 prefix、suffix 来进行数据隔离

```ts
// 创建实例
const sg = storage.createInstance({
  // 如果不支持indexedDB，参数 name 无效
  name: 'mydb',
  stroage: localStorage, // Storage 类型
  prefix: 'lsx', // key 前缀
  suffix: 'lsx' // key 后缀
});
```

使用方式，与上面一样，promise 方式使用

```ts
// 设值
sg.setItem('name', 'lsx').then(() => {
  // 取值
  sg.getItem('name').then((res) => {
    console.log(res); // 'lsx'

    // 获取长度
    console.log(sg.length); // 1

    // 根据索引获取key
    sg.key(0).then((key) => {
      console.log(key); // name

      // 清除
      sg.clear().then(() => {
        console.log(sg.length); // 0
      });
    });
  });
});

```

async/await 方式使用

```ts

const fn = async () => {
  // 设值
  await sg.setItem('name', 'lsx');
  // 取值
  console.log(await sg.getItem('name'));
  // 获取长度
  console.log(sg.length);
  // 根据索引获取key
  console.log(await sg.key(0));
  // 清除
  await sg.clear();
  console.log(sg.length);
};
fn();
```