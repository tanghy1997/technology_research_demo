<template>
<div>
  <!--
    给editor加key是因为给tinymce keep-alive以后组件切换时tinymce编辑器会显示异常，
    在activated钩子里改变key的值可以让编辑器重新创建
  -->
  <editor id="tinymceEditor" :init="tinymceInit" v-model="content" :key="tinymceFlag"></editor>
  <Upload
      multiple
      ref="imageUpload"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-success="insertImage"
      style="display:none">
  </Upload>

  <button @click="getContent">提交</button>

  <!-- <test v-if="show" :commentData="content"></test> -->
</div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/link'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'

import test from './test';

export default {
  name: 'TinymceEditor',
  components: {
    'editor': Editor,
    test
  },
  data () {
    return {
      tinymceFlag: 1,
      tinymceInit: {},
      content: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址',
      // show: false
    }
  },
  methods: {
    // 插入图片至编辑器
    insertImage (res, file) {
      let src = '' // 图片存储地址
      tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
    },
    getContent() {
      cosnole.log('你还',this.content)
      // this.$store.commit('setTinymceData', this.content);
      // this.show = true;
    }
  },
  created () {
    const that = this
    this.tinymceInit = {
      skin_url: '/tinymce/skins/ui/oxide',
      language_url: `/tinymce/langs/zh_CN.js`,
      language: 'zh_CN',
      height: 600,
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      // elementpath: false,  //禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      // menubar: false, // 隐藏最上方menu
      plugins: 'advlist table lists paste preview fullscreen link hr image',
      // toolbar: 'undo redo | styleselect fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
      toolbar: ["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample", "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],        

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
            let upload = that.$refs.imageUpload
            upload.handleClick()
          }
        })
      }
    }
  },
  activated () {
    this.tinymceFlag++
  },
  mounted () {

  }
}
</script>
