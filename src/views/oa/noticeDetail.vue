<template>
    <div>
        <Card v-if="curObject">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="标题" prop="title">
                    {{ curObject.title }}
                </FormItem>
                <!--<FormItem label="分支机构" prop="branch_id">-->
                    <!--{{ curObject.branch_name }}-->
                <!--</FormItem>-->
                <FormItem label="公告内容" prop="content">
                    {{ curObject.content }}
                </FormItem>
                <FormItem label="发布时间" prop="content">
                    {{ curObject.create_time }}
                </FormItem>
                <FormItem label="发布人" prop="content">
                    {{ curObject.user_name }}
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'notice',
                curObjectId: null,
                curObject: {},
                validate: {
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
