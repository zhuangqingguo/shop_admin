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
      value1: ''
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    getUserData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        console.log(res)
        this.userData = res.data.data.users

        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
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
    addUser () {
      this.$axios.post('http://localhost:8888/api/private/v1/users', this.addUserForm, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
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
      })
    },
    dialogHide () {
      console.log(324)
      this.$refs.addUserForm.resetFields()
    },
    delUser (id) {
      this.$axios.delete(`users/${id}`, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        console.log(res)

        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 800
          })
          this.getUserData()
        }
      })
    },
    changeStatus (row) {
      // eslint-disable-next-line camelcase
      let { id, mg_state } = row
      // eslint-disable-next-line camelcase
      this.$axios.put(`users/${id}/state/${mg_state}`, null, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '更新状态成功',
            type: 'success',
            duration: 800
          })
        }
      })
    }
  }
}
