<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">

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

        <Card class="admin-card" v-if="curObjectId && curObject">
            <div class="admin-card-title" slot="title">
                工资项
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                    总金额：￥{{ curObject.totalMoney }}
                </div>
                <div class="tool-right">
                    <my-user-selector @select="onUserSelect" />
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
                modelName: 'piecework_wage',
                curObjectId: null,
                curObject: {
                    department_id: '',
                    department_name: '',
                    business_user_id: '',
                    business_user_name: '',
                    branch_id: '',
                    branch_name: '',
                },
                validate: {
                    title: [
                        {
                            required: true,
                            message: "标题不能为空",
                            trigger: "title"
                        }
                    ],
                    business_user_id: [
                        {
                            required: true,
                            message: "业务员不能为空",
                            trigger: "title"
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: "公告内容不能为空",
                            trigger: "content"
                        }
                    ]
                },
                columns: [
                    {
                        title: "员工",
                        key: "user_name"
                    },
                    {
                        title: "部门",
                        key: "department_name"
                    },
                    {
                        title: "工种名称",
                        key: "work_type_name"
                    },
                    {
                        title: "工序名称",
                        key: "work_process_name"
                    },
                    {
                        title: "单位",
                        key: "name",
                        render: (h, params)=>{
                            return h('div', {}, '个')
                        }
                    },
                    {
                        title: "数量",
                        key: "number",
                        ediable: true
                    },
                    {
                        title: "单价",
                        key: "price"
                    },
                    {
                        title: "加班费",
                        key: "overtime_wage"
                    },
                    {
                        title: "金额",
                        key: "total",
                        render: (h, params)=>{
                            let item = this.items[params.index]
                            return h('div', {}, item.number * item.price + item.overtime_wage)
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "25px"
                                        },
                                        on: {
                                            click: () => {
                                                this.saveItem(this.items[params.index], params.index)
                                            }
                                        }
                                    },
                                    "保存"
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
                items: []
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
            onUserSelect(obj) {
                this.$http.post(`/piecework_wage_item/add`, {
                    piecework_wage_id: this.curObjectId,
                    user_id: obj.id,
                }).then(
                    response => {
                        this.getData()
                    },
                    response => {
                        console.log(response)
                    }
                )
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
            saveItem(item, index) {
                console.log('保存', item)
                this.$http.post(`/piecework_wage_item/update`, {
                    wage_id: this.curObjectId,
                    id: item.id,
                    user_id: item.user_id,
//                    "code": "001",
                    basic_wage: item.basic_wage,
                    bonus: item.bonus,
                    subsidy: item.subsidy,
                    fine: item.fine,
                    tax: item.tax,
                    commission: item.commission,
                    piece_rate: item.piece_rate
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
                this.$http.post(`/piecework_wage_item/remove?id=` + item.id).then(
                    response => {
                        this.getData()
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
        }
    }
</script>
