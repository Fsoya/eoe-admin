<template>
    <div>
      <div class="toolbar">
        <el-button type="primary" v-if="hasRight('add')" @click="showDetail('create')">新增</el-button>
        <el-button type="primary" v-if="hasRight('edit')">修改</el-button>
        <el-button type="primary" v-if="hasRight('del')">删除</el-button>
        <el-button type="primary" v-if="hasRight('query')">查询</el-button>
      </div>
      <el-table :data="sysUsers.results" v-loading="loading">
        <el-table-column prop="pkid" label="ID" width="180"></el-table-column>
        <el-table-column prop="userName" label="User Name" width="180"></el-table-column>
        <el-table-column prop="email" label="E-mail"></el-table-column>
        <el-table-column prop="mobilePhoneNumber" label="Phone Number"></el-table-column>
        <el-table-column label="操作" width="120" inline-template align="center">
          <el-button @click="showDetail(row.pkid)" type="text" size="small">查看详情</el-button>
        </el-table-column>
      </el-table>
      <el-pagination class="page"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="sysUsers.totalRecord">
      </el-pagination>
      <router-view></router-view>
    </div>
</template>
<style scoped>
  .page{
    text-align: right;
    margin: 10px 0px;
  }
</style>
<style>
  .toolbar{
    padding: 10px;
  }
</style>
<script>
  import userApi from '../../../api/userApi'
  import mixin from '../../../mixin/rights'

  export default {
    data () {
      return {
        sysUsers: {},
        loading: false
      }
    },
    mixins: [mixin],
    created () {
      this.loading = true
      userApi.queryAll(1, 10).then((resp) => {
        this.sysUsers = resp.data
        this.loading = false
      })
    },
    methods: {
      handleCurrentChange: function (pageNo) {
        this.loading = true
        userApi.queryAll(pageNo, 10).then((resp) => {
          this.sysUsers = resp.data
          this.loading = false
        })
      },
      showDetail: function (id) {
//        this.$store.dispatch('updateActiveUser', sysUser)
        this.$router.push({name: 'm-u-d', params: {id: id}})
      }
    }
  }
</script>
