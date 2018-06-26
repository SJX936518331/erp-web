<template>
    <div>
        <Card v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="编号" prop="code">
                    <Input  class="form-common-width"v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="助记码" prop="key">
                    <Input class="form-common-width" v-model="curObject.key" placeholder=""></Input>
                </FormItem>
                <FormItem label="类型" prop="type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.type_name }}</div>
                        <div class="selector">
                            <my-account-type-selector @select="onAccountTypeSelect" :type="type" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="余额方向" prop="direction">
                    <RadioGroup v-model="curObject.direction">
                        <Radio label="1">
                            <span>借</span>
                        </Radio>
                        <Radio label="2">
                            <span>贷</span>
                        </Radio>
                    </RadioGroup>
                    <!--{{ curObject.direction }}-->
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'account',
                curObject: {
                    type_id: '',
                    type_name: '',
                    direction: '1'
                },
                type: 1,
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
            this.getData()
        },
        methods: {
            getData() {
                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    let type = this.$route.query.type
                    if (type) {
                        this.type = type
                        if (this.type === '1') {
                            this.curObject.type_id = '7'
                            this.curObject.type_name = '非流动资产'
                            this.curObject.direction = '1'
                        } else if (this.type === '2') {
                            this.curObject.type_id = '8'
                            this.curObject.type_name = '非流动负债'
                            this.curObject.direction = '2'
                        } else if (this.type === '3') {
                            this.curObject.type_id = '3'
                            this.curObject.type_name = '所有者权益'
                            this.curObject.direction = '2'
                        } else if (this.type === '4') {
                            this.curObject.type_id = '4'
                            this.curObject.type_name = '成本'
                            this.curObject.direction = '1'
                        } else if (this.type === '5') {
                            this.curObject.type_id = '9'
                            this.curObject.type_name = '其他利益'
                            this.curObject.direction = '2'
                        }

                    }
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
            onAccountTypeSelect(type) {
                this.curObject.type_id = type.id
                this.curObject.type_name = type.name
            }
        }
    }
</script>
