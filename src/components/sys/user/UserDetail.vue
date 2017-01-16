<template>
  <el-form ref="activeSysUser" :model="activeSysUser" :rules="rules" label-width="80px" style="width: 90%;margin:5% ">
    <el-form-item label="用户名">
      <el-input v-model="activeSysUser.userName"></el-input>
    </el-form-item>
    <el-form-item label="E-mail">
      <el-input v-model="activeSysUser.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="activeSysUser.mobilePhoneNumber"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker type="datetime" placeholder="选择日期" v-model="activeSysUser.createDate" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio-group v-model="activeSysUser.status">
        <el-radio label="normal"></el-radio>
        <el-radio label="string"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<style>
</style>
<script>
//  import { mapGetters } from 'vuex'
  import userApi from '../../../api/userApi'

  export default{
    data () {
      return {
        activeSysUser: {},
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      if (this.$route.params.id !== 'create') {
        userApi.queryById(this.$route.params.id).then((resp) => {
          this.activeSysUser = resp.data
        })
      } else {
        this.activeSysUser.status = 'string'
        this.activeSysUser.createDate = new Date()
      }
    },
    methods: {
      onSubmit () {
        userApi.save(this.activeSysUser).then((data) => {
          this.$message({
            showClose: true,
            message: '恭喜你，保存成功'
          })
        })
      },
      cancel () {
        this.$router.push('/user')
      }
    }
  }
</script>
