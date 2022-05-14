<template>
  <el-container>
    <sales-ratio :product-count="productCount" :supply-count="supplyCount" :produce-time="productTime"/>
    <product-count :product-count="productCount" :supply-count="supplyCount" :produce-time="productTime"/>
  </el-container>
</template>

<script>
import SalesRatio from "@/components/drawboxs/sales-ratio";
import ProductCount from "@/components/drawboxs/product-count";
import {getProduct} from "@/api/v2";
import {mixin} from "@/global/mixin";
import {datePipe} from "@/global/utils";

export default {
  name: "drawboxs-index",
  components: {ProductCount, SalesRatio},
  mixins: [mixin],
  data() {
    return {
      productForm: {
        lineCode: "",
        lineBatchCode: "",
        chainCode: "",
        chainBatchCode: "",
        productCode:  this.$route.params.id,
        desc: false
      },
      productCount: [],
      supplyCount: [],
      productTime: []
    }
  },
  watch: {
    loading() {
      this.result.sort(function (a, b) {
        let x = a["produceTime"]
        let y = b["produceTime"]
        return ((x < y) ? -1 : (x > y) ? 1 : 0)
      })
      this.result.forEach(item => {
        this.productCount.push(item["productCount"])
        this.supplyCount.push(item["supplyCount"])
        this.productTime.push(datePipe(item["produceTime"]))
      })
    }
  },
  mounted() {
    getProduct(this.productForm).then(data => {
      if (!data["success"]) {
        return
      }
      this.result = data.data
      this.loading = false
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>