<template>
  <header class="head-nav rflex " :style="{'width':headNavWidth + 'px', 'background': backgroundColor}" id='header_container'>
    <el-dialog :modal-append-to-body="false" title="修改密码" :visible.sync="dialogFormVisible" width="600px">
      <el-form>
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="username" autocomplete="off" class="public_width" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="password" autocomplete="off" class="public_width"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-form class="menu_header">
      <el-select v-model="form.selGroup" clearable placeholder="请选择分组"   class="public_width"  @change="getFacility">
        <el-option
          v-for="item in groups"
          :key="item.groupid"
          :label="item.groupname"
          :value="item.groupid">
        </el-option>
      </el-select>
    <el-select style="height: 40px" v-model="form.facility" clearable placeholder="请选择监测物"   class="public_width" @change="chooseBid">
        <el-option
          v-for="item in facilityArr"
          :key="item.StructureID"
          :label="item.StructureName"
          :value="item.StructureID">
        </el-option>
      </el-select>
    </el-form>

    <el-dropdown trigger="click" @command="handleCommand" style="position: fixed; top: 8px; right:0;">
      <el-avatar class="el-icon-user-solid" style="margin-right: 0px;margin-top:5px; color: blue;"></el-avatar>
      <el-dropdown-menu style="width:150px;">
        <el-dropdown-item  command="logout">退出登录</el-dropdown-item>
        <el-dropdown-item command="update">修改密码</el-dropdown-item>
        <el-dropdown-item command="delete">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import {mapState} from 'vuex'
import {removeToken} from '@/utils/utils'
import {selectGroup, selectGroupFacility, updateAdmin} from '../../api'
export default {
  name: 'head-nav',
  data () {
    return {
      backgroundColor: '#ddd',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      password: '',
      groups: [],
      facilityArr: [],
      form: {
        selGroup: '',
        facility: ''
      }
    }
  },
  methods: {
    async updateUser () {
      let {msg, password} = this
      let result = await updateAdmin(password, msg.userid)
      if (result === 1) {
        alert('密码更改成功')
        this.dialogFormVisible = false
      } else {
        alert('密码更改失败')
      }
    },
    async handleCommand (command) {
      if (command === 'logout') {
        await removeToken('Token')
        location.reload()
      } else if (command === 'update') {
        this.dialogFormVisible = true
      }
    },
    async getGroups () {
      console.log(this.msg)
      this.groups = await selectGroup(this.msg.userid)
    },
    async getFacility () {
      this.facilityArr = await selectGroupFacility(this.form.selGroup)
    },
    chooseBid () {
      this.$store.dispatch('getBid', this.form.facility)
      this.$store.dispatch('getGroup', this.form.selGroup)
    }
  },
  components: {

  },
  computed: {
    ...mapState(['msg', 'sidebar']),
    username () {
      return this.msg.username
    },
    headNavWidth () {
      return document.body.clientWidth - this.sidebar.width
    }
  },
  created () {

  },
  mounted () {
    this.getGroups()
  }
}
</script>

<style scoped >
  .head-nav {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 29;
    transition: width .2s;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    background: #fff;}
  .el-input__inner {
    height: 30px !important;
  }
</style>
