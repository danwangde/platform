
<template>
     <el-container>
       <left-menu></left-menu>
       <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="600px">
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
       <head-nav></head-nav>
       <el-container style="background-color: #fff;overflow: hidden">
         <div style="overflow: auto;
            position: absolute;
            right:0;
            padding: 0;
            top:60px;
            bottom:0;
            background: #f0f2f5;"
              :style="{left:sidebar.width +'px'}"
              class="el-scrollbar" ref="menu_right">
           <bread></bread>
           <router-view/>
          <!-- <keep-alive>

           </keep-alive>-->
           <backTop  @handleScrollTop="handleScrollTop"></backTop>
         </div>
         <el-footer style="height: 50px;" v-show="$route.path !== '/main/map'" :style="{marginLeft:sidebar.width+'px'}">
           <span class="pull-right"><a><i
             class="fa fa-long-arrow-up"></i></a></span>
           西安敏文测控科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&copy; 2019 Copyright.
         </el-footer>
       </el-container>
     </el-container>
</template>

<script>
import {mapState} from 'vuex'
import {selectGroup, selectGroupFacility, updateAdmin} from '../../api'
import backTop from '../backTop'
import Bread from './bread.vue'
import HeadNav from './headNav.vue'
import LeftMenu from './leftMenu.vue'
import inner from './inner.vue'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      password: '',
      groups: [],
      facilityArr: [],
      isCollapse: false,
      currentPage: 'map',
      form: {
        selGroup: '',
        facility: ''
      }
    }
  },

  components: {
    Bread,
    HeadNav,
    LeftMenu,
    backTop,
    inner
  },
  mounted () {
    console.log(this.$route)
    this.currentPage = this.$route.name
    this.getGroups()
  },
  computed: {
    ...mapState(['msg', 'sidebar']),
    username () {
      return this.msg.username
    }
  },
  methods: {
    handleScrollTop () {
      let This = this
      let timer = setInterval(function () {
        let scrollTop = This.$refs.menu_right.scrollTop
        let ispeed = Math.floor(-scrollTop / 8)
        if (scrollTop === 0) {
          clearInterval(timer)
        }
        This.$refs.menu_right.scrollTop = This.$refs.menu_right.scrollTop + ispeed
      }, 30)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goTo (path) {
      this.$router.push(path)
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$router.push('/login')
      } else if (command === 'update') {
        this.dialogFormVisible = true
      }
    },
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
    async getGroups () {
      this.groups = await selectGroup(this.msg.userid)
    },
    async getFacility () {
      this.facilityArr = await selectGroupFacility(this.form.selGroup)
    },
    chooseBid () {
      this.$store.dispatch('getBid', this.form.facility)
      this.$store.dispatch('getGroup', this.form.selGroup)
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer{
    background-color: #b1b9bb;
    color: #333;
    line-height: 60px;
  }
.el-menu {
  border:none;
}
  .el-aside {
    color: #333;
  }
  .mar_r10 {
    margin-right:10px;
  }
  .public {
    font-weight: 700; font-size: 14px;
  }
  #app {
    background-color: #e4eaec;
  }
  .el-footer {
    margin-left: 150px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
