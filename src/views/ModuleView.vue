<template>
  <el-container ref="myContainer">
    <template>
      <el-backtop class="my_backtop"></el-backtop>
    </template>
    <el-aside>
      <el-menu class="my_menu" @select="handleSelect" default-openeds='[1,2,3,4,5,6,7,8,9,10]'>
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
              <b>{{ item.title }}</b>
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
    <el-main id="my_content">
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
// import VueMarkdown from 'vue-markdown'
import 'github-markdown-css'
import 'highlight.js/styles/googlecode.css'
import 'vue-side-catalog/lib/vue-side-catalog.css'
// import SideCatalog from 'vue-side-catalog'
import {highLightButton} from '@/js/util.js'
import moduleJs from '@/js/module'

export default {
  ...moduleJs,
  mounted() {
    highLightButton(1)
  }
}
</script>

<style scoped>
@import "@/css/module.css";
</style>
