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
import { EventBus } from '@/event-bus.js'

const SERVER_URL = 'http://10.1.29.11:2022'
// const SERVER_URL = 'http://10.1.79.81:2022'
export default {
  data() {
    return {
      activeIndex: '/configtool'
    }
  },
  async beforeCreate() {
    const that = this
    await axios
      .get(SERVER_URL + '/markdownList/module')
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
    this.highLightButton(2)
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
        .get(SERVER_URL + '/content/' + file)
        .then((result) => {
          that.content = result.data.data
        })
        .then(() => {
          that.isShowCata = true
        })
        .catch((err) => {
          console.log('error: ' + err)
        })
    },
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
.el-container {
  margin-top: 65px;
  background-color: #fff;
  color: white;
}
.el-header {
  background-color: aqua;
}
.el-fooer {
  background-color: gray;
}
.el-aside{
  background-color: #fff;
  top:80px;
}
.el-main{
    top:80px;
}
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
