<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="index-header">
          <el-breadcrumb-item v-for="item in router" :key="item.index">
            <router-link :to="item.path">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2">
        <el-dropdown style="cursor: pointer" v-if="login" @command="logout">
          <span class="el-dropdown-link">
            {{userinfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link class="index-header-login" to="/login" v-else>
          登陆
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getUserInfo, logout} from "@/api";

export default {
  name: "index-header",
  computed: { router: (vm) => vm.$route.matched },
  data() {
    return {
      login: false,
      userinfo: {
        username: "admin"
      }
    }
  },
  methods: {
    logout() {
      logout().then(data => {
        if (data.success) {
          this.$router.push("/login")
          this.$router.go(0)
        }
      })
    }
  },
  mounted() {
    getUserInfo().then(data => {
      if (data.code === 401 && this.$route.path !== "/login") {
        this.$message.error("请重新登陆")
        this.$router.push("/login")
      } else {
        this.login = true
        this.userinfo = data.data
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
  .index-header-login {
    color: grey;
    text-decoration: none;
  }
</style>