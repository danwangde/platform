<template>
    <div :id="id" style=" background-color: transparent;width: 100%;  padding:0;height: 600px;border: none;float:left;"></div>
</template>
<script>
import echarts from 'echarts'
import echartsTheme from '../../components/Chart/theme/westeros'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      chart: [],
      echart: null
    }
  },
  watch: {
    option: {
      handler (newValue, oldValue) {
        if (this.echart) {
          if (newValue) {
            this.optionObj.series[0].data = newValue
            this.echart.setOption(this.optionObj)
          } else {
            this.optionObj.series[0].data = oldValue
            this.echart.setOption(this.optionObj)
          }
        } else {
          this.drawChart()
        }
      },
      immediate: true,
      deep: true
    }
  },
  props: {
    id: String,
    optionObj: Object,
    option: Array
  },
  mounted () {
    this.drawChart()
  },
  computed: {
    ...mapState(['bid', 'groupId'])
  },
  methods: {
    async drawChart () {
      let This = this
      this.$nextTick(function () {
        echarts.registerTheme('westeros', echartsTheme)
        This.echart = echarts.init(document.getElementById(This.id), 'westeros')
        This.echart = echarts.init(document.getElementById(This.id))
        This.echart.on('dataZoom', function (para) {
          console.log(para)
        })
        This.optionObj.series[0].data = This.option
        This.echart.setOption(This.optionObj)
        This.echart.on('click', (data) => {
        })
        window.addEventListener('resize', function () { This.echart.resize() })
      })
    }
  }
}
</script>
<style scoped>
  #chart{
    width: 100%;
    height: 500px;
    border: none
  }
</style>
