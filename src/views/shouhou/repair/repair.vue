<template>
  <div class="container">
    <h3>维修单</h3>
    <Button style="margin:10px 20px;display:block;" type="primary" @click="exportData(1)">导出表格数据</Button>
    <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
    <Modal v-model="modal1" title="派遣" @on-ok="ok" @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :label-width="100" label-position="right" :rules="validate">
        <FormItem label="派遣人" prop="people">
          <Select v-model="editForm.people" placeholder="请选择你的要派遣的人">
            <Option value="小明">小明</Option>
            <Option value="小红">小红</Option>
            <Option value="小米">小米</Option>
            <Option value="小迷">小迷</Option>
          </Select>
        </FormItem>
        <FormItem label="派遣时间" prop="time">
          <Select v-model="editForm.time" placeholder="请选择派遣时间">
            <Option value="2018-1">2018-1</Option>
            <Option value="2018-2">2018-2</Option>
            <Option value="2018-3">2018-3</Option>
            <Option value="2018-4">2018-4</Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm.beizhu" type="textarea" placeholder="请输入你的备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="验收" @on-ok="ok1" @on-cancel="cancel">
      <Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate1">
        <FormItem label="商品名称" prop="name" :error="nameError">
          <Input v-model="editForm1.name" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品数量" prop="number">
          <Input v-model="editForm1.number" placeholder="请输入商品数量"></Input>
        </FormItem>
        <FormItem label="订单编号" prop="id">
          <Input v-model="editForm1.id" placeholder="请输入你的订单编号"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm1.beizhu" type="textarea" placeholder="请输入备注"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal3" title="发货" @on-ok="ok2" @on-cancel="cancel">
      <Form ref="editForm2" :model="editForm2" :label-width="100" label-position="right" :rules="validate2">
        <FormItem label="商品名称" prop="name" :error="nameError">
          <Input v-model="editForm2.name" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品数量" prop="number">
          <Input v-model="editForm2.number" placeholder="请输入商品数量"></Input>
        </FormItem>
        <FormItem label="订单编号" prop="id">
          <Input v-model="editForm2.id" placeholder="请输入你的订单编号"></Input>
        </FormItem>
        <FormItem label="备注" prop="beizhu">
          <Input v-model="editForm2.beizhu" type="textarea" placeholder="请输入备注"></Input>
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
      excelFileName: "",
      editForm: {
        people: "",
        time: "",
        beizhu: ""
      },
      editForm1: {
        name: "",
        number: "",
        id: "",
        beizhu: ""
      },
      editForm2: {
        name: "",
        number: "",
        id: "",
        beizhu: ""
      },
      validate: {
        time: [
          {
            required: true,
            message: "派遣时间不能为空",
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
        people: [
          {
            required: true,
            message: "派遣人不能为空",
            trigger: "blur"
          }
        ]
      },
      validate1: {
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
            message: "商品数量不能为空",
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            message: "订单编号不能为空",
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
      validate2: {
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
            message: "商品数量不能为空",
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            message: "订单编号不能为空",
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
      modal3: false,
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
          title: "客户名称",
          key: "name"
        },
        {
          title: "维修类型",
          key: "type"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "反馈",
          key: "feedback"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (this.data1[params.index].index == 1) {
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

                        this.editForm.people = this.data1[data_index].people;
                        this.editForm.time = this.data1[data_index].time;
                        this.editForm.beizhu = this.data1[data_index].beizhu;
                        Cookies.set("data_index", data_index);
                        this.test();
                      }
                    }
                  },
                  "派遣"
                )
              ]);
            } else if (this.data1[params.index].index == 2) {
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
                        this.editForm1.name = this.data1[data_index].name;
                        this.editForm1.number = this.data1[data_index].number;
                        this.editForm1.id = this.data1[data_index].id;
                        this.editForm1.beizhu = this.data1[data_index].beizhu;
                        Cookies.set("data_index", data_index);
                        this.test1();
                      }
                    }
                  },
                  "验收"
                )
              ]);
            } else if (this.data1[params.index].index == 3) {
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
                        this.editForm2.name = this.data1[data_index].name;
                        this.editForm2.number = this.data1[data_index].number;
                        this.editForm2.id = this.data1[data_index].id;
                        this.editForm2.beizhu = this.data1[data_index].beizhu;
                        Cookies.set("data_index", data_index);
                        this.test2();
                      }
                    }
                  },
                  "发货"
                )
              ]);
            }
          }
        }
      ],
      data1: [
        {
          index: 1,
          name: "张三",
          type: "普通维修",
          status: "未解决",
          feedback: "无"
        },
        {
          index: 2,
          name: "李四",
          type: "送厂维修",
          status: "已派遣",
          feedback: "无"
        },
        {
          index: 3,
          name: "小明",
          type: "普通维修",
          status: "已验收",
          feedback: "无"
        },
        {
          index: 4,
          name: "小庆",
          type: "送厂维修",
          status: "完成",
          feedback: "服务不错"
        }
      ]
    };
  },
  methods: {
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "原始数据"
        });
      }
    },
    test() {
      this.modal1 = true;
    },
    test1() {
      this.modal2 = true;
    },
    test2() {
      this.modal3 = true;
    },
    ok() {
      if (
        this.editForm.people == "" ||
        this.editForm.time == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].name = this.editForm.people;
        this.data1[dataIndex].people = this.editForm.people;
        this.data1[dataIndex].time = this.editForm.time;
        this.data1[dataIndex].beizhu = this.editForm.beizhu;
        this.$Message.info("派遣成功");
        this.editForm.people = "";
        this.editForm.time = "";
        this.editForm.beizhu = "";
      }
    },
    ok1() {
      if (
        this.editForm1.name == "" ||
        this.editForm1.number == "" ||
        this.editForm1.id == "" ||
        this.editForm1.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].name = this.editForm1.name;
        this.data1[dataIndex].number = this.editForm1.number;
        this.data1[dataIndex].id = this.editForm1.id;
        this.data1[dataIndex].beizhu = this.editForm1.beizhu;
        this.$Message.info("验收成功");
        this.editForm1.name = "";
        this.editForm1.number = "";
        this.editForm1.id = "";
        this.editForm1.beizhu = "";
      }
    },
    ok2() {
      if (
        this.editForm2.name == "" ||
        this.editForm2.beizhu == "" ||
        this.editForm2.id == "" ||
        this.editForm2.people == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        this.data1[dataIndex].number = this.editForm2.number;
        this.data1[dataIndex].id = this.editForm2.id;
        this.data1[dataIndex].beizhu = this.editForm2.beizhu;
        this.$Message.info("发货成功");
        this.editForm2.name = "";
        this.editForm2.number = "";
        this.editForm2.id = "";
        this.editForm2.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
