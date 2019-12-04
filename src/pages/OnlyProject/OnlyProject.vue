<template>
    <div>
      <dataDialog :dialogFormVisible="dialogFormVisible" :theme="topic" :requireObj="mainObj" v-if="dialogFormVisible" @closeDialog="closeFuncDialog" />
      <el-row style="line-height:40px; height:40px;background: rgb(5, 10, 32); color: rgb(45, 196, 187)">
        <el-col :span="4" >
          <el-page-header @back="goBack" style="margin-top:8px;"></el-page-header>
        </el-col>
        <el-col :span="16" style="text-align:center;position:relative;left:-40px;font-size:28px;">基础设施智慧监测平台</el-col>
        <el-col :span="4">
          <router-link to="/many" style="color: rgb(45, 196, 187)">跳转</router-link>
          <router-link to="/scroll" style="color: rgb(45, 196, 187)">滚动</router-link>
          <router-link to="/pic" style="color: rgb(45, 196, 187)">抓拍</router-link>
        </el-col>
      </el-row>
      <el-row class="el-line" style="height:929px;">
        <el-col :span="4" style="background: #00233e;color: #eee;padding: 0 2px; height:100%;">
          <guageChart :id="id" style="margin-bottom: 5px;"></guageChart>
          <Vehicle style="margin-bottom: 10px;"></Vehicle>
          <div class="orderArea special_height" style="margin-bottom: 10px;">
            <h6>单项目传感器分类统计</h6>
            <hr/>
            <el-row>
              <el-col :span="8" style="padding-left: 4px;">
                <span style=" font-size: 10px;">序号</span>
              </el-col>
              <el-col :span="8" style="padding-left: 4px;">
                <span style=" font-size: 10px;">传感器类型名称</span>
              </el-col>
              <el-col :span="8" style="padding-left: 4px;">
                <span style=" font-size: 10px;">数量</span>
              </el-col>
            </el-row>
            <div class="el-scrollbar" style="height: 320px; overflow-y: scroll;">
              <el-row v-for="(item, index) in sensorData" :key="index" style="margin-top: 20px; border: 1px solid rgb(16, 66, 84); border-radius: 4px; padding: 2px;">
                <el-col :span="8" style="padding-left: 4px;">
                  <span style=" font-size: 10px;">{{index + 1}}</span>
                </el-col>
                <el-col :span="8" style="padding-left: 4px;">
                  <span style=" font-size: 10px;">{{item.name}}</span>
                </el-col>
                <el-col :span="8" style="padding-left: 4px;">
                  <span style=" font-size: 10px;">{{item.count}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container" style="position: relative; background-color: #00233e">
            <el-button v-for="(item, index) in BIM" :key="index" @click="showLine(item)" :type="index % 2 === 0 ? 'primary' : 'default'" style="margin: 10px 10px;">
              {{item.sensorname}}
            </el-button>
          </div>
          <el-row style="margin-top: 10px; background-color: #000; height: 250px;">
            <el-col :span="12">
              <div class="orderArea" style="padding-top: 0;">
                <el-row style="border-bottom: 2px solid #fff;">
                  <h6 style="color: #fff;">实景图片</h6>
                </el-row>
                <el-row>
                  <el-carousel :interval="2000" arrow="always" :autoplay="true" height="240px" style="width: 600px;margin-top:3px;margin-left:6px;" direction="horizontal" trigger="click" indicator-position="inside">
                    <!--arrow="always/never" 切换箭头 :autoplay="false" 是否自动切换 :interval="5000" 自动切换的时间间隔
                      indicator-position="outside" none 指示器位置 direction="horizontal/vertical" 走马灯展示的方向
                      trigger="hover/click"  Hover 指示器触发/Click 指示器触发
                      -->
                    <el-carousel-item v-for="url in urls" :key="url" style="margin: 0 !important;">
                      <el-image :src="url" style="width: 600px; height:230px;"></el-image>
                    </el-carousel-item>
                  </el-carousel>
                </el-row>

              </div>
            </el-col>
            <el-col :span="12">
              <Complete></Complete>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" style="background: #00233e;color: #eee;padding: 0 2px; height:100%;">
          <div class="headerArea">
            <h6 style="position: relative;">时间 / 天气</h6>
            <el-row style="color: #43e8f8; margin-top: 12px;">
              <el-col :span="15" style="padding-left: 4px;">
                <iframe width="190" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&color=%2343e8f8&bgc=%2300233e&bdc=%23&icon=1&num=1&site=19"></iframe>
              </el-col>
              <el-col :span="9">
               <div style="font-size: 24px;">{{time | dateHH}}</div>
               <div>{{time | dateYY}}</div>
              </el-col>
            </el-row>

          </div>
          <div class="orderArea special">
            <h6>通知公告</h6>
          </div>
          <div class="orderArea special_height_alarm" style="margin-top: 10px;">
            <h6>最新报警及抓拍照片</h6>
            <hr/>
            <el-row>
              <el-col :span="10" style="padding-left: 4px;">
                <span style=" font-size: 10px;">报警值/时间</span>
              </el-col>
              <el-col :span="4" style="padding-left: 4px;">
                <span style=" font-size: 10px;">等级</span>
              </el-col>
              <el-col :span="8" style="padding-left: 4px;">
                <span style=" font-size: 10px;">照片</span>
              </el-col>
            </el-row>
            <div class="el-scrollbar" style="height: 400px; overflow-y: scroll;">
              <el-row v-for="(item, index) in alarmDetail" :key="index" style="margin-top: 30px; border: 1px solid rgb(16, 66, 84); border-radius: 4px; padding: 2px;">
                <el-col :span="10" style="padding-left: 4px;">
                  <span style="display: inline-block; font-size: 10px;">{{item.val}}</span>
                  <span style="display: inline-block; font-size: 10px;">{{item.TIME | dateFormat}}</span>
                </el-col>
                <el-col :span="4">
                  <span style=" font-size: 10px; margin-left: 10px;">{{item.LEVEL}}级</span>
                </el-col>
                <el-col :span="8" style="text-align: center;">
                 <!-- <span style=" font-size: 10px; color:#fff; ">{{item.filename}}</span>-->
                  <img :src="`http://47.92.89.74:3000/pic/picALM/2_${item.filename}`" alt="" style="height:54px; width:100%;">
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import mqtt from 'mqtt'
import guageChart from '@/components/echarts/guageChart'
import Vehicle from './components/Vehicle'
import Complete from './components/Complete'
import dataDialog from './components/dataDialog'
import {selectSingleSensor, selectSingleAlm, selectSingleBIM} from '../../api/single'
export default {
  name: 'OnlyProject',
  data () {
    return {
      id: 'health',
      sensorData: [],
      alarmDetail: [],
      alarmNo: [],
      urls: [],
      BIM: [],
      time: '',
      dialogFormVisible: false,
      topic: '',
      mainObj: {}
    }
  },
  mounted () {
    this.getTime()
    this.getBIM()
    this.getImage(250)
    this.selectSingleSensor()
    this.selectSingleAlm()
  },
  methods: {
    getTime () {
      setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    closeFuncDialog () {
      this.dialogFormVisible = false
    },
    showLine (val) {
      this.mainObj = val
      this.topic = `${val.bid}/${val.stype_id}/${val.sensorid}`
      this.dialogFormVisible = true
      console.log(this.dialogFormVisible)
      const WebSocketURL = 'ws://47.92.137.78:8083/mqtt'
      this.mqttClient = mqtt.connect(WebSocketURL)
      let topic = '/data/rawData/' + val
      this.mqttClient.on('connect', () => {
        console.log('连接成功')
        this.mqttClient.subscribe(topic)
      })
      this.mqttClient.on('message', function (topic, message) {
        let msg = JSON.parse(message.toString())
        console.log(msg)

      })
    },
    async getBIM () {
      this.BIM = await selectSingleBIM(239)
    },
    getImage (bid) {
      for (let i=0; i<5; i++) {
        this.urls.push(`http://47.92.89.74:3000/pic/picEvaluate/${bid}/${i+1}.jpg`)
      }
    },
    async selectSingleAlm () {
      this.alarmDetail = await selectSingleAlm(222)
      console.log(this.alarmDetail)
    },
    async selectSingleSensor () {
      this.sensorData = await selectSingleSensor(106)
      /*for (let item of this.sensorData) {
        item.count = 10
      }*/
      console.log(this.sensorData)
    },
    goBack () {
      this.$router.push('/more')
    }
  },
  components: {
    guageChart,
    Vehicle,
    Complete,
    dataDialog
  }
}
</script>

<style scoped>
  .container {
    border: 1px solid #fff;
    border-radius: 4px;
    width: 100%;
    margin: 0 auto;
    height: 662px;
    background-color: darkslateblue;
  }
  .el-line .headerArea {
    border: 1px solid #fff;
    height: 100px;
  /*  background: url("/static/img/weather.png") 0 8px;*/
  }
  .el-line .orderArea {
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
  .el-line .special {
    padding-top: 0;
    margin-top: 10px;
  }
  .el-line .special_height {
    height: 400px;
  }
  .el-line .special_height_alarm {
    height: 550px;
  }
</style>
