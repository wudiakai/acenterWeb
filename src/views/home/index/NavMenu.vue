<template>
  <el-aside width="200px">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu" />
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/stats">
        <i class="el-icon-menu" />
        <span slot="title">数据管理</span>
      </el-menu-item>

      <el-menu-item index="/user">
        <i class="el-icon-menu" />
        <span slot="title">user管理</span>
      </el-menu-item>

      <el-submenu index="/wms">
        <template slot="title">
          <i class="el-icon-menu" />
          信息管理
        </template>
        <el-menu-item index="/wms/list">
          列表管理
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  // name: 'IndexView',
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
