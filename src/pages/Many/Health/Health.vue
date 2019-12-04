<template>
   <el-row>
     <el-col :span="2">
       <inner v-show="true"></inner>
     </el-col>
     <el-col :span="22" style="margin-top: 3px;">
       <router-view />
     </el-col>

   </el-row>
</template>

<script>
import inner from '../../../components/many/inner'
export default {
  name: 'Health',
  data () {
    return {
      index: 'trend',
      tabArr: [
        {
          name: 'trend',
          title: '数据趋势'
        },
        {
          name: 'detail',
          title: '报警详情'
        },
        {
          name: 'threshold',
          title: '阈值配置'
        },
        {
          name: 'push',
          title: '推送设置'
        },
        {
          name: 'video',
          title: '视频中心'
        },
        {
          name: 'relevance',
          title: '关联性分析'
        },
        {
          name: 'vibration',
          title: '振动分析'
        },
        {
          name: 'temperature',
          title: '温度效应'
        },
        {
          name: 'vehicle',
          title: '车流量统计'
        },
        {
          name: 'reports',
          title: '报表管理'
        },
        {
          name: 'config',
          title: '配置管理'
        },
        {
          name: 'inspection',
          title: '智能巡检'
        }
      ]
    }
  },
  methods: {
  },
  components: {
    inner
  }
}
</script>

<style scoped>

</style>
