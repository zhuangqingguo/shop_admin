<template>
  <el-container>

    <el-header>
      <el-row type="flex">
        <el-col :span="8">
          <img
            src="../../assets/images/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          愿世界和平 <a
            href="#"
            @click.prevent="logOut"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logOut () {
      this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功',
          center: true,
          duration: 700
        })

        localStorage.removeItem('token')

        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          center: true,
          duration: 800
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #b3c1cd;
  padding: 0;
  h1 {
    line-height: 60px;
    color: #fff;
    text-align: center;
    font-size: 28px;
  }
  .col3 {
    line-height: 60px;
    text-align: right;
    padding-right: 30px;

    a {
      color: cyan;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
.el-container {
  height: 100%;
}
</style>
