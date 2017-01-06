import { mapGetters } from 'vuex'

export default {
  computed: {
    rights: function () {
      return this.$route.meta.rights
    },
    ...mapGetters({
      sysUser: 'sysUser'
    })
  },
  methods: {
    hasRight: function (rightType) {
      let flag = this.rights.indexOf(rightType) > -1
      return flag
    }
  }
}
