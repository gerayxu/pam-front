<template>
  <el-dialog title="编辑任务" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" label-width="100px" :rules="rules" :ref="form">
      <el-form-item class="add-user-form-input" label="name">
        <el-input v-model="form.name" placeholder="name" disabled/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="url" prop="hook">
        <el-input v-model="form.hook" placeholder="url"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="header">
        <el-input type="textarea" v-model="form.header" placeholder="header"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="cookie">
        <el-input type="textarea" v-model="form.cookie" placeholder="cookie"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="body">
        <el-input type="textarea" v-model="form.body" placeholder="body"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="mapper">
        <el-input type="textarea" v-model="form.mapper" placeholder="mapper"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="cycle" prop="cycle">
        <el-input-number v-model="form.cycle" style="float: left" :min="5"></el-input-number>
        <el-select v-model="form.status" placeholder="状态">
          <el-option :value=0 label="offline"></el-option>
          <el-option :value=1 label="online"></el-option>
        </el-select>
        <el-popover
            placement="top"
            width="160"
            v-model="show">
          <p>建议在添加前测试</p>
          <div style="text-align: right; margin: 0">
            <el-button @click="touch" size="mini" type="text">
              测试
            </el-button>
            <el-button type="primary" size="mini" @click="submit">
              添加
            </el-button>
          </div>
          <el-button slot="reference" type="primary" style="float: right">提交</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

import {editTask, touchTask} from "@/api";
import {window} from "@/global/window";

export default {
  mixins: [window],
  props: {
    task: {
      type: Object,
    }
  },
  data() {
    return {
      form: {
        name: "",
        hook: "",
        method: "",
        header: "",
        cookie: "",
        body: "",
        mapper: "",
        status: "",
        cycle: 5,
      },
      show: false,
      rules: {
        hook: [
          { required: true, message: 'hook 不能为空', trigger: 'blur' },
        ],
        cycle: [
          { required: true, message: '最小周期为 5 秒', trigger: 'blur', min: 5 },
        ],
      }
    }
  },
  methods: {
    submit() {
      editTask(this.form).then(resp => {
        if (resp.success) {
          this.$message.success("add meta success")
          this.$router.go(0)
        }
      })
    },
    touch() {
      touchTask(this.form).then(data => {
        if (data.success) {
          if (data.data === false) {
            this.$notify({
              title: '执行失败',
              message: '请检查相关参数是否配置正确',
              duration: 0
            });
          } else {
            this.$notify({
              title: '执行成功',
              message: data.data,
              duration: 0
            });
          }
        }
      })
    },
  },
  watch: {
    task(newValue, oldValue) {
      if (!this.visible || newValue === oldValue) {
        return
      }
      this.form = this.task
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