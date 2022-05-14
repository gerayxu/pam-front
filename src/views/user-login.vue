<template>
  <el-container class="user-login">
    <el-header class="user-login-label">
      登陆
    </el-header>
    <el-main>
      <el-card class="user-login-info" shadow="none">
        <ol>
          <h3>登陆注意事项</h3>
          <li>
            仅能使用平台内置的账号登陆
          </li>
          <li>
            获取账号请咨询管理员
          </li>
        </ol>
      </el-card>
      <el-form ref="form" :model="form" class="user-login-form" label-width="80px">
        <el-form-item class="user-login-form-label">
          <div style="float: left;font-weight: bolder">在此输入账号密码</div>
        </el-form-item>
        <el-form-item class="user-login-form-item" label="账号">
          <el-input v-model="form.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item class="user-login-form-item" label="密码">
          <el-input v-model="form.password" placeholder="password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="user-login-form-submit" type="primary" @click="login">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {authUser} from "@/api";

export default {
  name: "user-login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      authUser(this.form).then(data => {
        if (data.success) {
          this.$router.push("/")
          this.$router.go(0)
        }
      })
    }
  }
}
</script>

<style>
  .user-login-label {
    text-align: left;
    font-size: 20px;
    font-weight: bolder;
  }
  .user-login-form {
    width: 25%;
    position: center;
  }
  .user-login-form-item {
    margin-top: 10px;
  }
  .user-login-form-submit {
    float: left;
  }
  .user-login-info {
    width: 50%;
    margin-left: 25%;
    text-align: left;
    background: #eee;
    color: grey;
    margin-bottom: 80px;
  }
</style>