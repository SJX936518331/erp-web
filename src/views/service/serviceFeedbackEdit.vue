<template>
    <div class="container">
        <Card class="admin-card">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="客户" prop="customer_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.customer_name }}</div>
                        <div class="selector">
                            <my-customer-selector @select="onCustomerSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="服务类型" prop="service_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.service_type_name }}</div>
                        <div class="selector">
                            <my-service-type-selector @select="onServiceTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="紧急程序" prop="priority">
                    <Select v-model="curObject.priority" style="width:200px">
                        <Option value="1">低</Option>
                        <Option value="2">中</Option>
                        <Option value="3">高</Option>
                    </Select>
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

        <Card class="admin-card" v-if="curObjectId">
            <div class="admin-card-title" slot="title">
                产品信息
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                    <!--总金额：{{ totalMoney }}-->
                </div>
                <div class="tool-right" v-if="curObject.check_state === '0'">
                    <my-sku-selector @select="onSkuSelect" :storeId="curObject.store_id" :before="checkStore"/>
                </div>
            </div>
            <my-table v-model="items" :columns-list="columns" :editIncell="curObject.check_state === '0'" ref="table"></my-table>
        </Card>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                modelName: 'service_feedback',
                curObjectId: null,
                curObject: {
                    customer_id: '',
                    customer_name: '',
                    service_type_id: '',
                    service_type_name: '',
                    priority: '2',
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
                            trigger: "blur"
                        }
                    ],
                    service_type_id: [
                        {
                            required: true,
                            message: "服务类型不能为空",
                            trigger: "blur"
                        }
                    ],
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
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            onServiceTypeSelect(type) {
                this.curObject.service_type_id = type.id
                this.curObject.service_type_name = type.name
            },
            onCustomerSelect(customer) {
                this.curObject.customer_id = customer.id;
                this.curObject.customer_name = customer.name;
            },
            onInBankSelect(bank) {
                this.curObject.in_bank_id = bank.id;
                this.curObject.in_bank_name = bank.name;
            },
            onOutBankSelect(bank) {
                this.curObject.out_bank_id = bank.id;
                this.curObject.out_bank_name = bank.name;
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
                console.log("选择了XXX", obj);
                this.items.push({
                    product_code: obj.product_code,
                    product_name: obj.product_name,
                    product_spec: obj.product_spec,
                    product_unit: obj.product_unit,
                    sku_id: obj.sku_id,
                    number: 1,
                    note: '',
                })
            },
            removeItem(item, index) {
                this.items.splice(index, 1)
            },
        }
    };
</script>
