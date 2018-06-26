<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">

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

        <Card class="admin-card" v-if="curObjectId && curObject">
            <div class="admin-card-title" slot="title">
                工资项
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                    总金额：{{ totalMoney }}
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
                modelName: 'wage',
                curObjectId: null,
                curObject: {
                    // 单据通用
                    branch_id: this.$util.getBranch().id,
                    branch_name: this.$util.getBranch().name,
                    department_id: this.$util.getDepartment().id,
                    department_name: this.$util.getDepartment().name,
                    business_user_id: this.$util.getUser().id,
                    business_user_name: this.$util.getUser().name,
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
                        title: '工号',
                        key: 'user_code',
                        width: 160
                    },
                    {
                        title: '员工姓名',
                        key: 'user_name',
                        width: 160
                    },
                    {
                        title: '部门',
                        key: 'department_name',
                        width: 160
                    },
                    {
                        title: '职位',
                        key: 'position_name',
                        width: 160
                    },
                    {
                        title: '基本工资',
                        key: 'basic_wage',
                        editable: true,
                        width: 160,
                        dataType: 'number'
                    },
                    {
                        title: '奖金',
                        key: 'bonus',
                        width: 160,
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: '补贴',
                        key: 'subsidy',
                        width: 160,
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: '提成',
                        key: 'commission',
                        width: 160,
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: '计件工资',
                        key: 'piece_rate',
                        width: 160,
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: '应发合计',
                        key: 'basic_wage',
                        width: 160,
                        render: (h, params) => {
                            let item = this.items[params.index]
                            let total = item.basic_wage + item.bonus + item.subsidy + item.commission + item.piece_rate
                            return h('div', total);
                        }
                    },
                    {
                        title: '个人所得税',
                        key: 'tax',
                        width: 160,
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: '罚金',
                        key: 'fine',
                        width: 160,
                        editable: true,
                        dataType: 'number'
                    },
                    {
                        title: '应扣合计',
                        key: 'fine2',
                        width: 160,
//                        quickRender(item, index) {
//                            return item.tax + item.fine
//                        }
                        render: (h, params) => {
                            let item = this.items[params.index]
                            let total = item.tax + item.fine
                            return h('div', total);
                        }
                    },
                    {
                        title: '实发合计',
                        key: 'total',
                        width: 160,
                        render: (h, params) => {
                            let item = this.items[params.index]
                            let totalIn = item.basic_wage + item.bonus + item.subsidy + item.commission + item.piece_rate
                            let totalOut = item.tax + item.fine
                            let total = totalIn - totalOut
                            return h('div', total);
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
        computed: {
            totalMoney() {
                let total = 0
                for (let item of this.items) {
                    total += item.total
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
            onUserSelect(user) {
                console.log(user)
                this.items.push({
                    wage_id: this.curObjectId,
                    user_id: user.id,
                    user_code: user.code,
                    user_name: user.name,
                    department_name: user.department_name,
                    position_name: user.position_name,
                    basic_wage: 0,
                    bonus: 0,
                    subsidy: 0,
                    fine: 0,
                    tax: 0,
                    piece_rate: 0
                })
            },
            removeItem(item, index) {
                this.items.splice(index, 1)
            },
        }
    }
</script>
