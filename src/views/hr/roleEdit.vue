<template>
    <div>
        <Card>
            <Form ref="form" :model="role" :label-width="100" label-position="right" :rules="rolesValidate">
                <h4>角色信息</h4>
                <FormItem label="角色名称" prop="name">
                    <Input v-model="role.name" placeholder="请输入你的角色名称"></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input v-model="role.note" type="textarea" placeholder="请输入你的备注"></Input>
                </FormItem>
                <h4>权限</h4>
                <Button type="primary" @click="save">保存</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
                <!--<FormItem label="一级" prop="one">-->
                    <!--<Checkbox lable="系统" v-model="rolesEditForm.one">系统</Checkbox>-->
                <!--</FormItem>-->
                <!--<FormItem label="二级" prop="two">-->
                    <!--<CheckboxGroup v-model="rolesEditForm.two">-->
                        <!--<Checkbox label="员工管理"></Checkbox>-->
                        <!--<Checkbox label="角色管理"></Checkbox>-->
                        <!--<Checkbox label="公司信息管理"></Checkbox>-->
                    <!--</CheckboxGroup>-->
                <!--</FormItem>-->
                <!--<FormItem label="三级" prop="three">-->
                    <!--<CheckboxGroup v-model="rolesEditForm.three">-->
                        <!--<Checkbox label="查看"></Checkbox>-->
                        <!--<Checkbox label="编辑"></Checkbox>-->
                        <!--<Checkbox label="删除"></Checkbox>-->
                    <!--</CheckboxGroup>-->
            </Form>
        </Card>
    </div>

</template>

<script>
    import Cookies from "js-cookie";

    export default {
        data() {
            return {
                role: {
                },
                rolesValidate: {
                    name: [
                        {
                            required: true,
                            message: "角色名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    beizhu: [
                        {
                            message: "备注不能为空",
                            trigger: "blur"
                        }
                    ],
                    one: [
                        {
                            required: true,
                            message: "权限不能为空",
                            trigger: "blur"
                        }
                    ],
                    two: [
                        {
                            required: true,
                            message: "权限不能为空",
                            trigger: "blur"
                        }
                    ],
                    three: [
                        {
                            required: true,
                            message: "权限不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                // 部门选择
                departments: [],
                departmentModalVisible: false,
                departmentColumn: [
                    {
                        title: "部门编号",
                        key: "code"
                    },
                    {
                        title: "部门名称",
                        key: 'name'
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectDepartmentItem(this.departments[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.roleId = this.$route.params.id
                if (!this.roleId) {
                    return
                }
                this.$http.get('/role/detail?id=' + this.roleId).then(
                    response => {
                        let data = response.data
                        this.role = data.data
                        console.log(this.role)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            save() {
                this.$refs['form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('请完善表单')
                        return
                    }
                    let url = this.roleId ? '/role/update' : '/role/add'
                    this.$http.post(url, this.role).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            selectDepartment() {
                this.departmentModalVisible = true
                this.$http.get('/department/all').then(
                    response => {
                        let data = response.data
                        this.departments = data.data
                        console.log(this.departments)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectDepartmentItem(department) {
                console.log('选择了', department)
                this.user.department_id = department.id
                this.user.department_name = department.name
                this.departmentModalVisible = false
            },
        }
    };
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
    }

    .title {
        width: 100%;
        text-align: center;
    }

    .container .title h3 {
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