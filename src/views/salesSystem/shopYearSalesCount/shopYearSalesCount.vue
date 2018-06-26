<template>
  <div class="container">
    <h3>店铺年度销售统计</h3>
    <div style="text-align:left;">
      <div style="display:inline-block;margin:10px 10px 10px 30px;width:400px;">
        <label>年份:</label>
        <Select style="width:250px;" v-model="endDate" placeholder="请选择年份">
          <Option value="">请选择</Option>
          <Option value="2018">2018</Option>
          <Option value="2017">2017</Option>
        </Select>
        <Button style="margin-left:15px;" @click="search" icon="search" type="primary">查询</Button>
      </div>
    </div>
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
  /* position: absolute;
  bottom: 0px;
  left: 0px; */
  float: right;
  bottom: 0px;
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
// import canEditTable from "./components/canEditTable.vue";
import axios from "axios";
export default {
  // components: {
  //   canEditTable
  // },
  data() {
    return {
      startDate: "",
      endDate: "",
      excelFileName: "123",
      col: [
        {
          title: "店铺编号",
          key: "id"
        },
        {
          title: "店铺名称",
          key: "name"
        },
        {
          title: "月份",
          key: "month"
        },
        {
          title: "订单数",
          key: "number"
        },
        {
          title: "销售额",
          key: "salesVolume"
        }
      ],
      data1: [
        {
          id: "001",
          name: "深圳分店",
          month: 1,
          number: 1,
          salesVolume: 100.0
        },
        {
          id: "002",
          name: "广州分店",
          month: 2,
          number: 2,
          salesVolume: 200.0
        }
      ]
    };
  },
  methods: {
    // getDepartment() {
    //   this.$http.get("/department/all").then(
    //     response => {
    //       let data = response.data;
    //       this.data1 = data.data;
    //       // for (var i = 0; i < this.data1.length; i++) {
    //       //   console.log(this.data1[i].name);
    //       // }
    //       console.log(this.data1);
    //     },
    //     response => {
    //       console.log(response);
    //     }
    //   );
    // },
    search() {},
    cancel() {
      this.$Message.info("你点击了取消");
    },
    exportExcel() {
      table2excel.transform(
        this.$refs.table,
        "hrefToExportTable",
        this.excelFileName
      );
    }
  }
};
</script>
