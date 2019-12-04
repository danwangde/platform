<template>
  <div class="public-padding">
    <el-page-header @back="goBack" content="轮播图片">
    </el-page-header>
    <el-carousel :interval="2000" arrow="always" :autoplay="true" height="338px" style="width: 600px;margin: 0 20px" direction="horizontal" trigger="click" indicator-position="inside">
      <!--arrow="always/never" 切换箭头 :autoplay="false" 是否自动切换 :interval="5000" 自动切换的时间间隔
        indicator-position="outside" none 指示器位置 direction="horizontal/vertical" 走马灯展示的方向
        trigger="hover/click"  Hover 指示器触发/Click 指示器触发
        -->
      <el-carousel-item v-for="url in urls" :key="url" >
        <el-image :src="url" ></el-image>
      </el-carousel-item>
    </el-carousel>
    <hr>
    <el-button type="primary" @click="dialog = true">打开抽屉</el-button>
    <el-drawer
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      :wrapperClosable="false"
      :close-on-press-escape="false"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <!--ltr rtl ttb btt-->
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>

</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1888412554,4235286181&fm=15&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3436609881,606981578&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1636503785,1976017338&fm=15&gp=0.jpg'
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    handleClose (done) {
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            done()
          }, 1000)
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped>
  .el-carousel__item .el-image {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    height: 100%;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__button {
    background-color: #67c23a !important;
  }
  .public-padding {
    padding: 20px;
  }
</style>
