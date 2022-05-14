<template>
  <el-container>
    <el-header>
      <span class="data-detail-label" style="float: left;margin-top: 10px">{{meta.title}}</span>
      <el-button style="float: right" type="primary" @click="opening">添加</el-button>
    </el-header>
    <el-main>
      <el-table
          class="data-detail-table"
          :data="result"
          border
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}" >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="role.roleName" label="角色"></el-table-column>
        <el-table-column width="187" fixed="right" label="操作">
          <template slot-scope="props">
            <el-button type="primary" @click="openingEdit(props.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <edit-user :visible="open_edit" :user="select" @update:toggle="closingEdit"/>
    <add-user :visible="open" @update:toggle="closing"/>
  </el-container>
</template>

<script>
import {getUsers} from "@/api";
import AddUser from "@/components/user/add-user";
import EditUser from "@/components/user/edit-user";
import {pop} from "@/global/pop";
import {mixin} from "@/global/mixin";

export default {
  name: "user-view",
  components: {EditUser, AddUser},
  mixins: [pop, mixin],
  data() {
    return {
      meta: this.$route.meta,
    }
  },
  mounted() {
    this.handler(getUsers())
  }
}
</script>

<style scoped>

</style>