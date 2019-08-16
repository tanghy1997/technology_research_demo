<template>
    <div>
        <!--
          给editor加key是因为给tinymce keep-alive以后组件切换时tinymce编辑器会显示异常，
          在activated钩子里改变key的值可以让编辑器重新创建
        -->
        <editor id="tinymceEditor" :init="tinymceInit" v-model="editorcontent" :key="tinymceFlag"></editor>
        <Upload
                multiple
                ref="imageUpload"
                :before-upload="beforeUpload"
                action=""
                :on-success="insertImage"
                style="display:none">
        </Upload>
        <Button type="primary" @click="getContent">提交</Button>

<!--        <test v-if="show" :commentData="content"></test>-->
    </div>
</template>
<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver/theme'
    import Editor from '@tinymce/tinymce-vue'

    import 'tinymce/plugins/advlist'
    import 'tinymce/plugins/anchor'
    import 'tinymce/plugins/autolink'
    // import 'tinymce/plugins/autoreesize'
    import 'tinymce/plugins/autosave'
    import 'tinymce/plugins/bbcode'
    import 'tinymce/plugins/charmap'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/codesample'
    // import 'tinymce/plugins/colorpicker'
    // import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/directionality'
    // import 'tinymce/plugins/emoticons'
    import 'tinymce/plugins/fullpage'
    import 'tinymce/plugins/fullscreen'
    import 'tinymce/plugins/help'
    import 'tinymce/plugins/hr'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/imagetools'
    import 'tinymce/plugins/importcss'
    import 'tinymce/plugins/insertdatetime'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/nonbreaking'
    import 'tinymce/plugins/noneditable'
    import 'tinymce/plugins/pagebreak'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/print'
    // import 'tinymce/plugins/quickbar'
    import 'tinymce/plugins/save'
    import 'tinymce/plugins/searchreplace'
    import 'tinymce/plugins/spellchecker'
    import 'tinymce/plugins/tabfocus'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/template'
    // import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/textpattern'
    import 'tinymce/plugins/toc'
    import 'tinymce/plugins/visualblocks'
    import 'tinymce/plugins/visualchars'
    import 'tinymce/plugins/wordcount'

    // import test from './test';
    import plugins from './pliguns';
    import toolbar from './toolbar';

    // import server from '@/web-service-api/wrapper.js';
    import {getBlob} from '../../utils/index'

    export default {
        name: 'TinymceEditor',
        components: {
            'editor': Editor,
        },
        data () {
            return {
                tinymceFlag: 1,
                tinymceInit: {},
                editorcontent: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址',
                // show: false,
                imageSize:null
            }
        },
        methods: {
            // 插入图片至编辑器
            insertImage (res) {
                console.log('成功',res);
                let url =  res ? res: '';// 图片存储地址
                tinymce.execCommand('mceInsertContent', false, `<img src=${url}>`);
            },
            getContent() {
                console.log(this.editorcontent);
                // this.show = true;
                this.$store.commit('setTinymceData', this.editorcontent);
            },
            beforeUpload(file) {
                var self = this;
                if(file.size/1024 <= 300) {
                    this.file = file; //需要传给后台的file文件
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {

                        // const imgPath = e.target.result.split(',');
                        // const _base64 = imgPath[1];
                        self.insertImage(e.target.result)
                        // console.log(_base64)
                        // this.uploadImg(_base64, file)
                    };
                }else {
                    self.$Notice.warning({
                        title: '提示',
                        desc: '图片大小应不超过300KB'
                    })
                }
                
                return false//阻止图片继续上传，使得form表单提交时统一上传
            },
            // uploadImg: function(baseData,file) {  // 不需要走网关上传图片本地直接base64
            //         var self = this;
            //
            //         let param = {
            //                 base: {
            //                     appid:server.baseParam.appid,
            //                     productId:server.baseParam.productId,
            //                 },
            //                 param:{
            //                     body: baseData,
            //                     fileExt:'jpg',
            //                     source:'wxPic',
            //                     remark:'保存微信上传照片',
            //                 }
            //             };
            //             // console.log(param)
            //
            //             server._ac.post(param, "trans", "uploadFile", "1.0", "",function(res){
            //                 // console.log(res);
            //                 // self.$Message.success(res.data.message);
            //                 self.insertImage(res)
            //             },function (err) {
            //                 // console.log('失败')
            //                 self.$Message.error(err.data.message);
            //             });
            // },
        },
        created () {
            const that = this;
            this.tinymceInit = {
                // 注意这两个路径是根据打包文件的根目录文件
                // skin_url: '/skins/ui/oxide', 
                // language_url: `/langs/zh_CN.js`,
                skin_url: '/tinymce/skins/ui/oxide',
                language_url: `/tinymce/langs/zh_CN.js`,
                language: 'zh_CN',
                height: 600,
                browser_spellcheck: true, // 拼写检查
                branding: false, // 去水印
                // elementpath: false,  //禁用编辑器底部的状态栏
                statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 允许粘贴图像
                paste_enable_default_filters: false, // 允许您在设置为false时禁用TinyMCE的默认粘贴过滤器。
                // menubar: false, // 隐藏最上方menu
                // plugins: 'advlist table lists paste preview fullscreen link hr image',
                plugins: plugins,
                // toolbar: 'undo redo | styleselect fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
                // toolbar: ["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample", "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],
                toolbar: toolbar,
                // toolbar_drawer: 'sliding', 超出显示... 有floating和sliding模式
                /**
                 * 下面方法是为tinymce添加自定义插入图片按钮
                 * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
                 */
                powerpaste_word_import: "prompt",  // 在尝试粘贴word内容后，提示用户在清除和合并选项之间进行选择。
                powerpaste_html_import: "prompt",  //在尝试粘贴HTML内容后，提示用户在清除和合并选项之间进行选择
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
                //TinyMCE 会将所有的 font 元素转换成 span 元素        
                convert_fonts_to_spans: true,
                //换行符会被转换成 br 元素        
                convert_newlines_to_brs: false,
                //在换行处 TinyMCE 会用 BR 元素而不是插入段落        
                force_br_newlines: false,
                //当返回或进入 Mozilla/Firefox 时，这个选项可以打开/关闭段落的建立       
                force_p_newlines: false,
                //这个选项控制是否将换行符从输出的 HTML 中去除。选项默认打开，因为许多服务端系统将换行转换成，
                // 因为文本是在无格式的 textarea 中输入的。使用这个选项可以让所有内容在同一行。
                remove_linebreaks: false,
                //不能把这个设置去掉，不然图片路径会出错
                relative_urls: false,
                //允许拖动大小
                resize: true,
                font_formats: "宋体=宋体;微软雅黑=微软雅黑;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
                fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",

                paste_preprocess: async(plugin, args) => {  // 在将粘贴的内容插入编辑器之前对其进行修改
                    // console.log(plugin)
                    // console.log(args);
                    // const data = args.content;
                    // console.log(args.content);
                    // console.log('111',args)
                    // let isInmage = args.content.match('img') ? true : false;
                    // if(isInmage) {
                    //     let randomNum = Math.floor(Math.random()*100000)+100000;
                    //     let imageUrl = args.content.match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
                    //     let imageBlob = await getBlob(imageUrl);
                    //     console.log(imageBlob)
                    //     if(imageBlob.size /1024 > 300) {                                
                    //             that.$Notice.warning({
                    //                 title: '提示',
                    //                 desc: '图片大小应不超过300KB'
                    //             })
                    //     }
                            
                    // }
                    
                },
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
            };
        },
        activated () {
            this.tinymceFlag++
        },
        mounted () {

        }
    }
</script>
