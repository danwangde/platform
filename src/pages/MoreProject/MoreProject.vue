<template>
<div>
    <el-row style="line-height:40px; height:40px;background: #00233e; color: rgb(45, 196, 187)">
      <el-col :span="4" >
         <el-page-header title="退出登录" @back="goBack" style="margin-top:8px;"></el-page-header>
      </el-col>
      <el-col :span="16" style="text-align:center;position:relative;left:-40px;font-size:28px;">基础设施智慧监测平台</el-col>
      <el-col :span="4">
       <router-link to="/only" style="color: rgb(45, 196, 187)">跳转</router-link>
      </el-col>
    </el-row>
    <el-row class="el-line" style="height:929px;">
        <el-col :span="4" style="background: #00233e;color: #eee;padding: 0 2px; height:100%;">
          <line-Chart style="margin-bottom:10px;" :id="id4"></line-Chart>
          <pie-chart type="ordertype"  style="margin-bottom:10px;" :id="id5"></pie-chart>
          <guage-chart :id="id6"></guage-chart>
        </el-col>
        <el-col :span="16">
            <div id="allmap" ref="map"></div>
          <el-row style="margin-top: 10px; background-color: #000; height: 250px;">
            <el-col :span="16">
              <bar-chart></bar-chart>
            </el-col>
            <el-col :span="8">
              <div class="orderArea">
                <h6 style="color: #fff;">各项目未报警数量</h6>
                <hr>
                <div class="el-scrollbar " style="height: 140px; overflow-y: scroll;margin-top: 30px;">
                  <el-row v-for="(item, index) in alarmNo" class=" el-scrollbar pub_marBtm" :key="index" style="font-size: 14px;margin-bottom: 10px;">
                    <el-col :span="4" >{{index}}</el-col>
                    <el-col :span="16">{{item.bridgename}}</el-col>
                    <el-col :span="4" style="color:  rgb(45, 196, 187);">{{item.AlmCount}}</el-col>
                  </el-row>
                </div>
              </div>

            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" style="background: #00233e;color: #eee;padding: 0 2px; height:100%;">
         <div class="orderArea" style="margin-bottom:10px;">
           <h6>项目在线数量</h6>
           <hr/>
           <el-row style="padding-left: 40px;margin-top: 30px;">
             <el-col :span="12">
               <div style="width:120px; height:120px; border-radius: 50%;background-color: rgb(16, 66, 84); border: 4px dashed #fff;">
                 <div style="width:100px; height:100px; border-radius: 50%;background-color: rgb(80, 253, 255);position: relative;top: 10px; left:10px;">
                   <div style="width:50px; height:50px; border-radius: 50%;background-color: rgb(19, 31, 56); border: 2px solid red;position: relative; top:25px; left: 25px;line-height: 50px;text-align: center;">
                     {{stateY}}
                   </div>
                 </div>
               </div>
             </el-col>
             <el-col :span="12" style="padding: 10px 0 0 20px;">
               <div style="margin-bottom: 20px;"><span style="font-size: 12px; font-weight: 700;">在线数量:</span> <span style="color: rgb(0, 255, 53)">{{stateY}}</span></div>
               <div style="margin-bottom: 20px;"><span style="font-size: 12px; font-weight: 700;">离线数量:</span> {{stateN}}</div>
               <div style="margin-bottom: 10px;"><span style="font-size: 12px; font-weight: 700;">项目总数:</span> {{stateN + stateY}}</div>
             </el-col>
           </el-row>
         </div>
          <div class="orderArea special_height" style="margin-bottom: 10px;">
            <h6>最新报警情况</h6>
            <hr/>
            <div class="el-scrollbar" style="height: 320px; overflow-y: scroll;">
              <el-row v-for="(item, index) in alarmDetail" :key="index" style="margin-top: 30px; border: 1px solid rgb(16, 66, 84); border-radius: 4px; padding: 2px;">
                <el-col :span="12" style="padding-left: 4px;">
                  <span style="display: inline-block; font-size: 10px;">{{item.bridgename}}</span>
                  <span style="display: inline-block;font-size: 10px;">{{item.NAME}}</span>
                </el-col>
                <el-col :span="12" style="text-align: right; padding-right: 4px;">
                  <span style="display: inline-block; font-size: 12px; color: rgb(45, 196, 187)">{{item.val}}<span style="color: #fff;">(报警值)</span></span>
                  <span style="display: inline-block; font-size: 10px; color:#fff">{{item.time | dateFormat}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <guage-chart :id="id3"></guage-chart>
        </el-col>
    </el-row>
</div>

</template>

<script>
import {mapState} from 'vuex'
import {removeToken} from '@/utils/utils'
import lineChart from '@/components/echarts/lineChart'
import pieChart from '@/components/echarts/pieChart'
import barChart from '@/components/echarts/barChart'
import guageChart from '@/components/echarts/guageChart'
import {getBridgeInfo, selectState, selectAlmDetails, selectAlarm} from '../../api'
let map
window.lastInfoBox = null
export default {
  data () {
    return {
      opts: {
        width: 230, // 信息窗口宽度
        height: 120, // 信息窗口高度
        borderRadius: 20,
        title: '设施信息', // 信息窗口标题
        enableMessage: true// 设置允许信息窗发送短息
      },
      stateN: null,
      stateY: null,
      alarmDetail: [],
      alarmNo: [],
      id1: 'line',
      id2: 'pie',
      id3: 'health',
      id4: 'line1',
      id5: 'pie1',
      id6: 'health1',
      lastInfoBox: null
    }
  },
  async mounted () {
    this.selectState()
    this.selectAlmDetails()
    this.selectAlarm()
    this.initMap()
    await this.getBridge()
    this.mapData(this.facility)
  },
  methods: {
    async selectAlarm () {
      this.alarmNo = await selectAlarm(this.msg.userid)
     /* this.alarmNo.push({AlmCount: 267, bid: 216, bridgename: "郑州西四环南水北调桥"})
      this.alarmNo.push({AlmCount: 267, bid: 216, bridgename: "郑州西四环南水北调桥"})
      this.alarmNo.push({AlmCount: 267, bid: 216, bridgename: "郑州西四环南水北调桥"})
      this.alarmNo.push({AlmCount: 267, bid: 216, bridgename: "郑州西四环南水北调桥"})*/
    },
    async selectAlmDetails () {
      this.alarmDetail = await selectAlmDetails(this.msg.userid)
      console.log(this.alarmDetail)
    },
    async selectState () {
      let res = await selectState(this.msg.userid)
      this.stateY = res[0].Y
      this.stateN = res[0].N
      console.log(res)
    },
    initMap () {
      // 初始化地图
      map = new window.BMap.Map('allmap') /*, {mapType: window.BMAP_HYBRID_MAP}*/
      let point = new window.BMap.Point(103.388611, 35.563611)
      map.centerAndZoom(point, 6)
      map.setMapStyleV2({
        styleId: 'b6b37f022d54f216ac031707f8630535'
      })
      var overviewMapControl = new window.BMap.OverviewMapControl() // 创建缩略图控件，注意这个控件默认是在地图右下角，并且是缩着的
      // map.addControl(overviewMapControl) // 添加到地图
      var navigationControl = new window.BMap.NavigationControl({
        // 靠左上角位置
        anchor: window.BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: window.BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      })
      // map.addControl(navigationControl)
      // 比例尺控件
      // map.addControl(new window.BMap.ScaleControl())
      var mapTypeControl = new window.BMap.MapTypeControl() // 创建地图类型控件
      // map.addControl(mapTypeControl)
      map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
    },
    async getBridge () {
      this.facility = await getBridgeInfo(this.msg.userid)
    },
    mapData (data) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        var marker = ''
        marker = new window.BMap.Marker(new window.BMap.Point(data[i].lng, data[i].lat), { icon: this.addIcon(data[i].state) }) // 创建标注
        map.addOverlay(marker) // 将标注添加到地图中   href="#/disease"
        // marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
        // marker.enableDragging();           // 不可拖拽
        let html = `<div class='infoBoxContent '>
                      <div style="color: white;">
                         <span style="color:rgb(0, 255, 251)">${data[i].bridgename} </span>
                          <span>&nbsp;${data[i].health}</span>
                      </div>
                      <hr/>
                      <div>
                        <div class="list">分组名称: ${data[i].health}</div>
                        <div class="list">项目类型：桥梁</div>
                        <div class="list">在线状态：${data[i].state === 0 ? '在线' : data[i].state === 0 ? '欠费' : '离线'}</div>
                        <div class="list">告警数量：${data[i].alarmCount}</div>
                        <div class="list">最新报警时间：${data[i].logtime}</div>
                      </div>
                  </div>`
        marker.addEventListener('click', function () {
          var infoBox = new window.BMapLib.InfoBox(map, html, {
            boxStyle: {
              opacity: '0.8',
              background: 'rgb(28, 57, 88)',
              width: '330px',
              height: '200px',
              borderRadius: '10px',
              border: '2px solid rgb(0, 255, 251)'
            },
            closeIconUrl: 'static/img/close-circle-outline (2).png',
            closeIconMargin: '1px 1px 0 0',
            /*enableAutoPan: false,*/
            align: INFOBOX_AT_TOP
          })
          if (window.lastInfoBox) {
            window.lastInfoBox.close()
          }
          window.lastInfoBox = infoBox
          infoBox.open(marker)
        })
      }
    },
    addIcon (state) {
      var myIcon = null
      if (state === 0) {
        myIcon = new window.BMap.Icon('/static/img/1.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      } else if (state === 1) {
        myIcon = new window.BMap.Icon('/static/img/2.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      } else if (state === 2) {
        myIcon = new window.BMap.Icon('/static/img/3.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      } else {
        myIcon = new window.BMap.Icon('/static/img/3.png', new window.BMap.Size(50, 50), {
          anchor: new window.BMap.Size(48, 48)
        })
      }
      return myIcon
    },
    goBack () {
      removeToken('Token')
      location.reload()
    }
  },
  computed: {
    ...mapState(['msg'])
  },
  components: {
    lineChart,
    pieChart,
    guageChart,
    barChart
  }
}
</script>

<style>
  #allmap {
    border: 1px solid #fff;
    border-radius: 4px;
    width: 100%;
    margin: 0 auto;
    height: 662px;
    background-color: lightgreen;
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
    border: none;
  }
  .el-line .special_height {
    height: 400px;
  }

  .infoBoxContent{
    margin:20px;
  }
  .infoBoxContent .btn{
    background-color: #008CBA;
    border: none;
    margin-top: 10px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 16px;
    width: 120px;
  }
  .infoBoxContent h3{
    color: white;
  }
  .infoBoxContent .list{
    color:white;
  }
  .infoBoxContent:before {
    content: '';
    width: 0;
    height: 0;
    border: 18px solid transparent;
    border-top-color: rgb(0, 255, 251);
    position: absolute;
    left: 50%;
    top: 100%;
    margin-left: -20px;
  }

  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL {
    display: none;
  }


</style>
