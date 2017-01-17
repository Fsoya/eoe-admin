import { mapGetters } from 'vuex'

export default {
  computed: {
    rights: function () {
      return this.$route && this.$route.meta.rights ? this.$route.meta.rights : []
    },
    ...mapGetters({
      sysUser: 'sysUser'
    })
  },
  methods: {
    hasRight: function (rightType) {
      return this.rights.includes(rightType)
    }
  }
}
