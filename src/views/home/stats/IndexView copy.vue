<template>
  <div class="about">
    <el-row>
      <el-rol :span="24">
        24
      </el-rol>
    </el-row>
    <el-row>
      <el-col :span="18">
        18
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        6
      </el-col>
      <el-col :span="6">
        6
      </el-col>
      <el-col :span="6">
        6
      </el-col>
      <el-col :span="6">
        6
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div style="background-color:black">
          6
        </div>
      </el-col>
      <el-col :span="6">
        6
      </el-col>
      <el-col :span="6">
        6
      </el-col>
      <el-col :span="6">
        6
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justfy="center"
    >
      <el-col
        offset="6"
      />
      <el-col
        offset="3"
        :span="3"
      />
      <el-col
        offset="3"
        :span="3"
      >
        6
      </el-col>
      <el-col
        offset="6"
        :span="0"
      >
        6
      </el-col>
    </el-row>
  </div>
</template>

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
</style>
