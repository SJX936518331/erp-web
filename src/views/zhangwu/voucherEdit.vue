<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="日期" prop="date">
                    <DatePicker v-model="curObject.date" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="凭证序号" prop="order_code">
                    <Input v-model="curObject.order_code" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem label="凭证字" prop="type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.type_name }}</div>
                        <div class="selector">
                            <my-voucher-type-selector @select="onTypeSelect" />
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
                分录
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right" v-if="formEditable">
                    <my-account-selector @select="onAccountSelect" />
                </div>
            </div>
            <my-table v-model="items" :columns-list="columns" :editIncell="formEditable" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    import {format} from '../../util/time'

    export default {
        data() {
            return {
                modelName: 'voucher',
                curObjectId: null,
                curObject: {
                    type_id: '',
                    type_name: '',
                    date: '',
                    order_code: ''
                },
                validate: {
                    title: [
                        {
                            required: true,
                            message: "标题不能为空",
                            trigger: "title"
                        }
                    ],
                    order_code: [
                        {
                            required: true,
                            message: "凭证序号不能为空",
                        }
                    ],
                    type_id: [
                        {
                            required: true,
                            message: "凭证字不能为空",
                        }
                    ]
                },
                columns: [
                    {
                        title: "摘要",
                        key: "summary",
                        editable: true
                    },
                    {
                        title: "会计科目",
                        key: "account_name",
                        editable: true
                    },
                    {
                        title: "借方金额",
                        key: "out_price",
                        editable: true
                    },
                    {
                        title: "贷方金额",
                        key: "in_price",
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
        mounted() {
            let now = new Date()
            let accountSet = this.$util.getAccountSet()
            // TODO
            this.curObject.date = new Date()
            if (this.$route.params.id) {
                this.curObjectId = this.$route.params.id
            }
            this.getData()
        },
        methods: {
            getData() {
                this.$http.get(`/voucher/order_code?account_set_id=` + this.$util.getAccountSet().id).then(
                    response => {
                        this.curObject.order_code = response.data.data
                    },
                    response => {
                        console.log(response)
                    }
                )
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
            onTypeSelect(type) {
                this.curObject.type_id = type.id
                this.curObject.type_name = type.name
            },
            onAccountSelect(account) {
                this.items.push({
                    summary: '',
                    account_id: account.id,
                    account_name: account.name,
                    in_price: 0,
                    out_price: 0
                })
            },
            removeItem(item, index) {
                this.items.splice(index, 1)
            },
        }
    }
</script>
