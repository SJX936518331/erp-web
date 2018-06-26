<template>
    <div>
        <Card v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="编号" prop="code">
                    <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="会计科目" prop="account_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.account_name }}</div>
                        <div class="selector">
                            <my-account-selector @select="onAccountSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="类型" prop="type">
                    <RadioGroup v-model="curObject.type">
                        <Radio label="1">
                            <span>现金</span>
                        </Radio>
                        <Radio label="2">
                            <span>银行</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="银行全称" prop="bank_full_name" v-if="curObject.type === '2'">
                    <Input class="form-common-width" v-model="curObject.bank_full_name" placeholder=""></Input>
                </FormItem>
                <FormItem label="银行账户" prop="bank_account" v-if="curObject.type === '2'">
                    <Input class="form-common-width" v-model="curObject.bank_account" placeholder=""></Input>
                </FormItem>
                <FormItem label="开户人" prop="bank_user" v-if="curObject.type === '2'">
                    <Input class="form-common-width" v-model="curObject.bank_user" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" type="textarea" v-model="curObject.note" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="reset">重置</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'bank',
                curObject: {
                    type: '1',
                    account_id: '',
                    account_name: '',
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "编号不能为空",
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                        }
                    ],
                    account_id: [
                        {
                            required: true,
                            message: "会计科目不能为空",
                        }
                    ]
                },
            }
        },
        mounted() {
            this._curObject = this.$clone(this.curObject)
            this.curObject.type = this.$route.query.type || '1'
            this.getData()
        },
        methods: {
            reset() {
                this.$refs.form.resetFields()
                this.curObject = this.$clone(this._curObject)
            },
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
                            if (!this.curObjectId) {
                                this.reset()
                            }
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            onAccountSelect(account) {
                this.curObject.account_id = account.id
                this.curObject.account_name = account.name
            }
        }
    }
</script>
