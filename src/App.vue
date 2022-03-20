<template>
  <div id="app">
    <el-container>
      <el-header class="myheader1" style="background-color: #f7f7f7">
        <el-button ref="btn_prj" @click="choosePrj"> 解决方案 </el-button>
        <el-button ref="btn_module" @click="chooseModule"> 模块说明 </el-button>
        <el-button ref="btn_api" @click="chooseApi"> 接口定义 </el-button>
      </el-header>

      <router-view />
    </el-container>
  </div>
</template>

<script>
export default {
  // name: 'Input',

  data() {
    return {}
  },
  methods: {
    choosePrj() {
      this.$refs.btn_prj.type = 'primary'
      this.$refs.btn_module.type = ''
      this.$refs.btn_api.type = ''
      this.$router.push('/homeIndex')
    },
    chooseModule() {
      this.$refs.btn_prj.type = ''
      this.$refs.btn_module.type = 'primary'
      this.$refs.btn_api.type = ''
      this.$router.push('/stats')
    },
    chooseApi() {
      this.$refs.btn_prj.type = ''
      this.$refs.btn_module.type = ''
      this.$refs.btn_api.type = 'primary'
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
</style>
