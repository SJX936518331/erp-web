<template>
    <div>
        <Card>
            <p slot="title">
                供应商编辑
            </p>
            <div>
                <p slot="title">联系人信息</p>
                <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="编号" prop="code">
                        <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="类型" prop="type_id">
                        <Select class="form-common-width" v-model="curObject.type_id" placeholder="">
                            <Option :value="type.id" v-for="type in types" :key="type.id">{{ type.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <Select class="form-common-width" v-model="curObject.gender" placeholder="">
                            <Option value="">请选择</Option>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input class="form-common-width" v-model="curObject.phone" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input class="form-common-width" v-model="curObject.email" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input class="form-common-width" v-model="curObject.address" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder=""></Input>
                    </FormItem>
                </Form>
                <p slot="title">银行账户信息</p>
                <Form ref="form1" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="开户行" prop="bank_name">
                        <Input class="form-common-width" v-model="curObject.bank_name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="银行账户" prop="bank_user">
                        <Input class="form-common-width" v-model="curObject.bank_user" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="银行账号" prop="bank_account">
                        <Input class="form-common-width" v-model="curObject.bank_account" placeholder=""></Input>
                    </FormItem>
                    <!--<FormItem label="开户行" prop="bank_name">-->
                        <!--<div>{{ curObject.bank_name }}</div>-->
                        <!--<Button @click="selectName">选择开户行</Button>-->
                    <!--</FormItem>-->
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'supplier',
                curObjectId: null,
                curObject: {
                    type: '1',
                    type_id: ''
                },
                types: [],
                editData: [],
                validate: {
                    name: [
                        {
                            required: true,
                            message: "联系人名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "编号不能为空",
                            trigger: "blur"
                        }
                    ],
//                    phone: [
//                        {
//                            required: true,
//                            message: "手机号不能为空",
//                            trigger: "blur"
//                        }
//                    ],
//                    bank_name: [
//                        {
//                            required: true,
//                            message: "开户行不能为空",
//                            trigger: "blur"
//                        }
//                    ]
                },
                // 用户选择
                banks: [],
                bankModalVisible: false,
                bankColumn: [
                    {
                        title: "编号",
                        key: "code"
                    },
                    {
                        title: "开户行",
                        key: "name"
                    },
                    {
                        title: "银行账户",
                        key: "account"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectBankItem(this.banks[params.index]);
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ]
            };
        },
        mounted() {
            this.getData();
            //            this.selectUser()
        },
        methods: {
            getData() {
                // 查询客户类型
                this.$http.get(`/customer_type/all`).then(
                    response => {
                        let data = response.data
                        this.types = data.data
                        console.log('类型', this.types)
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 查询客户详情
                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
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
        }
    };
</script>
