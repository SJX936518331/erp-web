<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <!--<Form ref="editForm1" :model="editForm1" :label-width="100" label-position="right" :rules="validate">-->
                    <!--<FormItem label="部门名称" prop="name">-->
                        <!--<Input v-model="editForm1.name" placeholder="请输入部门名称"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="备注" prop="beizhu">-->
                        <!--<Input v-model="editForm1.beizhu" type="textarea" placeholder="请输入你的备注"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="部门编号" prop="id">-->
                        <!--<Input v-model="editForm1.id" placeholder="请输入你的部门编号"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="部门负责人" prop="people">-->
                        <!--<Select v-model="editForm1.people" placeholder="请选择你的部门负责人">-->
                            <!--<Option value="小明">小明</Option>-->
                            <!--<Option value="小红">小红</Option>-->
                            <!--<Option value="小米">小米</Option>-->
                            <!--<Option value="小迷">小迷</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                <!--</Form>-->
            </div>
        </Card>
    </div>
</template>

<script>
    import Cookies from "js-cookie";
    // import canEditTable from "./components/canEditTable.vue";
    import axios from "axios";

    export default {
        data() {
            return {
                department: {}
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let departmentId = this.$route.params.id
                this.$http.get('/department/detail?id=' + departmentId).then(
                    response => {
                        let data = response.data;
                        this.department = data.data;
                        console.log(this.data1);
                    },
                    response => {
                        console.log(response);
                    }
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
                    this.data1[dataIndex].name = this.editForm1.name;
                    // this.data1 = JSON.parse(JSON.stringify(this.data1));
                    this.data1[dataIndex].beizhu = this.editForm1.beizhu;
                    this.data1[dataIndex].id = this.editForm1.id;
                    this.data1[dataIndex].people = this.editForm1.people;
                    this.editData = this.data1;
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
        },
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