<template>
  <div>
    <el-steps
      :active="activeIndex"
      finish-status="success"
    >
      <el-step
        title="第一步"
        description="基本信息"
      ></el-step>
      <el-step
        title="第二步"
        description="商品图片"
      ></el-step>
      <el-step
        title="第三部"
        description="商品内容"
      ></el-step>
    </el-steps>

    <el-tabs
      tab-position="left"
      style="height: 200px;"
      v-model="activeName"
    >
      <el-tab-pane
        name='one'
        label="基本信息"
      >基本信息</el-tab-pane>
      <el-tab-pane
        name='two'
        label="商品图片"
      >商品图片</el-tab-pane>
      <el-tab-pane
        name='three'
        label="商品内容"
      >商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1,
      activeName: 'one'

    }
  }
}
</script>

<style>
</style>
