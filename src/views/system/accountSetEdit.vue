<template>
    <div>
        <Card v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="编号" prop="code">
                    <Input v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="启用年月" prop="start_year">
                    <Input v-model="curObject.start_year" placeholder="年" :disabled="curObjectId"></Input>
                </FormItem>
                <FormItem label="启用年月" prop="start_month">
                    <Input v-model="curObject.start_month" placeholder="月" :disabled="curObjectId"></Input>
                </FormItem>
                <!--<FormItem label="分支机构" prop="branch_id">-->
                    <!--{{ curObject.branch_name }}-->
                <!--</FormItem>-->
                <FormItem label="备注" prop="note">
                    <Input v-model="curObject.note" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="error" @click="use">设为默认帐套</Button>
                    <Button type="error" @click="init">初始化帐套</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Modal
                v-model="modalVisible"
                title="初始化帐套"
                @on-ok="initOK">
            <p>重新初始化系统将会清空你录入的所有数据，请慎重！</p>
            <p> </p>
            <p>1. 系统将删除您新增的所有科目。</p>
            <p>2. 系统将删除您录入的所有凭证。</p>
            <p>3. 系统将删除您录入的所有初始化数据</p>
            <!--我已清楚了解将产生的后果-->
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modalVisible: false,
                modelName: 'account_set',
                curObjectId: null,
                curObject: {
                    branch_id: '',
                    branch_name: ''
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "编号不能为空",
                            trigger: "title"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                            trigger: "title"
                        }
                    ],
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
            use() {
                this.$http.post(`/${this.modelName}/set_default?id=${this.curObjectId}`).then(
                    response => {
                        this.$Message.success('设置成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            onBranchSelect(branch) {
                this.curObject.branch_id = branch.id
                this.curObject.branch_name = branch.name
            },
            init() {
                this.initOk()
//                this.modalVisible = true
            },
            initOk() {
                this.$http.post(`/${this.modelName}/init?id=${this.curObjectId}`).then(
                    response => {
                        this.$Message.success('初始化成功')
//                        this.getData()
                        //
                        this.$router.push('/login')
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            }
        }
    }
</script>
