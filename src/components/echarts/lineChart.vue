<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
import echarts from 'echarts'
import echartsTheme from './theme/westeros.json'
export default {
  data () {
    return {
      myChart: null,
      option: {}
    }
  },
  props: {
    id: String
  },
  mounted () {
    this.loadChart()
  },
  beforeDestroy () {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  methods: {
    loadChart () {
      this.$nextTick(() => {
        echarts.registerTheme('westeros', echartsTheme)
        this.myChart = echarts.init(document.getElementById(this.id), 'westeros')
        this.myChart.setOption(this.initOption())
      })
    },
    initOption () {
      let data = {
        title: {
          text: '',
          x: 'center',
          y: 'top'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['环境温度', '梁板温度', '箱体温度']
        },
        grid: {
          show: false,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            splitLine: {
              show: true
            },
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: true
            },
            type: 'value'
          }
        ],
        series: [
          {
            name: '环境温度',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '梁板温度',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '箱体温度',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      return data
    }
  },
  watch: {
    option: {
      handler (newValue) {
        this.loadChart(newValue)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
