<template>
  <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
    <div class="menu_page_top rflex">
      <img :class='["logo",{"closeLogo":!sidebar.opened}]'  :src="logo" alt="logo" >  <!--:src="logo"-->
      <span class='title' v-show="sidebar.opened">{{sidebar.name}}<i>title</i></span>
    </div>
    <div class="menu_page_bottom is-scroll-left">
      <el-menu :default-active="$route.name"
               class="el-menu-vertical-demo"
               :style="{width:sidebar.width + 'px'}"
               @open="handleOpen"
               @close="handleClose"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               :collapse="isCollapse">
        <el-menu-item index="map"  @click="goTo('/main/map')">
          <i class="el-icon-location"></i>
          <span slot="title">地图导航</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-data "></i>
            <span>数据趋势</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="info"  @click="goTo('/main/info')" class="special-item">数据趋势</el-menu-item>
            <el-menu-item index="nav" @click="goTo('/main/nav')" class="special-item">轮播图</el-menu-item>
            <el-menu-item index="chart" @click="goTo('/main/chart')" class="special-item">数据评估</el-menu-item >
          </el-menu-item-group>

        </el-submenu>
        <el-menu-item index="config"  @click="goTo('/main/config')">
          <i class="el-icon-menu"></i>
          <span slot="title">项目配置</span>
        </el-menu-item>
        <el-menu-item index="admin"  @click="goTo('/main/admin')">
          <i class="el-icon-user"></i>
          <span slot="title">账号管理</span>
        </el-menu-item>
        <el-menu-item index="system"  @click="goTo('/main/system')">
          <i class="el-icon-setting"></i>
          <span slot="title">系统配置</span>
        </el-menu-item>

      </el-menu>
    </div>
  </div>
</template>
<script>
import logoImg from '../../../public/img/mw.png'
import { mapState } from 'vuex'
export default {
  name: 'left-Menu',
  data () {
    return {
      logo: logoImg
    }
  },
  computed: {
    ...mapState([
      'isCollapse',
      'sidebar'
    ])
  },
  created () {
  },
  mounted () {
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },

    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style scoped>
  .menu_left{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
  }
  .menu_page_top{
    width:100%;
    height: 60px;
    align-items: center;
    justify-content: space-around;
    text-transform: uppercase;
    box-sizing: border-box;
    box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
  }
  .logo {
    height: 50px;
    width: 60px;
    vertical-align: middle;
    display: inline-block;
  }
  .closeLogo{
    width:30px;
    height:30px;
  }
  .title{
    font-size: 22px;
  }
  .title i{
    color:#FF6C60;
  }
  .menu_page_bottom {
    width:100%;
    /*overflow-y: scroll;*/
    overflow-x: hidden;
    flex:1;
    margin-top:3px;
    z-index: 10;
  }
</style>
