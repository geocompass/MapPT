'use strict';
const { createCanvas, loadImage } = require('canvas');
const BaseTemplate = require('./template-base.js');

/**
 * Class 横图
 * @extends BaseTemplate
 */
class A0Horizontal extends BaseTemplate {
  constructor(props = 'A0HorizontalDefault') {
    super();
    this.canvas = new createCanvas(14041, 9933);
    this.ctx = this.canvas.getContext('2d');
    this.canvasW = 14041;
    this.canvasH = 9933;
    this.proxyProps = this.proxyProps(props);
    this.boderThemes = require(`../boder_themes/${props}`);
    this.proxyBorderThemes = this.proxyBorderThemes(this.boderThemes);
    this.borderLeftW = this.boderThemes.borderLeftW;
    this.borderTopW = this.boderThemes.borderTopW;
    this.borderRightW = this.boderThemes.borderRightW;
    this.borderBottomW = this.boderThemes.borderBottomW;
    this.borderImg = this.boderThemes.borderImg;
  }

  // proxy
  proxyProps(props) {
    if (!props) throw new RangeError('未选择边框主题');
  }
  proxyBorderThemes(boderThemes) {
    const boderItem = [ 'borderLeftW', 'borderTopW', 'borderRightW', 'borderBottomW', 'borderImg' ];
    boderItem.forEach(el => {
      if (!(el in boderThemes)) {
        throw new RangeError('边框主题参数不正确');
      }
    });
  }

  /**
   * 地图
   * @param {string} mapImage - 地图路径
   * @param {object} [paramObject={}] - 地图定位参数
   * @param {number} [paramObject.left=this.borderLeftW] - 地图相对左边距
   * @param {number} [paramObject.top=this.borderTopW] - 地图相对上边距
   */
  async createMap(mapImage, { left = this.borderLeftW, top = this.borderTopW } = {}) {
    if (!mapImage) throw new RangeError('地图路径参数错误');
    const { ctx } = this;
    const imageBuffer = await loadImage(mapImage);
    ctx.drawImage(imageBuffer, left, top);
    console.group('横版图幅制作中▼');
    console.log('地图✔');
  }

  /**
   * 图幅指北针
   * @param {string} [compassPath='./assets/zbz.png'] - 图幅指北针路径
   * @param {object} [paramObject={}] - 图幅指北针定位参数
   * @param {number} [paramObject.distanceBorderRight=354] - 图幅指北针距右边框
   * @param {number} [paramObject.distanceBorderTop=360] - 图幅指北针距上边框
   * @param {number} [paramObject.imgW=708] - 图幅指北宽
   * @param {number} [paramObject.imgH=877] - 图幅指北针高
   */
  async createCompass(compassPath = './assets/zbz.png', { distanceBorderRight = 354, distanceBorderTop = 360, imgW = 708, imgH = 877 } = {}) {
    const { ctx } = this;
    const [ left, top ] = [ this.canvasW - imgW - distanceBorderRight - this.borderRightW, distanceBorderTop + this.borderTopW ];
    const imageBuffer = await loadImage(compassPath);
    ctx.drawImage(imageBuffer, left, top, imgW, imgH);
    console.log('图幅指北针√');
  }

  /**
   * 图幅边框
   * @param {string} [borderPath=this.borderImg] - 图幅边框路径
   * @param {object} [paramObject={}] - 图幅边框定位参数
   * @param {number} [paramObject.left=0] - 图幅边框相对左边距
   * @param {number} [paramObject.top=0] - 图幅边框相对上边距
   */
  async createBorder(borderPath = this.borderImg, { left = 0, top = 0 } = {}) {
    const { ctx } = this;
    const imageBuffer = await loadImage(borderPath);
    ctx.drawImage(imageBuffer, left, top);
    console.log('图幅边框√');
  }

