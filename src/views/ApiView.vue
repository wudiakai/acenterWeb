<template>
  <!-- <el-container>
    <el-main> -->
      <div style="margin-top:65px">
        <p>API  页面</p>
        <!-- <iframe :src="src" style= "width:100%;height:100%" frameborder="0"></iframe> -->
        <!-- <iframe src="static/class.html" ref="iframe" style= "width:100%;height:100%" frameborder="0"></iframe> -->
        <!-- <a href="static/class.html" target ="_blank">Android Doc</a>
        <p>
        <a href="http://www.baidu.com">baidu</a>
        </p> -->
      </div>
    <!-- </el-main>
  </el-container> -->
</template>

<script>
import { highLightButton } from '@/js/util'

export default {
  data() {
    return {
      src: '/static/class.html'
      // h5file: require('../../../public/static.class.html')
      // src: '../../../static/class.html'
    }
  },
  mounted() {
    console.log('module api mounted')
    highLightButton(2)
    // this.$refs.tempHtml.contentDocument.documentElement.innerHTML = this.h5file
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
