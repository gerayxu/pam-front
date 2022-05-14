<template>
  <el-container class="user-login">
    <el-header class="user-login-label">
      Setting
    </el-header>
    <el-main>
      <el-card class="user-login-info" shadow="none">
        <ol>
          <li>
            Private Toke: {{this.token}}
          </li>
        </ol>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {userToken} from "@/api";

export default {
  name: "setting-view",
  data() {
    return {
      token: ""
    }
  },
  methods: {
    getToken() {
      userToken().then(data => {
        if (data.success) {
          this.token = data.data
        }
      })
    }
  },
  mounted() {
    this.getToken()
  }
}
</script>

<style>

</style>