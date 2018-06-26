<template>
    <div class="container">
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <!--<FormItem label="仓库" prop="store_id">-->
                <!--<div class="form-selector">-->
                <!--<div class="value">{{ curObject.store_name }}</div>-->
                <!--<div class="selector">-->
                <!--<my-store-selector @select="onStoreSelect" />-->
                <!--</div>-->
                <!--</div>-->
                <!--</FormItem>-->
                <FormItem label="供应商" prop="supplier_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.supplier_name }}</div>
                        <div class="selector">
                            <my-supplier-selector @select="onSupplierSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="付款账户" prop="bank_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.bank_name }}</div>
                        <div class="selector">
                            <my-bank-selector @select="onBankSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="付款方式" prop="pay_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.pay_type_name }}</div>
                        <div class="selector">
                            <my-pay-type-selector @select="onPayTypeSelect" />
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
                订单产品
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left" v-if="curObject">
                    总金额：{{ curObject.total_money }}
                </div>
                <div class="tool-right">
                    <my-purchase-bill-selector @select="onPurchaseBillSelect" />
                </div>
            </div>
            <my-table v-model="items" :columns-list="columns" :editIncell="true" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'purchase_pay',
                curObjectId: null,
                curObject: {
                    type: '1',
                    store_id: '',
                    store_name: '',
                    storage_io_type_id: '',
                    supplier_id: '',
                    supplier_name: '',
                    bank_id: '',
                    bank_name: '',
                    pay_type_id: '',
                    pay_type_name: '',
                    // 单据通用
                    branch_id: this.$util.getBranch().id,
                    branch_name: this.$util.getBranch().name,
                    department_id: this.$util.getDepartment().id,
                    department_name: this.$util.getDepartment().name,
                    business_user_id: this.$util.getUser().id,
                    business_user_name: this.$util.getUser().name,
                },
                validate: {
                    storage_io_type_id: [
                        {
                            required: true,
                            message: "类型不能为空",
                            trigger: "storage_io_type_id"
                        }
                    ],
//                    store_id: [
//                        {
//                            required: true,
//                            message: "仓库不能为空",
//                        }
//                    ],
                    supplier_id: [
                        {
                            required: true,
                            message: "客户不能为空"
                        }
                    ],
                    bank_id: [
                        {
                            required: true,
                            message: "收款账户不能为空"
                        }
                    ],
                    business_user_id: [
                        {
                            required: true,
                            message: "业务员不能为空",
                            trigger: "title"
                        }
                    ],
                    department_id: [
                        {
                            required: true,
                            message: "部门不能为空",
                            trigger: "content"
                        }
                    ]
                },
                columns: [
                    {
                        title: "引用单号",
                        key: "purchase_bill_code"
                    },
                    {
                        title: "单据日期",
                        key: "make_time"
                    },
                    {
                        title: "总金额",
                        key: "total_money"
                    },
                    {
                        title: "已结算金额",
                        key: "pay_money"
                    },
                    {
                        title: "待结算金额",
                        key: "number",
                        render: (h, params) => {
                            let item = this.items[params.index]
                            return h('div', item.total_money - item.pay_money)
                        }
                    },
                    {
                        title: "本次结算金额",
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
                            if (this.curObject && this.curObject.check_state === '1') {
                                return null
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
            };
        },
        mounted() {
            this.curObjectId = this.$route.params.id
            this.getData()
        },
        methods: {
            getData() {
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        this.items = this.curObject.items
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
                            if (!this.curObjectId) {
                                this.curObjectId = response.data.data
                            }
                            this.getData()
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
                        this.$Message.success('审核成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            uncheck() {
                this.$http.post(`/${this.modelName}/uncheck?id=${this.curObjectId}`).then(
                    response => {
                        this.$Message.success('反审核成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            onStoreSelect(store) {
                this.curObject.store_id = store.id
                this.curObject.store_name = store.name
            },
            onSupplierSelect(supplier) {
                this.curObject.supplier_id = supplier.id
                this.curObject.supplier_name = supplier.name
            },
            onBankSelect(bank) {
                this.curObject.bank_id = bank.id
                this.curObject.bank_name = bank.name
            },
            onPayTypeSelect(type) {
                this.curObject.pay_type_id = type.id
                this.curObject.pay_type_name = type.name
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
            onPurchaseBillSelect(bill) {
                console.log('选择', bill)
                this.items.push({
                    purchase_bill_id: bill.id,
                    purchase_bill_code: bill.code,
                    make_time: bill.make_time,
                    total_money: bill.total_money,
                    pay_money: bill.pay_money,
                    money: 0,
                    note: '',
                })
            },
            removeItem(item, index) {
                this.items.splice(index, 1)
            },
        },
    };
</script>
