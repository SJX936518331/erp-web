<template>
    <div class="container">
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="80" label-position="right" :rules="validate">
                <FormItem label="客户" prop="customer_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.customer_name }}</div>
                        <div class="selector">
                            <my-customer-selector @select="onCustomerSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="仓库" prop="store_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.store_name }}</div>
                        <div class="selector">
                            <my-store-selector @select="onStoreSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="销售开单" prop="sale_bill_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.sale_bill_code }}</div>
                        <div class="selector">
                            <my-sale-bill-selector @select="onSaleBillSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" type="textarea" v-model="curObject.note" placeholder=""></Input>
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
                <div class="tool-left">
                    总金额：{{ totalMoney }}
                </div>
                <div class="tool-right" v-if="curObject.check_state !== '1'">
                    <my-sku-selector @select="onSkuSelect" :storeId="curObject.store_id" :before="checkStore"/>
                </div>
            </div>
            <my-table v-model="items" :columns-list="columns" :editIncell="curObject.check_state !== '!'" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'sale_return',
                curObjectId: null,
                curObject: {
                    customer_id: '',
                    customer_name: '',
                    store_id: '',
                    store_name: '',
                    total_money: '',
                    sale_bill_id: '',
                    sale_bill_code: '',
                    // 单据通用
                    branch_id: this.$util.getBranch().id,
                    branch_name: this.$util.getBranch().name,
                    department_id: this.$util.getDepartment().id,
                    department_name: this.$util.getDepartment().name,
                    business_user_id: this.$util.getUser().id,
                    business_user_name: this.$util.getUser().name,
                },
                validate: {
                    customer_id: [
                        {
                            required: true,
                            message: "客户不能为空",
                            trigger: "customer_id"
                        }
                    ],
                    store_id: [
                        {
                            required: true,
                            message: "仓库不能为空",
                            trigger: "store"
                        }
                    ],
                    sale_bill_id: [
                        {
                            required: true,
                            message: "销售开单不能为空",
                            trigger: "store"
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
                types: [],
                columns: [
                    {
                        title: "产品编号",
                        key: "product_code",
                        width: 160
                    },
                    {
                        title: "产品名称",
                        key: "product_name",
                        width: 160
                    },
                    {
                        title: "规格",
                        key: "product_spec",
                        width: 160
                    },
                    {
                        title: "单位",
                        key: "product_unit",
                        width: 160
                    },
                    {
                        title: "数量",
                        key: "number",
                        width: 160,
                        editable: true
                    },
                    {
                        title: "单价",
                        key: "price",
                        width: 160,
                        editable: true
                    },
                    {
                        title: "金额",
                        key: "price",
                        width: 160,
                        render: (h, params) => {
                            let item = this.items[params.index]
                            return h('div', item.number * item.price)
                        }
                    },
                    {
                        title: "备注",
                        key: "note",
                        width: 320,
                        editable: true
                    },
                    {
                        title: "操作",
                        key: "action",
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
        computed: {
            totalMoney() {
                let total = 0
                for (let item of this.items) {
                    total += item.number * item.price
                }
                return total
            }
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
                console.log('获取数据')
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
            onCustomerSelect(customer) {
                this.curObject.customer_id = customer.id
                this.curObject.customer_name = customer.name
            },
            onStoreSelect(store) {
                this.curObject.store_id = store.id
                this.curObject.store_name = store.name
                this.items = []
            },
            onDepartmentSelect(department) {
                console.log('选择了部门', department)
                this.curObject.department_id = department.id
                this.curObject.department_name = department.name
            },
            onSaleBillSelect(bill) {
                this.curObject.sale_bill_id = bill.id
                this.curObject.sale_bill_code = bill.code
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
            checkStore() {
                if (!this.curObject.store_id) {
                    this.$Message.error("请先选择仓库");
                    return false
                }
                return true
            },
            onSkuSelect(obj) {
                console.log("选择了XXX", obj);
                this.items.push({
                    product_code: obj.product_code,
                    product_name: obj.product_name,
                    product_spec: obj.product_spec,
                    product_unit: obj.product_unit,
                    sku_id: obj.sku_id,
                    number: 0,
                    price: obj.price,
                    note: '',
                })
            },
            removeItem(item, index) {
                this.items.splice(index, 1)
            },
        },
    };
</script>
