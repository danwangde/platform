<template>
  <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
import echarts from 'echarts'
import echartsTheme from './theme/westeros'
import {selectComplete} from '../../api/index'
import {mapState} from 'vuex'
export default {
  name: 'barChat',
  data () {
    return {
      id: 'barChart',
      myChart: null,
      average: '',
      option: {
        color: 'rgb(216, 195, 44)',
        title: {
          text: '数据完整性展示'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        xAxis: [
          {
            type: 'category', // category
            splitLine: {
              show: false
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} (%)'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  async mounted () {
    await this.getHealth()
    this.loadChart()
  },
  beforeDestroy () {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  computed: {
    ...mapState(['msg'])
  },
  methods: {
    loadChart () {
      this.$nextTick(() => {
        echarts.registerTheme('westeros', echartsTheme)
        this.myChart = echarts.init(document.getElementById(this.id), 'westeros')
        this.myChart.setOption(this.option)
      })
    },
    async getHealth () {
      let result = await selectComplete(this.msg.userid)
      console.log(result)
      result[0].datacomplete = 10
      for (let item of result) {
        this.option.legend.data.push(item.bridgename)
        this.option.xAxis[0].data.push(item.bridgename)
        this.option.series[0].data.push(item.datacomplete)
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
