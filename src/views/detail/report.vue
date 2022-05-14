<template>
  <el-container class="user-login">
    <el-header class="user-login-label">
      Report
      <el-button type="primary" style="float: right" @click="downloadExcel">导出为 excel</el-button>
      <el-button type="primary" style="float: right;margin-right: 10px" @click="downloadPDF">导出为 pdf</el-button>
    </el-header>
    <el-main>
      <el-table
          id="report-table"
          :key="refresh"
          class="data-detail-table"
          :data="result"
          border
          style="width: 935px"
          :default-sort = "{prop: 'date', order: 'descending'}" v-loading="loading">
        <el-table-column>
          <template slot="header">
            <el-descriptions class="report-descriptions" title="供应财务报表">
              <el-descriptions-item label="供应链">{{ query.chainCode }}</el-descriptions-item>
              <el-descriptions-item label="供应批次">{{ query.chainBatchCode }}</el-descriptions-item>
              <el-descriptions-item label="生产总额">{{ totalAmount }}</el-descriptions-item>
            </el-descriptions>
          </template>
          <template>
            <el-table-column
                label="产品"
                prop="productName"
                sortable
                width="187">
            </el-table-column>
            <el-table-column
                prop="supplyCount"
                label="销售量"
                sortable
                width="187">
            </el-table-column>
            <el-table-column
                label="产品编号"
                prop="productCode"
                sortable
                width="187">
            </el-table-column>
            <el-table-column
                label="单价"
                prop="price"
                sortable
                width="187">
            </el-table-column>
            <el-table-column
                label="销售额"
                sortable
                width="187">
              <template slot-scope="scope">
                <div class="price-edit" @click="inputTotal(scope.$index)" v-if="hidTotal[scope.$index]">
                  {{ scope.row.total }}
                </div>
                <el-input size="mini" v-model="scope.row.total"
                          @keyup.enter.native="totalEdit(scope.$index, scope.row)"
                          v-else
                />
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>

import {mixin} from "@/global/mixin";
import {getProductsSupplyCount} from "@/api/v2";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "report-view",
  mixins: [mixin],
  data() {
    return {
      query: {
        lineCode: "",
        lineBatchCode: "",
        chainCode: this.$route.query.chainCode,
        chainBatchCode: this.$route.query.chainBatchCode,
        productCode: "",
        size: 10,
        desc: true
      },
      refresh: false,
      totalAmount: 0,
      hidTotal: [false],
    }
  },
  methods: {
    totalEdit(index, row) {
      row.price = (row.total / row.supplyCount).toFixed(2)
      this.totalAmount = 0
      this.result.forEach(data => {
        if (data.total !== undefined) {
          this.totalAmount += parseInt(data.total)
        }
      })
      this.hidTotal[index] = true
      this.refresh = !this.refresh
    },
    inputTotal(index) {
      if (this.hidTotal[index]) {
        this.hidTotal[index] = true
      }
    },
    checkData() {
      for (let i = 0; i < this.result.length; i++) {
        if (this.result[i].total === undefined) {
          this.$message.warning("尚未填写销售额")
          return false
        }
      }
      return true
    },
    downloadExcel() {
      if (!this.checkData()) {
        return
      }
      let workbook = XLSX.utils.table_to_book(document.getElementById('report-table'))
      XLSX.writeFile(workbook, 'report.xlsx');
    },
    downloadPDF() {
      if (!this.checkData()) {
        return
      }
      let element = document.getElementById("report-table");
      html2canvas(element, {
        logging: false
      }).then(function (canvas) {
        // noinspection JSPotentiallyInvalidConstructorUsage
        let pdf = new jsPDF('p', 'mm', 'a4');    //A4纸，纵向
        let ctx = canvas.getContext('2d'),
            a4w = 190, a4h = 277,    //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
            imgHeight = Math.floor(a4h * canvas.width / a4w),    //按A4显示比例换算一页图像的像素高度
            renderedHeight = 0;

        while (renderedHeight < canvas.height) {
          let page = document.createElement("canvas");
          page.width = canvas.width;
          page.height = Math.min(imgHeight, canvas.height - renderedHeight);//可能内容不足一页

          //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
          pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width));    //添加图像到页面，保留10mm边距

          renderedHeight += imgHeight;
          if (renderedHeight < canvas.height)
            pdf.addPage();//如果后面还有内容，添加一个空页
        }

        pdf.save("report.pdf");
      });
    }
  },
  mounted() {
    this.handler(getProductsSupplyCount(this.query))
  }
}
</script>

<style>
 .el-descriptions-item {
   background-color: #F5F7FA;
 }
 .price-edit {
   cursor: pointer;
 }
 .report-descriptions {
   margin-top: 20px;
 }

</style>