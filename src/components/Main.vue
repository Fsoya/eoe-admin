<template>
  <el-row class="panel">
    <el-col :span="24" class="panel-top">
      <el-col :span="20" style="font-size:26px;">
        <img src="../assets/logo.png" class="logo"> <span>AD<i style="color:#20a0ff">MIN</i></span>
      </el-col>
      <el-col :span="4">
        <el-popover
          ref="popoverMessage"
          placement="bottom"
          title="消息"
          width="200"
          trigger="click"
          content="this is content, this is content, this is content">
        </el-popover>
        <el-popover
          ref="popoverMult"
          placement="bottom"
          title="工具箱"
          width="200"
          trigger="click"
          content="this is content, this is content, this is content">
        </el-popover>
        <el-badge :value="12" class="xxfsitem">
          <el-button type="primary" icon="message" v-popover:popoverMessage style="background-color:transparent;border:none"></el-button>
        </el-badge>
        <el-badge :value="12" class="xxfsitem">
          <el-button type="primary" icon="menu" v-popover:popoverMult style="background-color:transparent;border:none"></el-button>
        </el-badge>

        <el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">
          <!--<i class="logout" v-on:click="logout"></i>-->
          <i class="fa fa-sign-out" aria-hidden="true" @click="signOut"></i>
        </el-tooltip>
      </el-col>
    </el-col>
    <el-col :span="24" style="flex-grow: 1;display: flex">
      <aside style="min-width:230px;min-height:100%">
        <h5 class="admin"><i class="fa fa-user" aria-hidden="true" style="margin-right:5px;"></i>欢迎系统管理员：{{sysUser.name}}</h5>
        <el-menu theme="dark" style="background:#1e282c" :default-active="activeMenu" @open="handleOpen" @close="handleClose" router>
          <el-submenu index="1" v-for="menu in menus">
            <template slot="title"><i class="el-icon-message"></i>{{menu.name}}<el-badge class="mark" value="new"/></template>
            <el-menu-item :index="subMenu.url" v-for="subMenu in menu.subMenus">{{subMenu.name}}<el-badge v-if="subMenu.badge && subMenu.badge > 0" class="mark" :value="subMenu.badge"/></el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>

      <section class="panel-c-c">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="view-main">
            <transition name="fade" mode="out-in" translate>
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
    <footer class="panel-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 2.3.7
      </div>
      <strong>Copyright © 2014-2016 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights
      reserved.
    </footer>
  </el-row>
</template>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .panel {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 900px;
  }

  .panel-top {
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }

  .panel-center {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .panel-c-c {
    background: #f1f2f7;
    overflow-y: scroll;
    flex-grow: 1;
    padding: 10px;
  }

  .view-main{
    background-color:#fff;
    box-sizing: border-box;
    border: 1px solid #c5c5c5;
    -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
    -moz-box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
    box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .panel-footer{
    margin-left: 230px;
    padding: 10px;
    font-size: 12px;
  }

  .logo {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }

  .tip-logout {
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }

  .mark {
    float: right;
    right: 20px;
    margin-top: 4px;
    height: 46px;
  }

  .admin {
    color: #c0ccda;
    text-align: center;
    background: #475863;
    margin: 0px;
    padding: 50px 0;
  }
</style>
<style>
  .xxfsitem sup{
    height: 10px;
    line-height: 10px;
    padding: 0 4px;
    top: 23px !important;
    right: 20px !important;
  }
  .xxfsitem{
    top: -3px;
  }
</style>
<script>
  export default{
    data () {
      return {
        menus: [],
        activeMenu: ''
      }
    },
    created () {
      this.menus = this.sysUser.menus
      let url = window.location.href
      if (url.indexOf('/main') > -1) {
        this.activeMenu = this.menus[0].subMenus[0].url
        this.$router.replace(this.activeMenu)
      } else {
        this.activeMenu = url.split('#')[1]
        this.$router.push(this.activeMenu)
      }
    },
    methods: {
      handleOpen: function () {
      },
      handleClose: function () {
      },
      signOut: function () {
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('signOut')
          this.$router.replace('/')
        }).catch(() => {
        })
      }
    }
  }
</script>
