<template>
  <div class="xxbg" v-loading = "loading">
    <div class="login-p">
      <h1 class="xxtil">咻咻IT服务专家</h1>
      <el-form :model="signInForm" :rules="rules" ref="signInForm" label-position="left" label-width="120px" style="margin: 0px auto 0;width: 300px;">
        <el-form-item label="USER" prop="userName">
          <input v-model="signInForm.userName" @keyup.enter="focusNext"/>
        </el-form-item>
        <el-form-item label="PASSWORD" prop="password">
          <input ref="password" v-model="signInForm.password" @keyup.enter="login" type="password"/>
        </el-form-item>
          <div style="text-align: right;margin-top: 15px;">
          <el-button type="info" size="mini" @click="login">Login</el-button>
          <a href="#" class="forget"> ? forget</a>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import userApi from '../api/userApi'

  export default {
    data () {
      return {
        signInForm: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名/手机号', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ]
        },
        loading: false
      }
    },
    methods: {
      focusNext () {
        this.$refs.password.focus()
      },
      login () {
        this.$refs.signInForm.validate((valid) => {
          if (valid) {
            this.loading = true
            userApi.signIn(this.signInForm.userName, this.signInForm.password).then((resp) => {
              this.loading = false
              window.sessionStorage.setItem('token', resp.body.data.token)
              this.$store.dispatch('signIn', resp.body.data)
              this.$router.push('/main')
            },
            (resp) => { this.loading = false })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .xxbg{
    background: #bababa;
    height: 100%;
    display: flex;
  }

  .xxtil{
    margin: 10px;
    color: #fff;
    text-align: center;
  }

  .login-p{
    width: 400px;
    height: 200px;
    background: rgba(0,0,0,0.6);
    margin: auto;
  }

  .login-p input{
    background: transparent;
    width: 90%;
    color: #fff;
    border: solid #fff 1px;
    line-height: 20px;
    text-indent: 10px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .forget{
    color:grey;
    margin: 0 16px 0px 5px;
    font-size: 12px;
    vertical-align: bottom;
  }
</style>
<style>
  .login-p label{
    color: #fff;
  }
  .el-loading-mask {
    background-color: rgba(0,0,0,.5);
  }
</style>
