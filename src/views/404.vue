<template>
  <el-container class="user-login">
    <el-header class="user-login-label">
      Not Found
    </el-header>
    <el-main>
      <el-card class="user-login-info" shadow="none">
        <ol>
          <h3>未找到该页面</h3>
          <li>
            检查输入网址是否正确
          </li>
          <li>
            检查请求参数是否正确
          </li>
        </ol>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "not-found"
}
</script>

<style scoped>

</style>