<template>
  <div class='bread_container' id="bread_container">
    <span @click="handleLefeMenu" class="bars">
       <i class="el-icon-s-fold" :class="{isactive:changeBarDirection}"> </i>
    </span>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for='(name,index) in matchedArr'
        :key='index'
      >
        {{name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
let map = new Map()
map.set('map', '地图导航')
map.set('info', '数据趋势  / 选项1')
map.set('nav', '数据趋势  / 选项2')
map.set('config', '项目配置')
map.set('admin', '账号管理')
map.set('system', '系统配置')
export default {
  data () {
    return {
      changeBarDirection: false
    }
  },
  created () {
  },
  computed: {
    matchedArr () {
      let temp = []
      let temps = []
      this.$route.matched.filter((item, index, self) => {
        if (item.name) {
          const name = map.get(item.name)
          temp.push(name)
        }
      })
      temp.filter((item, index, self) => {
        if (!temps.includes(item)) {
          temps.push(item)
        }
      })
      return temps
    }
  },
  mounted () {
  },
  methods: {
    handleLefeMenu () {
      this.$store.dispatch('setLeftCollapse') // 折叠菜单
      this.$store.dispatch('handleLeftMenu') // 改变菜单宽度 180->35/35-180
      this.changeBarDirection = !this.changeBarDirection
    }
  },
  watch: {}
}
</script>

<style scoped>
  .bread_container {
    background-color: #eaebec;
    width: 100%;
  }

  .bread_container  .bars {
      float: left;
      margin: 4px 10px;
      cursor: pointer;
    }

  .bars .isactive {
        -webkit-transform: rotate(90deg);
        transform: rotate(-90deg);
        transition: .38s;
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
      }

    .breadcrumb {
      height: 30px;
      line-height: 30px;
    }

    .breadbutton {
      float: left;
      margin: 4px 5px 0 0;

    }
</style>
