<template>
    <div>
        <Card v-if="curObject">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="凭证字" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="打印标题" prop="print_name">
                    <Input class="form-common-width" v-model="curObject.print_name" placeholder=""></Input>
                </FormItem>
                <FormItem label="是否默认" prop="is_default">
                    <RadioGroup v-model="curObject.is_default">
                        <Radio label="1" :disabled="curObjectId && originIsDefault === '1'">
                            <span>是</span>
                        </Radio>
                        <Radio label="0" :disabled="curObjectId && originIsDefault === '1'">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
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
                modelName: 'voucher_type',
                curObjectId: null,
                curObject: {
                    is_default: '0'
                },
                originIsDefault: '',
                validate: {
                    name: [
                        {
                            required: true,
                            message: "凭证字不能为空",
                        }
                    ],
                    print_name: [
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
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        this.originIsDefault = this.curObject.is_default
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
            }
        }
    }
</script>
