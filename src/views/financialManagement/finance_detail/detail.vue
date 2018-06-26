<template>
  <div class="container">
    <h3>应收付明细</h3>
    <p style="text-align:left;color:red;margin:10px 0px 0px 30px;" @click="returnIndex">返回
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </p>
    <p style="color:black;text-align:left;margin-left:30px;">往来单位:
      <span style="color:black">{{this.$route.params.name}}</span>
    </p>
    <p style="text-align:left;color:black;margin:10px 0px 30px 30px;">此前应付余额：{{this.$route.params.moneyPay}}</p>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <p style="float:right;">
      <a title="1">
        <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">1</span>
      </a>
      <a title="2">
        <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">2</span>
      </a>
      <a title="3">
        <span style="padding:5px 10px;background-color:white;color:black;margin:30px 5px;border-radius: 5px;display:inline-block;">3</span>
      </a>
    </p>
    <div class="foot">
      <p>粤Icp备:14276767号 @个人版权所有，侵权必定追究</p>
    </div>
  </div>

</template>
<style>
.container {
  width: 100%;
  height: 100%;
  text-align: center;
}
.container h3 {
  font-size: 24px;
  margin-bottom: 5px;
  display: inline-block;
}
.container p {
  font-size: 18px;
  color: rgb(92, 153, 133);
  margin-top: 5px;
}
.foot {
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  background-color: gray;
  /* 固定在底部的三种方式 */
  /* 方法1：使用CSS绝对定位
     position:absolute;
     bottom:0px;
     left:0px; */
  /* 方法2：使用CSS固定定位 
     position:fixed;
     bottom:0px;
     left:0px;  */
  /* 方法3：使用Float浮动定位(适用于div是body元素的子元素)
     float:right;
     bottom:0px; */
  /* 固定在顶部的三种方式跟这三种没区别，类似 */
}
.foot p {
  display: inline-block;
  color: white;
  height: 50px;
  line-height: 50px;
}
</style>
<script>
import Cookies from "js-cookie";
import table2excel from "@/libs/table2excel.js";
export default {
  data() {
    return {
      excelFileName: "123",
      danwei: "红木家具厂",
      col: [
        {
          title: "序号",
          key: "index"
        },
        {
          title: "日期",
          key: "date"
        },
        {
          title: "单据编号",
          key: "id"
        },
        {
          title: "单据类型",
          key: "type"
        },
        {
          title: "摘要",
          key: "abstract"
        },
        {
          title: "增加金额",
          key: "moneyAdd"
        },
        {
          title: "减少金额",
          key: "moneySub"
        },
        {
          title: "应付金额",
          key: "moneySub"
        },
        {
          title: "备注",
          key: "beizhu"
        }
      ],
      data1: [
        {
          index: 1,
          date: "2018-3-20",
          id: "001",
          type: "付款单",
          abstract: "变卖【电脑设备等固定资产】",
          moneyAdd: 1000,
          moneySub: 1000,
          beizhu: 123
        },
        {
          index: 2,
          date: "2018-3-22",
          id: "002",
          type: "变卖固资",
          abstract: "变卖【电脑设备等固定资产】",
          moneyAdd: 1500,
          moneySub: 1500,
          beizhu: 1234
        },
        {
          index: 3,
          date: "2018-3-25",
          id: "003",
          type: "资产折旧",
          abstract: "折旧【电脑设备等固定资产】",
          moneyAdd: 1600,
          moneySub: 1600,
          beizhu: 12345
        }
      ]
    };
  },
  methods: {
    exportExcel() {
      table2excel.transform(
        this.$refs.table,
        "hrefToExportTable",
        this.excelFileName
      );
    },
    returnIndex() {
      this.$router.push({
        name: "finance_index"
      });
    }
  }
};
</script>
