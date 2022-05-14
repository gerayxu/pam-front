<template>
  <el-container class="data-detail">
    <el-header class="data-detail-header">
      <div class="data-detail-label">{{meta.title}}: {{productCode}}</div>
    </el-header>
    <el-main>
      <product-table :product-code="productCode.toString()"/><br/>
      <drawboxs-index/>
      <lines-table :product-code="productCode.toString()"/><br/><br/>
      <chains-table :product-code="productCode.toString()"/>
    </el-main>
  </el-container>
</template>

<script>

import LinesTable from "@/components/pam/lines-table";
import ChainsTable from "@/components/pam/chains-table";
import DrawboxsIndex from "@/components/drawboxs";
import ProductTable from "@/components/pam/product-table";

export default {
  name: "product-detail",
  components: {ProductTable, DrawboxsIndex, ChainsTable, LinesTable},
  data() {
    return {
      meta: this.$route.meta,
      productCode: this.$route.params.id,
    }
  },
}
</script>

<style scoped>

</style>