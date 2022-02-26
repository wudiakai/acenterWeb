<template>
  <div class="button">
    <el-container>
      <el-container>
        <!-- <el-aside>aside</el-aside> -->
        <el-main>
          <p align="left">
            <DemoMd class="markdown-body" />
          </p>
          <mkccontent />
        </el-main>
        <el-container>
          <div
            style="position: fixed;
    float: right;
    top: 85%;
    right: 40px;
    width: 160px;"
          >
            <a href="javascript:scroll(0,0)">返回顶部</a>
            <!-- <button
              οnclick="showOrCloseCategory()"
              style="cursor:pointer;border:0;background-color:white;text-decoration:underline;display:inline-block;color:#4183C4;"
            >
              折叠/展开
            </button>
          </div> -->
            <!--文章主体部分-->
            <div
              id="book_body"
              class="book-body"
              style="width:90%;display:block"
            />
            <!--目录栏，设置占用宽度为20%可以根据实际情况设置-->
            <div
              id="category"
              class="book-summary"
              style="width:20%;display:block"
            />
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import DemoMd from '../modules/VMS.md'
import MarkdownIt from 'markdown-it'
// import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
// import InputView from '../modules/InputView.html'
export default {
  // name: 'Input',
  components: {
    // MarkdownItVue
    DemoMd
  },
  data () {
    return {
      input1: '1',
      input2: '2',
      input3: '3',
      input4: '4'
      // content: ''
    }
  },
  mounted () {
    console.log('mounted ..........' + DemoMd)
    // const md = new MarkdownIt()
    // this.content = md.render(DemoMd.toString())
    // this.content = DemoMd
    console.log('mounted ..........' + this.content)
  },
  methods: {
    markdown () {
      const md = new MarkdownIt()
      this.content = md.render(DemoMd)
    },
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
