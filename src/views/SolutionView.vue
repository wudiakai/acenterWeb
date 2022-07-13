<template>
  <el-container ref="myContainer">
    <template>
      <el-backtop class="my_backtop"></el-backtop>
    </template>
    <el-aside>
      <el-menu class="my_menu" @select="handleSelect">
        <template v-for="(item, primary) in list">
          <el-menu-item
            v-if="!item.submenu"
            :key="primary"
            :index="primary.toString()"
          >
            <span slot="title" :title="item.title">{{ item.title }} </span>
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
              <span :title="subitem">
                {{ subitem }}
              </span>
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
    <el-aside class="my_catalog">
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
import {highLightButton} from '@/common/const.js'

export default {
  name: 'Welcome',
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
        watch: true
      },
      clientHeight: ''
    }
  },
  async beforeCreate() {
    const that = this
    await this.$axios
      .get('/markdownList/feature')
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
    console.log('Solution view mounted')
    highLightButton(0)

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
      this.$router.push('/home/' + file)
      this.markdown(file)
    },
    markdown(file) {
      const that = this
      this.$axios
        .get('/content/' + file)
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

.markdown-body {
  margin-left: 10px;
}

.my_menu {
  overflow: scroll;
  text-align: left;
  height: 600px;
}

.my_catalog {
  overflow: scroll;
  height: 100%;
  right: 0;
}
.my_backtop{
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0,0,0, .20);
  text-align: center;
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px;

}

/*//滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
</style>
