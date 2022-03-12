<template>
  <div class="button">
    <el-container>
      <el-container>
        <!-- <el-aside>aside</el-aside> -->
        <el-main>
          <!-- <DemoMd
              id="sss"
              class="markdown-body"
            /> -->
          <!-- <p
            id="md_show"
            align="left"
          /> -->
          <div
            id="md_show"
            align="left"
            v-html="content"
          >
            {{ content }}
          </div>
        </el-main>
        <el-aside>
          <li
            v-for="item in arr"
            :key="item"
          >
            {{ item }}
          </li>
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
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
// import DemoMd from '../modules/VMS.md'
import MarkdownIt from 'markdown-it'
// import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import axios from 'axios'
// import InputView from '../modules/InputView.html'
export default {
  // name: 'Input',
  components: {
    // MarkdownItVue
    // DemoMd
  },
  data () {
    return {
      content: '',
      input1: '1',
      input2: '2',
      input3: '3',
      input4: '4',
      arr: [{
        content: '',
        children: []
      }]
    }
  },
  mounted () {
    // console.log('mounted ..........' + DemoMd)
    // const md = new MarkdownIt()
    // this.content = md.render(DemoMd.toString())
    // this.content = DemoMd
    console.log('mounted ..........' + this.content)
    // const that = this
    axios.get('http://10.1.79.81:2022/markdown/VMS').then((result) => {
      console.log(result)
      console.log('msg' + result.data.msg)
      const md = new MarkdownIt()
      let tmp = md.render(result.data.data)
      // document.getElementById('md_show').innerHTML = tmp
      // that.content.innerHTML = md.render(result.data.data)
      that.content = md.render(result.data.data)
      console.log(that.content)
      this.tete()
    }).catch((err) => {
      console.log('error: ' + err)
    })
  },
  methods: {
    markdown () {
      const md = new MarkdownIt()
      this.content = md.render()
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
    },
    tete () {
      console.log('tete')
      const content = document.getElementById('sss').children
      console.log(content[0])
      // console.log(content[0].DOCUMENT_TYPE_NODE)
      const nodes = content[0].getElementsByTagName('body')[0].childNodes
      console.log(nodes)

      let h1 = 0
      let h2 = 0
      let h3 = 0
      let h4 = 0
      let h5 = 0

      nodes.forEach(element => {
        const member = { content: '', children: [] }
        console.log(element)
        console.log(element.nodeName.toLowerCase())
        // if element ===
        if (element.localName.toLowerCase() === 'h1') {
          // console.log(element.textContent)
          member.content = element.textContent
          if (h1 === 0) {
            this.arr[0] = member
            h1++
          } else {
            this.arr.push(member)
            h1++
          }
          h2 = 0
          h3 = 0
          h4 = 0
          h5 = 0
        }
        if (element.localName.toLowerCase() === 'h2') {
          member.content = element.textContent
          this.arr[h1 - 1].children.push(member)
          h2++
          h3 = 0
          h4 = 0
          h5 = 0
        }
        if (element.localName.toLowerCase() === 'h3') {
          member.content = element.textContent
          this.arr[h1 - 1].children[h2 - 1].children.push(member)
          h3++
          h4 = 0
          h5 = 0
        }
        if (element.localName.toLowerCase() === 'h4') {
          member.content = element.textContent
          this.arr[h1 - 1].children[h2 - 1].children[h3 - 1].children.push(member)
          h4++
          h5 = 0
        }
        if (element.localName.toLowerCase() === 'h5') {
          member.content = element.textContent
          this.arr[h1 - 1].children[h2 - 1].children[h3 - 1].children[h4 - 1].children.push(member)
          h5++
          console.log(h5)
        }
      })
      console.log('end')
      console.log(this.arr)
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
