<template>
  <el-dialog
    title="发送通知邮件"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="邮件内容" prop="content">
        <el-input
          v-model="form.content"
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
    sendNotifyMail,
  } from '@/api/itemManagement'

  export default {
    name: 'ItemManagementEdit',
    data() {
      return {
        form: {
          itemId: '',
          content: '',
        },
        rules: {
          content: [
            { required: true, trigger: 'blur', message: '请输入更新内容' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
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
            await sendNotifyMail(this.form)
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
