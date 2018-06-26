<template>
  <div class="container">
    <h3>收款单</h3>
    <p style="color:red;margin:10px 0px 10px 30px;text-align:left" @click="returnIndex">返回</p>
    <p style="text-align:left;">
      <Button style="margin:10px 20px;" @click="test" type="primary">添加收款单</Button>
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </p>
    <Modal v-model="modal1" title="添加收款单" @on-ok="ok1" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="单据日期" prop="date">
          <Select v-model="editForm.date" placeholder="请选择你的单据日期">
            <Option value="2018-3-20">2018-3-20</Option>
            <Option value="2018-4-20">2018-4-20</Option>
            <Option value="2018-5-20">2018-5-20</Option>
            <Option value="2018-6-20">2018-6-20</Option>
          </Select>
        </FormItem>
        <FormItem label="单据编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入你的单据编号"></Input>
        </FormItem>
        <FormItem label="单据状态" prop="status">
          <Select v-model="editForm.status" placeholder="请选择你的单据状态">
            <Option value="完成">完成</Option>
            <Option value="未完成">未完成</Option>
          </Select>
        </FormItem>
        <FormItem label="应收金额" prop="moneyGet">
          <Input v-model="editForm.moneyGet" placeholder="请输入你的应收金额"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="修改收款单" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="单据日期" prop="date">
          <Select v-model="editForm1.date" placeholder="请选择你的单据日期">
            <Option value="2018-3-20">2018-3-20</Option>
            <Option value="2018-4-20">2018-4-20</Option>
            <Option value="2018-5-20">2018-5-20</Option>
            <Option value="2018-6-20">2018-6-20</Option>
          </Select>
        </FormItem>
        <FormItem label="单据编号" prop="id">
          <Input v-model="editForm1.id" placeholder="请输入你的单据编号"></Input>
        </FormItem>
        <FormItem label="单据状态" prop="status">
          <Select v-model="editForm1.status" placeholder="请选择你的单据状态">
            <Option value="完成">完成</Option>
            <Option value="未完成">未完成</Option>
          </Select>
        </FormItem>
        <FormItem label="应收金额" prop="moneyGet">
          <Input v-model="editForm1.moneyGet" placeholder="请输入你的应收金额"></Input>
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
        date: "",
        id: "",
        status: "",
        moneyGet: "",
        beizhu: ""
      },
      editForm1: {
        date: "",
        id: "",
        status: "",
        moneyGet: "",
        beizhu: ""
      },
      validate: {
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
        status: [
          {
            required: true,
            message: "单据状态不能为空",
            trigger: "blur"
          }
        ],
        moneyGet: [
          {
            required: true,
            message: "应收金额不能为空",
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
          title: "单据日期",
          key: "date"
        },
        {
          title: "单据编号",
          key: "id"
        },
        {
          title: "单据状态",
          key: "status"
        },
        {
          title: "应收金额",
          key: "moneyGet"
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
                      this.editForm1.date = this.data1[data_index].date;
                      this.editForm1.id = this.data1[data_index].id;
                      this.editForm1.status = this.data1[data_index].status;
                      this.editForm1.moneyGet = this.data1[data_index].moneyGet;
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
          date: "2018-3-20",
          id: "001",
          status: "完成",
          moneyGet: 1100,
          beizhu: "123"
        },
        {
          index: 2,
          date: "2018-4-20",
          id: "002",
          status: "未完成",
          moneyGet: 1200,
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
        this.editForm1.date == "" ||
        this.editForm1.id == "" ||
        this.editForm1.status == "" ||
        this.editForm1.moneyGet == "" ||
        this.editForm1.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].date = this.editForm1.date;
        this.data1[dataIndex].id = this.editForm1.id;
        this.data1[dataIndex].status = this.editForm1.status;
        this.data1[dataIndex].moneyGet = this.editForm1.moneyGet;
        this.data1[dataIndex].beizhu = this.editForm1.beizhu;
        this.$Message.info("修改成功");
        this.editForm1.date = "";
        this.editForm1.id = "";
        this.editForm1.status = "";
        this.editForm1.moneyGet = "";
        this.editForm1.beizhu = "";
      }
    },
    ok1() {
      if (
        this.editForm.date == "" ||
        this.editForm.id == "" ||
        this.editForm.status == "" ||
        this.editForm.moneyGet == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          index: this.data1.length + 1,
          date: this.editForm.date,
          id: this.editForm.id,
          status: this.editForm.status,
          moneyGet: this.editForm.moneyGet,
          beizhu: this.editForm.beizhu
        });
        this.$Message.info("添加部门成功");
        this.editForm.date = "";
        this.editForm.id = "";
        this.editForm.status = "";
        this.editForm.moneyGet = "";
        this.editForm.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
