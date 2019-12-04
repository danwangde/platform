<template>
  <div class="orderArea orderbarArea">
    <div :id="id" style="height: 90%; width: 100%; top: -40px;"></div>
    <div class="progress wflex">
      <div class="rflex">
        <span class="title">优秀:</span><el-progress :percentage="100"  status="success" :format="format"></el-progress>
      </div>
      <div class="rflex">
        <span class="title">良好:</span><el-progress :percentage="80"   :format="format"></el-progress>
      </div>
      <div class="rflex">
        <span class="title">一般:</span><el-progress :percentage="60"  status="warning" :format="format"></el-progress>
      </div>
      <div class="rflex">
        <span class="title">很差:</span><el-progress :percentage="20" status="exception" :format="format"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import echartsTheme from './theme/westeros.json'
import {selectSingleState} from '../../api/single'
import {mapState} from 'vuex'
export default {
  name: 'guageChart',
  data () {
    return {
      myChart: null,
      average: 1,
      option: {
        title: {
          text: '健康状态'
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '90%',
            detail: {
              formatter: '{value}%',
              show: true,             // 是否显示详情,默认 true。
              offsetCenter: [0,"70%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#43e8f8",          // 文字的颜色,默认 auto。
              fontSize: 20           // 文字的字体大小,默认 15。
            },
            axisTick: {             // 刻度(线)样式。
              show: true,             // 是否显示刻度(线),默认 true。
              splitNumber: 5,         // 分隔线之间分割的刻度数,默认 5。
              length: 8,              // 刻度线长。支持相对半径的百分比,默认 8。
              lineStyle: {            // 刻度线样式。
                color: "#eee",              //线的颜色,默认 #eee。
                opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                width: 1,                   //线度,默认 1。
                type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: "#fff",        //阴影颜色。支持的格式同color。
              },
            },
            splitLine : { //分割线样式（及10、20等长线样式）
              length : 18,
              lineStyle : { // 属性lineStyle控制线条样式
                width : 2
              }
            },
            axisLabel: {            // 刻度标签。
              show: true,             // 是否显示标签,默认 true。
              distance: 5,            // 标签与刻度线的距离,默认 5。
              color: "#fff",          // 文字的颜色,默认 #fff。
              fontSize: 12,           // 文字的字体大小,默认 5。
              formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
            },
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 18,
                color: [[0.2, '#c23531'], [0.6, '#E6A23C'], [0.9, '#409EFF'], [1, '#67C23A']]
              }
            },
            pointer: {              // 仪表盘指针。
              show: true,             // 是否显示指针,默认 true。
              length: "70%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 5,               // 指针宽度,默认 8。
            },

            data: [
              {
                value: null
              }
            ]
          }
        ]
      }
    }
  },
  props: {
    id: String
  },
  computed: {
    ...mapState(['bid'])
  },
  async mounted () {
    await this.getHealth()
    this.$nextTick(() => {
      echarts.registerTheme('westeros', echartsTheme)
      this.myChart = echarts.init(document.getElementById(this.id), 'westeros')
      this.myChart.setOption(this.option)
    })
    setInterval(() => {
      this.value = parseInt(Math.random() * 40 + 60)
    }, 1000)
  },
  watch: {
    value (newValue, oldValue) {
      this.myChart.setOption(newValue)
    }
  },
  methods: {
    async getHealth () {
      let result = await selectSingleState(106)
      console.log(result)
      this.option.series[0].data[0].value = parseInt(result[0].health * 100)
    },
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}`
    }
  }
}
</script>

<style scoped>
 .progress {
    padding: 10px;
   position: relative;
   top: -70px;
  }
 .progress .rflex{
    justify-content: space-between;
    align-items: center;
  }
.progress .rflex .title{
    width:65px;
  font-size: 14px;
  color: #999999;
  }
.progress .rflex .el-progress {
    flex: 1;
  }
</style>
