<template>
  <div class="container">
<!--    <p>API 页面</p>-->
<!--    <iframe id="frame" src="@/asserts/test.html" ref="iframe"> </iframe>-->
    <iframe
      id="frame" :src="src" frameborder="0" class="pc iframe">
    </iframe>
  </div>
</template>

<script>
import { highLightButton } from '@/js/util'

export default {
  data() {
    return {
      src: 'http://10.1.79.81:2023/reference/classes.html',
      // src: 'file://10.1.79.81/likai/work/python/node/backend/ACenterWeb/Res/androiddoc/reference/index.html',
      iframeWin: {}
      // src: '../../../static/class.html'
    }
  },
  mounted() {
    highLightButton(2)
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
#frame{
  width: 100%;
  height: 700px;
}
</style>
