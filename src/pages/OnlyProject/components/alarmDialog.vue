<template>
  <el-dialog title="报警详情" :visible.sync="isShow" class="el-dialog-special"
             :close-on-click-modal='false'
             :close-on-press-escape='false'
             :modal-append-to-body="false"
             @close="closeDialog"
  >
    <el-row>
      <el-col :span="12">
        <el-row>
          <alarmChart  :id="idAlarm"></alarmChart>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="orderArea bg-image">
          <img :id="ids" :src="`http://47.92.89.74:3000/pic/picALM/2_${item.filename}`" title="点击全屏" alt="报警照片" style="height:100%; width:100%; cursor: pointer;" @click="full">
        </div>
      </el-col>
    </el-row>
  </el-dialog>
 <!-- <div class="cover" v-show="isShow">
    <div class="modal"></div>
  </div>-->
</template>

<script>
  import alarmChart from './alarmChart'
  import {getDate} from '../../../../public/js/date'
  import {selectSingleAlarmHis} from '../../../api/single'
  export default {
    name: 'alarmDialog',
    data () {
      return {
        isShow: this.dialogFormVisible,
        idAlarm: 'alarm-id',
        daraArr: this.arr,
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
        }
      }
    },
    mounted () {
    },
    props: {
      dialogFormVisible: Boolean,
      arr: Array,
      item: Object,
      ids: String
    },
    methods: {
      closeDialog () {
        this.$emit('closeDialog')
      },
      getAlarm () {
       /* selectSingleAlarmHis(this.mainObj.bid, this.mainObj.sid, this.mainObj.TIME).then((res) => {
          console.log(res)
        })*/
      },
      full () {
        let elem = document.getElementById(this.ids)
        this.requestFullScreen(elem)
      },
      requestFullScreen(element) {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        }
        else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        }
        else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        }
        else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
     }
    },
    components: {
      alarmChart
    }

  }
</script>

<style scoped>
  .orderArea {
    width: 100%;
    height: 400px;
    background: #00233e !important;
    border-radius: 6px;
    border: 1px solid #fff;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    color: #fff;
  }
  .el-dialog {
    background: #789ab5;
    width: 80%;
    margin: 40px auto;
  }
  .cover {
    position:absolute;left:0px;top:0px;
    background:rgba(0, 0, 0, 0.2);
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:100%;
    display:block;
    z-Index:3200;
  }
  .modal {
    position:absolute;
    width:800px;
    height:500px;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color: #869fb3;
    display:block;
    cursor:pointer;
    z-Index:9999;
  }
</style>
