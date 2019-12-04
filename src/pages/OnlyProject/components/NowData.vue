<template>
  <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
import echarts from 'echarts'
import echartsTheme from '../../../components/echarts/theme/westeros'
import {mapState} from 'vuex'
export default {
  name: 'nowData',
  data () {
    return {
      myChart: null,
      average: '',
      timer: null
    }
  },
  async mounted () {
    console.log(this.option)
    this.loadChart()
    this.timer = setInterval(() => {
      this.myChart.setOption(this.option)
    }, 500)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  computed: {
    ...mapState(['msg'])
  },
  props: {
    option: Object,
    id: String
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
    }
  },
  watch: {
    option: {
      handler (newValue, oldValue) {
        if (this.myChart){
          if (newValue) {
            this.myChart.setOption(newValue)
          } else {
            this.myChart.setOption(oldValue)
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
  .orderArea {
    width: 100%;
    height: 254px;
    background: #00233e !important;
    border-radius: 6px;
    border: 1px solid #fff;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 40px;
    overflow: hidden;
    color: #fff;
  }
</style>