  /**
   * 图幅标题
   * @param {string} title - 图幅字体名称
   * @param {object} [paramObject={}] - 图幅标题定位参数
   * @param {number} [paramObject.left=5222] - 图幅字体相对左边距
   * @param {number} [paramObject.top=314] - 图幅字体相对上边距
   * @param {number} [paramObject.fontSize=417] - 图幅字体字号
   * @param {string} [paramObject.fontColor='#0A5179'] - 图幅字体颜色
   * @param {string} [paramObject.fontType='hyf'] - 图幅字体
   */
  createTiltle(title, { left = 5222, top = 314, fontSize = 417, fontColor = '#0A5179', fontType = 'hyf' } = {}) {
    if (!title) throw new RangeError('图幅标题参数错误');
    const { ctx } = this;
    ctx.font = `${fontSize}px ${fontType}`;
    ctx.fillStyle = fontColor;
    ctx.textBaseline = 'top';
    ctx.fillText(title, left, top);
    console.log('图幅标题√');
  }

  /**
   * 图例
   * @param {object} iconOption - 图例指示内容
   * @param {Array.<{icon: String, txt: String}>} iconOption.data - 图例指示内容数组
   * @param {string} iconOption.data[].icon - 图例指示内容图片路径
   * @param {string} iconOption.data[].txt - 图例指示内容图片信息
   * @param {object} iconOption.option - 图例指示内容配置项
   * @param {number} iconOption.option.iconColumn - 图例内容需要分多少列(必须可以被iconOption.data.length整除)
   * @param {number} iconOption.option.iconWidth - icon宽
   * @param {number} iconOption.option.iconHight - icon高
   * @param {number} iconOption.option.iconFontSize - icon字体大小
   * @param {string} iconOption.option.iconFontColor - icon字体颜色
   * @param {object} legendOption 图例配置项
   * @param {string} [legendOption.boderColor='#0A5179'] - 图例边框颜色
   * @param {number} [legendOption.tuliFontSize=146] - 图例标题字号
   * @param {string} [legendOption.tuliFontColor='#221815'] - 图例标题颜色
   */
  async createLegend(
    iconOption = {},
    legendOption = { boderColor: '#0A5179', tuliFontSize: 146, tuliFontColor: '#221815' }
  ) {
    if (!iconOption.data || !iconOption.option) throw new RangeError('图例参数错误');
    const { ctx } = this;
    const [ boderColor, tuliFont, tuliColor, pointData, iconColumn, iconW, iconH, iconFont, iconColor ] = [
      legendOption.boderColor,
      legendOption.tuliFontSize,
      legendOption.tuliFontColor,
      iconOption.data,
      iconOption.option.iconColumn,
      iconOption.option.iconWidth,
      iconOption.option.iconHight,
      iconOption.option.iconFontSize,
      iconOption.option.iconFontColor,
    ];
    // 计算总高度
    const iconColumnNums = Math.ceil(pointData.length / iconColumn); // 个数/列
    const tuliMargin = tuliFont * (3.5); // 图例上边距(0.5) + 图例高(1) + 图例下边距(1) + icon距下边框(1)
    const iconColumnH = iconH * (2 * iconColumnNums - 1); // 纵列icon的总高度(icon纵列间距1)
    const borderH = tuliMargin + iconColumnH; // 图例边框总高度
    // 计算总宽度
    const countPointDataLen = [];
    pointData.forEach(item => { countPointDataLen.push(item.txt.length); });
    const iconTxtMaxLen = countPointDataLen.sort((a, b) => { return b - a; })[0] * iconFont; // 计算最长的txt
    const iconMaxLen = iconTxtMaxLen + iconW * (1.5); // icon中最大长度
    let borderW; // iconMaxLen * 个数 + icon间距(0.5) + 两边间距(0.5+0.5)
    if (iconMaxLen > 560) {
      borderW = iconColumn * iconMaxLen + (iconColumn - 1) * iconMaxLen / 2 + 200 + 200; // 最大宽度 = 最长icon * 个数 + 最长icon * 间距 + 200 + 200
    } else {
      borderW = 560 + 200 + 200; // 最大宽度 = 图例宽度 + 200 + 200
    }

    // 创建、定位自适应边框
    const [ borderRight, borderBottom, borderLineW ] = [ this.borderRightW, this.borderBottomW, 10 ];
    const [ borderLeft, borderTop ] = [ this.canvasW - borderRight - borderW - borderLineW, this.canvasH - borderBottom - borderH - borderLineW ];
    ctx.strokeStyle = boderColor;
    ctx.fillRect(borderLeft, borderTop, borderW + 20, borderH + 20);
    ctx.clearRect(borderLeft + 10, borderTop + 10, borderW, borderH);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(borderLeft + 10, borderTop + 10, borderW, borderH);

    // 创建、定位自适应'图 例'
    const [ tu, li ] = [ '图', '例' ];
    const fontTuLeft = borderLeft + (borderW - 560) / 2;
    const fontLiLeft = fontTuLeft + tuliFont + 308;
    const tuLiTop = borderTop + 0.5 * tuliFont;
    ctx.font = `${tuliFont}px hanyizhongyuan`;
    ctx.fillStyle = tuliColor;
    ctx.fillText(tu, fontTuLeft, tuLiTop);
    ctx.fillText(li, fontLiLeft, tuLiTop);

    // 创建、定位自适应多列icon
    pointData.forEach(async (item, index) => {
      const key = index + 1;
      const iconFirstLine = index % iconColumnNums;
      const iconFirstColumn = Math.ceil(key / iconColumnNums);
      const iconIndexLeft = borderLeft + 200 + (iconFirstColumn - 1) * iconMaxLen + (iconFirstColumn - 1) * (iconMaxLen / 2); // borderLeft + 左边距 + 第几列的icon + 第几列的icon间距
      const iconIndexTop = tuLiTop + 2 * tuliFont + iconH * 2 * iconFirstLine;
      const imageBuffer = await loadImage(item.icon);
      ctx.drawImage(imageBuffer, iconIndexLeft, iconIndexTop, iconW, iconH);
      ctx.fillStyle = iconColor;
      ctx.font = `${iconFont}px hanyizhongyuan`;
      ctx.fillText(item.txt, iconIndexLeft + 1.5 * iconW, iconIndexTop + (iconH - iconFont) / 2);
    });
    console.log('制作图例√');
  }

