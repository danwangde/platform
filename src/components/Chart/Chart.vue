<template>
    <div :id="id" style=" background-color: transparent;width: 100%;height: 600px; padding:0;border: none;float:left;"></div>
</template>
<script>
import mqtt from 'mqtt'
import echarts from 'echarts'
import echartsTheme from '../../components/Chart/theme/westeros'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      chart: [],
      echart: null,
      mqttClient: null
    }
  },
  props: {
    id: String,
    optionObj: Object,
    mid: String,
    sid: String
  },
  mounted () {
    this.drawChart()
    this.Connect()
    setInterval(() => {
      this.echart.setOption(this.optionObj)
    }, 500)
  },
  beforeDestroy () {
    this.disConnect()
  },
  computed: {
    ...mapState(['bid', 'groupId']),
    option () {
      return JSON.parse(JSON.stringify(this.optionObj))
    }
  },
  watch: {
    optionObj: {
      handler (newValue, oldValue) {
        if (this.echart) {
          if (newValue) {
            this.echart.setOption(newValue)
          } else {
            this.echart.setOption(oldValue)
          }
        } else {
          this.drawChart()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async drawChart () {
      let This = this
      this.$nextTick(function () {
        echarts.registerTheme('westeros', echartsTheme)
        This.echart = echarts.init(document.getElementById(This.id), 'westeros')
        This.echart.setOption(This.optionObj)
        window.addEventListener('resize', function () { This.echart.resize() })
      })
    },
    async Connect () {
      let This = this
      const length = 500
      const WebSocketURL = 'ws://47.92.137.78:8083/mqtt'
      this.mqttClient = mqtt.connect(WebSocketURL)
      let topic = '/data/dataType/' + this.groupId + '/' + this.bid + '/' + this.mid + '/' + this.sid + '/#'
      this.mqttClient.on('connect', () => {
        console.log('连接成功')
        this.mqttClient.subscribe(topic)
      })
      this.mqttClient.on('message', function (topic, message) {
        let msg = JSON.parse(message.toString())
        if (This.optionObj.series[0].data.length > length) {
          This.optionObj.series[0].data.splice(0, 5)
        }
        This.optionObj.series[0].data.push([msg.dateTime, msg.value])
      })
    },
    disConnect () {
      this.mqttClient.end()
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
