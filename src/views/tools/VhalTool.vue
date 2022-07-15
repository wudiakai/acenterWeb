<template>
  <div id="container">
    <h3>V-HAL生成工具</h3>
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
      <div slot="tip" class="el-upload__tip" v-show="isShowDownload">代码生成成功，<a href="#" @click="download('vhal')"> 点击下载</a></div>
    </el-upload>
    <div id="subcontainer">
      <a href="./static/vhal配置表.xls"
         rel="external nofollow"
         download="vhal配置表.xls">
        <el-button type="info">
          下载模板
        </el-button>
      </a>
      <el-button type="primary" @click="submitUpload('vhal')">生成代码</el-button>
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
#container {
  display: flex;
  width: 500px;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /*flex-direction: column;*/
  color: #000;
}

#subcontainer {
  display: flex;
  /*flex-direction: row;*/
  /*justify-content: space-around;*/
}

el-button {
  margin: 20px;
}
</style>
