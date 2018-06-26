<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="调出仓库" prop="out_store_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.out_store_name }}</div>
                        <div class="selector">
                            <my-store-selector @select="onOutStoreSelect"/>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="调入仓库" prop="in_store_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.in_store_name }}</div>
                        <div class="selector">
                            <my-store-selector @select="onInStoreSelect"/>
                        </div>
                    </div>
                </FormItem>


                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder=""></Input>
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
                调拨商品
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right">
                    <my-sku-selector @select="onSkuSelect" :storeId="curObject.out_store_id" :before="checkStore"/>
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
                modelName: "storage_move",
                curObjectId: null,
                curObject: {
                    in_store_id: '9',
                    in_store_name: '',
                    out_store_id: '',
                    out_store_name: '',
                    // 单据通用
                    branch_id: this.$util.getBranch().id,
                    branch_name: this.$util.getBranch().name,
                    department_id: this.$util.getDepartment().id,
                    department_name: this.$util.getDepartment().name,
                    business_user_id: this.$util.getUser().id,
                    business_user_name: this.$util.getUser().name,
//                    make_time: "2018-3-21 10:22:33",
//                    make_user_name: "",
                },
                validate: {
                    in_store_id: [
                        {
                            required: true,
                            message: "调入仓库不能为空",
                            trigger: "in_store"
                        }
                    ],
                    out_store_id: [
                        {
                            required: true,
                            message: "调出仓库不能为空",
                            trigger: "out_store"
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
                    ],
//                    bill_type: [
//                        {
//                            required: true,
//                            message: "请选择单据类型",
//                            trigger: "bill_type"
//                        }
//                    ]
                },
                types: [],

                columns: [
                    {
                        title: "产品编号",
                        key: "id"
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
                        title: "调拨数量",
                        key: "number",
                        editable: true
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
                            let item = this.items[params.index];
                            return h("div", item.number * item.price);
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
                                                this.removeItem(this.items[params.index], params.index);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                items: []
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.curObjectId = this.$route.params.id;
                if (!this.curObjectId) {
                    return;
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data;
                        this.curObject = data.data;
                        this.items = this.curObject.items;
                        console.log(this.curObject);
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
                    this.curObject.items = this.items
                    let url = this.curObjectId
                        ? `/${this.modelName}/update`
                        : `/${this.modelName}/add`;
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success("保存成功");
                            this.$router.replace(`/storage_moves/${response.data.data}/edit`);
                        },
                        response => {
                            this.$Message.error("系统出错");
                        }
                    );
                });
            },
            check() {
                this.$http.post(`/${this.modelName}/check?id=${this.curObjectId}`).then(
                    response => {
                        this.$Message.success("操作成功");
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
            checkStore() {
                if (!this.curObject.out_store_id) {
                    this.$Message.error("请先选择调出仓库");
                    return false
                }
                return true
            },
            onInStoreSelect(store) {
                this.curObject.in_store_id = store.id;
                this.curObject.in_store_name = store.name;
            },
            onOutStoreSelect(store) {
                this.curObject.out_store_id = store.id;
                this.curObject.out_store_name = store.name;
            },
            onDepartmentSelect(department) {
                console.log("选择了部门", department);
                this.curObject.department_id = department.id;
                this.curObject.department_name = department.name;
            },
            onBranchSelect(branch) {
                this.curObject.branch_id = branch.id;
                this.curObject.branch_name = branch.name;
            },
            onSelectBusinessUser(user) {
                console.log(this);
                console.log("选择了2", user);
                this.curObject.business_user_id = user.id;
                this.curObject.business_username = user.name;
            },
            onSkuSelect(obj) {
                console.log("选择了XXX", obj);
                this.items.push({
                    id: obj.product_code,
                    sku_id: obj.sku_id,
                    product_code: obj.product_code,
                    product_name: obj.product_name,
                    product_spec: obj.product_spec,
                    product_unit: obj.product_unit,
//                    number: obj.number,
//                    price: obj.price
                    number: 0,
                    price: 0
                })
            },
            onProductSelect(obj) {
                console.log("选择了2", obj);
                this.$http
                    .post(`/storage_move_item/add`, {
                        move_storage_id: this.curObjectId,
                        sku_id: obj.sku.id,
                        number: 1,
                        note: "",
                        price: obj.product.price
                    })
                    .then(
                        response => {
                            this.getData();
                        },
                        response => {
                            console.log(response);
                        }
                    );
            },
            removeItem(item, index) {
                this.items.splice(index, 1)
            }
        }
    };
</script>
