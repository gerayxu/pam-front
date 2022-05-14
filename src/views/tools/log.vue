<template>
  <el-container>
    <el-header>
      <div class="data-detail-label">{{meta.title}} TOP 10</div>
    </el-header>
    <el-main>
      <el-card>
        <div v-for="log in this.result" v-bind:key="log.id">
          <el-alert class="log-box" :type="getType(log.type)" :closable="false" :center="false" style="text-align:left">
            {{log["createdTime"]}}<br/> {{log.message}}
          </el-alert>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>

import {getLogs} from "@/api";
import {mixin} from "@/global/mixin";

export default {
  name: "log-view",
  mixins: [mixin],
  data() {
    return {
      meta: this.$route.meta,
      query: {
        size: 10
      },
    }
  },
  methods: {
    getType(type) {
      if (type === 2) {
        return "error"
      }
      if (type === 1) {
        return "warning"
      }
      return "success"
    }
  },
  mounted() {
    this.handler(getLogs(this.query))
  }
}
</script>

<style>
  .log-box {
    margin-bottom: 10px;
  }
</style>