<template>
    <div>
        <Card v-if="curObject">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="类型" prop="type">
                    <Select class="form-common-width" v-model="curObject.type">
                        <Option value="1">资产增加</Option>
                        <Option value="2">资产减少</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="curObject.note" placeholder=""></Input>
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
                modelName: 'asset_io_type',
                curObjectId: null,
                curObject: {
                    type: '1'
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "名称不能为空"
                        },
                    ],
                    type: [
                        {
                            required: true,
                            message: "类型不能为空"
                        },
                    ],
                },
            }
        },
        mounted() {
            this.curObject.type = this.$route.query.type || '1'
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
            onBranchSelect(branch) {
                this.curObject.branch_id = branch.id
                this.curObject.branch_name = branch.name
            },
        }
    }
</script>
