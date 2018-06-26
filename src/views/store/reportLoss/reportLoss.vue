<template>
  <div class="container">
    <h3>报损单</h3>
    <div class="margin-left-10 margin-top-20" style="text-align:left;">
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
      <Button style="margin:0px 10px 20px 20px;" @click="test" type="primary">添加报损单</Button>
      <Button style="margin:0px 10px 20px 20px;" type="primary" size="large" @click="exportExcel">导出表格数据</Button>
      <!-- <Button style="margin:0px 10px 20px 20px;" type="primary" size="large" @click="getDepartment">调用接口</Button> -->
    </div>
    <!-- <can-edit-table refs="table" v-model="data1" :editIncell="true" :columns-list="col"></can-edit-table> -->
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
// import canEditTable from "./components/canEditTable.vue";
import axios from "axios";
export default {
  // components: {
  //   canEditTable
  // },
  data() {
    return {
      excelFileName: "123",
      col: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "调入仓库",
          key: "transferInWarehouse"
        },
        {
          title: "调出仓库",
          key: "callOutWarehouse"
        },
        {
          title: "摘要",
          key: "abstract"
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        title: "查看",
                        content: `日期:${this.data1[params.index].date}<br>
                        调入仓库:${
                          this.data1[params.index].transferInWarehouse
                        }<br>
                        调出仓库:${
                          this.data1[params.index].callOutWarehouse
                        }<br>
                        摘要:${this.data1[params.index].abstract}`
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          date: "2018-03-16 15:04",
          transferInWarehouse: "天河总仓",
          callOutWarehouse: "深圳分仓",
          abstract: "12"
        },
        {
          date: "2018-03-17 15:04",
          transferInWarehouse: "深圳分仓",
          callOutWarehouse: "天河总仓",
          abstract: "123"
        }
      ]
    };
  },
  methods: {
    test() {
      // this.show1();

      // var obj = this.$route.params;
      // this.saveArray.push(obj);
      this.$router.push({
        name: "reportLossEdit",
      });
    },
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
