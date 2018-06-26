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
                <FormItem label="仓库" prop="store_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.store_name }}</div>
                        <div class="selector">
                            <my-store-selector @select="onStoreSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" type="textarea" v-model="curObject.note" placeholder="请输入备注"></Input>
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
                modelName: 'store_location',
                curObject: {
                    code: '',
                    name: '',
                    store_id: '',
                    store_name: ''
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
                    store_id: [
                        {
                            required: true,
                            message: "仓库不能为空",
                        }
                    ]
                },
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
            onStoreSelect(store) {
                this.curObject.store_id = store.id
                this.curObject.store_name = store.name
            },
        }
    }
</script>
