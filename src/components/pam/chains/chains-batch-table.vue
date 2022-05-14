<template>
  <el-table
      class="data-detail-table"
      :data="result"
      border
      :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
    <el-table-column label="供应批次信息">
      <el-table-column
          label="供应批次"
          sortable
          width="187">
        <template slot-scope="scope">
          <a :href="getJump('/chains/batch/', scope.row.batchCode)" style="margin-left: 10px">{{ scope.row.batchCode }}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="supplyCount"
          label="当批供应数量"
          sortable
          width="187">
      </el-table-column>
      <el-table-column
          prop="supplyTime"
          label="供应时间"
          sortable
          width="187">
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import {mixin} from "@/global/mixin";
import {getChainsByChainCode} from "@/api/v2";

export default {
  name: "chains-batch-table",
  mixins: [mixin],
  data() {
    return {
      loading: true,
      chainCode: this.$route.params.id,
      chains: [],
    }
  },
  mounted() {
    this.handler(getChainsByChainCode(this.chainCode))
  }
}
</script>

<style>

</style>