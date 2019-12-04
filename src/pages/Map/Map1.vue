<template>
  <div id="allmap" ref="map"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      arr: [
        {lat: '114', lng: '36'},
        {lat: '116', lng: '40'}
      ]
    }
  },
  async mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      var map = new window.BMap.Map('allmap')
      map.setMapStyle({style: 'midnight'})
      for (let item of this.arr) {
        var point = new window.BMap.Point(item.lat, item.lng)
        var marker = new window.BMap.Marker(point)// 创建标注
        map.addOverlay(marker)// 将标注添加到地图中
        map.centerAndZoom(point, 6)
        var html = `<div class='infoBoxContent '>
                      <div style="color: white;">
                         <span style="color:rgb(0, 255, 251)">白蛇峪大桥</span>
                          <span>90%</span>
                      </div>
                      <hr/>
                      <div>
                        <div class="list">分组名称：交建集团</div>
                        <div class="list">项目类型：桥梁</div>
                        <div class="list">在线状态：离线</div>
                        <div class="list">告警数量：138</div>
                        <div class="list">最新报警时间：2019-11-29 01:00:09</div>
                        <div align="center">
                          <button class="btn">我是按钮</button>
                        </div>
                      </div>
                  </div>`
        var infoBox = new window.BMapLib.InfoBox(map, html, {
          boxStyle: {
            opacity: '0.8',
            background: 'rgb(28, 57, 88)',
            width: '330px',
            height: '200px',
            borderRadius: '10px',
            border: '2px solid rgb(0, 255, 251)'
          },
          closeIconUrl: 'static/img/close.png',
          closeIconMargin: '1px 1px 0 0',
          enableAutoPan: false,
          align: INFOBOX_AT_TOP
        })
        marker.addEventListener('click', function () {
          infoBox.open(marker)
        })
      }

    }
  },
  computed: {
    ...mapState(['msg'])
  }
}
</script>

<style>
  #allmap {
    width: 100%;
    height: 879px;
    background-color: lightgreen;
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
</style>
