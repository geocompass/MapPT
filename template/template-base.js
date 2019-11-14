'use strict';
const fs = require('fs');

/**
 * Class 地图打印模板基类
 */
class MapPrintTemplate {
  output(outPath = './template.png') {
    fs.writeFileSync(outPath, this.canvas.toBuffer());
    console.log('图幅生成成功✌');
    console.groupEnd();
  }
}
module.exports = MapPrintTemplate;
