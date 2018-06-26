<template>
  <div class="container">
    <h3>销售统计</h3>
    <div style="text-align:center;margin-top:50px;">
      <div style="display:inline-block;width:400px;border:solid #ccc 1px;">
        <p style="text-align:left;padding:10px 0px 10px 20px;color:red;">本月</p>
        <ul style="list-style:none;text-align:center;">
          <li style="display:inline-block;margin:10px 20px 30px 0px">
            <p style="text-align:center;font-size:22px;color:black;">￥12000</p>
            <p style="text-align:center;font-size:22px;color:black;">收入</p>
          </li>
          <li style="display:inline-block;margin:10px 0px 30px 0px">
            <p style="text-align:center;font-size:22px;color:black;">￥1200</p>
            <p style="text-align:center;font-size:22px;color:black;">支出</p>
          </li>
        </ul>
      </div>
    </div>
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
export default {
  data() {
    return {
      editForm: {
        id: "",
        name: "",
        beizhu: ""
      },
      editForm1: {
        id: "",
        name: "",
        beizhu: ""
      },
      validate: {
        id: [
          {
            required: true,
            message: "套餐编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "套餐名称不能为空",
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
          title: "套餐编号",
          key: "id"
        },
        {
          title: "套餐名称",
          key: "name"
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
                      Cookies.set("data_index", data_index);
                      var first_index = Cookies.get("dataIndex1");
                      if (data_index == first_index) {
                        // this.data1[data_index].name = this.editForm.name;
                        this.editForm1.id = this.data1[first_index].id;
                        this.editForm1.name = this.data1[first_index].name;
                        this.editForm1.beizhu = this.data1[first_index].beizhu;
                      } else {
                        this.editForm1.id = this.data1[data_index].id;
                        this.editForm1.name = this.data1[data_index].name;
                        this.editForm1.beizhu = this.data1[data_index].beizhu;
                      }

                      this.test1();
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
          id: "001",
          name: "沙发十件套",
          beizhu: "123"
        },
        {
          index: 2,
          id: "002",
          name: "桌子八件套",
          beizhu: "1234"
        }
      ]
    };
  },
  methods: {
    test() {
      this.modal1 = true;
    },
    test1() {
      this.modal2 = true;
    },
    ok() {
      if (
        this.editForm1.id == "" ||
        this.editForm1.name == "" ||
        this.editForm1.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        var dataIndex = Cookies.get("data_index");
        Cookies.set("dataIndex1", dataIndex);
        this.data1[dataIndex].id = this.editForm1.id;
        this.data1[dataIndex].name = this.editForm1.name;
        this.data1[dataIndex].beizhu = this.editForm1.beizhu;
        this.$Message.info("修改套餐信息成功");
        this.editForm1.id = "";
        this.editForm1.name = "";
        this.editForm1.beizhu = "";
      }
    },
    ok1() {
      if (
        this.editForm.id == "" ||
        this.editForm.name == "" ||
        this.editForm.beizhu == ""
      ) {
        this.$Message.info("请把信息填完整");
      } else {
        this.data1.push({
          index: this.data1.length + 1,
          id: this.editForm.id,
          name: this.editForm.name,
          beizhu: this.editForm.beizhu
        });
        this.$Message.info("添加套餐成功");
        this.editForm.id = "";
        this.editForm.name = "";
        this.editForm.beizhu = "";
      }
    },
    cancel() {
      this.$Message.info("你点击了取消");
    }
  }
};
</script>
