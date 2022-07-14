import SideCatalog from 'vue-side-catalog'
import VueMarkdown from 'vue-markdown'

function getModule() {
  const path = this.$route.path
  let module = 'feature'
  if (path.indexOf('/home') !== -1) {
    module = 'feature'
  } else if (path.indexOf('/module') !== -1) {
    module = 'module'
  }
  return module
}
function parsePath(input) {
  let path = input.split('/')[1]
  path = '/' + path + '/'
  return path
}
export default {
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
      clientHeight: '',
      currentPath: ''
    }
  },
  async beforeCreate() {
    const module = getModule.call(this)
    const that = this
    await this.$axios
      .get('/markdownList/' + module)
      .then((result) => {
        console.log(result)
        that.list = result.data

        const module = that.$route.params.name
        if (module === undefined) {
          that.markdown(that.list[0].title)
        } else {
          that.markdown(module)
        }
      })
      .catch((err) => {
        console.log('error: ' + err)
      })
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      let file = ''
      if (keyPath.length > 1) {
        const subindex = keyPath[1].split('-')
        file = this.list[keyPath[0]].sublist[subindex[1]]
      } else {
        file = this.list[keyPath[0]].title
      }
      const rootpath = parsePath(this.$route.path)
      const route = rootpath + file
      if (this.currentPath !== route) {
        this.$router.push(route)
        this.markdown(file)
        this.currentPath = route
      }
    },
    markdown(file) {
      const that = this
      this.$axios
        .get('/content/' + file)
        .then((result) => {
          that.content = result.data.data
          that.gotoTop()
        })
        .then(() => {
          that.isShowCata = true
        })
        .catch((err) => {
          console.log('error: ' + err)
        })
    },
    gotoTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
