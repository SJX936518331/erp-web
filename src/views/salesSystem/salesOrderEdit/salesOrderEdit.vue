<template>
  <div class="container">
    <h3>销售单编辑</h3>
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
          <span style="color:red;">*</span>联系电话</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="phoneNumber">
            <Input v-model="salesForm.phoneNumber" placeholder="请输入联系电话"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>送货地址</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="address">
            <Input v-model="salesForm.address" placeholder="请输入送货地址"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>交货日期</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;height:40px;">
        <Form ref="salesForm" :model="salesForm" :rules="validate">
          <FormItem prop="date">
            <Select style="text-align:left" v-model="salesForm.date" placeholder="请选择交货日期">
              <Option value="">请选择</Option>
              <Option value="2018-3-1">2018-3-1</Option>
              <Option value="2018-4-1">2018-4-1</Option>
              <Option value="2018-5-1">2018-5-1</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;margin-bottom:10px;padding-left:20px;">
        <label>中止:</label>
      </div>
      <div style="width:300px;text-align:left;display:inline-block;margin-bottom:10px;">
        <Checkbox v-model="salesForm.ending"></Checkbox>
      </div>
    </div>
    <!-- <can-edit-table refs="table" v-model="data1" :editIncell="true" :columns-list="col"></can-edit-table> -->
    <div style="text-align:left;">
      <Button style="margin:10px 20px;" @click="add" type="primary">添加产品</Button>
    </div>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <p style="text-align:right;padding-right:20px;color:black;">
      <span>合计金额:&nbsp;{{this.moneyC}}</span>
    </p>
    <Modal v-model="modal" title="添加产品" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validateForm">
        <FormItem label="产品编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入产品编号"></Input>
        </FormItem>
        <FormItem label="产品名称" prop="name">
          <Input v-model="editForm.name" placeholder="请输入产品名称"></Input>
        </FormItem>
        <FormItem label="规格" prop="specifications">
          <Input v-model="editForm.specifications" placeholder="请输入规格"></Input>
        </FormItem>
        <FormItem label="单位" prop="danwei">
          <Input v-model="editForm.danwei" placeholder="请输入单位"></Input>
        </FormItem>
        <FormItem label="数量" prop="number">
          <Input v-model="editForm.number" placeholder="请输入数量"></Input>
        </FormItem>
        <FormItem label="原始单价" prop="o_price">
          <Input v-model="editForm.o_price" placeholder="请输入原始单价"></Input>
        </FormItem>
        <FormItem label="单价" prop="price">
          <Input v-model="editForm.price" placeholder="请输入单价"></Input>
        </FormItem>
        <FormItem label="金额" prop="money">
          <Input v-model="editForm.money" placeholder="请输入金额"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入备注"></Input>
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
      <Button style="margin:10px 0px;" type="primary" @click="auditing">审核</Button>
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
        id: "",
        name: "",
        specifications: "",
        danwei: "",
        number: "",
        o_price: "",
        price: "",
        money: "",
        beizhu: ""
      },
      validate: {
        customer: [
          {
            required: true,
            message: "客户不能为空",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "送货地址不能为空",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "交货日期不能为空",
            trigger: "blur"
          }
        ]
      },
      validateForm: {
        id: [
          {
            required: true,
            message: "产品编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "产品名称不能为空",
            trigger: "blur"
          }
        ],
        specifications: [
          {
            required: true,
            message: "规格不能为空",
            trigger: "blur"
          }
        ],
        danwei: [
          {
            required: true,
            message: "单位不能为空",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur"
          }
        ],
        o_price: [
          {
            required: true,
            message: "原始单价不能为空",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "单价不能为空",
            trigger: "blur"
          }
        ],
        money: [
          {
            required: true,
            message: "金额不能为空",
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
        phoneNumber: "",
        address: "",
        date: "",
        abstract: "",
        department: "",
        people: "",
        beizhu: "",
        ending: false
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
          title: "产品编号",
          key: "id"
        },
        {
          title: "产品名称",
          key: "name"
        },
        {
          title: "规格",
          key: "specifications"
        },
        {
          title: "单位",
          key: "danwei"
        },
        {
          title: "数量",
          key: "number"
        },
        {
          title: "原始单价",
          key: "o_price"
        },
        {
          title: "单价",
          key: "price"
        },
        {
          title: "金额",
          key: "money"
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
                      if (this.data1.length >= 2) {
                        var money = this.data1[params.index].money;
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
          id: "1001",
          name: "红木餐桌",
          specifications: "",
          danwei: "张",
          number: 1,
          o_price: 1.0,
          price: 1.0,
          money: 1.0,
          beizhu: ""
        },
        {
          id: "1002",
          name: "普通餐桌",
          specifications: "",
          danwei: "张",
          number: 2,
          o_price: 2.0,
          price: 2.0,
          money: 2.0,
          beizhu: ""
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
        this.salesForm.phoneNumber == "" ||
        this.salesForm.address == "" ||
        this.salesForm.date == "" ||
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
        this.salesForm.phoneNumber = "";
        this.salesForm.address = "";
        this.salesForm.date = "";
        this.salesForm.abstract = "";
        this.salesForm.department = "";
        this.salesForm.people = "";
        this.salesForm.beizhu = "";
      }
    },
    auditing() {
      if (
        this.salesForm.customer == "" ||
        this.salesForm.phoneNumber == "" ||
        this.salesForm.address == "" ||
        this.salesForm.date == "" ||
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
          content: "审核已提交，请耐心等候"
        });
        this.salesForm.customer = "";
        this.salesForm.phoneNumber = "";
        this.salesForm.address = "";
        this.salesForm.date = "";
        this.salesForm.abstract = "";
        this.salesForm.department = "";
        this.salesForm.people = "";
        this.salesForm.beizhu = "";
      }
    },
    moneyCount() {
      this.moneyC = null;
      for (var i = 0; i < this.data1.length; i++) {
        var b = parseInt(this.data1[i].money);
        this.moneyC = this.moneyC + b;
      }
      return this.moneyC;
    },
    add() {
      this.modal = true;
    },
    ok() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.specifications == "" ||
        this.editForm.danwei == "" ||
        this.editForm.number == null ||
        this.editForm.o_price == null ||
        this.editForm.price == null ||
        this.editForm.money == null ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          id: this.editForm.id,
          name: this.editForm.name,
          specifications: this.editForm.specifications,
          danwei: this.editForm.danwei,
          number: this.editForm.number,
          o_price: this.editForm.o_price,
          price: this.editForm.price,
          money: this.editForm.money,
          beizhu: this.editForm.beizhu
        });
        this.$Modal.info({
          title: "提示信息",
          content: "添加产品成功"
        });
        this.moneyCount();
        this.editForm.id = "";
        this.editForm.name = "";
        this.editForm.specifications = "";
        this.editForm.danwei = "";
        this.editForm.number = null;
        this.editForm.o_price = null;
        this.editForm.price = null;
        this.editForm.money = null;
        this.editForm.beizhu = "";
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
