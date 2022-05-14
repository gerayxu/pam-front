<template>
  <el-menu
      default-active="2"
      class="index-menu"
      @select="jump"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <h2 class="index-menu-title">
      <a href="/">PAM</a>
    </h2>
    <el-submenu class="index-menu-submenu" index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>产销数据</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/pams">产销数据</el-menu-item>
        <el-menu-item index="/chains">供应数据</el-menu-item>
        <el-menu-item index="/lines">生产数据</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu class="index-menu-submenu" index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">工具</span>
      </template>
      <el-menu-item index="/task">定时任务</el-menu-item>
      <el-menu-item index="/meta">元数据配置</el-menu-item>
      <el-menu-item index="/log">日志记录</el-menu-item>
    </el-submenu>
    <el-submenu class="index-menu-submenu" index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">人员管理</span>
      </template>
      <el-menu-item index="/user">人员管理</el-menu-item>
      <el-menu-item index="/role">权限管理</el-menu-item>
    </el-submenu>
    <el-menu-item class="index-menu-item" index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    jump(key) {
      this.$router.push(key).then()
    }
  }
}
</script>

<style>
  .index-menu {
    height: 100%;
    overflow:hidden;
    overflow-y:auto;
  }
  .index-menu-title {
    color: rgb(191, 203, 217);
    cursor: pointer;
  }
  a {
    color: rgb(191, 203, 217)
  }
  a:hover {
    color: rgb(191, 203, 217);
  }
  .index-menu-submenu, .index-menu-item {
    text-align: left;
  }
</style>