<template>
  <div id="app">
    <el-container class="root">
      <el-header class="myheader1">
        <div class="myheader">
          <img src="@/assets/center.png" align="left" height="30px">

          <el-button :type="active===index ?'primary':''" @click="chooseTab(index)" v-for="(title, index) in titles"
                     :key="title"> {{ title }}
          </el-button>

        </div>
      </el-header>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
import { EventBus } from '@/js/event-bus'

export default {
  data() {
    return {
      active: '',
      routers: ['/home', '/module', '/api', '/tools'],
      titles: ['解决方案', '模块说明', '接口定义', '工具']
    }
  },
  mounted() {
    EventBus.$on('hightlight', (id) => {
      this.active = id
    })
  },
  methods: {
    chooseTab(index) {
      const route = this.routers[index]
      this.$router.push(route)
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

.myheader {
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
