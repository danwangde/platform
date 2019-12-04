<template>

  <div style="overflow: hidden;">
    <el-dialog title="查看详情" :visible.sync="isShow" width="600px;"
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :modal-append-to-body="false"
               @close="closeDialog"
    >
      <el-form
        :inline="true"
        :model='search_data'
        class="demo-form-inline search-form"
        ref="search_data">
        <el-form-item prop='' label="">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop='' label="">
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search_data.type" clearable placeholder="选择查询类型"  style="width: 100%;">
            <el-option
              v-for="item in search_data.typeArr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size ="mini" icon="search" @click='onSearchBtn' v-loading="loading" element-loading-text="查询中" :disabled="search_data.startTime === '' || search_data.startTime === '' ">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="12">
          <el-row>
            <nowData :option="option" :id="id0"></nowData>
          </el-row>
          <el-row>
            <div>
              <nowData :option="option1" :id="id1"></nowData>
            </div>
          </el-row>
        </el-col>
        <el-col :span="12">
          <div class="orderArea special_height_alarm">
            <h6>最新报警及抓拍照片</h6>
            <hr/>
            <el-row>
              <el-col :span="5" style="padding-left: 4px;">
                <span style=" font-size: 10px;">传感器类型/名称</span>
              </el-col>
              <el-col :span="8" style="padding-left: 4px;">
                <span style=" font-size: 10px;">报警值/时间</span>
              </el-col>
              <el-col :span="3" style="padding-left: 4px;">
                <span style=" font-size: 10px;">等级</span>
              </el-col>
              <el-col :span="5" style="padding-left: 4px;">
                <div style=" font-size: 10px; text-align: center;">照片</div>
              </el-col>
              <el-col :span="3" style="padding-left: 4px;">
                <div style=" font-size: 10px; text-align: center;">查看</div>
              </el-col>
            </el-row>
            <div class="el-scrollbar" style="height: 400px; overflow-y: scroll; padding-bottom: 20px;">
              <el-row v-for="(item, index) in alarmDetail" :key="index" style="margin-top: 30px; border: 1px solid rgb(16, 66, 84); border-radius: 4px; padding: 2px;">
                <el-col :span="5" style="padding-left: 4px;">
                  <div style=" font-size: 10px;">{{item.name}}</div>
                  <div style=" font-size: 10px;">{{item.sensorname}}</div>
                </el-col>
                <el-col :span="8" style="padding-left: 4px;">
                  <div style=" font-size: 10px;">{{item.val}}</div>
                  <div style=" font-size: 10px;">{{item.TIME | dateFormat}}</div>
                </el-col>
                <el-col :span="3">
                  <span style=" font-size: 10px; margin-left: 10px;">{{item.LEVEL}}级</span>
                </el-col>
                <el-col :span="5" style="text-align: center;">
                  <img :src="`http://47.92.89.74:3000/pic/picALM/2_${item.filename}`" alt="" style="height:45px; width:100%;">
                </el-col>
                <el-col :span="3" style="padding: 10px 0 0 4px;">
                  <div style=" font-size: 10px; text-align: center;cursor: pointer;" @click="checkDetail(item, index)">查看</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <alarmDialog @closeDialog="closeInfo" v-if="isVisible" :dialogFormVisible="isVisible"  :item="item" :ids="id" :arr="senArr"></alarmDialog>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import nowData from './NowData'
