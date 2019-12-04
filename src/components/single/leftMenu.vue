<template>
  <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
    <div class="menu_page_top rflex">
      <img :class='["logo",{"closeLogo":!sidebar.opened}]'  :src="logo" alt="logo" >  <!--:src="logo"-->
      <span class='title' v-show="sidebar.opened">{{sidebar.name}}<i>title</i></span>
    </div>
    <div class="menu_page_bottom is-scroll-left">
      <el-menu :default-active="$route.name"
               :unique-opened="true"
               class="el-menu-vertical-demo"
               :style="{width:sidebar.width + 'px'}"
               @open="handleOpen"
               @close="handleClose"
               background-color="#545c64"
               text-color="#fff"
               router
               active-text-color="#ffd04b"
               :collapse="isCollapse">

         <el-menu-item index="trend" >
          <i class="el-icon-s-data"></i>
          <span slot="title">数据趋势</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-alarm-clock"></i>
            <span>报警中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="detail"   class="special-item">报警详情</el-menu-item>
            <el-menu-item index="threshold"  class="special-item">阈值配置</el-menu-item>
            <el-menu-item index="push" class="special-item">推送设置</el-menu-item >
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="video" >
          <i class="el-icon-video-camera"></i>
          <span slot="title">视频中心</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-set-up"></i>
            <span>数据分析</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="relevance" class="special-item">关联性分析</el-menu-item>
            <el-menu-item index="vibration" class="special-item">振动分析</el-menu-item>
            <el-menu-item index="temperature"  class="special-item">温度效应</el-menu-item >
            <el-menu-item index="vehicle" class="special-item">车流量统计</el-menu-item >
            <el-menu-item index="more"  class="special-item">......</el-menu-item >
          </el-menu-item-group>

        </el-submenu>

        <el-menu-item index="reports"  >
          <i class="el-icon-notebook-2"></i>
          <span slot="title">报表管理</span>
        </el-menu-item>

        <el-menu-item index="config"  >
          <i class="el-icon-setting"></i>
          <span slot="title">配置管理</span>
        </el-menu-item>

        <el-menu-item index="inspection" >
          <i class="el-icon-edit-outline"></i>
          <span slot="title">智能巡检</span>
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
