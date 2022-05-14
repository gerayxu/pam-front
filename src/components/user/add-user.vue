<template>
  <el-dialog title="添加用户" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" :rules="rules" label-width="100px">
      <el-form-item class="add-user-form-input" label="username" prop="username">
        <el-input v-model="form.username" placeholder="username"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="password" prop="password">
        <el-input v-model="form.password" placeholder="password"/>
      </el-form-item>
      <el-form-item class="add-user-form-input" label="role">
        <el-select v-model="form.role" placeholder="role" style="width: 100%" filterable>
          <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.roleName"
              :value="role.id">
          </el-option>
        </el-select>
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
import {addUser, getRoles} from "@/api";
import {mixin} from "@/global/mixin";

export default {
  mixins: [window, mixin],
  data() {
    return {
      form: {
        username: "",
        password: "",
        role: "",
      },
      roles: [],
      rules: {
        username: [
          { required: true, message: 'username 不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'password 不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    getTotalRole() {
      getRoles().then(data => {
        this.roles = data.data
      })
    },
    submit() {
      addUser(this.form).then(data => {
        if (data.success) {
          this.$message.success("add user success")
          this.$router.go(0)
        }
      })
    }
  },
  created() {
    this.getTotalRole()
  }
}
</script>

<style>
  .add-user-form-input {
    margin-bottom: 20px;
    margin-right: 20px;
  }
</style>