<template>
  <el-container id="containter">
    <div id="menu">
      <el-menu router :default-active="activeIndex">
        <el-menu-item :index="routes[index]" v-for="(name, index) in names" :key="name">
          {{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <router-view/>
    </div>
  </el-container>
</template>

<script>
import { highLightButton } from '@/js/util'

export default {
  data() {
    return {
      activeIndex: '/configtool',
      routes: ['/configtool', '/signtool', '/vhaltool'],
      names: ['配置文件', '应用签名', 'V-HAL工具']
    }
  },
  mounted() {
    highLightButton(3)
  },
  methods: {}
}
</script>

<style scoped>

.content{
  margin-left: 250px;
}

#menu {
  position: fixed;
  overflow: scroll;
  text-align: left;
  height: 700px;
  left: 5px;
  width: 250px;
  /*top: 5px;*/
  /*left: 5px;*/
  /*width: 50px;*/
  /*background-color: #fff;*/
}

</style>
