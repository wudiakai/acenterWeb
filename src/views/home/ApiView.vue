<template>
  <!-- <el-container>
    <el-main> -->
      <div >
        <!-- <iframe :src="src" style= "width:100%;height:100%" frameborder="0"></iframe> -->
        <iframe :src="src" ref="iframe" style= "width:100%;height:100%" frameborder="0"></iframe>
      </div>
    <!-- </el-main>
  </el-container> -->
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {
      src: '../../../static/class.html'
      // src: '../../../static/class.html'
    }
  },
  mounted() {
    console.log('module api mounted')
    this.highLightButton(1)
  },
  methods: {
    highLightButton(id) {
      EventBus.$emit('hightlight', id)
    }
  }
}
</script>

<style scoped>
.el-row {
  background-color: antiquewhite;
  margin: 20px 0;
  /* height: 30px 0; */
}
.el-col {
  background-color: aqua;
  color: white;
  padding: 10px 0;
  box-sizing: border-box;
  border-right: 1px solid white;
}
.el-container {
  background-color: #eee;
  color: white;
}
.el-header {
  background-color: aqua;
}
.el-fooer {
  background-color: gray;
}
/* .el-aside{
  background-color: yellowgreen;
  max-width: 200px;
  min-height: 50px;
} */
/* .el-main{
  background-color: aliceblue;
} */
.el-icon-edit {
  font-size: 30px;
  color: blueviolet;
}
/* .el-button{
  background-color: blueviolet;
  color: white;
} */
.selected {
  background-color: blue;
  color: white;
}
.catalog {
  position: fixed;
  top: 50px;
  right: 50px;
}
</style>
