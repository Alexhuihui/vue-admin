<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户" prop="userId">
        <el-select v-model="form.userId">
          <el-option
            v-for="(item, index) in userList"
            :key="index"
            :value="item.id"
            :label="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收件人姓名" prop="recieveName">
        <el-input v-model="form.receiverName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收件人手机" prop="recieveMobile">
        <el-input v-model="form.receiverMobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收件人地址" prop="recieveAddress">
        <el-input v-model="form.receiverAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品" prop="item">
        <el-select v-model="form.itemIdList" multiple placeholder="请选择">
          <el-option
            v-for="(item, index) in itemList"
            :key="index"
            :label="item.itemName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, doAdd, getOrderDetail } from '@/api/orderManagement'
  import { getList } from '@/api/userManagement'
  import { getItemList } from '@/api/itemManagement'

  export default {
    name: 'OrderManagementEdit',
    data() {
      return {
        form: {
          userId: '',
          receiverName: '',
          receiverMobile: '',
          receiverAddress: '',
          totalAmount: '',
          realPayAmount: '',
          postAmount: 0,
          payMethod: 1,
          itemIdList: [],
        },
        rules: {
          receiverName: [
            { required: true, trigger: 'blur', message: '请输入收件人姓名' },
          ],
          receiverMobile: [
            { required: true, trigger: 'blur', message: '请输入收件人手机' },
          ],
          receiverAddress: [
            { required: true, trigger: 'blur', message: '请输入收件人地址' },
          ],
          userId: [
            { required: true, trigger: 'change', message: '请选择用户' },
          ],
          // item: [{ required: true, trigger: 'change', message: '请选择商品' }],
        },
        userList: [],
        itemList: [],
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.getSelectList()
      this.getItemList()
    },
    methods: {
      getSelectList() {
        getList({}).then((res) => {
          this.userList = res || []
        })
      },
      getItemList() {
        getItemList({}).then((res) => {
          this.itemList = res || []
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
    },
  }
</script>
