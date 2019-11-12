## 制图模板管理

![地图模板](https://s2.ax1x.com/2019/11/12/M16CD0.md.gif)](https://imgchr.com/i/M16CD0)

### 一、使用
#### 1.1 命令
```
安装依赖
$ npm install

生成地图模板
$ npm run test

生成jsdoc
$ npm run jsdoc
```

#### 1.2 选择你的地图版式
```
const A0WallMap = require('./template/A0-horizontal'); // 横板
const A0WallMap = require('./template/A0-vertical'); // 竖版
```

#### 1.3 实例化你的心动地图
```
在 `border_themes`文件夹下查找想要的边框主题。
文件名即函数参数

const A0 = new A0WallMap('A0verticalDefault');
```

#### 1.4 地图元素
`npm run jsdoc` 生成注释文档

查看你需要引入的地图元素配置参数

地图元素函数：

|              名称            |            函数          | 参数 (详情查看jsdoc注释文档) |
| ---------------------------- | ----------------------- | -------------------------- |
|            地图               |      createMap()        |             是             |
|            指北针             |      createCompass()    |             是             |
|            地图标题           |      createTiltle()     |             是            |
|            图例               |      createLegend()     |             是            |
|            主编单位           |      createZbdw()       |             是            |
|            比例尺             |      createScale()      |             是            |
|            承编单位           |      createCbdw()       |             是            |

关于配置图片，请存放在 `assets` 文件下，对应引入。

#### 1.5 生成模板
```
A0.output();
```


### 二、横竖版默认配置
竖版配置

|              名称            |    width    |   height  | borderLeftW | borderTopW | borderRightW | borderBottomW |
| ---------------------------- | ----------- | --------- | ----------- | ---------- | ---------- | ---------- |
|             canvas           |    9933     |   14041   |       -     |      -     |       -    |       -    |
|           默认地图            |    8986     |   12698   |       -     |       -    |       -    |       -    |
|  默认边框(A0VerticalDefault)  |    8986     |   12698   |     467     |     880    |     465    |      463   |

<br>

横板配置

|              名称            |    width    |   height  | borderLeftW | borderTopW | borderRightW | borderBottomW |
| ---------------------------- | ----------- | --------- | ----------- | ---------- | ---------- | ---------- |
|             canvas           |    14041     |   9933   |       -     |      -     |       -    |       -    |
|           默认地图            |    13111     |   8588   |       -     |       -    |       -    |       -    |
|  默认边框(A0VerticalDefault)  |    8986     |   12698   |     467     |     880    |     463    |      465   |

### 三、🌹 如果你有更好的边框主题
#### 3.1 在 `border_themes` 文件夹下建立你的边框主题文件夹。
* 文件夹名以 `尺寸 + 版式 + 样式` 命名 (例如：A0VerticalBlueLace);
* 建立 `index.js` , 引入你的边框图片;

#### 3.2 关于 `index.js` (格式以下为准)
```
'use strict';
// A0竖版板默认边框
module.exports = {
  borderLeftW: 467,
  borderTopW: 880,
  borderRightW: 465,
  borderBottomW: 463,
  borderImg: './boder_themes/A0VerticalDefault/border.png',
};
```

🌹 提供格式不对，我们在最初做了拦截，请遵守格式规定。