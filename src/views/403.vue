<template>
  <el-container class="user-login">
    <el-header class="user-login-label">
      Forbidden
    </el-header>
    <el-main>
      <el-card class="user-login-info" shadow="none">
        <ol>
          <h3>您无权访问该页面</h3>
          <li v-if="this.$route.query.message !== undefined">
            {{this.$route.query.message}}
          </li>
          <li>
            检查是否拥有该权限
          </li>
          <li>
            请向管理员请求权限
          </li>
        </ol>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "forbidden-view"
}
</script>

<style scoped>

</style>