<template>
  <div class="button">
    <el-container>
      <el-header>
        <el-button
          ref="btn_prj"
          @click="choosePrj"
        >
          解决方案
        </el-button>
        <el-button
          ref="btn_module"
          @click="chooseModule"
        >
          模块说明
        </el-button>
        <el-button
          ref="btn_api"
          @click="chooseApi"
        >
          接口定义
        </el-button>
      </el-header>
      <el-header>header</el-header>
      <el-container>
        <el-aside>aside</el-aside>
        <el-main>main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // name: 'Input',

  data () {
    return {
      input1: '1',
      input2: '2',
      input3: '3',
      input4: '4'
    }
  },
  methods: {
    choosePrj () {
      this.$refs.btn_prj.type = 'primary'
      this.$refs.btn_module.type = ''
      this.$refs.btn_api.type = ''
    },
    chooseModule () {
      this.$refs.btn_prj.type = ''
      this.$refs.btn_module.type = 'primary'
      this.$refs.btn_api.type = ''
    },
    chooseApi () {
      this.$refs.btn_prj.type = ''
      this.$refs.btn_module.type = ''
      this.$refs.btn_api.type = 'primary'
    }
  }
}
</script>

<style scoped>
.el-row{
  background-color: antiquewhite;
  margin: 20px 0;
  /* height: 30px 0; */
}
.el-col{
  background-color: aqua;
  color: white;
  padding:10px 0;
  box-sizing: border-box;
  border-right:1px solid white;
}
.el-container{
  background-color: #eee;
  color:white;
}
.el-header{
  background-color: aqua;
}
.el-fooer{
  background-color: gray;
}
.el-aside{
  background-color: yellowgreen;
  max-width: 200px;
  min-height: 50px;
}
.el-main{
  background-color: aliceblue;
}
.el-icon-edit{
  font-size: 30px;
  color: blueviolet;
}
/* .el-button{
  background-color: blueviolet;
  color: white;
} */
.selected{
  background-color: blue;
  color:white;
}
</style>
