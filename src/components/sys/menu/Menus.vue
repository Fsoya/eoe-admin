<template>
  <el-row>
    <div class="bar">
      <el-button type="primary" size="small" @click="addSilbing()">兄弟菜单</el-button>
      <el-button type="primary" size="small" @click="addChild()">子菜单</el-button>
      <el-button type="primary" size="small" @click="delNode()">删除</el-button>
    </div>
    <el-col :span="6" class="list">
      <el-tree ref="tree" :data="menus" :props="defaultProps"
               :default-expand-all=true :highlight-current=true :expand-on-click-node=false
               @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="18" class="main">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="selectedMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="selectedMenu.path"></el-input>
        </el-form-item>
        <el-form-item label="排序系数">
          <el-input type="number" v-model.number="selectedMenu.weight"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-select v-model="selectedMenu.icon" placeholder="请选择">
            <el-option
              v-for="item in icons"
              :label="item.name"
              :value="item.pkid">
              <i style="float: left" :class="item.name"></i>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="selectedMenu.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style scoped>
  .bar{
    padding: 10px;
    border-bottom: 1px solid #ababab;
    box-shadow: 0 1px 8px rgba(0, 0, 0, .25);
    position: relative;
  }
  .el-tree{
    border: none;
  }
  .list{
    margin-top: 20px;
    border-right: 1px solid #ababab;
  }
  .main{
    padding: 20px;
  }
