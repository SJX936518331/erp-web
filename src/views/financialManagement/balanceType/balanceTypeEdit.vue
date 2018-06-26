<template>
    <div>
        <Card>
            <p slot="title">
                收支类型编辑
            </p>
            <div>
                <Form ref="form" :model="balanceType" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="收支类型名称" prop="name">
                        <Input v-model="balanceType.name" placeholder="请输入收支类型名称"></Input>
                    </FormItem>
                    <FormItem label="收支类型编号" prop="code">
                        <Input v-model="balanceType.code" type="textarea" placeholder="请输入收支类型编号"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Input v-model="balanceType.type" placeholder="请输入类型"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Input v-model="balanceType.note" placeholder="请输入备注"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      balanceType: {},
      validate: {
        name: [
          {
            required: true,
            message: "收支付类型名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "收支类型编号不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "blur"
          }
        ],
        note: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ]
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.balanceTypeId = this.$route.params.id;
      if (!this.balanceTypeId) {
        return;
      }
      this.$http.get("/balance_io_type/detail?id=" + this.balanceTypeId).then(
        response => {
          let data = response.data;
          this.balanceType = data.data;
          console.log(this.balanceType);
        },
        response => {
          console.log(response);
        }
      );
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.$Message.error("请完善表单");
          return;
        }
        let url = this.balanceTypeId ? "/balance_io_type/update" : "/balance_io_type/add";
        this.$http.post(url, this.balanceType).then(
          response => {
            this.$Message.success("保存成功");
          },
          response => {
            this.$Message.error("系统出错");
          }
        );
      });
    },
  }
};
</script>

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