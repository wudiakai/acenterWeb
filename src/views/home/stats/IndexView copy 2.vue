<template>
  <div class="input">
    <el-row :gutter="5">
      <el-col :span="6">
        <div>
          <el-input
            v-model="input1"
            placeholder="please input"
            clearable
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input
            v-model="input2"
            placeholder="please input"
            show-password
            clearable
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input placeholder="please input" />
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input placeholder="please input" />
        </div>
      </el-col>
    </el-row>
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
.el-button{
  background-color: blueviolet;
  color: white;
}
.selected{
  background-color: blue;
  color:white;
}
</style>
