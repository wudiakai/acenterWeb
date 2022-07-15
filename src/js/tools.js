export default {
  data() {
    return {
      fileName: '',
      files: '',
      isShowDownload: false
      // downloadUrl: ''
    }
  },
  mounted() {
    this.isShowDownload = false
  },
  methods: {
    beforeUpload(file) {
      // debugger
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
    submitUpload(route) {
      // debugger
      console.log('上传:' + this.fileName)
      if (this.fileName === '' || this.fileName === undefined) {
        this.$message.warning('请选择要上传的文件！')
        return false
      }
      const fileFormData = new FormData()
      fileFormData.append('file', this.files, this.fileName) // filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      this.$axios.post('/tools/' + route, fileFormData)
        .then((res) => {
          // debugger
          console.log('res is :' + res.data.msg)
          if (res.data.msg === 'OK') {
            this.isShowDownload = true
            this.download(route)
          }
        })
    },
    download(route) {
      this.$axios({
        method: 'GET',
        url: '/tools/config/' + route,
        responseType: 'blob'
      }).then(res => {
        // console.log(res)
        const blob = new Blob([res.data], { type: 'application/zip' }) // new一个二进制对象
        const url = window.URL.createObjectURL(blob) // 转化为url
        const link = document.createElement('a') // 创建个a标签
        link.href = url
        link.download = route // 重命名
        link.click()
        URL.revokeObjectURL(url) // 释放内存
      })
    }
  }
}
