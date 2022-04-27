<template>
  <div id="app">
    <el-container>
      <el-header class="myheader1" style="background-color: #f7f7f7">
        <!-- <el-button ref="btn_prj" @click="choosePrj"> 解决方案 </el-button> -->
        <el-button ref="btn_module" v-bind:type="activeModule" @click="chooseModule"> 模块说明 </el-button>
        <el-button ref="btn_api" v-bind:type="activeProject" @click="chooseApi"> 接口定义 </el-button>
        <el-button ref="btn_tools" v-bind:type="activeTools" @click="chooseTools"> 工具 </el-button>
      </el-header>

      <router-view />
    </el-container>
  </div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      activeModule: '',
      activeProject: '',
      activeTools: ''
    }
  },
  mounted() {
    EventBus.$on('hightlight', (msg) => {
      this.highLightButton(msg)
    })
  },
  methods: {
    highLightButton(type) {
      // for (let index = 0; index < this.btnNum; index++) {
      //     if (index === type) {
      //       this.active[index] = 'primary'
      //     } else {
      //       this.active[index] = ''
      //     }
      // }
      switch (type) {
        case 'module':
          this.activeModule = 'primary'
          this.activeProject = ''
          this.activeTools = ''
          break
        case 'project':
          this.activeProject = 'primary'
          this.activeModule = ''
          this.activeTools = ''
          break
        case 'tools':
            this.activeTools = 'primary'
            this.activeModule = ''
            this.activeProject = ''
          break
        default:
          break
      }
    },
    // choosePrj() {
    //   this.$router.push('/home')
    // },
    chooseModule() {
      this.$router.push('/home')
    },
    chooseApi() {
      this.$router.push('/wms/list')
    },
    chooseTools() {
      this.$router.push('/wms/list')
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

.myheader1 {
  background-color: #f7f7f7;
  position: sticky;
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
