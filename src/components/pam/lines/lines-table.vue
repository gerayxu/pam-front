<template>
  <el-table
      class="data-detail-table"
      :data="result"
      border
      :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
    <el-table-column label="生产线信息">
      <el-table-column
          label="生产线"
          sortable
          width="187">
        <template slot-scope="scope">
          <a :href="getJump('/lines/', scope.row.lineCode)" style="margin-left: 10px">{{ scope.row.lineCode }}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="productCount"
          label="当批生产数量"
          sortable
          width="187">
      </el-table-column>
      <el-table-column
          prop="stock"
          label="库存"
          sortable
          width="187">
      </el-table-column>
      <el-table-column
          label="产品"
          prop="productName"
          sortable
          width="187">
      </el-table-column>
      <el-table-column
          label="产品编号"
          sortable
          width="187">
        <template slot-scope="scope">
          <a :href="getJump('/products/', scope.row.productCode)" style="margin-left: 10px">{{ scope.row.productCode }}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="produceTime"
          label="生产时间"
          sortable
          width="187">
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import {mixin} from "@/global/mixin";
import {getLinesByBatchCode} from "@/api/v2";

export default {
  name: "lines-table",
  mixins: [mixin],
  data() {
    return {
      batchCode: this.$route.params.id,
    }
  },
  mounted() {
    this.handler(getLinesByBatchCode(this.batchCode))
  }
}
</script>

<style scoped>

</style>