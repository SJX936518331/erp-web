<template>
  <div class="container">
    <h3>固定资产</h3>
    <P style="text-align:left;">
      <Button style="margin:10px 20px;" @click="purchase" type="primary">购置</Button>
      <Button style="margin:10px 20px;" @click="sellOff" type="error">变卖</Button>
      <Button style="margin:10px 20px;" @click="depreciation" type="warning">折旧</Button>
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </P>
    <Modal v-model="modal1" title="编辑" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="科目编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入科目编号"></Input>
        </FormItem>
        <FormItem label="科目名称" prop="name">
          <Input v-model="editForm.name" placeholder="请输入科目名称"></Input>
        </FormItem>
        <FormItem label="期初金额" prop="moneyStart">
          <Input v-model="editForm.moneyStart" placeholder="请输入期初金额"></Input>
        </FormItem>
        <FormItem label="期末金额" prop="moneyEnd">
          <Input v-model="editForm.moneyEnd" placeholder="请输入期末金额"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入备注"></Input>
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
          title: "科目编号",
          key: "id"
        },
        {
          title: "科目名称",
          key: "name"
        },
        {
          title: "期初余额",
          key: "moneyStart"
        },
        {
          title: "期末余额",
          key: "moneyEnd"
        },
        {
          title: "备注",
          key: "beizhu"
        },
        {
          title: "操作",
          key: "action",
          width: 250,
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
                      var kemu = this.data1[params.index].name;
                      var moneyStart = this.data1[params.index].moneyStart;
                      Cookies.set("kemu", kemu);
                      Cookies.set("moneyStart", moneyStart);
                      this.$router.push({
                        name: "book"
                      });
                    }
                  }
                },
                "明細账本"
              ),
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
                      this.editForm.id = this.data1[data_index].id;
                      this.editForm.name = this.data1[data_index].name;
                      this.editForm.moneyStart = this.data1[
                        data_index
                      ].moneyStart;
                      this.editForm.moneyEnd = this.data1[data_index].moneyEnd;
                      this.editForm.beizhu = this.data1[data_index].beizhu;
                      Cookies.set("data_index", data_index);
                      this.test();
                    }
                  }
                },
                "編輯"
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
          id: "001",
          name: "电脑设备",
          moneyStart: 1000,
          moneyEnd: 1000,
          beizhu: "123"
        },
        {
          index: 2,
          id: "002",
          name: "固定资产甲",
          moneyStart: 1500,
          moneyEnd: 1500,
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
    purchase() {
      this.$router.push({
        name: "purchase"
      });
    },
    sellOff() {
      this.$router.push({
        name: "sellOff"
      });
    },
    depreciation() {
      this.$router.push({
        name: "depreciation"
      });
    },
    test() {
      this.modal1 = true;
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
