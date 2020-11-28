<template>
  <el-dialog
    title="发送更新邮件"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="商品名称" prop="itemId">
        <el-select v-model="form.itemId">
          <el-option
            v-for="(item, index) in itemList"
            :key="index"
            :value="item.id"
            :label="item.itemName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮件内容" prop="updateContent">
        <el-input
          v-model="form.updateContent"
          type="textarea"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    doEdit,
    doAdd,
    getCatList,
    getList,
    sendUpdateMail,
  } from '@/api/itemManagement'

  export default {
    name: 'ItemManagementEdit',
    data() {
      return {
        form: {
          itemId: '',
          updateContent: '',
        },
        rules: {
          itemId: [
            { required: true, trigger: 'change', message: '请输入商品名称' },
          ],
          updateContent: [
            { required: true, trigger: 'blur', message: '请输入更新内容' },
          ],
        },
        itemList: [],
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.getSelectList()
    },
    methods: {
      getSelectList() {
        getList({}).then((res) => {
          this.itemList = res || []
        })
      },
      showSendEmail() {
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
            await sendUpdateMail(this.form)
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
