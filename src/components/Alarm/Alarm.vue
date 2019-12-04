<template>
    <el-container>
      <el-header>
        <el-form>
          <el-form-item label="请选择监测点类型">
            <el-select v-model="form.type" clearable placeholder="请选择"   class="public_width" @change="getDetail">
              <el-option
                v-for="item in form.typeArr"
                :key="item.stype_id"
                :label="item.name"
                :value="item.stype_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main style="padding: 0;">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="sensorID"
            label="传感器ID"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sensorname" @focus="cs(scope)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="firstAlarmUp"
            label="一级报警上限"
            width="180">
            <template  slot-scope="scope">
              <el-input v-model="scope.row.alm[0]" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="firstAlarmDown"
            label="一级报警下限">
            <template  slot-scope="scope">
              <el-input v-model="scope.row.alm[1]" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="secondAlarmUp"
            label="二级报警上限">
            <template  slot-scope="scope">
              <el-input v-model="scope.row.alm[2]" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="secondAlarmDown"
            label="二级报警下限">
            <template  slot-scope="scope">
              <el-input v-model="scope.row.alm[3]" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="thirdAlarmUp"
            label="三级报警上限">
            <template  slot-scope="scope">
              <el-input v-model="scope.row.alm[4]" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="thirdAlarmDown"
            label="三级报警下限">
            <template  slot-scope="scope">
              <el-input v-model="scope.row.alm[5]" ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <section style="text-align: center;margin-top: 20px;">
        <el-button @click="asyncBtn" type="primary">同步</el-button>
      </section>
    </el-container>
</template>

<script>
import {selectSensorType, selDetail, updateDetail} from '../../api'
import {mapState} from 'vuex'
export default {
  name: 'Alarm',
  data () {
    return {
      form: {
        type: '',
        typeArr: []
      },
      tableData: []
    }
  },
  mounted () {},
  computed: {
    ...mapState(['bid'])
  },
  watch: {
    bid (newValue) { // 监听当bid的值发生变化时查监测点类型
      this.getData(newValue)
    }
  },
  methods: {
    cs (scope) {
      console.log(scope.row)
    },
    async getData (data) {
      this.form.typeArr = await selectSensorType(data)
      this.form.type = this.form.typeArr[0].stype_id
      this.getDetail()
    },
    async getDetail () {
      this.tableData = await selDetail(this.bid, this.form.type)
      console.log(this.tableData)
    },
    async asyncBtn () {
      let res = await updateDetail(this.tableData)
      if (res === 1) {
        alert('修改成功')
      } else {
        alert('修改失败')
      }
      this.getDetail()
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
</style>
