<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="收款账户" prop="bank_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.bank_name }}</div>
                        <div class="selector">
                            <my-bank-selector @select="onBankSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="收款方式" prop="pay_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.pay_type_name }}</div>
                        <div class="selector">
                            <my-pay-type-selector @select="onTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input v-model="curObject.note" type="textarea" placeholder=""></Input>
                </FormItem>
                <Row>
                    <Col span="6">
                    <FormItem label="单号" prop="code">
                        <div>{{ curObject.code }}</div>
                    </FormItem>
                    </Col>

                    <Col span="6">
                    <FormItem label="制单人" prop="make_user_name">
                        {{ curObject.make_user_name }}
                    </FormItem>
                    </Col>

                    <Col span="6">
                    <FormItem label="制单日期" prop="make_time">
                        {{ curObject.make_time }}
                    </FormItem>
                    </Col>

                    <Col span="6">
                    <FormItem label="业务员" prop="business_user_id">
                        <div class="form-selector">
                            <div class="value">{{ curObject.business_user_name }}</div>
                            <div class="selector">
                                <my-user-selector @select="onSelectBusinessUser" />
                            </div>
                        </div>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="分支机构" prop="branch_id">
                        {{ curObject.branch_name }}
                    </FormItem>
                    </Col>

                    <Col span="6">
                    <FormItem label="部门" prop="department_id">
                        <div class="form-selector">
                            <div class="value">{{ curObject.department_name }}</div>
                            <div class="selector">
                                <my-department-selector @select="onDepartmentSelect" />
                            </div>
                        </div>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                    <FormItem label="单据状态" prop="check_state">
                        {{ curObject.check_state === '1' ? '已审核' : '未审核' }}
                    </FormItem>
                    </Col>

                    <Col span="6">
                    <FormItem label="审核人" prop="check_user_id" v-if="curObject.check_state === '1'">
                        {{ curObject.check_user_name }}
                    </FormItem>
                    </Col>

                    <Col span="6">
                    <FormItem label="审核时间" prop="check_time" v-if="curObject.check_state === '1'">
                        {{ curObject.check_time }}
                    </FormItem>
                    </Col>
                </Row>

                <FormItem class="item-btn">
                    <Button class="btn" type="primary" @click="save" v-if="curObject.check_state !== '1'">保存</Button>
                    <Button class="btn" @click="check" v-if="curObject.check_state === '0'">审核</Button>
                    <Button class="btn" @click="uncheck" type="error" v-if="curObject.check_state === '1'">反审核</Button>
                </FormItem>
            </Form>
        </Card>

        <Card class="admin-card">
            <div class="admin-card-title" slot="title">
                收入项
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                    总金额：￥{{ totalMoney }}
                </div>
                <div class="tool-right" v-if="formEditable">
                    <my-balance-io-type-selector @select="onBalanceIoTypeSelect" type="1" />
                </div>
            </div>
            <my-table v-model="items" :columns-list="columns" :editIncell="formEditable" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'balance_in',
                curObject: {
                    pay_type_id: '',
                    pay_type_name: '',
                    bank_id: '',
                    bank_name: '',
                    // 单据通用
                    branch_id: this.$util.getBranch().id,
                    branch_name: this.$util.getBranch().name,
                    department_id: this.$util.getDepartment().id,
                    department_name: this.$util.getDepartment().name,
                    business_user_id: this.$util.getUser().id,
                    business_user_name: this.$util.getUser().name,
                },
                validate: {
                    bank_id: [
                        {
                            required: true,
                            message: "收款账户不能为空",
                            trigger: "title"
                        }
                    ],
                    pay_type_id: [
                        {
                            required: true,
                            message: "收款方式不能为空",
                            trigger: "content"
                        }
                    ]
                },
                columns: [
                    {
                        title: "收入类别编号",
                        key: "balance_io_type_id"
                    },
                    {
                        title: "收入类别",
                        key: "balance_io_type_name"
                    },
                    {
                        title: "金额",
                        key: "money",
                        editable: true
                    },
                    {
                        title: "备注",
                        key: "note",
                        editable: true
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            if (!this.formEditable) {
                                return
                            }
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeItem(this.items[params.index], params.index)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                items: [],
                formEditable: true
            }
        },
        computed: {
            totalMoney() {
                let total = 0
                for (let item of this.items) {
                    total += item.money
                }
                return total
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        this.items = this.curObject.items
                        this.formEditable = this.curObject.check_state !== '1'
                        console.log(this.curObject)
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
                    this.curObject.items = this.items
                    let url = this.curObjectId ? `/${this.modelName}/update` : `/${this.modelName}/add`
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            check() {
                this.$http.post(`/${this.modelName}/check?id=${this.curObjectId}`).then(
                    response => {
                        this.$Message.success("审核成功");
                        this.getData();
                    },
                    response => {
                        this.$Message.error("系统出错");
                    }
                );
            },
            uncheck() {
                this.$http.post(`/${this.modelName}/uncheck?id=${this.curObjectId}`).then(
                    response => {
                        this.$Message.success("审核成功");
                        this.getData();
                    },
                    response => {
                        this.$Message.error("系统出错");
                    }
                );
            },
            onBankSelect(bank) {
                this.curObject.bank_id = bank.id
                this.curObject.bank_name = bank.name
            },
            onDepartmentSelect(department) {
                console.log('选择了部门', department)
                this.curObject.department_id = department.id
                this.curObject.department_name = department.name
            },
            onBranchSelect(branch) {
                this.curObject.branch_id = branch.id
                this.curObject.branch_name = department.name
            },
            onSelectBusinessUser(user) {
                console.log(this)
                console.log('选择了2', user)
                this.curObject.business_user_id = user.id
                this.curObject.business_user_name = user.name
            },
            onTypeSelect(type) {
                this.curObject.pay_type_id = type.id
                this.curObject.pay_type_name = type.name
            },
            onBalanceIoTypeSelect(obj) {
                this.items.push({
                    id: new Date().getTime(),
                    balance_in_id: this.curObjectId,
                    balance_io_type_id: obj.id,
                    balance_io_type_name: obj.name,
                    money: 0,
                    note: '',
                })
//                this.$http.post(`/balance_in_item/add`, {
//                    balance_in_id: this.curObjectId,
//                    money: 0,
//                    note: '',
//                    balance_io_type_id: obj.id
//                }).then(
//                    response => {
//                        this.getData()
//                    },
//                    response => {
//                        console.log(response)
//                    }
//                )
            },
            saveItem(item, index) {
                console.log('保存', item)
                this.$http.post(`/balance_in_item/update`, {
                    id: item.id,
                    money: item.money,
                    note: item.note,
                }).then(
                    response => {
                        this.$Message.success('保存成功')
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            removeItem(item, index) {
                this.items.splice(index)
//                this.$http.post(`/balance_in_item/remove?id=` + item.id).then(
//                    response => {
//                        this.getData()
//                    },
//                    response => {
//                        console.log(response)
//                    }
//                )
            },
        }
    }
</script>
