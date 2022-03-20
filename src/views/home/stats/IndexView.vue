<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        align="left"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        width="400px"
      >
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
    <el-main>
      <VueMarkdown
        :source="content"
        class="markdown-body"
        id="root"
        align="left"
      />
    </el-main>
    <!-- 右侧边栏 目录 -->
    <el-aside
      width="200px"
      style="background-color: rgb(238, 241, 246)"
      align="left"
    >
      <side-catalog
        align="left"
        class="catalog"
        v-bind="catalogProps"
        v-if="isShowCata"
      ></side-catalog>
    </el-aside>
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
      this.$refs.btn_prj.type = 'primary'
      this.$refs.btn_module.type = ''
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

<style scoped>
.el-row {
  background-color: antiquewhite;
  margin: 20px 0;
  /* height: 30px 0; */
}
.el-col {
  background-color: aqua;
  color: white;
  padding: 10px 0;
  box-sizing: border-box;
  border-right: 1px solid white;
}
.el-container {
  background-color: #eee;
  color: white;
}
.el-header {
  background-color: aqua;
}
.el-fooer {
  background-color: gray;
}
/* .el-aside{
  background-color: yellowgreen;
  max-width: 200px;
  min-height: 50px;
} */
/* .el-main{
  background-color: aliceblue;
} */
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
