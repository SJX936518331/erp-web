<template>
  <div class="container">
    <h3>销售收款</h3>
    <div style="width:380px;text-align:left;margin-left:30px;">
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>客户</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="customer">
            <Select style="text-align:left" v-model="salesForm.customer" placeholder="请选择客户">
              <Option value="">请选择</Option>
              <Option value="张三">张三</Option>
              <Option value="李四">李四</Option>
              <Option value="晓明">晓明</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>收款类型</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="type">
            <Select style="text-align:left" v-model="salesForm.type" placeholder="请选择收款类型">
              <Option value="">请选择</Option>
              <Option value="待收款">待收款</Option>
              <Option value="应收款">应收款</Option>
              <Option value="已收款">已收款</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>收款账户</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="account">
            <Select style="text-align:left" v-model="salesForm.account" placeholder="请选择收款账户">
              <Option value="">请选择</Option>
              <Option value="0278">0278</Option>
              <Option value="8378">8378</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>预收金额</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="money">
            <Input v-model="salesForm.money" placeholder="请输入预收金额"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- <can-edit-table refs="table" v-model="data1" :editIncell="true" :columns-list="col"></can-edit-table> -->
    <div style="text-align:left;">
      <Button style="margin:10px 20px;" @click="add" type="primary">添加产品</Button>
      <Button style="margin:10px 20px;" @click="exportExcel" type="primary">导出数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </div>
    <p style="color:black;padding:0px 0px 10px 20px;text-align:left;">结算单据:</p>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <p style="text-align:right;padding-right:20px;color:black;">
      <span>合计金额:&nbsp;{{this.moneyC}}</span>
    </p>
    <Modal v-model="modal" title="添加单据" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validateForm">
        <FormItem label="单据日期" prop="date">
          <Select style="text-align:left" v-model="editForm.date" placeholder="请选择单据日期">
            <Option value="">请选择</Option>
            <Option value="2018-03-16 15:04">2018-03-16 15:04</Option>
            <Option value="2018-04-16 15:04">2018-04-16 15:04</Option>
          </Select>
        </FormItem>
        <FormItem label="单号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入单号"></Input>
        </FormItem>
        <FormItem label="总金额" prop="moneyCount">
          <Input v-model="editForm.moneyCount" placeholder="请输入总金额"></Input>
        </FormItem>
        <FormItem label="已结算金额" prop="moneyPayed">
          <Input v-model="editForm.moneyPayed" placeholder="请输入已结算金额"></Input>
        </FormItem>
        <FormItem label="待结算金额" prop="moneyPay">
          <Input v-model="editForm.moneyPay" placeholder="请输入数量"></Input>
        </FormItem>
        <FormItem label="本次结算金额" prop="moneyPay_now">
          <Input v-model="editForm.moneyPay_now" placeholder="请输入原始单价"></Input>
        </FormItem>
      </Form>
    </Modal>
    <div style="width:100%;">
      <p style="text-align:left;padding:10px 0px 10px 25px;">
        <span style="margin-right:20px;color:black;">单号:&nbsp;GZ20180328001</span>
        <span style="margin-right:20px;color:black;">制单人:&nbsp;张三</span>
        <span style="color:black;">制单日期:&nbsp;2018-03-19</span>
      </p>
      <div style="text-align:left;margin:10px 0px 10px 25px;">
        <label>摘要:</label>
        <Form style="display:inline-block;width:400px;" ref="salesForm" :model="salesForm" :rules="validateForm">
          <FormItem prop="abstract">
            <Input v-model="salesForm.abstract" placeholder="请输入摘要"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:100%;text-align:left;">
        <div style="display:inline-block;width:140px;text-align:left;margin-left:25px;margin-right:10px;">
          <label>部门:</label>
          <div style="width:100px;display:inline-block;height:60px;">
            <Form ref="salesForm" :model="salesForm" :rules="validate">
              <FormItem prop="department">
                <Select style="text-align:left" v-model="salesForm.department" placeholder="请选择部门">
                  <Option value="">请选择</Option>
                  <Option value="销售部">销售部</Option>
                  <Option value="财务部">财务部</Option>
                  <Option value="技术部">技术部</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
        </div>
        <div style="display:inline-block;;width:160px;text-align:left;">
          <label>业务员:</label>
          <div style="width:100px;display:inline-block;height:60px;">
            <Form ref="salesForm" :model="salesForm" :rules="validate">
              <FormItem prop="people">
                <Select style="text-align:left" v-model="salesForm.people" placeholder="请选择业务员">
                  <Option value="">请选择</Option>
                  <Option value="张三">张三</Option>
                  <Option value="李四">李四</Option>
                  <Option value="小明">小明</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
        </div>
        <span style="margin-left:10px;color:black;">审核人:&nbsp;张三</span>
        <span style="margin-left:10px;color:black;">分支机构:&nbsp;总部</span>
        <div style="text-align:left;margin:10px 0px 10px 25px;">
          <label>备注:</label>
          <Form style="display:inline-block;width:400px;" ref="salesForm" :model="salesForm" :rules="validateForm">
            <FormItem prop="beizhu">
              <Input v-model="salesForm.beizhu" placeholder="请输入备注"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <p style="text-align:left;padding-left:30px;margin-top:-30px;">
      <Button style="margin:10px 0px;" type="primary" @click="save">保存</Button>
      <Button style="margin:10px 0px;" type="primary" @click="Auditing">审核</Button>
      <Button style="margin:10px 0px;" type="primary" @click="cancel">取消</Button>
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
      moneyC: null,
      modal: false,
      editForm: {
        date: "",
        id: "",
        moneyCount: null,
        moneyPayed: null,
        moneyPay: null,
        moneyPay_now: null
      },
      validate: {
        customer: [
          {
            required: true,
            message: "客户不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "收款类型不能为空",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "收款账户不能为空",
            trigger: "blur"
          }
        ],
        money: [
          {
            required: true,
            message: "预收金额不能为空",
            trigger: "blur"
          }
        ]
      },
      validateForm: {
        date: [
          {
            required: true,
            message: "单据日期不能为空",
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            message: "单据编号不能为空",
            trigger: "blur"
          }
        ],
        moneyCount: [
          {
            required: true,
            message: "总金额不能为空",
            trigger: "blur"
          }
        ],
        moneyPayed: [
          {
            required: true,
            message: "已结算金额不能为空",
            trigger: "blur"
          }
        ],
        moneyPay: [
          {
            required: true,
            message: "待结算金额不能为空",
            trigger: "blur"
          }
        ],
        moneyPay_now: [
          {
            required: true,
            message: "本次结算金额不能为空",
            trigger: "blur"
          }
        ],
        beizhu: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ],
        department: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur"
          }
        ],
        people: [
          {
            required: true,
            message: "业务员不能为空",
            trigger: "blur"
          }
        ],
        abstract: [
          {
            required: true,
            message: "摘要不能为空",
            trigger: "blur"
          }
        ]
      },
      salesForm: {
        customer: "",
        type: "",
        account: "",
        money: "",
        abstract: "",
        department: "",
        people: "",
        beizhu: ""
      },
      excelFileName: "123",
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
          title: "单据日期",
          key: "date"
        },
        {
          title: "单号",
          key: "id"
        },
        {
          title: "总金额",
          key: "moneyCount"
        },
        {
          title: "已结算金额",
          key: "moneyPayed"
        },
        {
          title: "待结算金额",
          key: "moneyPay"
        },
        {
          title: "本次结算金额",
          key: "moneyPay_now"
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
                      if (this.data1.length >= 2) {
                        var money = this.data1[params.index].moneyCount;
                        this.data1.splice(params.index, 1);
                        this.moneyC = this.moneyC - money;
                        this.$Modal.info({
                          title: "提示信息",
                          content: "删除成功"
                        });
                      } else {
                        this.$Modal.info({
                          title: "提示信息",
                          content: "还剩一条数据了，你确定还要删除吗？"
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
          date: "2018-03-16 15:04",
          id: "1001",
          moneyCount: 1.0,
          moneyPayed: 1.0,
          moneyPay: 1.0,
          moneyPay_now: 1.0
        },
        {
          date: "2018-04-16 15:04",
          id: "1002",
          moneyCount: 2.0,
          moneyPayed: 2.0,
          moneyPay: 2.0,
          moneyPay_now: 2.0
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
    save() {
      if (
        this.salesForm.customer == "" ||
        this.salesForm.type == "" ||
        this.salesForm.account == "" ||
        this.salesForm.money == "" ||
        this.salesForm.abstract == "" ||
        this.salesForm.department == "" ||
        this.salesForm.people == "" ||
        this.salesForm.beizhu == ""
      ) {
        this.$Modal.info({
          title: "提示信息",
          content: "请把信息补充完整后，再次点击此按钮"
        });
      } else {
        this.$Modal.info({
          title: "提示信息",
          content: "保存成功"
        });
        this.salesForm.customer = "";
        this.salesForm.type = "";
        this.salesForm.account = "";
        this.salesForm.money = "";
        this.salesForm.abstract = "";
        this.salesForm.department = "";
        this.salesForm.people = "";
        this.salesForm.beizhu = "";
      }
    },
    Auditing() {
      if (
        this.salesForm.customer == "" ||
        this.salesForm.type == "" ||
        this.salesForm.account == "" ||
        this.salesForm.money == "" ||
        this.salesForm.abstract == "" ||
        this.salesForm.department == "" ||
        this.salesForm.people == "" ||
        this.salesForm.beizhu == ""
      ) {
        this.$Modal.info({
          title: "提示信息",
          content: "请把信息补充完整后，再次点击此按钮"
        });
      } else {
        this.$Modal.info({
          title: "提示信息",
          content: "审核已经提交，请耐心等候。。"
        });
      }
    },
    moneyCount() {
      this.moneyC = null;
      for (var i = 0; i < this.data1.length; i++) {
        var b = parseInt(this.data1[i].moneyCount);
        this.moneyC = this.moneyC + b;
      }
      return this.moneyC;
    },
    add() {
      this.modal = true;
    },
    ok() {
      if (
        this.editForm.date == "" ||
        this.editForm.id == "" ||
        this.editForm.moneyCount == null ||
        this.editForm.moneyPayed == null ||
        this.editForm.moneyPay == null ||
        this.editForm.moneyPay_now == null
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          date: this.editForm.date,
          id: this.editForm.id,
          moneyCount: this.editForm.moneyCount,
          moneyPayed: this.editForm.moneyPayed,
          moneyPay: this.editForm.moneyPay,
          moneyPay_now: this.editForm.moneyPay_now
        });
        this.$Modal.info({
          title: "提示信息",
          content: "添加产品成功"
        });
        this.moneyCount();
        this.editForm.date = "";
        this.editForm.id = "";
        this.editForm.moneyCount = null;
        this.editForm.moneyPayed = null;
        this.editForm.moneyPay = null;
        this.editForm.moneyPay_now = null;
      }
    },
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
  },
  mounted: function() {
    this.moneyCount();
  }
};
</script>
