<template>
  <el-dialog title="编辑用户" :visible.sync="innerVisible" width="640px">
    <el-form :gutter="20" class="add-user-form" label-width="100px" :rules="rules">
      <el-form-item class="add-user-form-input" label="username" prop="username">
        <el-input v-model="form.username" placeholder="username" disabled/>
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
        <el-button style="float: right" type="primary">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {window} from "@/global/window";
import {getRoles} from "@/api";

export default {
  mixins: [window],
  props: {
    user: {
      type: Object,
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        role: "",
      },
      roles: [{}],
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
  },
  created() {
    this.getTotalRole()
  },
  watch: {
    user(newValue, oldValue) {
      if (!this.visible || newValue === oldValue) {
        return
      }
      console.log(this.user)
      this.form.username = this.user.username
      this.form.role = this.user.role.id
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