</style>
<script>
  import menuApi from '../../../api/menuApi'
  export default {
    data () {
      return {
        findTargetMenu: function (menus, pkid) {
          if (pkid === '0') return menus
          let target = menus.find(menu => menu.pkid === pkid)
          if (target) return target
          for (let i = 0; i < menus.length; i++) {
            if (menus[i].children) {
              let target = this.findTargetMenu(menus[i].children, pkid)
              if (target) return target
            }
          }
        },
        defaultProps: {
          children: 'subMenus',
          label: 'name'
        },
        menus: [],
        icons: [{
          pkid: 'el-icon-arrow-down',
          name: 'el-icon-arrow-down'
        }, {
          pkid: 'el-icon-arrow-left',
          name: 'el-icon-arrow-left'
        }, {
          pkid: 'el-icon-arrow-right',
          name: 'el-icon-arrow-right'
        }, {
          pkid: 'el-icon-arrow-up',
          name: 'el-icon-arrow-up'
        }, {
          pkid: 'el-icon-caret-bottom',
          name: 'el-icon-caret-bottom'
        }, {
          pkid: 'el-icon-caret-left',
          name: 'el-icon-caret-left'
        }, {
          pkid: 'el-icon-caret-right',
          name: 'el-icon-caret-right'
        }, {
          pkid: 'el-icon-caret-top',
          name: 'el-icon-caret-top'
        }, {
          pkid: 'el-icon-check',
          name: 'el-icon-check'
        }, {
          pkid: 'el-icon-circle-check',
          name: 'el-icon-circle-check'
        }, {
          pkid: 'el-icon-circle-close',
          name: 'el-icon-circle-close'
        }, {
          pkid: 'el-icon-circle-cross',
          name: 'el-icon-circle-cross'
        }, {
          pkid: 'el-icon-close',
          name: 'el-icon-close'
        }, {
          pkid: 'el-icon-upload',
          name: 'el-icon-upload'
        }, {
          pkid: 'el-icon-d-arrow-left',
          name: 'el-icon-d-arrow-left'
        }, {
          pkid: 'el-icon-d-arrow-right',
          name: 'el-icon-d-arrow-right'
        }, {
          pkid: 'el-icon-d-caret',
          name: 'el-icon-d-caret'
        }, {
          pkid: 'el-icon-date',
          name: 'el-icon-date'
        }, {
          pkid: 'el-icon-delete',
          name: 'el-icon-delete'
        }, {
          pkid: 'el-icon-document',
          name: 'el-icon-document'
        }, {
          pkid: 'el-icon-edit',
          name: 'el-icon-edit'
        }, {
          pkid: 'el-icon-information',
          name: 'el-icon-information'
        }, {
          pkid: 'el-icon-loading',
          name: 'el-icon-loading'
        }, {
          pkid: 'el-icon-menu',
          name: 'el-icon-menu'
        }, {
          pkid: 'el-icon-message',
          name: 'el-icon-message'
        }, {
          pkid: 'el-icon-minus',
          name: 'el-icon-minus'
        }, {
          pkid: 'el-icon-more',
          name: 'el-icon-more'
        }, {
          pkid: 'el-icon-picture',
          name: 'el-icon-picture'
        }, {
          pkid: 'el-icon-plus',
          name: 'el-icon-plus'
        }, {
          pkid: 'el-icon-search',
          name: 'el-icon-search'
        }, {
          pkid: 'el-icon-setting',
          name: 'el-icon-setting'
        }, {
          pkid: 'el-icon-share',
          name: 'el-icon-share'
        }, {
          pkid: 'el-icon-star-off',
          name: 'el-icon-star-off'
        }, {
          pkid: 'el-icon-star-on',
          name: 'el-icon-star-on'
        }, {
          pkid: 'el-icon-time',
          name: 'el-icon-time'
        }, {
          pkid: 'el-icon-warning',
          name: 'el-icon-warning'
        }, {
          pkid: 'el-icon-delete2',
          name: 'el-icon-delete2'
        }, {
          pkid: 'el-icon-upload2',
          name: 'el-icon-upload2'
        }, {
          pkid: 'el-icon-view',
          name: 'el-icon-view'
        }],
        selectedMenu: {icon: ''}
      }
    },
    created () {
      menuApi.getMenuTree().then(resp => {
        this.menus = resp.body.data
      })
    },
    methods: {
      handleNodeClick (data) {
        this.selectedMenu = data
      },
      onSubmit () {
        console.log(this.selectedMenu)
      },
      addSilbing () {
        if (!this.selectedMenu.pkid) {
          this.$message({
            showClose: true,
            message: '请选择菜单节点',
            type: 'warning'
          })
          return false
        }

        let target = this.findTargetMenu(this.menus, this.selectedMenu.parentId)
        if (Array.isArray(target)) {
          target.push({name: '请输入名称', pkid: Math.random(), parentId: '0'})
        } else {
          target.subMenus.push({name: '请输入名称', pkid: Math.random(), parentId: target.pkid})
        }
      },
      addChild () {
        if (!this.selectedMenu.pkid) {
          this.$message({
            showClose: true,
            message: '请选择菜单节点',
            type: 'warning'
          })
          return false
        }

        if (this.selectedMenu.parentId !== '0') {
          this.$message({
            showClose: true,
            message: '只支持二级菜单',
            type: 'warning'
          })
          return false
        }
        let target = this.findTargetMenu(this.menus, this.selectedMenu.pkid)
        if (!target.subMenus) {
          this.$set(target, 'subMenus', [{name: '请输入名称', pkid: Math.random(), parentId: target.pkid}])
        } else {
          target.subMenus.push({name: '请输入名称', pkid: Math.random(), parentId: target.pkid})
        }
      },
      delNode () {
        if (!this.selectedMenu.pkid) {
          this.$message({
            showClose: true,
            message: '请选择菜单节点',
            type: 'warning'
          })
          return false
        }
        this.$confirm('确认删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          if (this.selectedMenu.parentId !== '0') {
            let target = this.findTargetMenu(this.menus, this.selectedMenu.parentId)
            target.subMenus.splice(target.subMenus.indexOf(this.selectedMenu), 1)
          } else {
            this.menus.splice(this.menus.indexOf(this.selectedMenu), 1)
          }
          this.selectedMenu = {}
        }).catch(() => {
        })
      }
    }
  }
</script>
