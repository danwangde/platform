<template>
  <el-card class="box-card">
    <el-dialog title="新建监测物" :visible.sync="dialogFacilityVisible" width="600px" @close="closeDialog('dialogFacilityVisible','addRuleFacility')">
      <el-form :model="addRuleFacility" ref="addRuleFacility">
        <el-form-item label="监测物名称:" :label-width="formLabelWidth" required prop="addFacilityName">
          <el-input v-model="addRuleFacility.addFacilityName" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="监测物类型" :label-width="formLabelWidth" required prop="addFacilityType">
          <el-select v-model="addRuleFacility.addFacilityType" clearable placeholder="请选择" >
            <el-option
              v-for="item in dataArr"
              :key="item.structtype"
              :label="item.typename"
              :value="item.structtype">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分组" :label-width="formLabelWidth" required prop="addCheckGroup">
          <el-select v-model="addRuleFacility.addCheckGroup" clearable placeholder="请选择">
            <el-option
              v-for="item in dataGroup"
              :key="item.groupid"
              :label="item.groupname"
              :value="item.groupid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经度:" :label-width="formLabelWidth" required prop="addLongitude">
          <el-input v-model="addRuleFacility.addLongitude" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="纬度:" :label-width="formLabelWidth" required prop="addLatitude">
          <el-input v-model="addRuleFacility.addLatitude" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="配置版本号:" :label-width="formLabelWidth" >
          <el-input v-model="addRuleFacility.versionnum" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="车传感器ID:" :label-width="formLabelWidth" >
          <el-input v-model="addRuleFacility.base_sid" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="车流量阈值:" :label-width="formLabelWidth" >
          <el-input v-model="addRuleFacility.offset" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="是否有主控" :label-width="formLabelWidth">
          <el-radio-group v-model="addRuleFacility.mc_whether">
            <el-radio v-for="(x, index) in mainArr" :label="x.value" :key="index" class="public_marRig">{{x.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('dialogFacilityVisible','addRuleFacility')">取 消</el-button>
        <el-button type="primary" @click="saveBtn('addRuleFacility')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建监测站" :visible.sync="dialogCollectVisible" width="600px" @close="closeDialog('dialogCollectVisible','addRuleCollect')">
      <el-form :model="addRuleCollect"  ref="addRuleCollect">
        <el-form-item label="监测站名称:" :label-width="formLabelWidth" required prop="addCollectName">
          <el-input v-model="addRuleCollect.addCollectName" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="监测站ip:" :label-width="formLabelWidth" required prop="addCollectIp">
          <el-input v-model="addRuleCollect.addCollectIp" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item label="监测站类型" :label-width="formLabelWidth" required prop="addCollectType">
          <el-select v-model="addRuleCollect.addCollectType" clearable placeholder="请选择" >
            <el-option
              v-for="item in collectArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('dialogCollectVisible','addRuleCollect')">取 消</el-button>
        <el-button type="primary" @click="saveBtn('addRuleCollect')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建监测点" :visible.sync="dialogSensorVisible" width="600px" @close="closeDialog('dialogSensorVisible','addRuleSensor')">
      <el-form :model="addRuleSensor"  ref="addRuleSensor">
        <el-form-item label="通道号:" :label-width="formLabelWidth" prop="addChannel">
          <el-select v-model="addRuleSensor.addChannel" clearable placeholder="请选择"   class="public_width">
            <el-option
              v-for="item in sensorTypeArr"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监测点类型:" :label-width="formLabelWidth" prop="addSensorType">
          <el-select v-model="addRuleSensor.addSensorType" clearable placeholder="请选择"   class="public_width">
            <el-option
              v-for="item in channelArr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监测点名称" :label-width="formLabelWidth" prop="addSensorName">
          <el-input v-model="addRuleSensor.addSensorName" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
        <el-form-item :label="'监测点参数' + index" :label-width="formLabelWidth" prop="addSensorArg" v-for="(x, index) in addRuleSensor.sensorArg" :key="index">
          <el-input v-model="x.value" autocomplete="off" class="public_width" ></el-input>
          <i class="el-icon-plus" style="cursor: pointer;" @click="addArg" title="新增监测点参数"></i>
        </el-form-item>
        <el-form-item label="频率" :label-width="formLabelWidth" prop="addFrequency">
          <el-input v-model="addRuleSensor.addFrequency" autocomplete="off" class="public_width" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('dialogSensorVisible','addRuleSensor')">取 消</el-button>
        <el-button type="primary" @click="saveBtn('addRuleSensor')">确 定</el-button>
      </div>
    </el-dialog>
    <el-header style="background: #b1b9bb;line-height:60px;">
      <span>历史创建用户列表</span>
      <el-button type="primary" class="pull-right" style="top:14px;position: relative;" @click="addClick('dialogFacilityVisible',1)">新建监测物</el-button>
    </el-header>
    <el-row style="height:700px; position: relative;" >
      <el-col :span="4" style="height:100%;background: rgb(228, 234,236);position: relative;">
        <el-tree :data="data" :props="defaultProps" node-key="id" ref="tree"
                 :default-expanded-keys="[1]" :highlight-current="showTree" @node-click="handleNodeClick" ></el-tree>
        <el-button type="primary" @click="deleteStruct" style="position: absolute; bottom:0; left: 60px;">{{deleteTitle? deleteTitle: '点击删除'}}</el-button>
      </el-col>
      <el-col :span="20" style="height:100%;">
        <el-container>
          <div v-show="level === 1" style="width:100%;">
            <el-header style="background: #cccccc;line-height:60px;">
              <span>监测物基础信息</span>
              <el-button type="primary" class="pull-right" style="top:14px;position: relative;" @click="addClick('dialogCollectVisible', 2)">新建监测站</el-button>
            </el-header>
            <el-form style="width:100%;" >
              <el-form-item label="监测物名称:" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-input v-model="ruleFacility.StructureName" autocomplete="off" class="public_width" ></el-input>

              </el-form-item>
              <el-form-item label="监测物类型" :label-width="formLabelWidth">
                <el-select v-model="ruleFacility.StructureTypeID" clearable placeholder="请选择"   class="public_width">
                  <el-option
                    v-for="item in dataArr"
                    :key="item.structtype"
                    :label="item.typename"
                    :value="item.structtype">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属分组" :label-width="formLabelWidth">
                <el-select v-model="ruleFacility.groupid" clearable placeholder="请选择"  class="public_width">
                  <el-option
                    v-for="item in dataGroup"
                    :key="item.groupid"
                    :label="item.groupname"
                    :value="item.groupid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="经度:" :label-width="formLabelWidth">
                <el-input v-model="ruleFacility.lng" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="纬度:" :label-width="formLabelWidth">
                <el-input v-model="ruleFacility.lat" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="配置版本号:" :label-width="formLabelWidth">
                <el-input v-model="ruleFacility.versionnum" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="车传感器ID:" :label-width="formLabelWidth">
                <el-input v-model="ruleFacility.base_sid" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="车流量阈值:" :label-width="formLabelWidth">
                <el-input v-model="ruleFacility.offset" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="是否有主控" :label-width="formLabelWidth">
                <el-radio-group v-model="ruleFacility.mc_whether">
                  <el-radio v-for="(x, index) in mainArr" :label="x.value" :key="index" class="public_marRig">{{x.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <div style="margin-left:20%;">
                  <el-button type="primary"  @click="confirmBtn">确认</el-button>
                  <el-button >重置</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="level === 2" style="width:100%;">
            <el-header style="background: #cccccc;line-height:60px;">
              <span>监测站基础信息</span>
              <el-button type="primary" class="pull-right" style="top:14px;position: relative;" @click="addClick('dialogSensorVisible',3)">新建监测点</el-button>
            </el-header>
            <el-form style="width:100%;">
              <el-form-item label="监测站名称:" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-input v-model="ruleCollect.msc_name" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="监测站ip:" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-input v-model="ruleCollect.msc_ip" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="监测站类型" :label-width="formLabelWidth">
                <el-select v-model="ruleCollect.msc_type_id" clearable placeholder="请选择"   class="public_width">
                  <el-option
                    v-for="item in collectArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <div style="margin-left:20%;">
                  <el-button type="primary" @click="confirmBtn">确认</el-button>
                  <el-button >重置</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="level === 3" style="width:100%;">
            <el-header style="background: #cccccc;line-height:60px;">
              <span>监测点基础信息</span>

            </el-header>
            <el-form style="width:100%;">

              <el-form-item label="通道号:" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-select v-model="ruleSensor.channel_id" clearable placeholder="请选择"   class="public_width">
                  <el-option
                    v-for="item in sensorTypeArr"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="监测点类型:" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-select v-model="ruleSensor.stype_id" clearable placeholder="请选择"   class="public_width">
                  <el-option
                    v-for="item in channelArr"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="监测点名称" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-input v-model="ruleSensor.sensorname" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="监测点参数" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-input v-model="ruleSensor.arg" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="频率" :label-width="formLabelWidth" style="margin-top:20px;">
                <el-input v-model="ruleSensor.frequency" autocomplete="off" class="public_width" ></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <div style="margin-left:20%;">
                  <el-button type="primary" @click="confirmBtn">确认</el-button>
                  <el-button >重置</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-container>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import {getDate} from '../../../../public/js/date'
import {mapState} from 'vuex'
import {
  addFacility,
  getStructureType,
  reqGroup,
  addCollect,
  getSensor,
  addSensor,
  getFacility,
  updateFacility,
  deleteFacility,
  getCollect,
  getTrees,
  updateCollect,
  deleteCollect,
  getCollectType,
  getChannel,
  deleteSensor,
  updateSensor,
  getMscType
} from '../../../api'
export default {
  data () {
    return {
      data: [],
      mainControl: '',
      mainArr: [
        {name: '是', value: 1},
        {name: '否', value: 0}
      ],
      collectArr: [],
      showTree: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      Id: '', // 所选id,
      deleteTitle: '',
      ruleFacility: {},
      ruleCollect: {},
      ruleSensor: {},
      addRuleFacility: {
        addFacilityName: '',
        addFacilityType: '',
        addCheckGroup: '',
        addLongitude: '',
        addLatitude: '',
        versionnum: '',
        base_sid: '',
        offset: '',
        mc_whether: ''
      },
      channelArr: [],
      sensorTypeArr: [],
      addRuleCollect: {
        addCollectName: '',
        addCollectIp: '',
        addCollectType: ''
      },
      addRuleSensor: {
        addChannel: '',
        addSensorType: '',
        addSensorName: '',
        addSensorArg: '',
        addFrequency: '',
        sensorArg: [
          {value: ''}
        ]
      },
      isClick: false,
      level: 1,
      dataArr: [],
      dataGroup: [],
      dialogFacilityVisible: false,
      dialogCollectVisible: false,
      dialogSensorVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.getFacilityType()
    this.getGroup()
    this.getTrees()
  },

  methods: {
    addArg () {
      this.addRuleSensor.sensorArg.push({
        value: '',
        key: Date.now()
      })
    },
    async handleNodeClick (data) { // 点击树形结构
      console.log(data.level)
      this.isClick = true
      this.Id = data.id
      this.level = data.level // 当前所选在树形结构的层级
      if (data.level === 1) {
        await this.getMscType()
        this.deleteTitle = '删除监测物'
        this.getFacilityInfo(data.id)
      } else if (data.level === 2) {
        this.deleteTitle = '删除监测站'
        await this.getMscType()
        this.getChannelArr(data.id, this.level)
        this.getCollectInfo(data.id)
      } else if (data.level === 3) {
        this.deleteTitle = '删除监测点'
        this.getChannelArr(data.id, this.level)
        this.getSensorInfo(data.id)
      }
    },
    async getMscType () {
      this.collectArr = await getMscType()
      console.log(this.collectArr)
    },
    async getChannelArr (id, level) {
      let result = await getCollectType(id, level)
      let mscTypeId = result[0].msc_type_id
      let channelData = await getChannel(mscTypeId)
      for (let item of channelData) {
        this.channelArr = []
        this.channelArr.push({name: item.name, value: item.stype_id})
        if (item.hasOwnProperty('channel_num')) {
          this.sensorTypeArr = item.channel_num
        }
      }
    },
    async getSensorInfo (id) { // 查当前所选监测点基础信息
      let res = await getSensor(id)
      console.log(res)
      this.ruleSensor = res[0]
    },
    async getCollectInfo (id) { // 查当前所选监测站目基础信息
      let res = await getCollect(id)
      console.log(res)
      this.ruleCollect = res[0]
    },
    async getFacilityInfo (id) { // 查当前所选监测物基础信息
      let result = await getFacility(id)
      console.log(result)
      this.ruleFacility = result[0]
    },
    addClick (dialog, level) { // 点击新增按钮 打开dialog
      if (level === 2 && !this.isClick) {
        alert('请先选择监测物')
      } else {
        this[dialog] = true
      }
    },
    closeDialog (dialog, formItem) { // 关闭dialog 清空关联表单
      this[dialog] = false
      this.$refs[formItem].resetFields()
    },
    async getTrees () { // 得到左侧树形结构
      this.data = await getTrees(this.msg.userid)
    },
    async confirmBtn () {
      console.log(this.level === 3)
      if (this.level === 1) {
        let {ruleFacility} = this
        let result = await updateFacility(ruleFacility.StructureName, ruleFacility.StructureTypeID, ruleFacility.groupid, ruleFacility.lat, ruleFacility.lng, ruleFacility.StructureID)
        console.log(result)
        if (result === 1) {
          alert('该监测物更新成功')
        } else {
          alert('该监测物更新失败')
        }
        this.getFacilityInfo(this.ruleFacility.StructureID)
      } else if (this.level === 2) {
        let {ruleCollect} = this
        let result = await updateCollect(ruleCollect.msc_name, ruleCollect.msc_ip, ruleCollect.msc_type_ip, ruleCollect.id, getDate(new Date()))
        console.log(result)
        if (result === 1) {
          alert('该监测站更新成功')
        } else {
          alert('该监测站更新失败')
        }
        this.getCollectInfo(this.ruleCollect.id)
      } else if (this.level === 3) {
        console.log(11111)
        let {ruleSensor} = this
        let result = await updateSensor(
          ruleSensor.channel_id, ruleSensor.mid, ruleSensor.sensorid, ruleSensor.sensorname, ruleSensor.arg, ruleSensor.frequency, getDate(new Date()),
          ruleSensor.msc_ip, ruleSensor.stype_id, ruleSensor.base, ruleSensor.filter, ruleSensor.alm, ruleSensor.profile_id, ruleSensor.volume, ruleSensor.base_flag, ruleSensor.linksensor, ruleSensor.sensorcode, ruleSensor.id)
        console.log(result)
        if (result === 1) {
          alert('该监测点更新成功')
        } else {
          alert('该监测点更新失败')
        }
      }
    },
    async deleteStruct () {
      if (this.isClick) {
        let result
        if (this.level === 1) {
          result = await deleteFacility(this.ruleFacility.StructureID)
        } else if (this.level === 2) {
          result = await deleteCollect(this.ruleCollect.id)
        } else if (this.level === 3) {
          result = await deleteSensor(this.ruleSensor.id)
        }
        if (result === 1) {
          alert('删除成功')
        } else {
          alert('删除失败')
        }
      } else {
        alert('请点击结构物删除')
      }
    },
    async saveBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
      if (formName === 'addRuleFacility') {
        let {addRuleFacility, msg} = this
        let res = await addFacility(addRuleFacility.addFacilityName, addRuleFacility.addFacilityType, addRuleFacility.addCheckGroup, addRuleFacility.addLongitude, addRuleFacility.addLatitude, addRuleFacility.versionnum, addRuleFacility.base_sid, addRuleFacility.offset, addRuleFacility.mc_whether, msg.userid)
        console.log(res)
        if (res === 1) {
          alert('监测物新增成功')
          this.dialogFacilityVisible = false
        } else {
          alert('监测物新增失败')
          this.dialogFacilityVisible = false
        }
        this.getTrees()
      } else if (formName === 'addRuleCollect') {
        let date = getDate(new Date())
        let {addRuleCollect, Id} = this
        let res = await addCollect(addRuleCollect.addCollectName, addRuleCollect.addCollectIp, addRuleCollect.addCollectType, Id, date)
        console.log(res)
        if (res === 1) {
          alert('监测站新增成功')
          this.dialogCollectVisible = false
        } else {
          alert('监测站新增失败')
          this.dialogCollectVisible = false
        }
        this.getTrees()
      } else {
        let arr = []
        for (let item of this.addRuleSensor.sensorArg) {
          arr.push(item.value)
        }
        let date = getDate(new Date())
        let {addRuleSensor, Id} = this
        let res = await addSensor(addRuleSensor.addChannel, Id, addRuleSensor.addSensorType, addRuleSensor.addSensorName, arr, addRuleSensor.addFrequency, date, '2', '1', '2', '1', '4', '2', '4', '5', '7', '8')
        console.log(res)
        if (res === 1) {
          alert('监测点新增成功')
          this.dialogSensorVisible = false
        } else {
          alert('监测点新增失败')
          this.dialogSensorVisible = false
        }
        this.getTrees()
      }
      this.$refs[formName].resetFields()
    },
    async getFacilityType () {
      this.dataArr = await getStructureType()
    },
    async getGroup () {
      this.dataGroup = await reqGroup()
    }
  },
  computed: {
    ...mapState(['msg'])
  }
}
</script>
<style scoped>
  .el-tree {
    width: 100%;
    background: transparent;
  }
  .public_width{
    width:50%;
  }
  .el-select {}
</style>
