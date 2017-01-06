<template>
  <div id="app">

    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  name: 'app',
  computed: mapGetters({
    failed: 'failedInfo'
  }),
  watch: {
    'failed': {
      handler: function (val, oldVal) {
        if (val.show) {
          this.$alert(val.msg, '提示', {
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('hideFailed')
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style>
  @import "../node_modules/font-awesome/css/font-awesome.min.css";
  @import "../node_modules/flex.css/dist/flex.css";
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .2s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0);
    }
  }

  body {
    /*background-color: #324057;*/
    margin: 0px;
    padding: 0px;
    /*background: url(assets/bg1.jpg) center !important;
        background-size: cover;*/
    background: #1e282c;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu--dark .el-menu-item:hover,.el-menu--dark .el-submenu__title:hover {
    background-color: #1c1e21 !important;
  }

</style>
