<template>
  <section>
    <el-card class="box-card" style="height:800px;">
      <div slot="header" class="clearfix card_header">
        <span >历史创建用户列表</span>
        <span> <i class="el-icon-plus pull-right cursor" @click="dialogFormVisible = true" title="新建用户"></i></span>
        <el-dialog title="新建用户" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form">
            <el-form-item label="用户名:" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off" class="public_width"></el-input>
            </el-form-item>
            <el-form-item label="密码:" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off" class="public_width"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-row style="height: 700px;">
        <el-col :span="4"  class="aside_left">
          <el-tree :data="data" :props="defaultProps" node-key="id"
                   :default-expanded-keys="[1]" :highlight-current="showTree" @node-click="handleNodeClick" ></el-tree>
          <el-footer class="mar_top text-center">
            <el-button type="primary" @click="deleteUser">删除用户</el-button>
          </el-footer>
        </el-col>
        <el-col :span="20" style="border-left:1px dashed #000;padding:0 0 0 10px; height:100%;">
          <div class="panel">
            修改用户权限
          </div>
          <el-main style="border:1px solid #eee; border-top:0;border-bottom:0;">
            <el-form style="margin-bottom:20px;">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(x, index) in dataArr" :label="x.value" :key="index" class="public_marRig">{{x.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form>
          </el-main>
          <div class="panel">
            修改项目权限
          </div>
          <el-main style="border:1px solid #eee; border-top:0;">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-row>
                <el-checkbox v-for="(city, index) in cities" :label="city.StructureID" :key="index" style="width:20%;margin-bottom:10px;">{{city.StructureName}}</el-checkbox>
              </el-row>
              <el-footer class="text-center">
                <el-button @click="report" class="public_bottom">确认</el-button>
              </el-footer>
            </el-checkbox-group>
          </el-main>
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>
import mqtt from 'mqtt'
import {mapState} from 'vuex'
import {getBridgeInfo, getTree, addUsers, updatePower, deleteAdmin} from '../../api'
export default {
  data () {
    return {
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      dataArr: [
        {name: '该账户不被禁用', value: 1},
        {name: '该用户可以创建新用户', value: 2},
        {name: '该账户可以设置报警范围', value: 3}
      ],
      checkList: [1, 2, 3],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showTree: true,
      userId: null,
      form: {
        username: '',
        password: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  mounted () {
    this.getBridge()
    this.getTreeData()
    // this.mqttConnect()
  },
  methods: {
    async handleNodeClick (data) {
      this.checkedCities = []
      console.log(data.id)
      this.userId = data.id
      let res = await getBridgeInfo(this.userId)
      for (let item of res) {
        this.checkedCities.push(item.StructureID)
      }
      console.log(this.checkedCities)
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.checks : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    async getBridge () {
      this.cities = await getBridgeInfo(this.msg.userid)
    },
    async getTreeData () {
      this.data = await getTree(this.msg.userid)
    },
    async addUser () { // 新增用户
      let {form, msg} = this
      let result = await addUsers(form.username, form.password, msg.userid)
      console.log(result)
      if (result === 1) {
        alert('新增用户成功')
        this.dialogFormVisible = false
        this.getTreeData()
      } else {
        alert('新增用户失败')
        this.dialogFormVisible = false
      }

      this.form.username = ''
      this.form.password = ''
    },
    async report () { // 修改权限
      let {checkList, checkedCities, userId} = this
      let result = await updatePower(userId, checkList.join(','), checkedCities.join(','))
      if (result === 1) {
        alert('修改成功')
      } else {
        alert('修改失败')
      }
    },
    async deleteUser () {
      let result = await deleteAdmin(this.userId)
      if (result === 1) {
        alert('删除用户成功')
        this.getTreeData()
      } else {
        alert('删除用户失败')
      }
    },
    mqttConnect () {
      const WebSocketURL = 'ws://47.92.137.78:8083/mqtt'
      const mqttClient = mqtt.connect(WebSocketURL)
      mqttClient.on('connect', () => {
        console.log('连接成功')
        mqttClient.subscribe('test/+', function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('subscribe test ok ... ')
          }
          mqttClient.on('message', function (topic, message) {
            console.log(topic)
            console.log(message.toString())
          })
        })
      })
    }
  },
  computed: {
    ...mapState(['msg']),
    checks () {
      return this.cities.map((item) => {
        return item.StructureID
      })
    }
  }
}
</script>

<style scoped>
  .el-tree {
    width: 100%;
    background: transparent;
  }
  .el-footer {
    position: relative;
  }
  .public_marRig {
    margin-right:10px !important;
  }
  .cursor {
    cursor: pointer;
    font-size: 20px;
  }
  .aside_left {
    height: 100%;
    background: rgb(244, 245,245);
  }
  .el-checkbox {
    margin-right: 0;
  }
  .text-center {
    text-align: center;
  }
  .public_bottom {
    position: absolute;
    bottom: 0;
  }
  .mar_top {
    margin-top: 20px;
  }
  .panel {
    padding: 8px 10px;
    border: 1px solid #EBEEF5;
    background: #f6f8f8;
  }
  .el-card .el-card__header {
    padding: 10px 16px !important;
  }
  .el-header {
    line-height: 60px;
    background: darkgrey;
  }
  .public_width {
    width: 50%;
  }
</style>
