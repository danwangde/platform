<template>
  <el-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width: 100%;">
      <el-tab-pane label="报警阈值设置" name="first">
        <Alarm></Alarm>
      </el-tab-pane>
      <el-tab-pane label="流量阈值设置" name="second">
        <Flow></Flow>
      </el-tab-pane>
      <el-tab-pane label="卡号设置" name="third">
        <CardNumber></CardNumber>
      </el-tab-pane>
      <el-tab-pane label="接收报警设置" name="fourth">
        <ReceiveAlarm></ReceiveAlarm>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
const Alarm = () => import('../../../components/Alarm/Alarm')
const CardNumber = () => import('../../../components/CardNumber/CardNumber')
const Flow = () => import('../../../components/Flow/Flow')
const ReceiveAlarm = () => import('../../../components/ReceiveAlarm/ReceiveAlarm')
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab)
    }
  },
  components: {
    Alarm,
    CardNumber,
    Flow,
    ReceiveAlarm
  }
}
</script>

<style scoped>
</style>
