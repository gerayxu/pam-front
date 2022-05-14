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
        <el-table-column prop="roleName" label="角色" width="120"></el-table-column>
        <el-table-column label="权限">
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 0)" disabled>ReadUser</el-checkbox>
              <el-checkbox :value="checked(scope.row.power, 1 << 1)" disabled>WriteUser</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 2)" disabled>ReadRole</el-checkbox>
              <el-checkbox :value="checked(scope.row.power, 1 << 3)" disabled>WriteRole</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 4)" disabled>ReadMeta</el-checkbox>
              <el-checkbox :value="checked(scope.row.power, 1 << 5)" disabled>WriteMeta</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 6)" disabled>ReadTask</el-checkbox>
              <el-checkbox :value="checked(scope.row.power, 1 << 7)" disabled>WriteTask</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 8)" disabled>ReadLine</el-checkbox>
              <el-checkbox :value="checked(scope.row.power, 1 << 9)" disabled>WriteLine</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 10)" disabled>ReadChain</el-checkbox>
              <el-checkbox :value="checked(scope.row.power, 1 << 11)" disabled>WriteChain</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-checkbox :value="checked(scope.row.power, 1 << 12)" disabled>ReadLog</el-checkbox>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column width="187" fixed="right" label="操作">
          <template slot-scope="props">
            <el-button type="primary" @click="openingEdit(props.row)" :disabled="!can_edit(props.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <edit-role :visible="open_edit" :role="select" @update:toggle="closingEdit"/>
    <add-role :visible="open" @update:toggle="closing"/>
  </el-container>
</template>

<script>
import EditRole from "@/components/role/edit-role";
import AddRole from "@/components/role/add-role";
import {pop} from "@/global/pop";
import {getRoles} from "@/api";
import {mixin} from "@/global/mixin";

export default {
  name: "role-view",
  components: {AddRole, EditRole},
  mixins: [pop, mixin],
  data() {
    return {
      meta: this.$route.meta,
    }
  },
  methods: {
    checked(power, access) {
      return (power & access) > 0
    },
    can_edit(data) {
      return data.roleName !== "super admin"
    }
  },
  mounted() {
    this.handler(getRoles())
  }
}
</script>

<style scoped>

</style>