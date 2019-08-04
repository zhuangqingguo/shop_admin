export default {
  data () {
    return {
      userData: [{
        username: '马星星',
        email: 'fie@.com',
        mobile: '1233211234567'
      }],
      total: 0,
      pagenum: 1,
      input3: '',
      dialogAddUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '用户名在3-5之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '用户名在5-10之间', trigger: 'blur' }
        ],
        email: [
          { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '格式不正确', trigger: 'blur' }
        ]

      },
      value1: '',
      // 是否弹出修改对话框
      dialogEditUserFormVisible: false,
      editUserForm: {
        username: '星星',
        email: '',
        mobile: ''
      },
      // 是否显示分配角色对话框
      dialogAssignRoleVisible: false,
      assignForm: {
        username: '飞哥',
        id: 0,
        rid: ''
      },
      rolesData: []
    }
  },
  created () {
    this.getUserData()
    this.loadRoleData()
  },
  methods: {
    async getUserData (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get('users', config)
      this.userData = res.data.data.users

      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum

      // .then(res => {
      //   console.log(res)
      //   this.userData = res.data.data.users

      //   this.total = res.data.data.total
      //   this.pagenum = res.data.data.pagenum
      // })
    },
    // 分页
    changePage (currentPage) {
      this.getUserData(currentPage, this.input3)
    },
    // 搜索功能
    search () {
      console.log(this.input3)
      this.getUserData(1, this.input3)
    },
    // 添加对话框
    addUserDialogShow () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加用户成功',
          duration: 800
        })
        // this.$refs.addUserForm.resetFields()
        this.dialogAddUserVisible = false
        this.getUserData()
      }

      //   .then(res => {
      //   if (res.data.meta.status === 201) {
      //     this.$message({
      //       type: 'success',
      //       message: '添加用户成功',
      //       duration: 800
      //     })
      //     // this.$refs.addUserForm.resetFields()
      //     this.dialogAddUserVisible = false
      //     this.getUserData()
      //   }
      // })
    },
    dialogHide () {
      console.log(324)
      this.$refs.addUserForm.resetFields()
    },
    async delUser (id) {
      let res = await this.$axios.delete(`users/${id}`)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 800
        })
        this.getUserData()
      }

      //   .then(res => {
      //   console.log(res)

      //   if (res.data.meta.status === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功',
      //       duration: 800
      //     })
      //     this.getUserData()
      //   }
      // })
    },
    async changeStatus (row) {
      // eslint-disable-next-line camelcase
      let { id, mg_state } = row
      // eslint-disable-next-line camelcase
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`, null)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '更新状态成功',
          type: 'success',
          duration: 800
        })
      }
      //   .then(res => {
      //   console.log(res)
      //   if (res.data.meta.status === 200) {
      //     this.$message({
      //       message: '更新状态成功',
      //       type: 'success',
      //       duration: 800
      //     })
      //   }
      // })
    },
    showEditUserDialog (row) {
      this.dialogEditUserFormVisible = true
      let { email, mobile, username, id } = row
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.username = username
      this.editUserForm.id = id
    },
    async editUser () {
      console.log(this.editUserForm.id)
      let { id, email, mobile } = this.editUserForm
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 800
        })
        this.dialogEditUserFormVisible = false
        this.getUserData(this.pagenum, this.input3)
      }
    },
    // 展示分配角色对话框
    async showAssignRoleDialog (row) {
      console.log(row)
      let { username, id } = row
      this.assignForm.username = username
      this.assignForm.id = id
      this.dialogAssignRoleVisible = true

      // 通过id发送请求 获取rid
      let res = await this.$axios.get(`users/${id}`)
      this.assignForm.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 加载角色
    async loadRoleData () {
      let res = await this.$axios.get('roles')
      this.rolesData = res.data.data
    },
    async assignRole () {
      let { id, rid } = this.assignForm
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      if (res.status === 200) {
        this.dialogAssignRoleVisible = false
        this.$message({
          message: '分配角色成功',
          type: 'success',
          duration: 800
        })
        this.$refs.assignForm.resetFields()
      }
    }

  }
}
