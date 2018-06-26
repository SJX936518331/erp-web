<template>
  <div class="container">
    <h3>付款单</h3>
    <p style="color:red;margin:10px 0px 10px 30px;text-align:left" @click="returnIndex">返回</p>
    <p style="text-align:left;">
      <Button style="margin:10px 20px;" @click="test" type="primary">添加付款单</Button>
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </p>
    <Modal v-model="modal1" title="添加付款单" @on-ok="ok1" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入你的单据编号"></Input>
        </FormItem>
        <FormItem label="制单人" prop="people">
          <Input v-model="editForm.people" placeholder="请输入制单人"></Input>
        </FormItem>
        <FormItem label="制单日期" prop="date">
          <Select v-model="editForm.date" placeholder="请选择制单日期">
            <Option value="2018-3-20">2018-3-20</Option>
            <Option value="2018-4-20">2018-4-20</Option>
            <Option value="2018-5-20">2018-5-20</Option>
            <Option value="2018-6-20">2018-6-20</Option>
          </Select>
        </FormItem>
        <FormItem label="收款单位" prop="danwei">
          <Input v-model="editForm.danwei" placeholder="请输入收款单位"></Input>
        </FormItem>
        <FormItem label="付款账号" prop="account">
          <Input v-model="editForm.account" placeholder="请输入付款账号"></Input>
        </FormItem>
        <FormItem label="付款金额" prop="moneyPay">
          <Input v-model="editForm.moneyPay" placeholder="请输入付款金额"></Input>
        </FormItem>
        <FormItem label="账目类型" prop="type">
          <Input v-model="editForm.type" placeholder="请输入账目类型"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="修改付款单信息" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="账目类型" prop="type">
          <Input v-model="editForm1.type" placeholder="请输入账目类型"></Input>
        </FormItem>
        <FormItem label="金额" prop="moneyPay">
          <Input v-model="editForm1.moneyPay" placeholder="请输入金额"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm1.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
        </FormItem>
      </Form>
    </Modal>
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
      editForm: {
        id: "",
        people: "",
        date: "",
        danwei: "",
        account: "",
        moneyPay: "",
        type: "",
        beizhu: ""
      },
      editForm1: {
        date: "",
        id: "",
        status: "",
        payMoney: "",
        beizhu: ""
      },
      validate: {
        id: [
          {
            required: true,
            message: "编号不能为空",
            trigger: "blur"
          }
        ],
        people: [
          {
            required: true,
            message: "制单人不能为空",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "制单日期不能为空",
            trigger: "blur"
          }
        ],
        danwei: [
          {
            required: true,
            message: "收款单位不能为空",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        moneyPay: [
          {
            required: true,
            message: "付款金额不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "账目类型不能为空",
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
      modal2: false,
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
          title: "账目类型",
          key: "type"
        },
        {
          title: "金额",
          key: "moneyPay"
        },
        {
          title: "备注",
          key: "beizhu"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                      var data_index = params.index;
                      this.editForm1.type = this.data1[data_index].type;
                      this.editForm1.moneyPay = this.data1[data_index].moneyPay;
                      this.editForm1.beizhu = this.data1[data_index].beizhu;
                      this.test1();
                      Cookies.set("data_index", data_index);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var deleteIndex = params.index;
                      Cookies.set("deleteIndex", deleteIndex);
                      this.deleteIndex();
                      if (this.data1.length >= 2) {
                        this.data1.splice(params.index, 1);
                      } else {
                        this.$Modal.info({
                          title: "提示信息",
                          content: "你确定要删除吗？就只剩一条数据了。"
                        });
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          index: 1,
          type: "工资支出",
          moneyPay: 1000,
          beizhu: "123"
        },
        {
          index: 2,
          type: "设备维护",
          moneyPay: 10000,
          beizhu: "1234"
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
    },
    test() {
      this.modal1 = true;
    },
    test1() {
      this.modal2 = true;
    },
    ok() {
      if (
        this.editForm1.type == "" ||
        this.editForm1.moneyPay == "" ||
        this.editForm1.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].type = this.editForm1.type;
        this.data1[dataIndex].moneyPay = this.editForm1.moneyPay;
        this.data1[dataIndex].beizhu = this.editForm1.beizhu;
        this.$Message.info("修改付款单信息成功");
        this.editForm1.type = "";
        this.editForm1.moneyPay = "";
        this.editForm1.beizhu = "";
      }
    },
    ok1() {
      if (
        this.editForm.type == "" ||
        this.editForm.moneyPay == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          index: this.data1.length + 1,
          type: this.editForm.type,
          moneyPay: this.editForm.moneyPay,
          beizhu: this.editForm.beizhu
        });
        this.$Message.info("添加付款单成功");
        this.editForm.id = "";
        this.editForm.people = "";
        this.editForm.date = "";
        this.editForm.danwei = "";
        this.editForm.account = "";
        this.editForm.moneyPay = "";
        this.editForm.type = "";
        this.editForm.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
