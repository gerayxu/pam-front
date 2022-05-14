<template>
  <el-container>
    <el-main style="padding: 0">
      <el-table
          class="data-table"
          :data="result"
          border
          :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
        <el-table-column width="560" label="生产信息">
          <el-table-column
              label="生产线"
              sortable
              fixed
              width="187">
            <template slot-scope="scope">
              <a :href="getJump('/lines/', scope.row.lineCode)" style="margin-left: 10px">{{ scope.row.lineCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
              label="生产批次"
              sortable
              fixed
              width="187">
            <template slot-scope="scope">
              <a :href="getJump('/lines/batch/', scope.row.lineBatchCode)" style="margin-left: 10px">{{ scope.row.lineBatchCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
              label="供应链"
              sortable
              width="187">
            <template slot-scope="scope">
              <a :href="getJump('/chains/', scope.row.chainCode)" style="margin-left: 10px">{{ scope.row.chainCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
              label="供应批次"
              sortable
              width="187">
            <template slot-scope="scope">
              <a :href="getJump('/chains/batch/', scope.row.chainBatchCode)" style="margin-left: 10px">{{ scope.row.chainBatchCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
              prop="productName"
              label="产品"
              sortable
              width="187">
          </el-table-column>
          <el-table-column
              prop="productCount"
              label="生产数量"
              width="187">
          </el-table-column>
          <el-table-column
              label="供应数量"
              width="187">
            <template slot-scope="scope">
              {{ scope.row.supplyCount === undefined ? 0 : scope.row.supplyCount }}
            </template>
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
              label="生产时间"
              sortable
              width="187">
            <template slot-scope="scope">
              {{ dateFormat(scope.row.produceTime) }}
            </template>
          </el-table-column>
          <el-table-column
              label="供应时间"
              sortable
              width="187">
            <template slot-scope="scope">
              {{ scope.row.supplyTime === undefined ? null : dateFormat(scope.row.supplyTime) }}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer style="margin-top: 30px">
      <el-pagination
          style="float: right"
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
    </el-footer>
  </el-container>
</template>

<script>
import {getLines} from "@/api/v2";
import {paginate} from "@/global/paginate";

export default {
  name: "lines-table",
  mixins: [paginate],
  props: {
    chainCode: {
      type: String,
    },
    chainBatchCode: {
      type: String
    },
    productCode: {
      type: String
    }
  },
  data() {
    return {
      query: {
        lineCode: "",
        lineBatchCode: "",
        chainCode:  this.chainCode,
        chainBatchCode: this.chainBatchCode,
        productCode: this.productCode,
        size: 10,
        desc: true
      },
    }
  },
  methods: {
    getData() {
      this.paginate(getLines(this.query))
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style>

</style>