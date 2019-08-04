/*eslint-disable*/
export default {
  data () {
    return {
      rolesData: [{
        roleName: '2016-05-02',
        roleDesc: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogRolesDialogVisible: false,
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: -1
    }
  },
  created () {
    this.getRolesData()
    this.getRightData()
  },
  methods: {
    indexMethod (index) {
      return index
    },
    async getRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    // 请求权限数据
    async getRightData () {
      let res = await this.$axios.get('rights/tree')
      console.log(res)
      this.treeData = res.data.data
    },
    // 每个数据
    showRightsDialog (row) {
      this.dialogRolesDialogVisible = true
      this.roleId = row.id
      console.log(row)
      let idArr = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            idArr.push(item3.id)
          })
        })
      })
      this.$nextTick(() => {
        console.log(this.$refs.tree)
        this.$refs.tree.setCheckedKeys(idArr);
      })
    },
    async assignRight () {

      let key1 = this.$refs.tree.getCheckedKeys()
      let key2 = this.$refs.tree.getHalfCheckedKeys()
      let ridsStr = [...key1, ...key2].toString()

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: ridsStr
      })

      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改授权成功',
          type: 'success',
          duration: 800
        })
        this.getRolesData()
        this.dialogRolesDialogVisible = false
      }
    }
  },

}
