<template>
  <div style="background-color: #cccccc; height: 600px;">
    <el-row>
      <el-button @click="getImage">抓拍</el-button>
    </el-row>
    <el-row>
      <el-container style="width: 80%;height: 520px; margin: 0 auto;" v-loading="loading" element-loading-background="rgba(0,0,0,0.5)" element-loading-text="图片正在请求中">
        <img ref="image" :src="src"  style="width: 50%; margin: 40px 25%;" @click="full">
      </el-container>
    </el-row>
  </div>


</template>

<script>
  import {selectPic} from '../../api/single'
  import {getDateSpecial} from '../../../public/js/date'
  export default {
    name: 'Picture',
    data () {
      return {
        src: 'http://47.92.89.74:3000/pic/256_16385_2019-12-04-16-51-19-94.jpg?1575449491109',
        filename: '',
        bid: 256,
        cameraId: 16385, //大朱家桥 16641
        count: 0,
        cleargetPic: null,
        setTimepic: null,
        leave: false,
        loading: false
      }
    },
    methods: {
      async getImage () {
        this.loading = true
        this.$refs.image.src = ''
        this.filename = this.bid + "_" + this.cameraId + "_" + getDateSpecial(new Date(new Date())) + ".jpg"
        let res = selectPic(this.bid, this.cameraId, this.filename)
        this.cleargetPic = setTimeout(this.trygetpic, 4000)
      },
      LoadPic () {
        var time = new Date().getTime()
        let picurl = "http://47.92.89.74:3000/pic/" + this.filename + "?" + time
        this.$refs.image.src = picurl
        this.loading = false
      },
      trygetpic () {
        if (this.count > 5 || this.leave === true) {
          this.count = 0;
          return;
        }
        this.count++
        this.LoadPic()
        this.setTimepic = setTimeout(this.trygetpic, 2000)
      },
      full () {
        this.requestFullScreen(this.$refs.image)
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
    }
  }
</script>

<style scoped>

</style>
