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
        <el-menu-item index="config" @click="goTo('/many/config')"> <!-- @click="goTo('/many/config')"-->
          <i class="el-icon-menu"></i>
          <span slot="title">项目配置</span>
        </el-menu-item>
        <el-menu-item index="admin"  @click="goTo('/many/admin')"> <!--@click="goTo('/many/admin')"-->
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>

        <el-menu-item index="journal"  @click="goTo('/many/journal')"> <!--@click="goTo('/many/journal')"-->
          <i class="el-icon-notebook-1"></i>
          <span slot="title">日志管理</span>
        </el-menu-item>

         <el-menu-item index="base"  @click="goTo('/many/base')"> <!--@click="goTo('/many/base')"-->
          <i class="el-icon-coin"></i>
          <span slot="title">基础库管理</span>
        </el-menu-item>

         <el-menu-item index="download"  @click="goTo('/many/download')">  <!--@click="goTo('/many/download')"-->
          <i class="el-icon-download"></i>
          <span slot="title">下载管理</span>
        </el-menu-item>

        <el-menu-item index="data" @click="goTo('/many/data')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">数据</span>
        </el-menu-item>

        <el-menu-item index="health" @click="goTo('/many/health')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">单项目健康监测</span>
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
