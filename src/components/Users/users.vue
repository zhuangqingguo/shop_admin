<template>

  <div>
    <el-table
      :data="userData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="操作"
      >
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="6"
      :page-size=2
      :current-page=pagenum
      @current-change='changePage'
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userData: [{
        username: '马星星',
        email: 'fie@.com',
        mobile: '1233211234567'
      }],
      total: '',
      pagenum: 1
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    getUserData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        this.userData = res.data.data.users

        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    },
    changePage (currentPage) {
      this.getUserData(currentPage)
    }
  }

}
</script>

<style>
</style>
