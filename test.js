'use strict';
// 详细参数配置请生成jsdoc文档查阅
const A0WallMap = require('./template/A0-horizontal'); // 版式 vertical Horizontal
(async function () {
  const A0 = new A0WallMap('A0HorizontalDefault'); // 实例化主题
  await A0.createMap('./assets/merge.png'); // 地图(必填)
  await A0.createCompass('./assets/zbz.png'); // 指北针
  await A0.createBorder(); // 边框
  A0.createTiltle('地图模板标题'); // 标题(必填)
  await A0.createLegend({
    data: [{
      icon: './assets/qiren.png',
      txt: '图例',
    }],
    option: {
      iconColumn: 1,
      iconWidth: 176,
      iconHight: 176,
      iconFontSize: 105,
      iconFontColor: '#221714',
    },
  }, {
    boderColor: '#0A5179',
    tuliFontSize: 146,
    tuliFontColor: '#221815',
  }); // 图例(必填)
  A0.createZbdw(); // 主编单位
  A0.createScale('1500'); // 比例尺(必填)
  A0.createCbdw(); // 承编单位
  A0.output();
})();