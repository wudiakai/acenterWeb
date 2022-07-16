<template>
  <div class="container">
    <h3>配置文件生成工具</h3>
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
       <div slot="tip" class="el-upload__tip" v-show="isShowDownload">代码生成成功，<a href="#" @click="download('config')"> 点击下载</a></div>
    </el-upload>
    <div class="subcontainer">
      <a href="./static/AndroidPF配置表.xlsx"
         rel="external nofollow"
         download="AndroidPF配置表.xlsx">
        <el-button type="info">
          下载模板
        </el-button>
      </a>
      <el-button type="primary" @click="submitUpload('config')">生成代码</el-button>
    </div>
  </div>
</template>

<script>
import ToolJs from '@/js/tools'

export default {
  ...ToolJs
}

</script>

<style scoped>
@import "@/css/tool.css";
</style>
