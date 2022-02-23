<template>
  <div class="about">
    <el-container>
      <el-header>
        <el-row>
          <el-button>方案说明</el-button>
          <el-button>模块说明</el-button>
          <el-button>接口定义</el-button>
          <!-- <el-button type="primary">
            主要按钮
          </el-button>
          <el-button type="success">
            成功按钮
          </el-button>
          <el-button type="info">
            信息按钮
          </el-button>
          <el-button type="warning">
            警告按钮
          </el-button>
          <el-button type="danger">
            危险按钮
          </el-button> -->
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
