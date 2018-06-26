<template>
  <div class="container">
    <h3>固定资产折旧</h3>
    <P style="text-align:left;">
      <Button style="margin:10px 20px;" type="primary" @click="exportExcel">导出表格数据</Button>
      <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    </P>
    <div style="width:380px;text-align:left;margin-left:30px;">
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>编号</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" v-model="id" placeholder="GL-01287288228"></Input>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>制单人</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" v-model="people" placeholder="请输入制单人"></Input>
      </div>
      <div style="width:70px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>制单日期</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Select style="text-align:left;" v-model="date" placeholder="请选择制单日期">
          <Option value="2018-3-1">2018-3-1</Option>
          <Option value="2018-4-1">2018-4-1</Option>
          <Option value="2018-5-1">2018-5-1</Option>
        </Select>
      </div>
      <div style="width:60px;text-align:left;display:inline-block;">
        <label>
          <span style="color:red;">*</span>备注</label>
      </div>
      <div style="width:300px;text-align:right;display:inline-block;">
        <Input style="margin:10px;" type="textarea" v-model="beizhu" placeholder="请输入备注"></Input>
      </div>
    </div>
    <p style="text-align:right">
      <Button style="margin:10px 20px;" @click="test" type="primary">添加科目</Button>
    </p>
    <Modal v-model="modal1" title="添加科目" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="科目编号" prop="id">
          <Input v-model="editForm.id" placeholder="请输入科目编号"></Input>
        </FormItem>
        <FormItem label="科目名称" prop="name">
          <Input v-model="editForm.name" placeholder="请输入科目名称"></Input>
        </FormItem>
        <FormItem label="金额" prop="money">
          <Input v-model="editForm.money" placeholder="请输入金额"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Table style="margin:5px;" :columns="col" :data="data1" ref="table"></Table>
    <p style="text-align:center">
      <Button style="margin:10px 20px;width:100px;" @click="save" type="primary">保存</Button>
    </p>
    <p style="text-align:right;margin-top:20px;">
      合计金额:
      <span>{{money}}</span>
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
      id: "",
      people: "张三",
      date: "2018-3-1",
      beizhu: "",
      money: null,
      editForm: {
        id: "",
        name: "",
        money: "",
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
        money: [
          {
            required: true,
            message: "折旧金额不能为空",
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
          title: "折旧金额",
          key: "money"
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
                      var deleteIndex = params.index;
                      Cookies.set("deleteIndex", deleteIndex);
                      this.deleteIndex();
                      if (this.data1.length >= 2) {
                        var money = this.data1[params.index].money;
                        this.data1.splice(params.index, 1);
                        this.money = this.money - money;
                        this.$Message.info("删除成功");
                      } else {
                        this.$Modal.info({
                          title: "提示",
                          content: "你确定还要删除码？只剩一条数据了！"
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
          money: 1000,
          beizhu: "123"
        },
        {
          index: 2,
          id: "002",
          name: "固定资产甲",
          money: 1500,
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
    save: function() {
      if (
        this.id == "" ||
        this.people == "" ||
        this.date == "" ||
        this.beizhu == ""
      ) {
        this.$Modal.info({
          title: "提示",
          content: "请先把信息补充完整,否则无法保存"
        });
      } else {
        alert("保存成功");
      }
    },
    moneyCount() {
      this.money = null;
      for (var i = 0; i < this.data1.length; i++) {
        var a = parseInt(this.data1[i].money);
        this.money = this.money + a;
      }
      return this.money;
    },
    test() {
      this.modal1 = true;
    },
    ok() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.money == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          index: this.data1.length + 1,
          id: this.editForm.id,
          name: this.editForm.name,
          money: this.editForm.money,
          beizhu: this.editForm.beizhu
        });
        this.$Message.info("添加科目成功");
        this.moneyCount();
        this.editForm.id = "";
        this.editForm.name = "";
        this.editForm.money = "";
        this.editForm.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  },
  mounted: function() {
    this.moneyCount();
  }
};
</script>
