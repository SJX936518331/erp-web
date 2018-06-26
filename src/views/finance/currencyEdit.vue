<template>
    <div>
        <Card v-if="curObject">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="编码" prop="code">
                    <Input class="form-common-width" v-model="curObject.code" placeholder="":disabled="!formEditable"></Input>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder="" :disabled="!formEditable"></Input>
                </FormItem>
                <FormItem label="汇率" prop="rate">
                    <Input class="form-common-width" v-model="curObject.rate" type="number" placeholder="" :disabled="!formEditable"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <!--<Button type="ghost" @click="saveAndClose">保存并关闭</Button>-->
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
                modelName: 'currency',
                curObject: {
                    code: '',
                    name: '',
                    rate: null
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "编码不能为空",
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                        }
                    ],
                    rate: [
                        {
                            required: true,
                            message: "汇率不能为空",
                        }
                    ]
                },
                formEditable: true,
            }
        },
        mounted() {
            this._curObject = this.$clone(this.curObject)
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
                        if (this.curObject.is_default === '1') {
                            this.formEditable = false
                        }
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
            saveAndClose() {
                this.$store.commit('clearAllTags');
            }
        }
    }
</script>
