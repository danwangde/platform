<template>
  <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
import echarts from 'echarts'
import {getDates} from '../../../../public/js/date'
import echartsTheme from '../../../components/echarts/theme/westeros'
import {selectSingleHeavy} from '../../../api/single'
import {mapState} from 'vuex'
export default {
  name: 'barChart',
  data () {
    return {
      id: 'barChart',
      myChart: null,
      average: '',
      option: {
        title: {
          text: '车流量信息统计 (辆)'
        },
        backgroundColor: '#00233e',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            axis: 'auto'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: []
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: true,
            lineStyle: {
              color:'#324757',
              width: 1,
              type: 'solid'
            }
          },
          data: [],
          axisLine: {
            show: true,
            lineStyle:{
              color:'#324757',
            }
          },
          axisTick: { //坐标轴线段
            show: true,  // 是否显示
            inside: true,  // 是否朝内
            length: 0,     // 长度
            lineStyle: {   // 默认取轴线的样式
              color: 'yellow',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {    // 坐标轴标签
            show: true,  // 是否显示
            textStyle: {
              color: '#fff',  //更改坐标轴文字颜色
              fontSize : 10      //更改坐标轴文字大小
            },
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 5, // 刻度标签与轴线之间的距离
            color: 'red'  // 默认取轴线的颜色
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color:'#324757',
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            show: true,
            lineStyle:{
              color:'#324757',
            }
          },
          axisLabel: {    // 坐标轴标签
            show: true,  // 是否显示
            textStyle: {
              color: '#c3dbff',  //更改坐标轴文字颜色
              fontSize : 14      //更改坐标轴文字大小
            }
          },
          axisTick: {
            show: false
          },
          offset: 1,
          nameTextStyle: {
            fontSize: 15
          }
        },
        series: [
          {
            type: 'bar',
            data: [],
            // barWidth: 10,
            barGap: '30%',
            barCategoryGap : 30,
            smooth: true,
            label: {
              normal: {
                show: false,
                position: 'right',
                offset: [5, -2],
                textStyle: {
                  color: '#F68300',
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              },
              normal: {
                barBorderRadius: 7,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#43e8f8'},
                    {offset: 1, color: '#fcd594'}

                  ]
                )
              }
            }
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
    ...mapState(['bid'])
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
      let result = await selectSingleHeavy(106)
      console.log(result)
      for (let item of result) {
        item.stime = getDates(new Date(item.stime))
        item.heavyVahicle = 10
        this.option.xAxis.data.push(item.stime)
        this.option.series[0].data.push(item.heavyVahicle)
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
