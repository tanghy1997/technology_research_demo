## 关于本次对Tinymce富文本的调研配合对应Demo食用
:octocat:
### 1. 准备：
> 本次使用的到的是Tinymce和Tinymce-vue
```
## 首先安装Tinymce-vue
npm install @tinymce/tinymce-vue
## 然后按要求在Vue中使用 https://github.com/tinymce/tinymce-vue
<tinymce-editor api-key='YOUR_API_KEY' :init="{/* your settings */}"></tinymce-editor>
## 不建议使用这种方式，这中方式需要去注册购买云端
## 所以我们这里需要在将tinymce安装本地使用
npm install tinymce 
```

### 2. 初始化
- 首先在一个静态文件夹public中创建目录tinymce,下载tinymce完成后在node_modules 中找到 tinymce/skins目录，将其复制到\tinymce目录下面
- 下载语言包 [中文语言包](https://www.tiny.cloud/get-tiny/language-packages/)，解压后将其放在tinymce下的langs文件夹下

#### 遇到的问题：
**tinymce文件夹在打包时需要webpack不处理**，打包后的位置也很重要，向本demo中的文件夹放在public中打包后到原封不动到dist文件夹，
而在管理系统iflytek中使用如下：
```
## 首先需要在webpack中配置对应文件夹不做打包处理
plugins: [
    new CopyWebpackPlugin([
        {
            from:'pubilc', // 设置不打包直接输出的文件
            // to: 'static', // 设置打包后静态文件放置位置
            ignore: ['.*'] //忽略规则（这种写法表示将文件夹下所有文件都复制）
        }
    ])
]
```
## 3. 引入
在需要引用的Vue文件中引入，建议封装成通用组件,具体封装看本demo中views/tinymce

### 下面说一些注意的点：
1. 路径
```
## 在init的时候,下面的路径就是以打包后生成的index.html来找的所以之前准备时静态文件的出口很重要，不然会造成路径错误
{
    skin_url: '/tinymce/skins/ui/oxide',
    language_url: `/tinymce/langs/zh_CN.js`,
}
```
2. 配置说明
```
paste_data_images  // 允许粘贴图像,是否能通过拖动将图片拖到输入框
font_formats: "宋体=宋体;微软雅黑=微软雅黑;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;...",   //设置字体下拉框
fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",  // 设置字体大小

plugins
toolbar
## 这里需要注意bbcode这个plugins要谨慎使用会影响大部分功能比如预览
```
3. 自定义上传
```
## 在init中配合以iview中上传组件使用
## 这样就可以做到实现上传的时候按iview的方式来检验文件参数了
setup: (editor) => {  // 自定义内容
                    // console.log(editor);
                    editor.ui.registry.addButton('imageUpload', {  // 这里是自定义image图标 并且在toolbar中加入imageUpload
                        // text: '插入图片',
                        tooltip: '插入图片',
                        icon: 'image',
                        onAction: () => {
                            let upload = that.$refs.imageUpload;
                            upload.handleClick()
                        }
                    })
                },
```

4. 拖图片上传（校验图片大小）
> 这是一个恶心的点，目前实现有点low有待优化
```
## 首先文档给出两个处理粘贴的回调
paste_postprocess  // 将粘贴的内容插入编辑器之前修改它，但在将其解析为DOM结构之后。
paste_preprocess  //在将粘贴的内容插入编辑器之前对其进行修改
```

 - 第一点就是图片通过拖入后获取到标签中的src是blob url所以要先将blobURL转换成Blob对象来获取对应图片的原始大小（这里是通过ajax来实现详情看utils/index.js）
 - 第二点，因为ajax是异步的所以无法使用直接删除节点得方式在判断图片过大不给上传效果，所以这里通过同时删除本身节点和在iframe中节点来实现
~~~
paste_postprocess: async(plugin, args) => { // 将粘贴的内容插入编辑器之前修改它，但在将其解析为DOM结构之后。
                    // console.log(args)
                    // console.log(args.node);
                    // console.log(args.node.children)
                    // console.log(args.node.childNodes)
                    // let imgFlag=false;
                    let imageNode;
                    let randomNum = Math.floor(Math.random()*100000)+100000;
                    for(let i=0;i<args.node.childNodes.length;i++) {
                        if(args.node.childNodes[i].localName == 'img') {
                            imageNode = args.node.childNodes[i];
                            args.node.childNodes[i].setAttribute('id', randomNum)
                        }
                    }
                    // console.log(imageNode)
                    
                    if(imageNode) {
                    // let randomNum = Math.floor(Math.random()*100000)+100000;
                    // imageNode.setAttribute('img_sign',randomNum)
                        
                    let imageUrl = imageNode.getAttribute('src');
                        
                    // //     // debugger;
                    // //     console.log(that.imageSize)
                    let imageBlob = await getBlob(imageUrl);
                    // //     console.log(imageBlob)
                    if(imageBlob.size /1024 > 300) {
                            args.node.removeChild(imageNode) 
                            const img = document.getElementById('tinymceEditor_ifr').contentWindow.document.getElementById(randomNum);
                            // console.log(img)
                            img.remove();
                            that.$Notice.warning({
                                title: '提示',
                                desc: '图片大小应不超过300KB'
                            })
                    }
                    }
                    
                }
~~~
