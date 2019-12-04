<template>
  <div class="search_container searchArea">
        <el-form
            :inline="true"
            :model='search_data'
            class="demo-form-inline search-form">
            <el-form-item label="">
              <el-date-picker
                v-model="search_data.startTime"
                type="datetime"
                placeholder="选择开始时间"
                @keyup.enter.native='onScreeoutMoney("search_data")'
              >
              </el-date-picker>
            </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="选择结束时间"
              @keyup.enter.native='onScreeoutMoney("search_data")'
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="search_data.selDate" clearable placeholder="常用时间选择"   class="public_width"  @change="changeTime">
              <el-option
                v-for="item in selectArr"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item>
                <el-button type="primary" size ="mini" icon="search" @click='onScreeoutMoney("search_data")'>查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'searchItem',
  data () {
    return {
      search_data: {
        startTime: '',
        endTime: '',
        selDate: ''
      },
      selectArr: [
        {value: '600', name: '十分钟'},
        {value: '1800', name: '三十分钟'},
        {value: '3600', name: '一小时'},
        {value: '86400', name: '二十四小时'},
        {value: '604800', name: '七天'},
        {value: '1296000', name: '十五天'},
        {value: '2592000', name: '一个月'},
        {value: '15768000', name: '半年'},
        {value: '31536000', name: '一年'}
      ]
    }
  },
  computed: {
    ...mapGetters(['searchBtnDisabled'])

  },
  created () {
  },
  methods: {
    onScreeoutMoney () {
      this.$emit('searchList', this.search_data)
    },
    changeTime (value) {
      console.log(value)
      this.search_data.endTime = new Date().getTime()
      this.search_data.startTime = this.search_data.endTime - value * 1000
      this.$emit('changeTime', this.search_data)
    }
  }
}
</script>

<style scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>
