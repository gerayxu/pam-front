<template>
  <el-table
      class="data-detail-table"
      :data="result"
      border
      :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
    <el-table-column label="供应链信息">
      <el-table-column
          label="供应链"
          sortable
          width="187">
        <template slot-scope="scope">
          <a :href="getJump('/chains/', scope.row.chainCode)" style="margin-left: 10px">{{ scope.row.chainCode }}</a>
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
import {getChainsByBatchCode} from "@/api/v2";

export default {
  name: "chains-table",
  mixins: [mixin],
  data() {
    return {
      loading: true,
      batchCode: this.$route.params.id,
      chains: [],
    }
  },
  mounted() {
    this.handler(getChainsByBatchCode(this.batchCode))
  }
}
</script>

<style scoped>

</style>