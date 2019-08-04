<template>
  <div>
    <el-button
      type="success"
      plain
      @click="go2AddGoods"
    >添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.add_time | timeFilter()}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [{
        goods_name: '',
        add_time: '',
        goods_number: '',
        upd_time: ''
      }]
    }
  },
  filters: {
    timeFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  created () {
    this.loadGoodsData()
  },
  methods: {
    async loadGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 5
        }
      })
      console.log(res)
      this.goodsData = res.data.data.goods
    },
    go2AddGoods () {
      this.$router.push('/good-add')
    }
  }
}

</script>

<style>
</style>
