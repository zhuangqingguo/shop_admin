<template>
  <div>
    <el-button
      type="success"
      plain
      @click="showAddCatDialog"
    >添加分类</el-button>
    <el-table
      :data="categoriseData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="商品分类"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{scope.row.cat_deleted ? '否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level==0">一级</span>
          <span v-else-if="scope.row.cat_level==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatisible"
    >
      <el-form
        :model="addCatForm"
        label-width="100px"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="addCatForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">

          <!-- 级联选择器 -->
          <el-cascader
            v-model="addCatForm.cat_pid_arr"
            :props="defaultProps2"
            :options="options"
            clearable
          ></el-cascader>

        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAddCatisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoriseData: [{
        cat_name: '',
        cat_deleted: '',
        cat_level: ''
      }],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      dialogAddCatisible: false,
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      options: [],
      defaultProps2: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.loadCategorise()
    this.loadCategorise2()
  },
  methods: {
    // 请求全部商品分类
    async loadCategorise () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)
      this.categoriseData = res.data.data.result
    },
    showAddCatDialog () {
      this.dialogAddCatisible = true
    },
    // 加载分类数据 2级
    async loadCategorise2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.options = res.data.data
    },
    async addCat () {
      // eslint-disable-next-line camelcase
      let { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        this.dialogAddCatisible = false
        this.$message({
          message: '添加商品分类成功',
          type: 'success',
          duration: 800
        })
        this.loadCategorise()
      }
    }

  }
}
</script>

<style>
</style>
