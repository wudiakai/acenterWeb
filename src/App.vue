<template>
  <div id="app">
    <el-container class="root">
      <el-header class="myheader1">
        <div class="myheader">
          <!-- <el-button ref="btn_prj" @click="choosePrj"> 解决方案 </el-button> -->
          <el-button :type="active===0?'primary':''" @click="chooseModule"> 模块说明 </el-button>
          <el-button :type="active===1?'primary':''" @click="chooseApi"> 接口定义 </el-button>
          <el-button :type="active===2?'primary':''" @click="chooseTools"> 工具 </el-button>
        </div>
      </el-header>
        <router-view />
    </el-container>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
export default {
  data() {
    return {
      active: 4
    }
  },
  mounted() {
    EventBus.$on('hightlight', (id) => {
      this.active = id
    })
  },
  methods: {
    // choosePrj() {
    //   this.$router.push('/home')
    // },
    chooseModule() {
      this.$router.push('/home')
    },
    chooseApi() {
      this.$router.push('/api')
    },
    chooseTools() {
      this.$router.push('/tools')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.myheader{
  margin: 10px auto;
}
.myheader1 {
  background-color: #fff;
  position: fixed;
  width: 100%;
  top: 0px;
  margin: 0px auto;
  height: 80px;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}
</style>
