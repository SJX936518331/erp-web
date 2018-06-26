<template>
    <div class="container">
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="供应商" prop="supplier_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.supplier_name }}</div>
                        <div class="selector">
                            <my-supplier-selector @select="onSupplierSelect" />
                        </div>
                    </div>
                </FormItem>

                <FormItem label="备注" prop="note">
                    <Input class="input-common" v-model="curObject.note" placeholder=""></Input>
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
                销售商品
            </div>
            <div class="admin-tool-bar" v-if="curObject">
                <div class="tool-left">
                    总金额：{{ totalMoney }}
                </div>
                <div class="tool-right" v-if="curObject.check_state !== '1'">
                    <my-sku-selector @select="onSkuSelect" :storeId="curObject.store_id" :before="checkStore"/>
                </div>
            </div>
            <admin-table>
                <admin-table-header :columns="columns"></admin-table-header>
                <admin-table-body>
                    <admin-tr v-for="item, index in items">
                        <admin-td v-for="column in columns" :key="column.id">
                            <div v-if="column.key === 'action'">
                                <Button @click="removeItem(item, index)">删除</Button>
                            </div>
                            <div v-else-if="column.key === 'store_name'">
                                {{ items[index]['store_name'] }}
                                <my-store-selector @select="onStoreSelect" @click.native="setItemIndex(index)" />
                            </div>
                            <div v-else>
                                <div v-if="column.editable">
                                    <input class="admin-table-input" v-model.number="items[index][column.key]" v-if="column.dataType === 'number'"/>
                                    <input class="admin-table-input" v-model="items[index][column.key]" v-else />
                                </div>
                                <div v-else>
                                    <div v-if="column.quickRender">
                                        {{ column.quickRender(item, index) }}
                                    </div>
                                    <div v-else>
                                        {{ items[index][column.key] }}
                                    </div>
                                </div>
                            </div>
                        </admin-td>
                    </admin-tr>
                </admin-table-body>
            </admin-table>
            <!--<my-table v-model="items" :columns-list="columns" :editIncell="curObject.check_state !== '1'" ref="table"></my-table>-->
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'purchase_bill',
                curObjectId: null,
                curObject: null,
                validate: {
                    storage_io_type_id: [
                        {
                            required: true,
                            message: "类型不能为空",
                            trigger: "storage_io_type_id"
                        }
                    ],
                    supplier_id: [
                        {
                            required: true,
                            message: "供应商不能为空",
                            trigger: "supplier_id"
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
                        title: "产品编号",
                        key: "product_code"
                    },
                    {
                        title: "产品名称",
                        key: "product_name"
                    },
                    {
                        title: "规格",
                        key: "product_spec"
                    },
                    {
                        title: "单位",
                        key: "product_unit"
                    },
                    {
                        title: "数量",
                        key: "number",
                        editable: true
                    },
                    {
                        title: "仓库",
                        key: "store_name",
                    },
                    {
                        title: "单价",
                        key: "price",
                        editable: true
                    },
                    {
                        title: "金额",
                        key: "price",
                        render: (h, params) => {
                            let item = this.items[params.index]
                            return h('div', item.number * item.price)
                        }
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
                                            type: "default",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeItem(this.items[params.index], params.index)
                                            }
                                        }
                                    },
                                    "设置仓库"
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
            if (this.$route.params.id) {
                this.curObjectId = this.$route.params.id
            }
            this.getData()
        },
        methods: {
            getData() {
                if (!this.curObjectId) {
                    this.curObject = {
                        supplier_id: '',
                        supplier_name: '',
                        type: '1',
                        store_id: '',
                        store_name: '',
                        // 单据通用
                        branch_id: this.$util.getBranch().id,
                        branch_name: this.$util.getBranch().name,
                        department_id: this.$util.getDepartment().id,
                        department_name: this.$util.getDepartment().name,
                        business_user_id: this.$util.getUser().id,
                        business_user_name: this.$util.getUser().name,
                    }
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
            setItemIndex(index) {
                this.curItemIndex = index
            },
            onStoreSelect(store) {
                this.items[this.curItemIndex].store_id = store.id;
                this.items[this.curItemIndex].store_name = store.name;
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
                        this.$Message.success('操作成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            onSupplierSelect(supplier) {
                this.curObject.supplier_id = supplier.id
                this.curObject.supplier_name = supplier.name
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
            checkStore() {
//                if (!this.curObject.supplier_id) {
//                    this.$Message.error("请先选择供应商");
//                    return false
//                }
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
