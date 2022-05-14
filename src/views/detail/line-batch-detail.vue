<template>
  <el-container class="data-detail">
    <el-header class="data-detail-header">
      <div class="data-detail-label">{{meta.title}}: {{batchCode}}</div>
    </el-header>
    <el-main>
      <product-table :line-batch-code="batchCode.toString()"/>
      <lines-table/>
      <chains-table :line-batch-code="batchCode.toString()"/>
    </el-main>
  </el-container>
</template>

<script>

import LinesTable from "@/components/pam/lines/lines-table";
import ProductTable from "@/components/pam/product-table";
import ChainsTable from "@/components/pam/chains-table";

export default {
  name: "batch-detail",
  components: {ChainsTable, ProductTable, LinesTable},
  data() {
    return {
      meta: this.$route.meta,
      batchCode: this.$route.params.id
    }
  }
}
</script>

<style>
</style>