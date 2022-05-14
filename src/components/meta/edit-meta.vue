<template>
  <el-dialog title="编辑元数据" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" label-width="100px">
      <el-form-item class="add-user-form-input" label="name">
        <el-input v-model="form.name" placeholder="name" disabled/>
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
import {editMeta} from "@/api";

export default {
  mixins: [window],
  props: {
    meta: {
      type: Object,
    }
  },
  data() {
    return {
      form: {
        name: "",
        value: ""
      },
      roles: [{}]
    }
  },
  methods: {
    submit() {
      editMeta(this.form).then(resp => {
        if (resp.success) {
          this.$message.success("add meta success")
        } else {
          this.$message.error(resp.error)
        }
        this.$router.go(0)
      })
    }
  },
  updated() {
    if (this.visible) {
      this.form = this.meta
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