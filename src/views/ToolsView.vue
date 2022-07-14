<template>
  <el-container>
    <el-aside width="200px">
      <el-menu router :default-active="activeIndex">
        <el-menu-item index="/configtool">
          <span slot="title">配置文件</span>
        </el-menu-item>
        <el-menu-item index="/signtool">
          <span slot="title">应用签名</span>
        </el-menu-item>
        <el-menu-item index="/vhaltool">
          <span slot="title">V-HAL工具</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- markdown 内容显示区域 -->
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import { highLightButton } from '@/js/util'

export default {
  data() {
    return {
      activeIndex: '/configtool'
    }
  },
  mounted() {
    highLightButton(3)
  },
  methods: {
    handleSelect(key, keyPath) {
      let file = ''
      if (keyPath.length > 1) {
        const subindex = keyPath[1].split('-')
        file = this.list[keyPath[0]].sublist[subindex[1]]
      } else {
        file = this.list[keyPath[0]].title
      }
      this.markdown(file)
    }
  }
}
</script>

<style scoped>

.el-container {
  margin-top: 65px;
  background-color: #fff;
  color: white;
}

.el-aside {
  background-color: #fff;
  /* top:80px; */
}

/* .el-main{
    top:80px;
} */
</style>
