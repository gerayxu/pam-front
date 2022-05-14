<template>
  <el-container class="index-box">
    <el-header class="index-box-header" height="20">
      <index-header/>
    </el-header>
    <el-divider/>
    <el-main class="index-box-main">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import IndexHeader from "@/components/index-header";
export default {
  name: "index-box",
  components: {IndexHeader}
}
</script>

<style>
  .index-box-header {
    border-bottom: black 1px;
  }
</style>