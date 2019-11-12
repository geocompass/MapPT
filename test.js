'use strict';
const A0WallMap = require('./template/A0-vertical'); // 版式
(async function() {
  const A0 = new A0WallMap('A0verticalDefault');
  await A0.createMap('./assets/merge.png'); // 地图
  await A0.createCompass('./assets/zbz.png'); // 指北针
  A0.createTiltle('地图模板标题'); // 标题
  await A0.createLegend(
    { data: [{ icon: './assets/qiren.png', txt: '测试' }], option: { iconColumn: 1, iconWidth: 176, iconHight: 176, iconFontSize: 105, iconFontColor: '#221714' } },
    { boderColor: '#0A5179', tuliFontSize: 146, tuliFontColor: '#221815' }
  ); // 图例
  A0.createZbdw(); // 主编单位
  A0.createScale('1500'); // 比例尺
  A0.createCbdw(); // 承编单位
  A0.output();
})();
