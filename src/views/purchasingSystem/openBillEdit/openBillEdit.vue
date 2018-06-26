<template>
  <div class="container">
    <h3>采购开单编辑</h3>
    <div style="width:100%;text-align:left;">
      <div style="display:inline-block;width:140px;text-align:left;margin-left:25px;margin-right:10px;">
        <label>单号:</label>
        <div style="width:100px;display:inline-block;height:60px;">
          <Form ref="editForm" :model="editForm" :rules="validate">
            <FormItem prop="odd">
              <Input v-model="editForm.odd" placeholder="请输入单号"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <span style="color:black;margin-right:20px;">制单人:&nbsp;张三</span>
      <div style="display:inline-block;;width:250px;text-align:left;">
        <label>制单日期:</label>
        <div style="display:inline-block;height:60px;">
          <Form ref="editForm" :model="editForm" :rules="validate">
            <FormItem prop="date">
              <Select style="text-align:left" v-model="editForm.date" placeholder="请选择制单日期">
                <Option value="">请选择</Option>
                <Option value="2018-3-1">2018-3-1</Option>
                <Option value="2018-4-1">2018-4-1</Option>
                <Option value="2018-5-1">2018-5-1</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
      </div>
      <div style="text-align:left;margin:10px 0px 10px 15px;">
        <label>供应商:</label>
        <Form style="display:inline-block;width:200px;" ref="editForm" :model="editForm" :rules="validate">
          <FormItem prop="supplier">
            <Select style="text-align:left" v-model="editForm.supplier" placeholder="请选择供应商">
              <Option value="">请选择</Option>
              <Option value="红木家具供应商">红木家具供应商</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:10px 0px 10px 5px;">
        <label>预收金额:</label>
        <Form style="display:inline-block;width:200px;" ref="editForm" :model="editForm" :rules="validate">
          <FormItem prop="advance_money">
            <Input v-model="editForm.advance_money" placeholder="请输入预收金额"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- <can-edit-table refs="table" v-model="data1" :editIncell="true" :columns-list="col"></can-edit-table> -->
    <div style="text-align:left;">
      <Button style="margin:10px 20px;" @click="add" type="primary">添加商品</Button>
    </div>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <p style="text-align:right;padding-right:20px;color:black;">
      <span>合计金额:&nbsp;{{this.moneyC}}</span>
    </p>
    <Modal v-model="modal" title="添加商品" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validateForm">
        <FormItem label="商品编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入商品编号"></Input>
        </FormItem>
        <FormItem label="商品名称" prop="name">
          <Input v-model="editForm.name" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="数量" prop="number">
          <Input v-model="editForm.number" placeholder="请输入数量"></Input>
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
      <div style="text-align:left;margin:10px 0px 10px 25px;">
        <label>部门:</label>
        <Form style="display:inline-block;width:400px;" ref="companyForm" :model="companyForm" :rules="validateForm">
          <FormItem prop="department">
            <Select style="text-align:left" v-model="companyForm.department" placeholder="请选择部门">
              <Option value="">请选择</Option>
              <Option value="销售部">销售部</Option>
              <Option value="财务部">财务部</Option>
              <Option value="技术部">技术部</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:10px 0px 10px 15px;">
        <label>业务员:</label>
        <Form style="display:inline-block;width:400px;" ref="companyForm" :model="companyForm" :rules="validateForm">
          <FormItem prop="people">
            <Select style="text-align:left" v-model="companyForm.people" placeholder="请选择业务员">
              <Option value="">请选择</Option>
              <Option value="张三">张三</Option>
              <Option value="李四">李四</Option>
              <Option value="小明">小明</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:10px 0px 10px 25px;">
        <label>摘要:</label>
        <Form style="display:inline-block;width:400px;" ref="companyForm" :model="companyForm" :rules="validateForm">
          <FormItem prop="abstract">
            <Input v-model="companyForm.abstract" placeholder="请输入摘要"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:left;margin:10px 0px 10px 25px;">
        <label>备注:</label>
        <Form style="display:inline-block;width:400px;" ref="companyForm" :model="companyForm" :rules="validateForm">
          <FormItem prop="beizhu">
            <Input v-model="companyForm.beizhu" placeholder="请输入备注"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
    <p style="text-align:left;padding-left:30px;">
      <Button style="margin:10px 0px;" type="primary" @click="save">保存</Button>
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
        number: null,
        price: null,
        money: null,
        beizhu: "",
        odd: "",
        advance_money: "",
        date: "",
        supplier: ""
      },
      validate: {
        odd: [
          {
            required: true,
            message: "单号不能为空",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "制单人日期不能为空",
            trigger: "blur"
          }
        ],
        supplier: [
          {
            required: true,
            message: "供应商不能为空",
            trigger: "blur"
          }
        ],
        advance_money: [
          {
            required: true,
            message: "预收金额不能为空",
            trigger: "blur"
          }
        ]
      },
      validateForm: {
        id: [
          {
            required: true,
            message: "商品编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "商品名称不能为空",
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
      companyForm: {
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
          title: "商品编号",
          key: "id"
        },
        {
          title: "商品名称",
          key: "name"
        },
        {
          title: "数量",
          key: "number"
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
          number: 1,
          price: 1.0,
          money: 1.0,
          beizhu: ""
        },
        {
          id: "1002",
          name: "普通餐桌",
          number: 2,
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
        this.editForm.odd == "" ||
        this.editForm.date == "" ||
        this.editForm.supplier == "" ||
        this.editForm.advance_money == "" ||
        this.companyForm.abstract == "" ||
        this.companyForm.department == "" ||
        this.companyForm.people == "" ||
        this.companyForm.beizhu == ""
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
      }
    },
    add() {
      this.modal = true;
    },
    moneyCount() {
      this.moneyC = null;
      for (var i = 0; i < this.data1.length; i++) {
        var b = parseInt(this.data1[i].money);
        this.moneyC = this.moneyC + b;
      }
      return this.moneyC;
    },
    ok() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.number == null ||
        this.editForm.price == null ||
        this.editForm.money == null ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          id: this.editForm.id,
          name: this.editForm.name,
          number: this.editForm.number,
          price: this.editForm.price,
          money: this.editForm.money,
          beizhu: this.editForm.beizhu
        });
        this.$Modal.info({
          title: "提示信息",
          content: "添加商品成功"
        });
        this.moneyCount();
        this.editForm.id = "";
        this.editForm.name = "";
        this.editForm.number = null;
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
