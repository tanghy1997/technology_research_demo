<!--
 * @Description: 
 * @version: 
 * @Company: iflytek
 * @Author: hytang2
 * @Date: 2019-09-06 14:01:17
 * @LastEditTime: 2019-09-06 17:23:18
 -->
 // TODO: 这里不推荐使用背景图片会不清晰
<template>
  <div class="content" ref="addImage">
      <div ref="capture" id="image-container">
        <img id="backImg" src="../assets/images/img_zhengshu@2x.png" alt="背景图">
        <!-- <div id="avaUrl"></div> -->
        <div id="userName">姜逸磊</div>
        <div id="certNo">IFLYTEK-BEO-00012</div>
        <div id="createDate">2019/08/23</div>
        <div id="avaUrl">
          <img src="https://test.xfinfr.com/driposs/ST3AX0ML/transserver/experience/0cf77138a6d1432fb4744c5b1b29b49e.png" alt="">
        </div>
      </div>

    <button v-on:click="comfirmPic">提交</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
  name: 'HelloWorld',
  data() {
    return {
       
    }
  },
  methods: {
    comfirmPic:function(e) { 
      console.log(1122)
      this.generatorImage();
    },
    async generatorImage () {
        // html2canvas(this.$refs.capture).then(canvas => { 
        //   console.log(canvas)
        //       this.$refs.addImage.append(canvas);  
        //       // let link = document.createElement('a');
        //       // link.href = canvas.toDataURL();
        //       // link.setAttribute('download', '图片canvas.png');
        //       // link.style.display = 'none';
        //       // document.body.appendChild(link);
        //       // link.click();
        // })
        const opts = {
          scale: 2,
          dpi: 96,
          useCORS: true  // 解决图像跨域不显示问题
        }
        const canvas = await html2canvas(this.$refs.capture, opts);
        this.$refs.addImage.append(canvas);  
        let dataURL = canvas.toDataURL("image/png");
        dataURL = dataURL.split(",")[1];
        console.log(dataURL)
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#image-container {
    width:690px;
    height: 486px; 
    /* background-image: url('../assets/images/img_zhengshu@2x.png'); */
    /* background-repeat: no-repeat; */
    /* background-size: 690px 486px; */
    position: relative;
}
#backImg {
    width:690px;
    height: 486px; 
}
#avaUrl {
  display:inline-block;
  /* position:relative; */
  width: 98px;
  height: 98px;
  overflow:hidden;
  border-radius:50%;
  position: absolute;
  left: 52px;
  top: 227px;
  /* border-radius:50%; */
  /* background-image: url('https://test.xfinfr.com/driposs/ST3AX0ML/transserver/experience/0cf77138a6d1432fb4744c5b1b29b49e.png'); */
  /* background-repeat: no-repeat; */
  /* background-size: 98px 113px; */
}

#avaUrl img {
    width:100%;
    height:auto;
}

#userName {
  position: absolute;
  left: 55px;
  top: 343px;
  width:90px;
  height:34px;
  font-size:30px;
  font-family:FZLTH--GB1;
  font-weight:normal;
  color:rgba(0,0,0,1);
  line-height:34px;
}

#certNo {
  position: absolute;
  left: 218px;
  top: 368px;
  width:224px;
  height:21px;
  font-size:18px;
  font-family:FZLTCHJW--GB1;
  font-weight:normal;
  color:rgba(0,0,0,1);
  line-height:21px;
  text-align: left;
}

#createDate {
  position: absolute;
  left: 538px;
  top: 368px;
  width:106px;
  height:21px;
  font-size:18px;
  font-family:FZLTCHJW--GB1;
  font-weight:normal;
  color:rgba(0,0,0,1);
  line-height:21px;
  text-align: left;
}
</style>
