<template>
    <div class="sectionArea"  :style="{left:sidebar.width +'px'}">
      <el-menu :default-active="$route.name"
               class="el-menu-vertical-demo"
               background-color="#818998"
               text-color="#fff"
               active-text-color="#ffd04b"
               :collapse="isCollapse">
        <el-menu-item index="trend" @click="goTo('/many/health/trend')"> <!-- @click="goTo('/many/config')"-->
          <i class="el-icon-menu"></i>
          <span slot="title">数据趋势</span>
        </el-menu-item>
        <el-menu-item index="detail"  @click="goTo('/many/health/detail')"> <!--@click="goTo('/many/admin')"-->
          <i class="el-icon-user"></i>
          <span slot="title">报警详情</span>
        </el-menu-item>

        <el-menu-item index="threshold"  @click="goTo('/many/health/threshold')"> <!--@click="goTo('/many/journal')"-->
          <i class="el-icon-notebook-1"></i>
          <span slot="title">阈值配置</span>
        </el-menu-item>

        <el-menu-item index="push"  @click="goTo('/many/health/push')"> <!--@click="goTo('/many/base')"-->
          <i class="el-icon-coin"></i>
          <span slot="title">推送设置</span>
        </el-menu-item>

        <el-menu-item index="video"  @click="goTo('/many/health/video')">  <!--@click="goTo('/many/download')"-->
          <i class="el-icon-download"></i>
          <span slot="title">视频中心</span>
        </el-menu-item>

        <el-menu-item index="relevance" @click="goTo('/many/health/relevance')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">关联性分析</span>
        </el-menu-item>

        <el-menu-item index="vibration" @click="goTo('/many/health/vibration')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">振动分析</span>
        </el-menu-item>

        <el-menu-item index="temperature" @click="goTo('/many/health/temperature')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">温度效应</span>
        </el-menu-item>

        <el-menu-item index="vehicle" @click="goTo('/many/health/vehicle')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">车流量统计</span>
        </el-menu-item>

        <el-menu-item index="reports" @click="goTo('/many/health/reports')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">报表管理</span>
        </el-menu-item>

        <el-menu-item index="config" @click="goTo('/many/health/config')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">配置管理</span>
        </el-menu-item>

        <el-menu-item index="inspection" @click="goTo('/many/health/inspection')"> <!-- @click="goTo('/many/data')"-->
          <i class="el-icon-s-grid"></i>
          <span slot="title">智能巡检</span>
        </el-menu-item>

      </el-menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'inner',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  },
  computed: {
    ...mapState(['msg', 'sidebar'])
  }
}
</script>

<style scoped>
.sectionArea {
  width: 100% !important;
  background-color: #818998;
  height: 856px;
  top: 60px;
  margin-top: 3px;
}
</style>
