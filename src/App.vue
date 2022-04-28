<template>
  <div id="app">
    <el-container>
      <el-header class="myheader1">
        <!-- <el-button ref="btn_prj" @click="choosePrj"> 解决方案 </el-button> -->
        <el-button :type="active===0?'primary':''" @click="chooseModule"> 模块说明 </el-button>
        <el-button :type="active===1?'primary':''" @click="chooseApi"> 接口定义 </el-button>
        <el-button :type="active===2?'primary':''" @click="chooseTools"> 工具 </el-button>
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
      active: 0,
      activeModule: '',
      activeProject: '',
      activeTools: ''
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
/* .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  } */
.myheader1 {
  background-color: #fff;
  position: relative;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 80px;
}

.active {
   background: #fd7522;
   border: 1px solid #fd7522;
   color: #fff;
 }
</style>
