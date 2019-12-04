<template>
  <div class="public_padding">
    <search-item  @searchList="getMoneyList" @changeTime="changeTime"></search-item>
    <el-row style="height: 749px">
      <el-col :span="4" style="padding: 0 5px; height: 100%;border-right: 1px solid #818998; border-radius: 4px ">
        <el-tree :data="data" :props="defaultProps" node-key="id" ref="tree"
                 :default-expanded-keys="[1]" :highlight-current="showTree" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20" style="box-shadow: #ddd 0px 0px 10px;">
       <div style="overflow: hidden;">
         <div style="width: 50%;float: left;">
           <Chart v-for="(x, index) in arr" :id="x.id1" :mid="x.mid" :sid="x.id1" :optionObj="x.option1" :key="index" v-if="isShow === x.id"></Chart>
         </div>
         <div style="width: 50%;float: left;">
           <lineChart v-for="(x, index) in arr" :id="x.id2" :mid="x.mid" :sid="x.id1" :optionObj="x.option2" :key="'line'+index" :option="option" v-if="isShow === x.id"></lineChart>
         </div>
       </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {getDate} from '../../../public/js/date'
import getLineOption from '../../../public/js/Echarts'
import SearchItem from './components/searchItem'
import {mapState} from 'vuex'
import {getTrees, reqMid, selectUserSensor, select} from '../../api'
const Chart = () => import('../../components/Chart/Chart')
const lineChart = () => import('../../components/Chart/lineChart')
export default {
  name: 'Data',
  data () {
    return {
      id1: '1',
      id2: '2',
      id3: '3',
      data: [],
      isShow: 1,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      option: [],
      sid: '',
      mid: '',
      arr: [],
      showTree: true
    }
  },
  mounted () {
    this.getTrees()
  },
  beforeCreate () {
    // this.getTrees()
  },
  computed: {
    ...mapState(['msg', 'groupId', 'bid'])
  },
  methods: {
    /* mqttConnect () {
      let length = 10
      let This = this
      mqttClient.on('connect', () => {
        console.log('连接成功')
        mqttClient.subscribe('/data/dataType/1/13/1/9/1/1')
        mqttClient.subscribe('/data/dataType/1/13/1/10/2/1')
        mqttClient.subscribe('/data/dataType/1/13/7/11/1/2')
        mqttClient.on('message', function (topic, message) {
          if (topic === '/data/dataType/1/13/1/9/1/1') {
            let msg = JSON.parse(message.toString())
            if (This.option.series[0].data.length > length) {
              This.option.series[0].data.shift()
            }
            This.option.series[0].data.push([getDate(new Date(msg.dateTime)), 20 + msg.value / 50])
          }
        })
      })
    }, */
    async getMoneyList (data) {
      data.time1 = getDate(new Date(data.startTime - 8 * 60 * 60 * 1000))
      data.time2 = getDate(new Date(data.endTime - 8 * 60 * 60 * 1000))
      console.log(data.endTime - data.startTime)
      const para = Object.assign({}, {sid: this.sid}, data)
      console.log(para)
      await this.connectHttp(data.time2, data.time1, para.sid)
    },
    async handleNodeClick (data) { // 点击树形结构
      if (data.level === 3) {
        for (let item of this.arr) {
          let res = await reqMid(item.id)
          item.mid = res[0].mid.toString()
          item.option1 = getLineOption('rgba(0,0,0,0)', item.sensorname + '实时数据', [item.sensorname], '{value} (t)', item.sensorname)
          item.option2 = getLineOption('rgba(0,0,0,0)', item.sensorname + '历史数据', [item.sensorname], '{value} (t)', item.sensorname)
          item.id1 = item.id.toString()
          item.id2 = (item.id + 1).toString()
        }
        this.isShow = data.id
        this.sid = data.id
        let mesc = new Date().getTime() - 8 * 60 * 60 * 1000
        let time1 = getDate(new Date(mesc))
        let time2 = getDate(new Date(mesc - 60 * 1000 * 10))
        // await this.connectHttp(time1, time2, this.sid)
      }
    },
    async connectHttp (time1, time2, sid) {
      let time = new Date(time1).getTime() - new Date(time2).getTime()
      console.log(time)
      let ip = 'http://47.92.137.78:8086/query'
      let db = 'testdemo'
      let tbl
      let epoch = 'ms'
      if (time >= 60000 && time < 300000) {
        tbl = 'sensor'
      } else if (time >= 300000 && time < 3600000) {
        tbl = 'mem_used_1s'
      } else if (time >= 3600000 && time < 86400000) {
        tbl = 'mem_used_1m'
      } else if (time >= 86400000) {
        tbl = 'mem_used_1m'
      }

      let sql1 = 'select value, time from ' + tbl + ' where "time" >=' + "'" + time2 + "'" + ' and "time" <=' + "'" + time1 + "'" + ' and "sid" =' + "'" + sid + "'"
      // let sql2 = 'select value, time from "sensor" where "sid" =' + "'" + sid + "'"
      // let sql = sql1 + '%3B' + sql2
      let res = await select(ip, db, epoch, sql1)
      console.log(res)
      this.option = res.results[0].series ? res.results[0].series[0].values : []
    },
    changeTime () {},
    async getTrees () { // 得到左侧树形结构
      this.data = await getTrees(this.msg.userid)
      this.arr = await selectUserSensor(this.msg.userid)
      console.log(this.arr)
    }
  },
  components: {
    Chart,
    SearchItem,
    lineChart
  }
}
</script>

<style scoped>
.public_padding {
 /* background: rgb(2, 11,57);*/
  padding:20px 20px 20px 0;
  overflow: hidden;
}
</style>
