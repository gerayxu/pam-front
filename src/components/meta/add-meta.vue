<template>
  <el-dialog title="添加元数据" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" :rules="rules" label-width="100px">
      <el-form-item class="add-user-form-input" label="name">
        <el-input v-model="form.name" placeholder="name" prop="name"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="value">
        <el-input v-model="form.value" placeholder="value"/>
      </el-form-item>
      <el-form-item class="add-user-form-input">
        <el-button style="float: right" type="primary" @click="submit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

import {window} from "@/global/window";
import {addMeta} from "@/api";

export default {
  mixins: [window],
  data() {
    return {
      form: {
        name: "",
        value: ""
      },
      rules: {
        name: [
          { required: true, message: 'meta name 不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submit: function () {
      addMeta(this.form).then(resp => {
        if (resp.success) {
          this.$message.success("add meta success")
        } else {
          this.$message.error(resp.error)
        }
        this.$router.go(0)
      })
    }
  }
}
</script>

<style>
.add-user-form-input {
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>