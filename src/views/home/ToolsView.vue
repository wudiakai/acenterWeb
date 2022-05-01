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
import axios from 'axios'
import C_DEF, { highLightButton } from '@/common/const'

export default {
  data() {
    return {
      activeIndex: '/configtool'
    }
  },
  async beforeCreate() {
    const that = this
    await axios
      .get(C_DEF.SERVER_URL + '/markdownList/module')
      .then((result) => {
        that.list = result.data
        that.markdown(that.list[0].title)
      })
      .catch((err) => {
        console.log('error: ' + err)
      })
  },
  mounted() {
    console.log('module view mounted')
    highLightButton(2)
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
    },
    markdown(file) {
      const that = this
      axios
        .get(C_DEF.SERVER_URL + '/content/' + file)
        .then((result) => {
          that.content = result.data.data
        })
        .then(() => {
          that.isShowCata = true
        })
        .catch((err) => {
          console.log('error: ' + err)
        })
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
.el-aside{
  background-color: #fff;
  /* top:80px; */
}
/* .el-main{
    top:80px;
} */
</style>
