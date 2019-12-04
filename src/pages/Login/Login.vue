<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class='titleArea rflex'>
          <img class="logo" :src="logo" alt="小爱admin" v-show="false">
          <span class='title'>结构物监测系统</span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <div class="text-danger wrapper text-center" v-show="loginForm.dangerTitle">
            {{loginForm.dangerTitle}}
          </div>
          <el-form-item prop="username" class="login-item">
            <span class="loginTips"><i class="el-icon-user-solid"></i></span>
            <el-input @keyup.enter.native="submitForm('loginForm')" class="area" type="text" placeholder="用户名"
                      v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <span class="loginTips"><i class="el-icon-lock"></i></span>
            <el-input @keyup.enter.native="submitForm('loginForm')" class="area" type="password" placeholder="密码"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" v-loading="loading"   element-loading-text="登陆中">SIGN IN</el-button>
          </el-form-item>
          <div class="tiparea" v-show="false">
            <p class="wxtip">温馨提示：</p>
            <p class="tip">用户名为：admin/editor<span>(可用于切换权限)</span></p>
            <p class="tip">密码为：123456</p>
          </div>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/img/logo.png'
import {loading, Loading} from 'element-ui'
import {setToken} from '../../utils/utils'
import {LoginIn} from '../../api'

export default {
  data () {
    return {
      logo: logoImg,
      loginForm: {
        username: '',
        password: '',
        dangerTitle: ''
      },
      loading: false,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    submitForm (loginForm) {
      this.loading = true
      this.$refs[loginForm].validate(async (valid) => {
        console.log(valid)
        if (valid) {
          let {loginForm} = this
          console.log(loginForm)
          LoginIn(loginForm.username, loginForm.password).then((result) => {
            this.loading = false
            console.log(result)
            console.log(result.code)
            if (result.code === 1) {
              let msg = result.msg
              setToken('Token', msg)
              this.$store.dispatch('getMsg', msg)
              this.$router.push('/more')
            } else {
              this.loginForm.dangerTitle = result.msg
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .login_page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bridge.jpg) no-repeat center center;
    background-size: 100% 100%;
  }

  .form_contianer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.5);
    width: 370px;
    border-radius: 5px;
    padding: 25px;
    text-align: center;
  }

  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
  }

  .logo {
    width: 40px;
    margin-right: 10px;
  }

  .text-danger{
    color: #FF6C60;
  }
  .title {
    color: #fff;
  }

  .rflex {
    display: flex;
    flex-direction: row;
  }

  .loginForm .el-input__inner {
    padding-left: 30px !important;
    height: 36px !important;
  }

  .loginForm .submit_btn {
    width: 100%;
    padding: 13px 0;
    font-size: 16px;
  }

  .form_contianer .loginForm .loginTips {
    position: absolute;
    left: 10px;
    z-index: 20;
    color: #FF7C1A;
    font-size: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }

  .loginForm .el-button--primary {
    background-color: rgba(31,137,220,0.6);
    border: 1px solid rgba(31,137,220,0.6);
  }
</style>
