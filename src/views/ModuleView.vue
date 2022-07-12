<template>
  <el-container ref="myContainer">
    <el-aside>
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
    <el-main>
      <VueMarkdown
        :source="content"
        class="markdown-body"
        id="root"
        align="left"
      />
    </el-main>
    <!-- 右侧边栏 目录 -->
    <el-aside style="right: 0">
      <side-catalog
        class="catalog"
        v-bind="catalogProps"
        v-if="isShowCata"
      ></side-catalog>
    </el-aside>
    <div class="content">
      <div class="backtop">
        <el-backtop target=".content .backtop"></el-backtop>
      </div>
    </div>
  </el-container>
</template>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
import VueMarkdown from 'vue-markdown'
import 'github-markdown-css'
import 'highlight.js/styles/googlecode.css'
import 'vue-side-catalog/lib/vue-side-catalog.css'
import SideCatalog from 'vue-side-catalog'
// import SideCatalog from "@/components/main.vue";
import axios from 'axios'
import C_DEF from '@/common/const.js'
import {highLightButton} from '@/common/const.js'

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
      },
      clientHeight: ''
    }
  },
  async beforeCreate() {
    const that = this
    await axios
      .get(C_DEF.SERVER_URL + '/markdownList/module')
      .then((result) => {
        console.log(result)
        that.list = result.data

        let module = this.$route.params.name
        console.log(module)
        if (module === undefined) {
          that.markdown(that.list[0]['title'])
        } else {
          this.markdown(module)
        }
      })
      .catch((err) => {
        console.log('error: ' + err)
      })
  },
  mounted() {
    console.log('module view mounted')
    highLightButton(1)

    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
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
      this.$router.push('/module/' + file)
      this.markdown(file)
    },
    markdown(file) {
      const that = this
      axios
        .get(C_DEF.SERVER_URL + '/content/' + file)
        .then((result) => {
          that.content = result.data.data
          that.gotoTop()
        })
        .then(() => {
          that.isShowCata = true
        })
        .catch((err) => {
          console.log('error: ' + err)
        })
    },
    gotoTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style scoped>
.el-container {
  position: relative;
  height: 500px;
  background-color: #fff;
  color: white;
}

.el-aside {
  position: fixed;
  width: 200px;
  margin: 6% auto;
  overflow-y: hidden;
}

.el-main {
  position: absolute;
  max-width: 60%;
  min-width: 60%;
  top: 65px;
  margin: 0 20% 0 20%;
  direction: ltr;
}

.catalog {
  text-align: left;
  color: black;
}

.content {
  height: 100%;
}

.backtop {
  height: 100%;
}
</style>
