<template>
  <el-table
      class="data-detail-table"
      :data="result"
      border
      :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
    <el-table-column label="产品信息">
      <el-table-column
          label="产品"
          prop="productName"
          sortable
          width="187">
      </el-table-column>
      <el-table-column
          prop="productCount"
          label="当批生产数量"
          sortable
          width="187">
      </el-table-column>
      <el-table-column
          prop="supplyCount"
          label="销售"
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
    </el-table-column>
    <el-table-column align="right" width="560">
      <template slot="header">
          <el-pagination
              style="float: left"
              :current-page.sync="page"
              background
              :page-sizes="[10, 20, 30, 40]"
              @size-change="sizeChange"
              @prev-click="prevChick"
              @next-click="nextChick"
              :page-size="this.query.size"
              :total="total"
              layout="prev, sizes, jumper, next">
          </el-pagination>
        </template>
      <el-table-column label="产销率" width="560">
        <template slot-scope="scope">
          {{ scope.row.supplyCount / scope.row.productCount * 100 }}%
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import {getProductsByLine} from "@/api/v2";
import {paginate} from "@/global/paginate";

export default {
  name: "product-table",
  mixins: [paginate],
  props: {
    lineCode: {
      type: String,
    },
    lineBatchCode: {
      type: String
    },
    productCode: {
      type: String
    }
  },
  data() {
    return {
      query: {
        lineCode: this.lineCode,
        lineBatchCode: this.lineBatchCode,
        chainCode: "",
        chainBatchCode: "",
        productCode: this.productCode,
        size: 10,
        offset: 0,
        desc: true
      },
    }
  },
  mounted() {
    this.paginate(getProductsByLine(this.query))
  }
}
</script>

<style scoped>

</style>