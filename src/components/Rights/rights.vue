<template>
  <div>

    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class=""
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="rightTable"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==0">一级</span>
          <span v-if="scope.row.level==1">二级</span>
          <span v-if="scope.row.level==2">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  data () {
    return {
      rightTable: [{
        authName: 'feifjei',
        path: '1324',
        level: '一级'
      }]
    }
  },
  created () {
    this.getRightData()
  },
  methods: {
    async getRightData () {
      let res = await this.$axios.get('rights/list')
      console.log(res)
      this.rightTable = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
  background: #d4dae0;
  padding-left: 20px;
}
</style>
