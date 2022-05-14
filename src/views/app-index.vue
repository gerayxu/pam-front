<template>
  <el-container class="index-home">
    <el-aside>
      <index-menu/>
    </el-aside>
    <el-main>
      <index-box/>
    </el-main>
  </el-container>
</template>

<script>
import IndexMenu from "@/components/index-menu";
import IndexBox from "@/components/index-box";
export default {
  name: "app-index",
  components: {IndexBox, IndexMenu}
}
</script>

<style>
  .index-home {
    height: 100%;
  }
</style>