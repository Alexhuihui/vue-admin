<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="订单总价格:">
        {{ form.totalAmount }}
      </el-form-item>
      <el-form-item label="实际支付总价格:">
        {{ form.realPayAmount }}
      </el-form-item>
      <el-form-item label="修改时间:">
        {{ dateFormatter(form.updateTime) }}
      </el-form-item>
      <el-form-item label="邮费:">
        {{ form.postAmount }}
      </el-form-item>
      <el-form-item label="收件人名称:">
        {{ form.receiverName }}
      </el-form-item>
      <el-form-item label="收件人手机号:">
        {{ form.receiverMobile }}
      </el-form-item>
      <el-form-item label="收件人地址:">
        {{ form.receiverAddress }}
      </el-form-item>
      <el-form-item label="订单商品列表:">
        <div
          v-for="(item, index) in form.orderItemsVoList"
          :key="index"
          class=""
        >
          <br />
          商品名称:{{ item.itemName }}
          <br />
          购买数量:{{ item.buyCounts }}
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <!-- <el-button type="primary" @click="save">确 定</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, doAdd, getOrderDetail } from '@/api/orderManagement'
  import { parseTime } from '@/utils'

  export default {
    name: 'OrderManagementEdit',
    data() {
      return {
        form: {
          itemName: '',
          content: '',
          catId: '',
          rootCatId: '',
        },
        rootCatIdList: [],
        catIdList: [],
        title: '详情',
        dialogFormVisible: false,
      }
    },
    created() {
      // this.getSelectList()
    },
    methods: {
      // getSelectList() {
      //   getCatList({}).then((res) => {
      //     this.rootCatIdList = res.filter((o) => {
      //       return o.fatherId == 0
      //     })
      //     this.catIdList = res.filter((o) => {
      //       return o.fatherId != 0
      //     })
      //   })
      // },
      showDetail(row) {
        this.dialogFormVisible = true
        getOrderDetail(row.id).then((res) => {
          this.form = res
        })
      },
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            var handle = this.title == '添加' ? doAdd : doEdit
            await handle(this.form)
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
      dateFormatter(date) {
        return parseTime(date, '{y}/{m}/{d} {h}:{i}:{s}')
      },
    },
  }
</script>
