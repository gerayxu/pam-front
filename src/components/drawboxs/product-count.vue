<template>
  <div id="chartLine" class="line-wrap"></div>
</template>

<script>
import {mixin} from "@/global/mixin";
import * as echarts from 'echarts';
require('echarts/theme/macarons');

export default {
  name: "product-count",
  mixins: [mixin],
  props: {
    productCount: {
      type: Array
    },
    supplyCount: {
      type: Array
    },
    produceTime: {
      type: Array
    }
  },
  watch: {
    produceTime() {
      this.drawLineChart()
    }
  },
  methods: {
    drawLineChart() {
      this.chartLine = echarts.init(this.$el,'shine');// 基于准备好的dom，初始化echarts实例
      let option = {
        tooltip : {
          trigger: 'axis'
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            axisTick: {
              show: false
            },
            data: this.produceTime
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisTick: {
              show: false
            },
            name: '数量',
          }
        ],
        series : [
          {
            name: '产量',
            type: 'line',
            data: this.productCount
          },
          {
            name: '销量',
            type: 'line',
            data: this.supplyCount
          },
        ]
      };
      // 使用刚指定的配置项和数据显示图表
      this.chartLine.setOption(option);
    }
  }
}
</script>

<style>
.line-wrap{
  width:50%;
  height:400px;
}
</style>