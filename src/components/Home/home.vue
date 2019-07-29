<template>
  <el-container>

    <el-header>
      <h1>我是一只小小鸟</h1>
      Header
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-header {
  background-color: #b3c1cd;
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
