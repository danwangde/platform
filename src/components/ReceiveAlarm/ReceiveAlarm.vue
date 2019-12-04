<template>
  <el-container>
    <el-header>
      <div style="color: #8a6d3b;">
        <img src="../../assets/message.png" alt="" style="height:30px;vertical-align: center;position: relative;top:10px;">
        卡号设置</div>
    </el-header>
    <el-main style="padding: 0;border: 1px solid #eee">
      <el-form style="width: 33%; margin-left:33%;margin-top: 20px;">
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.telephone" clearable placeholder=""  class="public_width"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.mailbox" clearable placeholder=""  class="public_width"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button @click="submitBtn">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {getTelPhone, updateTelPhone} from '../../api'
import {mapState} from 'vuex'
export default {
  name: 'CardNumber',
  data () {
    return {
      form: {
        telephone: '',
        mailbox: ''
      },
      chooseId: -1
    }
  },
  computed: {
    ...mapState(['bid'])
  },
  watch: {
    bid (newValue) { // 监听当bid的值发生变化时查流量阈值
      this.chooseId = newValue
      this.getData(newValue)
    }
  },
  methods: {
    async submitBtn () {
      let {chooseId, form} = this
      let res = await updateTelPhone(chooseId, form.telephone, form.mailbox)
      if (res === 1) {
        alert('修改成功')
      } else {
        alert('修改失败')
      }
      this.getData(chooseId)
    },
    async getData (data) {
      let res = await getTelPhone(data)
      this.form = res[0]
      console.log(res)
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
    width:90%;
  }
</style>
