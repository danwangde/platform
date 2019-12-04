<template>
  <div style="border: 2px solid #fff; border-radius: 6px;">
    <div :id="id" class="orderArea special"></div>
    <div class="el-scrollbar " style="height: 142px; overflow-y: scroll;">
      <el-row v-for="(item, index) in seriesData" class=" el-scrollbar pub_marBtm" :key="index">
        <el-col :span="4" >{{index}}</el-col>
        <el-col :span="16">{{item.bridgename}}</el-col>
        <el-col :span="4">{{item.health}}</el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import echarts from 'echarts'
import {selectScore} from '../../api'
import echartsTheme from './theme/westeros.json'
export default {
  data () {
    return {
      myChart: null,
      seriesData: [],
      legendData: [],
      text: '健康状态',
      option: {}
    }
  },
  props: ['type', 'id'],
  async mounted () {
    await this.getScore()
    this.loadChart()
  },
  beforeDestroy () {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },

  watch: {
    option: {
      handler (newValue) {
        this.loadChart(newValue)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getScore () {
      let pieArr = [
        {value: 0, name: '优秀'},
        {value: 0, name: '良好'},
        {value: 0, name: '及格'},
        {value: 0, name: '危险'}
      ]
      this.option = this.initOption()
      selectScore(1).then((res) => {
        this.seriesData = res
        console.log(res)
       /* this.seriesData.push({bridgeid: 200, bridgename: '测试桥1', health: 0.65}) // 假数据
        this.seriesData.push({bridgeid: 200, bridgename: '测试桥2', health: 0.40}) // 假数据
        this.seriesData.push({bridgeid: 200, bridgename: '测试桥3', health: 0.94}) // 假数据
        this.seriesData.push({bridgeid: 200, bridgename: '测试桥4', health: 0.94}) // 假数据
        this.seriesData.push({bridgeid: 200, bridgename: '测试桥5', health: 0.94}) // 假数据
        this.seriesData.push({bridgeid: 200, bridgename: '测试桥6', health: 0.94}) // 假数据*/
        for (let item of this.seriesData) {
          if (item.health >= 0.90) {
            pieArr[0].value += 1
          } else if (item.health >= 0.80 && item.health <= 0.90) {
            pieArr[1].value += 1
          } else if (item.health >= 0.60 && item.health <= 0.80) {
            pieArr[2].value += 1
          } else if (item.health <= 0.60) {
            pieArr[3].value += 1
          }
          this.option.series[0].data = pieArr
          this.option.legend.data = ['优秀', '良好', '及格', '危险']
        }
      })
    },
    loadChart () {
      this.$nextTick(() => {
        echarts.registerTheme('westeros', echartsTheme)
        this.myChart = echarts.init(document.getElementById(this.id), 'westeros')
        this.myChart.setOption(this.option)
      })
    },
    initOption () {
      let data = {
        title: {
          text: this.text,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '健康评分',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      return data
    }
  }
}
</script>

<style scoped>
.pub_marBtm {
  margin-bottom: 4px;
  padding: 0 10px;
  font-size: 14px;
  background-color: #00233e;
}
  .pie-container {
    height: 400px;
  }
</style>