import {mapState} from 'vuex'
import alarmDialog from './alarmDialog'
import {getDate} from '../../../../public/js/date'
import {selectSingleData, selectSingleAlarm, selectSingleAlarmHis} from '../../../api/single'
  export default {
    name: 'dataDialog',
    data () {
      return {
        isVisible: false,
        mqttClient: null,
        senArr: [],
        id: '',
        id0: 'now',
        id1: 'history',
        isShow: this.dialogFormVisible,
        topic: this.theme,
        alarmDetail: [
        ],
        loading: false,
        search_data: {
          startTime: '',
          endTime: '',
          typeArr: [
            {name: '历史数据', value: 0},
            {name: '历史报警', value: 1}
          ],
          type: ''
        },
        option: {
          color: 'rgb(216, 195, 44)',
          title: {
            text: '实时数据 (mm)'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          xAxis: [
            {
              type: 'time', // category
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 0.5,
              splitNumber: 5,
              scale: true,
              boundaryGap: ['20%', '20%'],
              axisLabel: {
                formatter: '{value}'
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              type: 'line',
              symbol: 'none',
              data: []
            }
          ]
        },
        option1: {
          color: 'rgb(216, 195, 44)',
          title: {
            text: '历史数据 (mm)'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          xAxis: [
            {
              type: 'time', // category
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 0.5,
              splitNumber: 5,
              scale: true,
              boundaryGap: ['20%', '20%'],
              axisLabel: {
                formatter: '{value}'
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              type: 'line',
              symbol: 'none',
              data: []
            }
          ]
        },
        option2: {
          color: 'rgb(216, 195, 44)',
          title: {
            text: '报警详情'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          xAxis: [
            {
              type: 'time', // category
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 0.5,
              splitNumber: 5,
              scale: true,
              boundaryGap: ['20%', '20%'],
              axisLabel: {
                formatter: '{value}'
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              type: 'line',
              symbol: 'none',
              data: []
            }
          ]
        }
      }
    },
    mounted () {
      this.getData()
      console.log(this.topic)
    },
    methods: {
      checkDetail(item, index) {
        console.log(item)
        this.item = item
        this.id = 'id' + index
        this.isVisible = true
        this.option2.series[0].data = []
        selectSingleAlarmHis(this.item.bid, this.item.sid, this.item.TIME).then((res) => {
          console.log(res)
          for (let i=0; i<res.length; i+=2) {
            this.option2.series[0].data.push([getDate(new Date(res[i])), res[i + 1]])
          }
          this.$store.dispatch('setOption', this.option2)

        })
      },
      onSearchBtn () {// 查历史数据
        this.loading = true
        this.search_data.type === 0 ? this.getHistory() : this.getAlarm()
      },
      getData () { // 实时数据接收
        let This = this
        const length = 50
        const WebSocketURL = 'ws://47.92.137.78:8083/mqtt'
        this.mqttClient = mqtt.connect(WebSocketURL)
        let topic = '/data/rawData/' + this.topic
        this.mqttClient.on('connect', () => {
          console.log('连接成功')
          this.mqttClient.subscribe(topic)
        })
        this.mqttClient.on('message', function (topic, message) {
          let msg = JSON.parse(message.toString())
          // console.log(msg)
          if (This.option.series[0].data.length > 50) {
            This.option.series[0].data.shift()
          }
          This.option.series[0].data.push([msg.time, msg.value.toFixed(2)])

        })
      },
      getHistory () {
        this.option1.series[0].data = []
        let start_time, end_time
        if (this.search_data.startTime !== ''){
          start_time = this.search_data.startTime.getTime()
        }
        if (this.search_data.endTime !== ''){
          end_time = this.search_data.endTime.getTime()
        }
        selectSingleData(this.requireObj.bid, this.requireObj.sensorid, this.requireObj.stype_id, start_time, end_time).then((res) => {
          console.log(res)
          this.loading = false
          for (let i=0; i< res.length;  i+= 2) {
            if (this.option1.series[0].data.length === 0 ||  (this.option1.series[0].data.length > 0 && this.option1.series[0].data[this.option1.series[0].data.length - 1][0].getTime() < res[i])) {
              this.option1.series[0].data.push([new Date(res[i]), res[i + 1]])
            }
          }
        })
      },
      getAlarm () {//查报警数据详情
        let start_time, end_time
        if (this.search_data.startTime !== ''){
          start_time = getDate(new Date(this.search_data.startTime))
        }
        if (this.search_data.endTime !== ''){
          end_time = getDate(new Date(this.search_data.endTime))
        }
        selectSingleAlarm(this.requireObj.bid, this.requireObj.sensorid, start_time, end_time).then((res) => {
          console.log(res)
          this.loading = false
          this.alarmDetail = res
        })
      },
      closeDialog () {// 关闭模态框时断开mqtt客户端
        this.mqttClient.end()
        this.$emit('closeDialog')
      },
      closeInfo () {
        this.isVisible = false
      }
    },
    components: {
      nowData,
      alarmDialog
    },
    props: {
      dialogFormVisible: Boolean,
      theme: String,
      requireObj: Object
    }
  }
</script>

<style>
  .el-dialog {
    background: #93bbfb;
  }
  .orderArea {
    width: 100%;
    height: 508px;
    background: #00233e !important;
    border-radius: 6px;
    border: 1px solid #fff;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    color: #fff;
  }
</style>
