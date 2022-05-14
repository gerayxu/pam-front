<template>
  <el-container class="data-detail">
    <el-header class="data-detail-header">
      <div class="data-detail-label">{{meta.title}}: {{chainCode}}</div>
    </el-header>
    <el-main>
      <chains-batch-table/>
      <lines-table :chain-code="chainCode.toString()"/>
    </el-main>
  </el-container>
</template>

<script>

import ChainsBatchTable from "@/components/pam/chains/chains-batch-table";
import LinesTable from "@/components/pam/lines-table";

export default {
  name: "line-detail",
  components: {LinesTable, ChainsBatchTable},
  data() {
    return {
      meta: this.$route.meta,
      chainCode: this.$route.params.id,
    }
  }
}
</script>

<style>
</style>