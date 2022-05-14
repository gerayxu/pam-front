<template>
  <el-container>
    <el-header height="150px">
      <el-row :gutter="20" class="data-searchable-form">
        <el-col :span="8">
          <el-input v-model="query.lineCode" placeholder="line code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="query.lineBatchCode" placeholder="line batch code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="query.productCode" placeholder="product code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="data-searchable-form">
        <el-col :span="8">
          <el-input v-model="query.chainCode" placeholder="chain code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="query.chainBatchCode" placeholder="chain batch code">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="6" class="data-page">
          <el-pagination
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
        </el-col>
        <el-col :span="2">
          <el-button type="primary" style="float: right" @click="getData">提交</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
          class="data-table"
          :data="result"
          border
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
        <el-table-column
            label="生产线"
            sortable
            width="186">
          <template slot-scope="scope">
            <a :href="getJump('/lines/', scope.row.lineCode)" style="margin-left: 10px">{{ scope.row.lineCode }}</a>
          </template>
        </el-table-column>
        <el-table-column
            label="生产批次"
            sortable
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
            label="供应数量"
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
        <el-table-column
            prop="supplyTime"
            label="供应时间"
            sortable
            width="187">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {getPsms} from "@/api/v2";
import {paginate} from "@/global/paginate";

export default {
  name: "pam-view",
  mixins: [paginate],
  data() {
    return {
      query: {
        lineCode: "",
        lineBatchCode: "",
        chainCode: "",
        chainBatchCode: "",
        productCode: "",
        size: 10,
        desc: true
      },
    }
  },
  methods: {
    getData() {
      this.paginate(getPsms(this.query))
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style>
</style>