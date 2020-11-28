<template>
  <div class="itemManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button
          icon="el-icon-message"
          type="primary"
          @click="handleSendEmail"
        >
          发送更新邮件
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.itemName"
              placeholder="请输入商品名称"
              clearable
            />
          </el-form-item>
          <!-- <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item> -->
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="tableList"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="itemName"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="catName"
        label="商品类别"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="sellCounts"
        label="销售数量"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="updateTime"
        label="修改时间"
        :formatter="dateFormatter"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetch-data="fetchData"></edit>
    <sendEmail ref="sendEmail" @fetch-data="fetchData"></sendEmail>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/itemManagement'
  import Edit from './components/ItemManagementEdit'
  import SendEmail from './components/SendEmail'
  import { parseTime } from '@/utils'

  export default {
    name: 'ItemManagement',
    components: { Edit, SendEmail },
    data() {
      return {
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          itemName: '',
        },
      }
    },
    computed: {
      tableList() {
        var vm = this
        var arrList
        arrList = vm.list.filter((o) => {
          var b1 =
            !vm.queryForm.itemName ||
            o.itemName.indexOf(vm.queryForm.itemName) > -1
          return b1
        })
        vm.total = arrList.length
        return arrList.slice(
          (vm.queryForm.pageNo - 1) * vm.queryForm.pageSize,
          vm.queryForm.pageNo * vm.queryForm.pageSize
        )
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleSendEmail() {
        this.$refs['sendEmail'].showSendEmail()
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            await doDelete(row.id)
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true
        getList({})
          .then((res) => {
            this.list = res || []
            this.listLoading = false
          })
          .catch(() => {
            this.listLoading = false
          })
      },
      dateFormatter(row, column, cellValue, index) {
        return parseTime(cellValue, '{y}/{m}/{d} {h}:{i}:{s}')
      },
    },
  }
</script>
