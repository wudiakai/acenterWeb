<template>
  <el-container ref="myContainer">
    <el-aside>
      <el-menu
        align="left"
        @select="handleSelect"
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
    <el-aside style="right:0">
      <side-catalog
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
import { EventBus } from '@/event-bus.js'

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
      },
      clientHeight:'',
    }
  },
  async beforeCreate() {
    const that = this
    await axios
      .get(SERVER_URL + '/markdownList/module')
      .then((result) => {
        that.list = result.data
        that.markdown(that.list[0]['title'])
      })
      .catch((err) => {
        console.log('error: ' + err)
      })
  },
  mounted(){
    console.log('module view mounted')
    this.highLightButton(0)
    this.clientHeight =   `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
  },
  watch:{
    clientHeight: function () {
        this.changeFixed(this.clientHeight)
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
    changeFixed(clientHeight){ //动态修改样式
        this.$refs.myContainer.$el.style.height = clientHeight-20+'px';
      },
    highLightButton(id){
      EventBus.$emit("hightlight", id);
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
  position:relative;
  height: 500px;
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
  position: fixed;
  width: 200px;
  /* height: 200px; */
  margin: 4% auto;
  /* left: 0; */
  /* right: 0; */
  /* background-color: yellowgreen;
  max-width: 200px;
  min-height: 50px; */
}
.el-main{
  position: absolute;
  top:80px;
  width: 55%;
  left: 50%;
  margin: 0 1%;
  /* scroll:auto; */
  /* 固定的盒子应该有宽度 */
  -webkit-transform: translateX(-50%);
  /* transform: translateX(-60%); */
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
  text-align: left;
  color:black;
}
</style>
