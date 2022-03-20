<template>
  <el-container>
    <!-- back to top -->
    <el-backtop />
    <!-- 左侧导航栏 -->
    <!-- <el-aside /> -->
    <el-aside class="leftbar">
      <el-menu align="left" @select="handleSelect">
        <template v-for="(item, primary) in list">
          <el-menu-item
            v-if="!item.submenu"
            :key="primary"
            :index="primary.toString()"
          >
            <span slot="title">{{ item.title }} </span>
          </el-menu-item>
          <el-submenu v-else :key="primary" :index="primary.toString()">
            <template slot="title">
              {{ item.title }}
            </template>
            <el-menu-item
              v-for="(subitem, subindex) in item.sublist"
              :key="subitem"
              :index="primary.toString() + '-' + subindex.toString()"
            >
              {{ subitem }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>

    <!-- markdown 内容显示区域 -->
    <el-container class="middle">
      <!-- <el-header style="text-align: left; font-size: 21px " class="myheader">
      <span><b>{{file}}</b></span>
    </el-header> -->

      <el-main>
        <VueMarkdown
          :source="content"
          class="markdown-body"
          id="root"
          align="left"
        />
      </el-main>
    </el-container>
    <!-- 右侧边栏 目录 -->
    <el-container class="rightbar">
      <el-aside>
        <side-catalog
          align="left"
          class="catalog"
          v-bind="catalogProps"
          v-if="isShowCata"
        ></side-catalog>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
import VueMarkdown from 'vue-markdown'
import 'github-markdown-css'
import 'highlight.js/styles/googlecode.css'
import SideCatalog from 'vue-side-catalog'
// import SideCatalog from "@/components/main.vue";
import 'vue-side-catalog/lib/vue-side-catalog.css'
import axios from 'axios'
const SERVER_URL = 'http://localhost:2022'
// const SERVER_URL='http://10.1.79.81:2022'
export default {
  name: 'Input',
  components: {
    SideCatalog,
    VueMarkdown
  },
  data() {
    return {
      content: '',
      file: '',
      list: [],
      isShowCata: false,
      catalogProps: {
        container: '#root',
        levelList: ['h1', 'h2', 'h3', 'h4', 'h5'],
        watch: true
      }
    }
  },
  async beforeCreate() {
    const that = this
    await axios
      .get(SERVER_URL + '/markdown_list')
      .then((result) => {
        that.list = result.data
        that.markdown(that.list[0]['title'])
      })
      .catch((err) => {
        console.log('error: ' + err)
      })
  },
  mounted() {
    console.log('mounted')
    this.choosePrj()
  },
  methods: {
    handleSelect(key, keyPath) {
      let file = ''
      if (keyPath.length > 1) {
        const subindex = keyPath[1].split('-')
        file = this.list[keyPath[0]]['sublist'][subindex[1]]
      } else {
        file = this.list[keyPath[0]]['title']
      }
      this.markdown(file)
    },
    markdown(file) {
      const that = this
      axios
        .get(SERVER_URL + '/markdown/' + file)
        .then((result) => {
          this.file = file
          that.content = result.data.data
        })
        .then(() => {
          that.isShowCata = true
        })
        .catch((err) => {
          console.log('error: ' + err)
        })
    },
    choosePrj() {
      console.log('btn-prj')
      this.$refs.btn_prj.type = 'primary'
      console.log('btn-module')
      this.$refs.btn_module.type = ''
      console.log('btn-api')
      this.$refs.btn_api.type = ''
    },
    chooseModule() {
      this.$refs.btn_prj.type = ''
      this.$refs.btn_module.type = 'primary'
      this.$refs.btn_api.type = ''
    },
    chooseApi() {
      this.$refs.btn_prj.type = ''
      this.$refs.btn_module.type = ''
      this.$refs.btn_api.type = 'primary'
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

/* .el-main {
  left: 200px;
  right: 200px;
  overflow-y: scroll; */
/* } */
.leftbar {
  /* float: left; */
  left: 0px;
  width: 200px;
  /* background-color: rgb(238, 241, 246); */
  position: absolute;
}
.middle {
  position: relative;
  top: 70px;
  bottom: 0;
  left: 300px;
  right: 300px;
}
.rightbar {
  /* background-color: rgb(238, 241, 246); */
  /* float: right; */
  position: relative;
  width: 280px;
  right: 0px;
}
</style>
