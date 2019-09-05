/*
 * @Description: 
 * @version: 
 * @Company: iflytek
 * @Author: hytang2
 * @Date: 2019-08-27 11:30:42
 * @LastEditTime: 2019-09-05 15:55:46
 */
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(690, 486)
const ctx = canvas.getContext('2d')
const path = require('path');
const fs = require('fs');

const Canvas = require("canvas");
Canvas.registerFont(path.join(__dirname, "../public/fonts/FZLTH--GB1.ttf"), { family: "MyFont"});  // 引入自定义字体

let rootPath = path.resolve(__dirname,'../public/images/img_zhengshu.png'); //代码文件的根路径
console.log(rootPath)
let url = path.resolve(__dirname,'../public/images/logo.jpg');

function format(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    //将毫秒补位成3位
    var less = 3 - ("" + o["f+"]).length;
    while (less > 0) {
        o["f+"] = "0" + o["f+"];
        less--;
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

let name = '王俊';

// Write "Awesome!"
let blank = ' ';
let lastName;
const getimg = async function(){
    const image = await loadImage(rootPath)
    ctx.drawImage(image, 0, 0, 690, 486);
    ctx.font = '30px MyFont'
    // ctx.rotate(0.1)
    if(/^[a-zA-Z]*$/.test(name)) {
        console.log("“" + name + "”里全是字母！");
        lastName = name;
    }else if(/^[\u4e00-\u9fa5]*$/.test(name)){
        console.log("“" + name + "”里全是汉字！");
        switch(name.length) {
            case 1:
                lastName = blank.concat(blank).concat(blank).concat(name);
                break;
            case 2:
                lastName = blank + name.slice( 0 , 1 )  + blank + name.slice( 1 )  //'abcde'
                break;
            case 3:
                lastName = name;
                break;
            default:
                lastName = name;
                break;
        }
    }
    ctx.fillText(lastName, 57, 375)

    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.stroke();
    ctx.save();

    const img = await loadImage(url);
    /***
     *  参数1 圆心距离左边距距离
     *  参数2 圆心距离上边距距离
     *  参数3 圆的半径
     *  参数4 切割
     */
    ctx.arc(103, 276, 49, 0, 2 * Math.PI); 
    // 从画布上裁剪出这个圆形
    ctx.clip();
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它8个参数最好是参照右边的图解，前4个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小。
    ctx.drawImage(img, 54, 227, 98, 113);
    ctx.restore();

    // 文案
    // ctx.font="18px PingFangSC";
    // ctx.fillStyle='rgba(0, 0, 0, 0.6)';
    // ctx.fillText("由衷感谢您参与首届（2019年度）“品牌体验官”活动。经公司审核",134,265);

    // 证书编号
    ctx.font="18px MyFont";
    ctx.fillStyle='rgba(0, 0, 0, 1)';
    ctx.fillText("IFLYTEK-BEO-00012",218,385);

    //描绘日期
    var date = format(new Date(), 'yyyy/MM/dd');
    ctx.font = '18px MyFont bold';
    ctx.fillStyle='rgba(0, 0, 0, 1)';
    ctx.fillText(date, 538, 385);

    // return canvas.toDataURL();
    let data = "<img src=" + canvas.toDataURL() + " />";
    // console.log(data)

    fs.writeFile('文件.txt', data, (err) => {
        if (err) throw err;
        console.log('文件已被保存');
    });
};

getimg();
// export default getimg

