<template>
  <el-container>
    <el-header>
      <div style="color: #8a6d3b;">
        <img src="../../assets/card.png" alt="" style="height:30px;vertical-align: center;position: relative;top:10px;">
        卡号设置</div>
    </el-header>
    <el-main style="padding: 0;border: 1px solid #eee">
      <el-form style="width: 33%; margin-left:33%;margin-top: 20px;">
        <el-form-item label="卡号" label-width="80px">
          <el-input v-model="form.card" clearable placeholder=""  class="public_width"></el-input>
        </el-form-item>
        <el-form-item label="到期时间" label-width="80px">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button @click="submitBtn">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-main>
      <el-header style="height:40px !important;line-height: 40px;padding: 0;color: #8a6d3b;">
        <span>监测物卡号展示</span>
      </el-header>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="StructureName"
          label="监测物">
        </el-table-column>
        <el-table-column
          prop="cardnum"
          label="卡号">
        </el-table-column>
        <el-table-column
          prop="duetime"
          label="过期时间">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {getDate} from '../../../public/js/date'
import {storageCard, getCard, getCardData} from '../../api'
import {mapState} from 'vuex'
export default {
  name: 'CardNumber',
  data () {
    return {
      form: {
        card: '',
        date: ''
      },
      chooseId: null,
      tableData: []
    }
  },
  computed: {
    ...mapState(['bid', 'groupId'])
  },
  watch: {
    bid (newValue) { // 监听当bid的值发生变化时查卡号和过期时间
      this.chooseId = newValue
      this.getCardInfo(newValue)
    },
    groupId (newValue) { // 监听当groupid的值发生变化时查当前group下的卡号和过期时间
      this.getTable(newValue)
    }
  },
  methods: {
    async submitBtn () {
      let {chooseId, form} = this
      let res = await storageCard(chooseId, form.card, getDate(new Date(form.date)))
      if (res === 1) {
        alert('卡号及到期时间设置成功')
      } else {
        alert('卡号及到期时间设置失败')
      }
      this.getTable(this.groupId)
    },
    async getCardInfo (data) {
      let res = await getCard(data)
      console.log(res)
      this.form.card = res[0].cardnum
      this.form.date = res[0].duetime
    },
    async getTable (data) {
      this.tableData = await getCardData(data)
      for (let item of this.tableData) {
        item.duetime = getDate(new Date(item.duetime))
      }
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
  .el-header {
    height: 80px !important;
    background: #b1b9bb;
    padding: 20px;
  }
  .public_width{
    width:100%;
  }
</style>
