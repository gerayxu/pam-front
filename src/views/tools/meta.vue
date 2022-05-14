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
        <el-table-column prop="name" label="元数据"></el-table-column>
        <el-table-column prop="value" label="当前值"></el-table-column>
        <el-table-column width="187" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="openingEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <add-meta :visible="open" @update:toggle="closing"/>
    <edit-meta :visible="open_edit" :meta="select" @update:toggle="closingEdit"/>
  </el-container>
</template>

<script>
import AddMeta from "@/components/meta/add-meta";
import EditMeta from "@/components/meta/edit-meta";
import {pop} from "@/global/pop";
import {getMetas} from "@/api";
import {mixin} from "@/global/mixin";

export default {
  name: "task-view",
  components: {EditMeta, AddMeta},
  mixins: [pop, mixin],
  data() {
    return {
      meta: this.$route.meta,
    }
  },
  mounted() {
    this.handler(getMetas())
  }
}
</script>

<style scoped>

</style>