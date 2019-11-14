## 制图模板管理

![生成制图模板](https://i.loli.net/2019/11/14/9a5rMFyg8RZxWlL.gif)

![生成jsdoc文档](https://i.loli.net/2019/11/14/3NW45ISx2AtDPKQ.gif)

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

#### 1.3 实例化你的地图边框主题
```
在 `border_themes`文件夹下查找想要的边框主题。
文件名即函数参数

const A0 = new A0WallMap('A0verticalDefault');
```
|              主题            |          默认参数        |     是否为默认     |     类型     |
| ---------------------------- | ----------------------- | ------------------ | ----------- |
|          A0竖版蓝边框         |    A0VerticalDefault    |         是         |   String    |
|          A0横版蓝边框         |    A0HorizontalDefault  |         是         |   String    |

#### 1.4 地图元素
`npm run jsdoc` 生成注释文档

查看你需要引入的地图元素配置参数

地图元素函数：

|              名称            |            函数          | 参数 (详情查看jsdoc注释文档) |          默认参数        |     类型     |
| ---------------------------- | ----------------------- | -------------------------- | ------------------------ | ----------- |
|            地图               |      createMap()        |             是             |           -              |   String    |
|            指北针             |      createCompass()    |             否             |    './assets/zbz.png'    |   String    |
|             边框              |      createBorder()    |             否             |           -              |       -       |
|            地图标题           |      createTiltle()     |             是             |           -              |   String    |
|            图例               |      createLegend()     |             是            |           -              |    Object    |
|            主编单位           |      createZbdw()       |             否            |  国信司南（北京）地理信息技术有限公司 |   String    |
|            比例尺             |      createScale()      |             是            |           -              |   String    |
|            承编单位           |      createCbdw()       |             否            |  国信司南（北京）地理信息技术有限公司 |   String    |

#### 1.5 生成模板
```
A0.output();
```


### 二、横竖版默认配置
A0竖版配置

|              名称            |    width    |   height  | borderLeftW | borderTopW | borderRightW | borderBottomW |
| ---------------------------- | ----------- | --------- | ----------- | ---------- | ---------- | ---------- |
|             canvas           |    9933     |   14041   |       -     |      -     |       -    |       -    |
|           默认地图            |    8986     |   12698   |       -     |       -    |       -    |       -    |
|  默认边框(A0VerticalDefault)  |    8986     |   12698   |     467     |     880    |     465    |      463   |

<br>

A0横板配置

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

#### 3.3 A0边框主题

|              主题            |          默认参数         |     是否为默认     |     类型     |
| ---------------------------- | ------------------------ | ------------------ | ----------- |
|            A0竖版            |           /              |         /          |      /      |
|          A0竖版蓝边框         |    A0VerticalDefault     |         是         |   String    |
|          A0竖版蓝花边框       |    A0VerticalBlueLace    |         否         |   String    |
|             A0横版           |            /             |          /         |      /      |
|          A0横版蓝边框         |    A0HorizontalDefault   |         是         |   String    |
|          A0横版蓝花边框        |    A0HorizontalBlueLace  |         否         |   String    |
|          A0横版黑花边边框      |    A0HorizontalBlackLace  |         否         |   String    |

### 四、[版本](https://github.com/geocompass/MapPT/blob/master/CHANGELOG.md)

### 五、[未来计划](https://github.com/geocompass/MapPT/blob/master/PLANS.md)