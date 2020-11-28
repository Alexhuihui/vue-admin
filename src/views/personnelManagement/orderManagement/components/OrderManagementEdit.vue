<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="商品名称" prop="itemName">
        <el-input v-model="form.itemName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品内容" prop="content">
        <el-input v-model="form.content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="基础类别" prop="rootCatId">
        <el-select v-model="form.rootCatId">
          <el-option
            v-for="(item, index) in rootCatIdList"
            :key="index"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类别" prop="catId">
        <el-select v-model="form.catId">
          <el-option
            v-for="(item, index) in catIdList"
            :key="index"
            :value="item.id"
            :label="item.name"
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
        rules: {
          itemName: [
            { required: true, trigger: 'blur', message: '请输入商品名称' },
          ],
          content: [
            { required: true, trigger: 'blur', message: '请输入商品内容' },
          ],
          catId: [
            { required: true, trigger: 'change', message: '请输入商品类别' },
          ],
          rootCatId: [
            { required: true, trigger: 'change', message: '请输入基础类别' },
          ],
        },
        rootCatIdList: [],
        catIdList: [],
        title: '',
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
