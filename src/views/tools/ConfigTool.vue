<template>
  <el-container>
    <el-main>
      <el-row :gutter="20" style="color:#000">
        <el-col :span="4" :offset="2" ><b>配置文件生成工具</b></el-col>
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
        <el-col :span="2" :offset="3">
          <a href="./static/AndroidPF配置表.xlsx"
            rel="external nofollow"
            download="AndroidPF配置表.xlsx"><el-button type="info">下载模板</el-button></a>
        </el-col>
         <el-col :span="2" :offset="1">
          <el-button type="primary" @click="submitUpload()">生成代码</el-button>
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
      fileName: '',
      files: '',
      isShowDownload: false
      // downloadUrl: ''
    }
  },
  mounted() {},
  methods: {
    beforeUpload(file) {
      // debugger
      console.log(file, '文件')
      this.files = file
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!')
        return
      }
      if (!isLt2M) {
        this.$message.warning('上传大小不能超过 5MB!')
        return
      }
      this.fileName = file.name
      return false // 返回false不会自动上传
    },
    submitUpload() {
      // debugger
      console.log('上传' + this.files.name)
      if (this.fileName === undefined) {
        this.$message.warning('请选择要上传的文件！')
        return false
      }
      const fileFormData = new FormData()
      fileFormData.append('file', this.files, this.fileName) // filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      this.$axios.post('/tools/config', fileFormData)
        .then((res) => {
          // debugger
          // console.log(res)
          // console.log(res.data.msg)
          if (res.data.msg === 'OK') {
            // this.isShowDownload = true
            this.download()
          }
      })
    },
    download() {
      this.$axios({
        method: 'GET',
        url: '/tools/config/config',
        responseType: 'blob'
      }).then(res => {
        console.log(res)
        const blob = new Blob([res.data], { type: 'application/zip' }) // new一个二进制对象
        const url = window.URL.createObjectURL(blob) // 转化为url
        const link = document.createElement('a') // 创建个a标签
        link.href = url
        link.download = 'config'// 重命名
        link.click()
        URL.revokeObjectURL(url) // 释放内存
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
