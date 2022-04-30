<template>
   <el-container>
    <el-main>
      <el-row :gutter="20" style="color:#000">
        <el-col :span="4" :offset="2" ><b>APK签名工具</b></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" :offset="2">
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
            <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
            <!-- <div slot="tip" class="el-upload__tip">代码生成成功，<a href="#" @onclick="download"> 点击下载</a></div> -->
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20">
         <el-col :span="2" :offset="4">
          <el-button type="primary" @click="submitUpload()">签名</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="1">
          <el-button type="primary" v-show=isShowDownload @click="download()">点击下载代码</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
.default{
  color: #000;
  text-align: left;
  margin-left: 20%;
}
</style>
