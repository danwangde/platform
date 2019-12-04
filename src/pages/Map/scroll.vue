<template>
  <div class="orderArea"  @mouseout="start()">
    <div class="allData" :style="{top}" @mouseover="forbidden()">
      <el-row v-for="(item, index) in alarmDetail" :key="index" style="height: 46px; width: 100%;  border: 1px solid rgb(16, 66, 84);">
        <el-col :span="12" style="padding-left: 4px; line-height: 46px;">
          <span style="display: inline-block; font-size: 10px;">{{item.bridgename}}</span>
          <span style="display: inline-block;font-size: 10px;">{{item.NAME}}</span>
        </el-col>
        <el-col :span="12" style="text-align: right; padding-right: 4px; line-height: 46px;">
          <span style="display: inline-block; font-size: 12px; color: rgb(45, 196, 187)">{{item.val}}<span style="color: #fff;">(报警值)</span></span>
          <span style="display: inline-block; font-size: 10px; color:#fff">{{item.time | dateFormat}}</span>
        </el-col>
      </el-row>
    </div>
    <router-link to="/more" style="position: relative; left: 800px;color: #fff;">首页</router-link>
  </div>
</template>

<script>
import {selectAlmDetails} from '../../api'
import {mapState} from 'vuex'
export default {
  name: 'NoticeIndex',
  data() {
    return {
      time: '',
      isA: true,
      isB: false,
      isC: false,
      isD: false,
      alarmDetail: [],
      items: [
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '111',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '222',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '222',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '222',
          price: '111',
          riseFall: '111',
          volume: '111',
          max: '111',
          min: '111'
        },
        {
          trade: '222',
          price: '222',
          riseFall: '222',
          volume: '111',
          max: '111',
          min: '111'
        }
      ],
      index: 0,
      top: ''
    }
  },
  computed: {
    ...mapState(['msg'])
  },/*
  watch: {
    index (newValue) {
      this.top = -newValue * 47 + 'px'
    }
  },*/
  async mounted() {
    await this.selectAlmDetails()
    this.start()
  },
  beforeDestroy () {
    if (this.time) {
      clearInterval(this.time)
    }
  },
  methods: {
    async selectAlmDetails () {
      this.alarmDetail = await selectAlmDetails(this.msg.userid)
      console.log(this.alarmDetail)
    },
    forbidden: function() {
      clearInterval(this.time)
    },
    start: function() {
      this.time = setInterval( () =>{
        if (this.index < this.alarmDetail.length) {
          this.index += 1
          this.top = -this.index  * 47 + 'px'
          this.alarmDetail.push( this.alarmDetail[this.index - 1])
        } else {
          this.index = 0
        }
      }, 1500)
    }
  }
}
</script>

<style scoped>
  .orderArea {
    width: 100%;
    height: 254px;
    overflow: hidden;
    position: relative;
    background: #00233e !important;
    border-radius: 6px;
    border: 1px solid #fff;
    box-sizing: border-box;
    color: #fff;
  }
.allData {
    transition: top 1.5s;
    width: 500px;
    position: absolute;
    /*top: 0;*/
  }
  .allData :hover {
    background-color: rgba(32, 35, 44, 1);
  }
</style>
