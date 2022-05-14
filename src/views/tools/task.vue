<template>
  <el-container class="data-detail">
    <el-header class="data-detail-header">
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
        <el-table-column
            prop="name"
            label="定时任务"
            fixed
            width="187">
        </el-table-column>
        <el-table-column
            prop="hook"
            label="url"
            :show-overflow-tooltip="true"
            width="187">
        </el-table-column>
        <el-table-column
            prop="method"
            label="请求方法"
            width="187">
        </el-table-column>
        <el-table-column
            prop="header"
            label="请求头"
            :show-overflow-tooltip="true"
            width="187">
        </el-table-column>
        <el-table-column
            prop="cookie"
            label="cookie"
            :show-overflow-tooltip="true"
            width="187">
        </el-table-column>
        <el-table-column
            prop="body"
            label="请求体"
            :show-overflow-tooltip="true"
            width="187">
        </el-table-column>
        <el-table-column
            prop="mapper"
            label="映射规则"
            :show-overflow-tooltip="true"
            width="187">
        </el-table-column>
        <el-table-column
            prop="status"
            label="运行状态"
            width="187">
          <template slot-scope="scope">
            <el-tag :type="getStatusTag(scope.row.status)">{{ getStatus(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="cycle"
            label="周期"
            width="187">
        </el-table-column>
        <el-table-column width="187" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="openingEdit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="exec(scope.row.id)">执行</el-button>
          </template>
        </el-table-column>
        <el-table-column
            prop="lastExec"
            label="上次执行时间"
            fixed="right"
            width="187">
        </el-table-column>
      </el-table>
    </el-main>
    <add-task :visible="open" @update:toggle="closing"/>
    <edit-task :visible="open_edit" :task="select" @update:toggle="closingEdit"/>
  </el-container>
</template>

<script>
import {getTasks, execTask} from "@/api";
import AddTask from "@/components/task/add-task";
import EditTask from "@/components/task/edit-task";
import {pop} from "@/global/pop";
import {mixin} from "@/global/mixin";

export default {
  name: "task-view",
  components: {EditTask, AddTask},
  mixins: [pop, mixin],
  data() {
    return {
      meta: this.$route.meta,
    }
  },
  methods: {
    getStatusTag(status) {
      if (status === 1) {
        return "success"
      }
      return "danger"
    },
    getStatus(status) {
      if (status === 1) {
        return "online"
      }
      return "offline"
    },
    exec(id) {
      execTask(id).then(data => {
        if (data.success) {
          this.$message.success("exec success")
        }
      })
    }
  },
  mounted() {
    this.handler(getTasks())
  }
}
</script>

<style scoped>

</style>