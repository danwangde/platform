<template>
  <section class="data_section">
    <el-row :gutter="10" class="row_list order_list">
      <el-col :span="17">
        <bar-chart type="barChart"></bar-chart>
      </el-col>
      <el-col :span="7">
        <guage-chart></guage-chart>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row_list order_list">
      <el-col :span="7">
        <pie-chart type="ordertype"></pie-chart>
      </el-col>
      <el-col :span="10">
        <line-chart></line-chart>
      </el-col>
      <el-col :span="7">
        <radar-chart></radar-chart>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import barChart from '../../components/echarts/barChart' // 用户投资类型 柱状图
import pieChart from '../../components/echarts/pieChart' // 用户投资类型 饼状图
import radarChart from '../../components/echarts/radarChart' // 用户投资类型 雷达图
import lineChart from '../../components/echarts/lineChart' // 用户投资类型 折线图
import guageChart from '../../components/echarts/guageChart' // 用户投资类型 仪表图
import cardList from './components/cardList' // 进度条
export default {
  name: 'index',
  data () {
    return {}
  },
  components: {
    barChart,
    pieChart,
    radarChart,
    lineChart,
    guageChart,
    cardList
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
.data_section {
  margin: 20px;
  border-radius: 2px;
}
.data_section .row_list {
    margin-bottom: 20px;
}
.data_section .order_list .orderArea{
  width: 100%;
  height: 300px;
  background: #fff !important;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 40px;
  overflow: hidden;
}
.data_section .order_list .orderbarArea{
  height: 370px;
}
</style>
