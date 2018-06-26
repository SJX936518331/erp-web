<template>
  <div class="container">
    <h3>财务(往来单位应收付)</h3>
    <P style="text-align:left;">
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </P>
    <Modal v-model="modal1" title="添加部门" @on-ok="ok1" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="部门名称" prop="name" :error="nameError">
          <Input v-model="editForm.name" placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
        </FormItem>
        <FormItem label="部门编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入你的部门编号"></Input>
        </FormItem>
        <FormItem label="部门负责人" prop="people">
          <Select v-model="editForm.people" placeholder="请选择你的部门负责人">
            <Option value="小明">小明</Option>
            <Option value="小红">小红</Option>
            <Option value="小米">小米</Option>
            <Option value="小迷">小迷</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="修改信息" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="部门名称" prop="name" :error="nameError">
          <Input v-model="editForm1.name" placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm1.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
        </FormItem>
        <FormItem label="部门编号" prop="id">
          <Input v-model="editForm1.id" placeholder="请输入你的部门编号"></Input>
        </FormItem>
        <FormItem label="部门负责人" prop="people">
          <Select v-model="editForm1.people" placeholder="请选择你的部门负责人">
            <Option value="小明">小明</Option>
            <Option value="小红">小红</Option>
            <Option value="小米">小米</Option>
            <Option value="小迷">小迷</Option>
          </Select>
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
        name: "",
        beizhu: "",
        id: "",
        people: ""
      },
      editForm1: {
        name: "",
        beizhu: "",
        id: "",
        people: ""
      },
      validate: {
        name: [
          {
            required: true,
            message: "部门名称不能为空",
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
        id: [
          {
            required: true,
            message: "部门编号不能为空",
            trigger: "blur"
          }
        ],
        people: [
          {
            required: true,
            message: "部门负责任人不能为空",
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
          title: "单位编号",
          key: "id"
        },
        {
          title: "单位名称",
          key: "name"
        },
        {
          title: "应收款",
          key: "receivables"
        },
        {
          title: "应付款",
          key: "payable"
        },
        {
          title: "操作",
          key: "action",
          width: 350,
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
                      this.$router.push({
                        name: "finance_detail",
                        params: {
                          name: this.data1[params.index].name,
                          moneyPay: this.data1[params.index].payable
                        }
                      });
                    }
                  }
                },
                "查看明细"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      // var deleteIndex = params.index;
                      // Cookies.set("deleteIndex", deleteIndex);
                      // this.deleteIndex();
                      // if (this.data1.length >= 2) {
                      //   this.data1.splice(params.index, 1);
                      // } else {
                      //   this.$Modal.info({
                      //     title: "提示信息",
                      //     content: "你确定要删除吗？就只剩一条数据了。"
                      //   });
                      // }
                      this.$router.push({
                        name: "receipt"
                      });
                    }
                  }
                },
                "添加收款单"
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
                      // var deleteIndex = params.index;
                      // Cookies.set("deleteIndex", deleteIndex);
                      // this.deleteIndex();
                      // if (this.data1.length >= 2) {
                      //   this.data1.splice(params.index, 1);
                      // } else {
                      //   this.$Modal.info({
                      //     title: "提示信息",
                      //     content: "你确定要删除吗？就只剩一条数据了。"
                      //   });
                      // }
                      this.$router.push({
                        name: "payment"
                      });
                    }
                  }
                },
                "添加付款单"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          index: 1,
          id: "A1",
          name: "红木供应商",
          receivables: 50,
          payable: 100
        },
        {
          index: 2,
          id: "A2",
          name: "张三",
          receivables: 100,
          payable: 200
        },
        {
          index: 3,
          id: "A3",
          name: "家具加工厂",
          receivables: 150,
          payable: 300
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
    test() {
      this.modal1 = true;
    },
    test1() {
      this.modal2 = true;
    },
    ok() {
      if (
        this.editForm1.name == "" ||
        this.editForm1.beizhu == "" ||
        this.editForm1.id == "" ||
        this.editForm1.people == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        Cookies.set("dataIndex1", dataIndex);
        this.data1[dataIndex].name = this.editForm1.name;
        this.data1[dataIndex].beizhu = this.editForm1.beizhu;
        this.data1[dataIndex].id = this.editForm1.id;
        this.data1[dataIndex].people = this.editForm1.people;
        this.$Message.info("修改成功");
        this.editForm1.name = "";
        this.editForm1.beizhu = "";
        this.editForm1.id = "";
        this.editForm1.people = "";
      }
    },
    ok1() {
      if (
        this.editForm.name == "" ||
        this.editForm.beizhu == "" ||
        this.editForm.id == "" ||
        this.editForm.people == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          index: this.data1.length + 1,
          name: this.editForm.name,
          beizhu: this.editForm.beizhu,
          id: this.editForm.id,
          people: this.editForm.people
        });
        this.$Message.info("添加部门成功");
        this.editForm.name = "";
        this.editForm.beizhu = "";
        this.editForm.id = "";
        this.editForm.people = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
