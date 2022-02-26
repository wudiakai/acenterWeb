<template>
  <div class="about">
    <el-container>
      <el-header>
        <el-row>
          面包屑
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <NavMenu />
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'
export default {
  components: {
    NavMenu
  },
  // name: 'IndexView',
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
.el-header {
  background-color: #f7f7f7;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fdfdfd;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fdfdfd;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
