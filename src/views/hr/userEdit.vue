<template>
    <div>
        <Card>
            <Form ref="form" :model="user" :label-width="100" label-position="right" :rules="validate">
                <h2>个人信息</h2>
                <FormItem label="编号" prop="code">
                    <Input class="form-common-width" v-model="user.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input class="form-common-width" v-model="user.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <Select class="form-common-width" v-model="user.sex">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input class="form-common-width" v-model="user.phone" placeholder=""></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input class="form-common-width"v-model="user.email" placeholder=""></Input>
                </FormItem>
                <FormItem label="住址" prop="address">
                    <Input class="form-common-width" v-model="user.address" placeholder=""></Input>
                </FormItem>
                <FormItem label="基本工资" prop="basic_wage">
                    <Input class="form-common-width" v-model.number="user.basic_wage" placeholder=""></Input>
                </FormItem>
                <FormItem label="身份证号" prop="idcard_number">
                    <Input class="form-common-width" v-model="user.idcard_number" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="user.note" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem label="登录密码" prop="password">
                    <Input class="form-common-width" v-model="user.password" placeholder=""></Input>
                </FormItem>
                <h2>公司信息</h2>
                <FormItem label="分支机构" prop="branch_id">
                    <div>{{ user.branch_name }}</div>
                    <my-branch-selector @select="onBranchSelect" />
                </FormItem>
                <FormItem label="部门" prop="department_id">
                    <div>{{ user.department_name }}</div>
                    <my-department-selector @select="onDepartmentSelect" />
                </FormItem>
                <FormItem label="职位" prop="position_name">
                    <div>{{ user.position_name }}</div>
                    <my-position-selector @select="onPositionSelect" />
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    position_id: '',
                    position_name: '',
                    branch_id: '',
                    branch_name: '',
                    department_id: '',
                    department_name: '',
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "员工姓名不能为空",
                            trigger: "blur"
                        }
                    ],
                    password: [
                    ],
                    branch_id: [
                        {
                            required: true,
                            message: "部门不能为空",
                            trigger: "blur"
                        }
                    ],
                    department_id: [
                        {
                            required: true,
                            message: "部门不能为空",
                            trigger: "blur"
                        }
                    ],
                    shop: [
                        {
                            required: true,
                            message: "门店不能为空",
                            trigger: "blur"
                        }
                    ],
                    position: [
                        {
                            required: true,
                            message: "职位不能为空",
                            trigger: "blur"
                        }
                    ],
                    phone: [
                    ],
                    code: [
                        {
                            required: true,
                            message: "手机号不能为空",
                            trigger: "blur"
                        }
                    ]
                },
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.userId = this.$route.params.id
                if (!this.userId) {
                    return
                }
                this.$http.get('/user/detail?id=' + this.userId).then(
                    response => {
                        let data = response.data
                        this.user = data.data
                        console.log(this.user)
                    },
                    response => {
                        console.log(response)
                    }
                )
                
                this.$http.get('/user/all').then(
                    response => {
                        this.data = response.data.data
                        console.log(this.data)
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
                    let url = this.userId ? '/user/update' : '/user/add'
                    this.$http.post(url, this.user).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            onPositionSelect(position) {
                this.user.position_id = position.id
                this.user.position_name = position.name
            },
            onBranchSelect(branch) {
                this.user.branch_id = branch.id
                this.user.branch_name = branch.name
            },
            onDepartmentSelect(department) {
                this.user.department_id = department.id
                this.user.department_name = department.name
            },
        }
    };
</script>
