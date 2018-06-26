<template>
    <div class="container">
        <Card class="admin-card">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">

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

        <Card class="admin-card" v-if="curObjectId">
            <div class="admin-card-title" slot="title">
                收入产品
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right">
                    <my-sku-selector @select="onSkuSelect" :before="checkStore" />
                </div>
            </div>
            <admin-table>
                <admin-table-header :columns="columns"></admin-table-header>
                <admin-table-body>
                    <admin-tr v-for="item, index in inItems">
                        <admin-td v-for="column in columns" :key="column.id">
                            <div v-if="column.key === 'action'">
                                <Button @click="removeItem(item, index)">删除</Button>
                            </div>
                            <div v-else-if="column.key === 'store_id'">
                                {{ inItems[index]['store_name'] }}
                                <my-store-selector @select="onStoreSelect" @click.native="setItemIndex(index)" />
                            </div>
                            <div v-else>
                                <div v-if="column.editable">
                                    <input class="admin-table-input" v-model.number="inItems[index][column.key]" v-if="column.dataType === 'number'"/>
                                    <input class="admin-table-input" v-model="inItems[index][column.key]" v-else />
                                </div>
                                <div v-else>
                                    <div v-if="column.quickRender">
                                        {{ column.quickRender(item, index) }}
                                    </div>
                                    <div v-else>
                                        {{ inItems[index][column.key] }}
                                    </div>
                                </div>
                            </div>
                        </admin-td>
                    </admin-tr>
                </admin-table-body>
            </admin-table>
        </Card>

        <Card class="admin-card" v-if="curObjectId">
            <div class="admin-card-title" slot="title">
                发出产品
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right">
                    <my-sku-selector @select="onSkuSelect2" :storeId="curObject.store_id" :before="checkStore" />
                </div>
            </div>
            <admin-table>
                <admin-table-header :columns="columns"></admin-table-header>
                <admin-table-body>
                    <admin-tr v-for="item, index in outItems">
                        <admin-td v-for="column in columns" :key="column.id">
                            <div v-if="column.key === 'action'">
                                <Button @click="removeItem2(item, index)">删除</Button>
                            </div>
                            <div v-else-if="column.key === 'store_id'">
                                {{ outItems[index]['store_name'] }}
                                <my-store-selector @select="onStoreSelect2" @click.native="setItemIndex(index)" />
                            </div>
                            <div v-else>
                                <div v-if="column.editable">
                                    <input class="admin-table-input" v-model.number="outItems[index][column.key]" v-if="column.dataType === 'number'"/>
                                    <input class="admin-table-input" v-model="outItems[index][column.key]" v-else />
                                </div>
                                <div v-else>
                                    <div v-if="column.quickRender">
                                        {{ column.quickRender(item, index) }}
                                    </div>
                                    <div v-else>
                                        {{ outItems[index][column.key] }}
                                    </div>
                                </div>
                            </div>
                        </admin-td>
                    </admin-tr>
                </admin-table-body>
            </admin-table>
        </Card>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                modelName: 'storage_combine',
                curObjectId: null,
                curObject: {
                    type: '1',
                    department_id: '',
                    department_name: '',
                    business_user_id: '',
                    business_user_name: '',
                    store_id: '',
                    store_name: '',
                    storage_io_type_id: '',
                    branch_id: this.$util.getBranch().id,
                    branch_name: this.$util.getBranch().name
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "盘点单编号不能为空",
                            trigger: "blur"
                        }
                    ],
                    make_time: [
                        {
                            required: true,
                            message: "日期不能为空",
                            trigger: "blur"
                        }
                    ],
                    store_id: [
                        {
                            required: true,
                            message: "盘点仓库不能为空",
                            trigger: "content"
                        }
                    ]
                },
                columns: [
                    {
                        title: "产品编号",
                        key: "product_id"
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
                        title: "仓库",
                        key: "store_id",
                        editable: true
                    },
                    {
                        title: "数量",
                        key: "number",
                        editable: true
                    },
                    {
                        title: "单价",
                        key: "price",
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: "金额",
                        quickRender: (item, index) => {
                            return item.number * item.price
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
                inItems: [],
                outItems: []
            };
        },
        mounted() {
            this.getData();
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
                        console.log(this.curObject)
                        let items = this.curObject.items
                        this.inItems = []
                        this.outItems = []
                        for (let item of items) {
                            if (item.type === '1') {
                                this.inItems.push(item)
                            } else {
                                this.outItems.push(item)
                            }
                        }
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
                    this.curObject.items = this.inItems.concat(this.outItems)
                    let url = this.curObjectId ? `/${this.modelName}/update` : `/${this.modelName}/add`
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success('保存成功')
//                            this.$router.replace(`/storage_ios/${response.data.data}/edit`)
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            checkStore() {
//                if (!this.curObject.store_id) {
//                    this.$Message.error("请先选择调仓库");
//                    return false
//                }
                return true
            },
            setItemIndex(index) {
                this.curItemIndex = index
            },
            onStoreSelect(store) {
                this.inItems[this.curItemIndex].store_id = store.id;
                this.inItems[this.curItemIndex].store_name = store.name;
            },
            onStoreSelect2(store) {
                this.outItems[this.curItemIndex].store_id = store.id;
                this.outItems[this.curItemIndex].store_name = store.name;
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
                        this.$Message.success("操作成功");
                        this.getData();
                    },
                    response => {
                        this.$Message.error("系统出错");
                    }
                );
            },
            onSkuSelect(obj) {
                this.inItems.push({
                    product_code: obj.product_code,
                    product_name: obj.product_name,
                    product_spec: obj.product_spec,
                    product_unit: obj.product_unit,
                    sku_id: obj.sku_id,
                    store_id: '',
                    store_name: '',
                    number: 1,
                    price: obj.price,
                    type: 1,
                })
            },
            onSkuSelect2(obj) {
                this.outItems.push({
                    product_code: obj.product_code,
                    product_name: obj.product_name,
                    product_spec: obj.product_spec,
                    product_unit: obj.product_unit,
                    sku_id: obj.sku_id,
                    store_id: '',
                    store_name: '',
                    number: 1,
                    price: obj.price,
                    type: 2
                })
            },
            removeItem(item, index) {
                this.inItems.splice(index, 1)
            },
            removeItem2(item, index) {
                this.outItems.splice(index, 1)
            },
        }
    };
</script>
