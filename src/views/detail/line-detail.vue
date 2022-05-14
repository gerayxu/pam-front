<template>
  <el-container class="data-detail">
    <el-header class="data-detail-header">
      <div class="data-detail-label">{{meta.title}}: {{lineCode}}</div>
    </el-header>
    <el-main>
      <product-table :line-code="lineCode.toString()"/>
      <lines-batch-table/>
      <chains-table :line-code="lineCode.toString()"/>
    </el-main>
  </el-container>
</template>

<script>

import LinesBatchTable from "@/components/pam/lines/lines-batch-table";
import ProductTable from "@/components/pam/product-table";
import ChainsTable from "@/components/pam/chains-table";

export default {
  name: "line-detail",
  components: {ChainsTable, ProductTable, LinesBatchTable},
  data() {
    return {
      meta: this.$route.meta,
      lineCode: this.$route.params.id,
    }
  },
}
</script>

<style>
</style>