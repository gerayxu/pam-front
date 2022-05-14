<template>
  <el-container class="data-detail">
    <el-header class="data-detail-header">
      <div class="data-detail-label">{{meta.title}}: {{batchCode}}</div>
    </el-header>
    <el-main>
      <chains-table/>
      <lines-table :chain-batch-code="batchCode.toString()"/>
    </el-main>
  </el-container>
</template>

<script>

import ChainsTable from "@/components/pam/chains/chains-table";
import LinesTable from "@/components/pam/lines-table";

export default {
  name: "batch-detail",
  components: {LinesTable, ChainsTable},
  data() {
    return {
      meta: this.$route.meta,
      batchCode: this.$route.params.id,
    }
  },
}
</script>

<style>
</style>