  /**
   * 主编单位
   * @param {string} [zbdwName='国信司南（北京）地理信息技术有限公司'] - 主编单位字体名称
   * @param {object} [paramObject={}] - 主编单位定位参数
   * @param {number} [paramObject.left=713] - 主编单位字体相对左边距
   * @param {number} [paramObject.top=9692] - 主编单位字体相对上边距
   * @param {number} [paramObject.fontSize=104] - 主编单位字体字号
   * @param {string} [paramObject.fontColor='#221815'] - 主编单位字体颜色
   */
  createZbdw(zbdwName = '国信司南（北京）地理信息技术有限公司', { left = 713, top = 9692, fontSize = 104, fontColor = '#221815' } = {}) {
    const name = `主编单位：${zbdwName}`;
    const { ctx } = this;
    ctx.font = `${fontSize}px hyf`;
    ctx.fillStyle = fontColor;
    ctx.fillText(name, left, top);
    console.log('主编单位√');
  }

  /**
   * 比例尺数值转百分符
   * @param {string} scale 数值例如3000
   * @return {String} 转换百分符的比例尺数值例如3 000
   */
  percentSign(scale) {
    return scale.replace(/(\d)(?=(?:\d{3})+$)/g, '$1 ');
  }

  /**
   * 比例尺数值1：xxxx
   * @param {number} scale 比例尺数值
   * @param {object} [paramObject={}] - 比例尺数值定位参数
   * @param {number} [paramObject.left=8126] - 比例尺数值字体相对左边距
   * @param {number} [paramObject.top=9701] - 比例尺数值字体相对上边距
   * @param {number} [paramObject.fontSize=104] - 比例尺数值字体字号
   * @param {string} [paramObject.fontColor='#221815'] - 比例尺数值字体颜色
   */
  createScale(scale, { left = 8126, top = 9701, fontSize = 104, fontColor = '#221815' } = {}) {
    if (!scale) throw new RangeError('比例尺参数错误');
    const { ctx } = this;
    ctx.fillText(`比例尺 1:${this.percentSign(scale)}`, left, top);
    ctx.font = `${fontSize}px "hyf"`;
    ctx.fillStyle = fontColor;
    this.createScaleBar(scale);
  }

