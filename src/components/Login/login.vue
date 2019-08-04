<template>

  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span="8">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="startLogin"
          >登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
/* esLint-disabled */
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          this.$message({
            message: '校验失败',
            center: true,
            type: 'error',
            duration: 700
          })
          return
        }

        let res = await this.$axios.post('login', this.loginForm)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '登录成功',
            type: 'success',
            center: true,
            duration: 700
          })

          localStorage.setItem('token', res.data.data.token)

          this.$router.push('/home')
        } else {
          this.$message({
            message: '登录失败',
            type: 'danger',
            center: true,
            duration: 700
          })
        }

        // .then(res => {
        //   console.log(res)
        //   if (res.data.meta.status === 200) {
        //     this.$message({
        //       message: '登录成功',
        //       type: 'success',
        //       center: true,
        //       duration: 700
        //     })

        //     localStorage.setItem('token', res.data.data.token)

        //     this.$router.push('/home')
        //   } else {
        //     this.$message({
        //       message: '登录失败',
        //       type: 'danger',
        //       center: true,
        //       duration: 700
        //     })
        //   }
        // })
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background: #2d434c;
}

.el-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 15px;
}

h1 {
  color: red;
}
</style>
