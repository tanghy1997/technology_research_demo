<template>  
<div class="tinymce-container editor-container">    
<textarea :id="tinymceId" class="tinymce-textarea" v-model="content"/> 
<Upload
      multiple
      ref="imageUpload"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-success="insertImage"
      style="display:none">
</Upload> 
<button @click="clickButton">点击</button>
<test v-if="show" :commentData="content"></test>
</div>
</template>
<script>
import test from './test'
export default {
    name: 'Tinymce', 
    components: {
        test
    },
    data() {  
        return {   
            tinymceId: 'tinymc',
            show: false,
            content: '',
            config: {
                language: 'zh_CN',
                height: 600,
                menubar: this.menubar, //菜单:指定应该出现哪些菜单        
                toolbar: ["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample", "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],        
                plugins: ["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"], // 插件(比如: advlist | link | image | preview等)        
                object_resizing: false, // 是否禁用表格图片大小调整        
                end_container_on_empty_block: true, // enter键 分块        
                powerpaste_word_import: 'merge', // 是否保留word粘贴样式  clean | merge        
                code_dialog_height: 450, // 代码框高度 、宽度        
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square', // 无序列表 有序列表  
                paste_data_images: true, // 设置为“true”将允许粘贴图像，而将其设置为“false”将不允许粘贴图像。

            }
        } 
     }, 
    mounted(){      
        this.initTinymce()
    },
    methods: {   
        initTinymce() {  
            console.log(window.tinymce)
             window.tinymce.init({      
                selector: `#tinymc`,
                ...this.config,
                content_style: 'img {max-width:100% !important }', // 初始化赋值
                /**
                 * 下面方法是为tinymce添加自定义插入图片按钮
                 * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
                 */
                setup: (editor) => {
                    editor.ui.registry.addButton('imageUpload', {
                    // text: '插入图片',
                    tooltip: '插入图片',
                    icon: 'image',
                    onAction: () => {
                        console.log(123)
                        let upload = that.$refs.imageUpload
                        upload.handleClick()
                    }
                    })
                } 
            })   
        },
        clickButton() {
            // const data = this.getContent();
            console.log(window.tinymce)
            console.log(window.tinymce.get(this.tinymceId))
            this.show = true;
        },
        setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
        },
        getContent() {
        window.tinymce.get(this.tinymceId).getContent()
        },
    }
    }
</script>