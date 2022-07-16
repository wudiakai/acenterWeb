<template>
  <div class="container">
    <h3>APK签名工具</h3>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :before-upload="beforeUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload-list__item-name">{{ fileName }}</div>
<!--      <div slot="tip" class="el-upload__tip" v-show="isShowDownload">签名成功，<a href="#" @click="download('vhal')"> 点击下载</a></div>-->
    </el-upload>
    <div class="subcontainer" >
      <a href="./static/vhal配置表.xls"
         v-if="false"
         rel="external nofollow"
         download="vhal配置表.xls">
        <el-button type="info">
          下载签名文件
        </el-button>
      </a>
      <el-button type="primary" @click="submitUpload('vhal')">签名</el-button>
    </div>
  </div>
</template>

<script>
// import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
@import "@/css/tool.css";
</style>
