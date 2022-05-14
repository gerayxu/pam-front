<template>
  <el-dialog title="添加任务" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" :rules="rules" label-width="100px">
      <el-form-item class="add-user-form-input" label="name" prop="name">
        <el-input v-model="form.name" placeholder="name"/>
      </el-form-item>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item class="add-user-form-input" label="url">
              <el-select v-model="form.method" placeholder="method">
                <el-option value="GET" label="GET"></el-option>
                <el-option value="POST" label="POST"></el-option>
                <el-option value="PUT" label="PUT"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item class="add-user-form-input" prop="hook" label-width="0">
              <el-input v-model="form.hook" placeholder="url"/>
            </el-form-item>
          </el-col>
        </el-row>
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
        <el-input-number v-model="form.cycle" style="float: left" :min="10"></el-input-number>
        <el-select v-model="form.taskType" placeholder="数据类型" @change="mapperTemplate">
          <el-option :value="0" label="元数据"></el-option>
          <el-option :value="1" label="生产线数据"></el-option>
          <el-option :value="2" label="供应链数据"></el-option>
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

import {addTask, touchTask} from "@/api";
import {window} from "@/global/window";

export default {
  mixins: [window],
  data() {
    return {
      form: {
        name: "",
        hook: "",
        method: "",
        header: "",
        cookie: "",
        body: "",
        mapper: "{\n" + "\"meta_name\": \"data_name\"\n" + "}",
        taskType: 0,
        cycle: 5,
      },
      show: false,
      touchRes: "",
      rules: {
        name: [
          { required: true, message: 'task name 不能为空', trigger: 'blur' },
        ],
        hook: [
          { required: true, message: 'hook 不能为空', trigger: 'blur' },
        ],
        cycle: [
          { required: true, message: '最小周期为 5 秒', trigger: 'blur', min: 10 },
        ],
      }
    }
  },
  methods: {
    submit() {
      addTask(this.form).then(data => {
        if (data.success) {
          this.$message.success("add task success")
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
    mapperTemplate() {
      if (this.form.taskType === 0) {
        this.form.mapper =  "{\n" +
            "  \"field_path\": \"data_path\",\n" +
            "  \"meta_name\": \"data_name\"\n" +
            "}"
      }
      if (this.form.taskType === 1) {
        this.form.mapper = "{\n" +
            "  \"field_path\": \"data_path\",\n" +
            "  \"line_code\": \"data_line_code\",\n" +
            "  \"batch_code\": \"data_batch_name\",\n" +
            "  \"product_code\": \"data_product_code\",\n" +
            "  \"product_name\": \"data_product_name\",\n" +
            "  \"product_count\": \"data_product_count\",\n" +
            "  \"produce_time\": \"data_produce_time\"\n" +
            "}"
      }
      if (this.form.taskType === 2) {
        this.form.mapper = "{\n" +
            "  \"line_code\": \"data_line_code\",\n" +
            "  \"field_path\": \"data_path\",\n" +
            "  \"line_batch_code\": \"data_line_batch_code\",\n" +
            "  \"chain_code\": \"data_chain_code\"\n" +
            "  \"chain_batch_code\": \"data_chain_batch_code\",\n" +
            "  \"product_count\": \"data_product_count\",\n" +
            "  \"supply_time\": \"data_supply_time\"\n" +
            "}"
      }
    }
  }
}
</script>

<style>
.add-user-form-input {
  margin-bottom: 20px;
  margin-right: 20px;
}
.prompt-fill-up {
  border: none;
  padding: 0;
}
.prompt-fill-up:hover {

}
</style>