<template>
  <div id="allmap" ref="map"></div>
</template>

<script>
import {mapState} from 'vuex'
import {getBridgeInfo} from '../../api'
let map
export default {
  data () {
    return {
      opts: {
        width: 230, // 信息窗口宽度
        height: 120, // 信息窗口高度
        borderRadius: 12,
        title: '设施信息', // 信息窗口标题
        enableMessage: true// 设置允许信息窗发送短息
      }
    }
  },
  async mounted () {
    this.initMap()
    await this.getBridge()
    this.mapData(this.facility)
  },
  methods: {
    initMap () {
      // 初始化地图
      map = new window.BMap.Map('allmap', {mapType: window.BMAP_HYBRID_MAP})
      let point = new window.BMap.Point(103.388611, 35.563611)
      map.centerAndZoom(point, 6)
      map.setMapStyleV2({
        styleId: 'b6b37f022d54f216ac031707f8630535'
      })
      var overviewMapControl = new window.BMap.OverviewMapControl() // 创建缩略图控件，注意这个控件默认是在地图右下角，并且是缩着的
      map.addControl(overviewMapControl) // 添加到地图
      var navigationControl = new window.BMap.NavigationControl({
        // 靠左上角位置
        anchor: window.BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: window.BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      })
      map.addControl(navigationControl)
      // 比例尺控件
      map.addControl(new window.BMap.ScaleControl())
      var mapTypeControl = new window.BMap.MapTypeControl() // 创建地图类型控件
      map.addControl(mapTypeControl)
      map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
    },
    async getBridge () {
      this.facility = await getBridgeInfo(this.msg.userid)
      for (let item of this.facility) {
        item.state = 2
      }
    },
    mapData (data) {
      for (var i = 0; i < data.length; i++) {
        var marker = ''
        marker = new window.BMap.Marker(new window.BMap.Point(data[i].lng, data[i].lat), { icon: this.addIcon(data[i].state) }) // 创建标注
        var content =
          `监测物信息:${data[i].StructureName} <br>
                     监测物纬度:${data[i].lat} <br>
                     监测物经度:${data[i].lng} <br>`

        map.addOverlay(marker) // 将标注添加到地图中   href="#/disease"
        // marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) // 跳动的动画
        // marker.enableDragging();           // 不可拖拽
        this.addClickHandler(content, marker)
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
      }
      return myIcon
    },
    openInfo (content, e) {
      let This = this
      var p = e.target
      var point = new window.BMap.Point(p.getPosition().lng, p.getPosition().lat)
      var infoWindow = new window.BMap.InfoWindow(content, This.opts) // 创建信息窗口对象
      map.openInfoWindow(infoWindow, point) // 开启信息窗口
    },
    addClickHandler (content, marker) {
      let This = this
      marker.addEventListener('click', function (e) {
        This.openInfo(content, e)
      }
      )
    }
  },
  computed: {
    ...mapState(['msg'])
  }
}
</script>

<style scoped>
  #allmap {
    width: 100%;
    height: 879px;
    background-color: lightgreen;
  }
</style>
