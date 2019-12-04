
<template>
  <div class="cardContainer">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }" class="cardBody">
          <a :href="github" target="_blank" v-show="false">
             <img :src="userImg" class="userImg" alt="">
          </a>
          <div class="progress wflex">
            <div class="rflex">
              <span class="title">优秀:</span><el-progress :percentage="100"  status="success" :format="format"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">良好:</span><el-progress :percentage="80"   :format="format"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">一般:</span><el-progress :percentage="60"  status="warning" :format="format"></el-progress>
            </div>
            <div class="rflex">
              <span class="title">很差:</span><el-progress :percentage="20" status="exception" :format="format"></el-progress>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userImg from '@/assets/img/avatar-3.png'

export default {
  name: 'cardList',
  data () {
    return {
      userImg: userImg,
      github: 'http://www.baidu.com'
    }
  },
  methods: {
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}`
    }
  }
}
</script>

<style scoped>
.cardContainer{
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height:407px;
  max-height: 407px;
  overflow: hidden;
  border-radius: 6px;
}
.cardContainer .userImg{
    width: 100%;
    height: 236px;
}
.cardContainer .progress {
   padding: 10px;
}
.cardContainer .progress .rflex{
   justify-content: space-between;
   align-items: center;
}
.cardContainer .progress .rflex .title{
  width:65px;
}
.cardContainer .progress .rflex .el-progress {
  flex: 1;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
