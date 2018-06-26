<template>
  <div class="container">
    <h3>明细账本</h3>
    <P style="text-align:left;">
      <span style="color: red;font-size:18px;margin:10px" @click="back">返回</span>
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
      <br>
      <span style="color:black;font-size:18px;margin:10px">会计科目:&nbsp;{{kemu}}</span><br>
      <span style="color:black;font-size:18px;margin:10px">期初余额:&nbsp;{{moneyStart}}</span>
    </P>
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
      kemu: Cookies.get("kemu"),
      moneyStart: Cookies.get("moneyStart"),
      editForm: {
        id: "",
        name: "",
        moneyStart: "",
        moneyEnd: "",
        beizhu: ""
      },
      validate: {
        id: [
          {
            required: true,
            message: "科目编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "科目名称不能为空",
            trigger: "blur"
          }
        ],
        moneyStart: [
          {
            required: true,
            message: "期初金额不能为空",
            trigger: "blur"
          }
        ],
        moneyEnd: [
          {
            required: true,
            message: "期末金额不能为空",
            trigger: "blur"
          }
        ],
        beizhu: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      deleteIndex: function() {
        var dataIndex = Cookies.get("deleteIndex");
        for (var i = 0; i < this.data1.length; i++) {
          if (i >= this.data1[dataIndex].index - 1) {
            if (this.data1.length != 1) {
              this.data1[i].index = this.data1[i].index - 1;
            }
          }
        }
      },
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
          key: "moneySubstract"
        },
        {
          title: "金额",
          key: "money"
        },
        {
          title: "备注",
          key: "beizhu"
        }
      ],
      data1: [
        {
          index: 1,
          date: "2018-3-21",
          id: "0121",
          type: "购置固资",
          abstract: "购置【电脑设备】等固定资产",
          moneyAdd: 1000,
          moneySubstract: 1000,
          money: 10000,
          beizhu: "123"
        },
        {
          index: 2,
          date: "2018-3-22",
          id: "0122",
          type: "变卖固资",
          abstract: "变卖【电脑设备】等固定资产",
          moneyAdd: 2000,
          moneySubstract: 1000,
          money: 20000,
          beizhu: "1234"
        },
        {
          index: 3,
          date: "2018-3-23",
          id: "0123",
          type: "资产折旧",
          abstract: "折旧【电脑设备】等固定资产",
          moneyAdd: 3000,
          moneySubstract: 1500,
          money: 30000,
          beizhu: "12345"
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
    back() {
      this.$router.push({
        name: "asset"
      });
    },
    ok() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.moneyStart == "" ||
        this.editForm.moneyEnd == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].id = this.editForm.id;
        this.data1[dataIndex].name = this.editForm.name;
        this.data1[dataIndex].moneyStart = this.editForm.moneyStart;
        this.data1[dataIndex].moneyEnd = this.editForm.moneyEnd;
        this.data1[dataIndex].beizhu = this.editForm.beizhu;
        this.$Message.info("修改套餐信息成功");
        this.editForm.id = "";
        this.editForm.name = "";
        this.editForm.moneyStart = "";
        this.editForm.moneyEnd = "";
        this.editForm.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
