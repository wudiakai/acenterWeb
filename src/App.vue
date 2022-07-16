<template>
  <div id="app">
    <div class="myheader">
      <div class="logo">
        <img src="@/assets/center.png" height="25px">
      </div>
      <el-button :type="active===index ?'primary':''" @click="chooseTab(index)" v-for="(title, index) in titles"
                 :key="title"> {{ title }}
      </el-button>
    </div>
    <div id="shadow"></div>
    <router-view/>
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
/* 全局样式 */
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 800px;
  /*font-family:”Microsoft YaHei”,Arial,Helvetica,sans-serif,”宋体”;*/
}
#shadow{
  height: 60px; /* 等于myheader的高度 */
}
.myheader {
  display: flex;
  position: fixed;
  background-color: #f7f7f7;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin: auto;
  align-items: center;
  top: 0px;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .2);*/
}

.logo {
  display: flex;
  position: fixed;
  align-items: center;
  left: 20px;
}
</style>
