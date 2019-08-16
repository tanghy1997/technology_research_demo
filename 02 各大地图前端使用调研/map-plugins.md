# 地图插件调研

### 产品需求 H5
- 翻译机GPS提供地理位置，在地图上显示用户的位置
- 一期
	1. 调用高德地图(在地图显示用户位置) 
- 二期
	2. 调用高德地图(显示用户在地图上的轨迹)	
	
### 主流地图

#### 国外
- 谷歌地图， 强大易用， 但是用户须翻墙

#### 国内
- 百度地图，离线地图包比较小巧， 
- 高德地图，离线地图资源是5款软件中体积最大的
- 老虎地图的离线数据较少
- 搜狗地图的离线数据与之前提到的百度地图不相上下

#### 国内市场占比（2015）
- 高德地图 32.6%， 市场份额第一
- 百度地图 29.3%， 市场份额第二
- 其他搜狗，老虎地图，腾讯地图等多家厂商占用不到市场份额一半

#### 地图定位API
- 百度地图，
  1. 支持Web javascript调用，文档齐全
  2. 百度地图对外默认接口为BD09坐标系， GPS采集的真实经纬度需要通过坐标转换
  3. 定位示例丰富，支持浏览器定位，ip定位，城市名定位， 经纬度定位	
- 高德地图
  1. 支持Web javascript调用， 文档完备
  2. 高德地图JavaScript API在核心功能之外提供了丰富的控件、服务插件以及工具插件
  3. 坐标是真实的GPS 坐标， 也要转换成高得坐标系
  4. 翻译机客户端使用的是高德地图


### 小结
- 综上，考虑所有情况，使用高德地图
- 一期调研，能否通过url带经纬度参数实现地图定位
  1. 一期需求实现，[高得地图uri开发指南](http://lbs.amap.com/api/uri-api/guide/mobile-web/point)   	
  2. [高德地图API 如何解决坐标转换，坐标偏移](https://segmentfault.com/a/1190000000498434)
  3. [高德地图坐标转换](https://lbs.amap.com/api/webservice/guide/api/convert)

### 二期调研（JSSDK-实现轨迹图）
- 百度地图对于国外定位精度较差，高德地图无国外的数据包
  1. 高德，百度地图无国外地图测绘资质，地图资源来自第三方机构购买
  2. 建议使用google地图
  3. 参考资料: [知乎问答:百度地图在国外的体验](https://www.zhihu.com/question/28507761), 
    [高德地图:支持海外地图和海外定位吗？](https://lbs.amap.com/faq/top/hot-questions/118),
    [百度知道:高德地图是否可以在国外使用](https://zhidao.baidu.com/question/615877394784101052.html)


- 综上所述，建议国内使用高德，国外使用google 实现定位

- 三大地图JSAPI网址
  1. [百度](http://lbsyun.baidu.com/index.php?title=jspopular/guide/getkey)
  2. [高德](http://lbs.amap.com/api/javascript-api/gettingstarted)
  3. [谷歌](https://developers.google.com/maps/documentation/javascript/tutorial?hl=zh-cn)


- 高德JSSDK DEMO,  支持定位 点，多点连成轨迹 [参考资料](https://lbs.amap.com/api/javascript-api/example/amap-ui-pathsimplifier/simple-demo)
  1. 高德地图的图层API, 重绘
  2. 多点显示
- 谷歌JSSDK DEMO,  支持定位 点，多点连成轨迹 [参考资料](https://segmentfault.com/a/1190000000775915)

- [前端开发中的地理定位常见问题](https://wufenfen.github.io/2017/03/22/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E4%B8%AD%E7%9A%84%E5%9C%B0%E7%90%86%E5%AE%9A%E4%BD%8D%E9%97%AE%E9%A2%98%E5%B0%8F%E6%80%BB%E7%BB%93/)

- 如何区分使用地图用户来自国内还是国外？
  1. 利用经纬度范围 
  2. 时区(不精确)
  3. app 高德自动谷歌地图集成

- [openlayer简明教程](https://segmentfault.com/a/1190000002976484)
- SOS急救系统获取数据接口, `url: '../ITMA20ManagePlatform/sosInfoEng/getInfoEngBySessionId.do?sessionId=' + sessionId`

```

// center: 第一个是纬度，第二个是经度
// key : AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU (要申请key)
https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=400x400&
markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=YOUR_API_KEY

https://maps.googleapis.com/maps/api/staticmap?center=47.5952,-122.3316&zoom=13&size=400x400&
markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU

https://maps.googleapis.com/maps/api/staticmap?center=47.5952,-122.3316&zoom=16&size=640x400&path=weight:3%7Ccolor:blue%7Cenc:{coaHnetiVjM??_SkM??~R&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU


https://maps.googleapis.com/maps/api/staticmap?center=63.259591,-144.667969&zoom=6&size=400x400\
&markers=color:red%7Clabel:S%7C63.259591,-144.667969&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU


https://maps.googleapis.com/maps/api/staticmap?center=63.259591,-144.667969&zoom=20&size=1800x1800&markers=color:red%7Clabel:S%7C63.259591,-144.667969&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU  
```

### 百度地图uri定位api
- [百度地图uri 定位API](http://lbsyun.baidu.com/index.php?title=uri/api/web), 支持国外，国内
```
// 百度地图的 uri
http://map.baidu.com/?latlng=-33.95,151.05&autoOpen=true
http://map.baidu.com/?latlng=34.09,-118.02&autoOpen=true
```

### google地图定位API
- 申请开发者key, [点击获取密钥](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=zh-cn)
- 查看console地址, [启用静态地图api](https://console.developers.google.com/apis/library?filter=category:maps&project=dotted-howl-207303&folder&hl=zh-cn&organizationId)
- [参考静态地图开发指南](https://developers.google.com/maps/documentation/static-maps/intro)


````
备注: 难点地图大小的选择， 适配大部分手机， 怎么使用size 和 scale选项

***地图定点示例网址
https://maps.googleapis.com/maps/api/staticmap?center=63.259591,-144.667969&zoom=6&size=1800x1800&markers=color:red%7Clabel:S%7C63.259591,-144.667969&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU  
```` 


- 地图计费模式
1. 每 24 小时超过 25,000 次地图加载前免费,
2. 启用按需付费以解锁更高的配额：超出免费使用限制后，每增加 1,000 次请求，付费 0.50 美元，每 24 小时封顶配额为 100,000 次。
3. [高级计划使用率和限制](https://developers.google.com/maps/premium/usage-limits?hl=zh-cn)
4. [地图使用限制](https://developers.google.com/maps/documentation/javascript/usage?hl=zh-cn)
5. 高级计划 都是 超过次数 计费， [定价和计划](https://developers.google.com/maps/pricing-and-plans/?hl=zh-cn)
  

