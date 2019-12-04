<template>
    <el-container>
      <el-header>
        <div style="color: #8a6d3b;">
          <img src="../../assets/nd.png" alt="" style="height:30px;vertical-align: center;position: relative;top:10px;">
          请选择挠度传感器</div>
      </el-header>
      <el-main style="padding: 0;border: 1px solid #eee">
        <el-form style="width: 33%; margin-left:33%;margin-top: 20px;">
          <el-form-item >
            <el-select v-model="form.sensor" clearable placeholder="请选择"   class="public_width" @change="getValue">
              <el-option
                v-for="item in sensorArr"
                :key="item.id"
                :label="item.sensorname"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-input v-model="form.value" clearable placeholder=""  class="public_width"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button @click="submitBtn">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
</template>

<script>
import {mapState} from 'vuex'
import {selectFlow, updateFlow} from '../../api'
export default {
  name: 'Flow',
  data () {
    return {
      form: {
        sensor: '',
        value: ''
      },
      sensorArr: []
    }
  },
  computed: {
    ...mapState(['bid'])
  },
  watch: {
    bid (newValue) { // 监听当bid的值发生变化时查流量阈值
      this.getData(newValue)
    }
  },
  methods: {
    async submitBtn () {
      let {form} = this
      let res = await updateFlow(form.sensor, form.value)
      if (res === 1) {
        alert('阈值更新成功')
      } else {
        alert('阈值更新失败')
      }
    },
    async getData (data) {
      this.sensorArr = await selectFlow(data)
      console.log(this.sensorArr)
    },
    getValue () {
      for (let item of this.sensorArr) {
        if (this.form.sensor === item.id) {
          this.form.value = item.volume
        }
      }
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
