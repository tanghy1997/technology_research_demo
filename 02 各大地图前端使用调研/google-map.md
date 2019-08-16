##  Google 静态地图API

- [文档](https://developers.google.com/maps/documentation/static-maps/intro?hl=zh-cn#ImageFormats)

### Google Map key 
- `AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU`

### example

- 
`https://maps.googleapis.com/maps/api/staticmap?
center=Brooklyn+Bridge,New+York,NY
&zoom=13
&size=600x300
&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794
&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=YOUR_API_KEY`

### url 参数使用
- `https://maps.googleapis.com/maps/api/staticmap?parameters`

### 参数 
- center, center=latitude,longtitud
- zoom, 缩放级别在 15-20 之间，定位用户位置
```
1 - 世界
5 - 大陆/州
10 - 城市
15 - 街道
20 - 建筑物


https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU

```
- scale，默认用户支持 1,2
```
size=100x100&scale=1
size=100x100&scale=2 => 200x200
```
- format, 选填项, png8 或 png（默认值）指定 8 位 PNG 格式
- maptype，选填项
- language 选填项
- region 选填项
- makers 选填项
- path 选填项
- visible 选填项
- style 选填项
- key 必填项
- signature 必填项
`如果启用收费，则必须提供数字签名。如果超过地图加载的每日免费限额，当天剩余时间内的额外地图加载将被收取费用。不包含数字签名的可收费地图加载将会失败。如需了解详细信息，请参阅获取密钥和签名`

### url 大小限制
`Google Static Maps API 网址大小被限制为 8192 个字符`

### 经纬度限制
`纬度和经度使用逗号分隔文本字符串内的数字定义，精确到 6 个小数位`

### 标记
- `markers=markerStyles|markerLocation1| markerLocation2|..`
- 
`https://maps.googleapis.com/maps/api/staticmap?center=31.225726,108.972867&zoom=15&size=400x400
&markers=color:red%7Clabel:S%7C31.225726,108.972867
&markers=size:tiny%7Ccolor:green%7CDelta+Junction,AK
&markers=size:mid%7Ccolor:0xFFFF00%7Clabel:C%7CTok,AK"
&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU
`
`https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=16&size=400x400&markers=color:red%7Clabel:S%7CBrooklyn+Bridge,New+York,NY&key=AIzaSyCJLCSR6MOD5Tm4BADwKXWw9J0G6H6SsiU`