  /**
   * 比例尺图示
   * @param {number} scale 比例尺数值
   * @param {object} [paramObject={}] - 比例尺图示定位参数
   * @param {number} [paramObject.left=9097] - 比例尺图示相对左边距
   * @param {number} [paramObject.top=9758] - 比例尺图示相对上边距
   * @param {number} [paramObject.fontSize=62] - 比例尺图示字体字号
   * @param {string} [paramObject.fontColor='#221815'] - 比例尺图示字体颜色
   */
  createScaleBar(scale, { left = 9097, top = 9758, fontSize = 52, fontColor = '#221815' } = {}) {
    const { ctx } = this;
    // 边框矩形 & 实体矩形
    ctx.strokeStyle = fontColor;
    ctx.fillStyle = fontColor;
    ctx.fillRect(left + 0 * 118, top, 118, 35);
    ctx.strokeRect(left + 1 * 118, top, 118, 35);
    ctx.fillRect(left + 2 * 118, top, 118, 35);
    ctx.strokeRect(left + 3 * 118, top, 118, 35);
    ctx.fillRect(left + 4 * 118, top, 236, 35);
    ctx.strokeRect(left + 6 * 118, top, 236, 35);
    ctx.fillRect(left + 8 * 118, top, 236, 35);
    // 3px线条border
    ctx.lineWidth = 3;
    ctx.moveTo(left, top);
    ctx.lineTo(left + 1180, top);
    ctx.moveTo(left, top + 35);
    ctx.lineTo(left + 1180, top + 35);
    ctx.stroke();
    // 图示单位
    const [ tsLeft, tsTop ] = [ left + 1197, top - 11 ];
    let tsDw = '';
    // 图视数值
    let cmToM;
    if (scale < 50000) {
      cmToM = Math.round(scale / 100);
      tsDw = '米';
    } else {
      cmToM = scale / 100000;
      tsDw = '千米';
    }
    ctx.font = `${fontSize}px hyf`;
    ctx.fillStyle = fontColor;
    ctx.fillText(tsDw, tsLeft, tsTop);
    for (let i = 0; i < 11; i++) {
      const item = `${cmToM * i}`;
      const [ itemLeft, itemTop ] = [ left + 118 * i - item.length * fontSize / 5, top - 78 ];
      if (i < 5) {
        ctx.fillText(item, itemLeft, itemTop);
      } else {
        if (i % 2 === 0) {
          ctx.fillText(item, itemLeft, itemTop);
        }
      }
    }
    console.log('比例尺√');
  }

  /**
   * 承编单位
   * @param {string} [cbdwName='国信司南（北京）地理信息技术有限公司'] - 承编单位字体名称
   * @param {object} [paramObject={}] - 承编单位定位参数
   * @param {number} [paramObject.left=10942] - 承编单位字体相对左边距
   * @param {number} [paramObject.top=9688] - 承编单位字体相对上边距
   * @param {number} [paramObject.fontSize=104] - 承编单位字体字号
   * @param {string} [paramObject.fontColor='#221815'] - 承编单位字体颜色
   */
  createCbdw(cbdwName = '国信司南（北京）地理信息技术有限公司', { left = 10942, top = 9688, fontSize = 104, fontColor = '#221815' } = {}) {
    const name = `承编单位：${cbdwName}`;
    const { ctx } = this;
    ctx.font = `${fontSize}px hyf`;
    ctx.fillStyle = fontColor;
    ctx.fillText(name, left, top);
    console.log('承编单位√');
  }

}
module.exports = A0Horizontal;
