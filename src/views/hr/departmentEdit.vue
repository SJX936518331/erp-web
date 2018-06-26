<template>
    <div>
        <Card>
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="部门编号" prop="code">
                    <Input class="form-common-width" v-model="curObject.code" placeholder="请输入你的部门编号"></Input>
                </FormItem>
                <FormItem label="部门名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder="请输入部门名称"></Input>
                </FormItem>
                <FormItem label="分支机构" prop="branch_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.branch_name }}</div>
                        <div class="selector">
                            <my-branch-selector @select="onBranchSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="部门负责人" prop="manager_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.manager_name }}</div>
                        <div class="selector">
                            <my-user-selector @select="onUserSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder="请输入你的备注"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curObject: {
                    branch_id: '',
                    branch_name: '',
                    manager_id: '',
                    manager_name: ''
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "部门名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    note: [
                    ],
                    code: [
                        {
                            required: true,
                            message: "部门编号不能为空",
                            trigger: "blur"
                        }
                    ],
                    branch_id: [
                        {
                            required: true,
                            message: "分支机构不能为空",
                            trigger: "blur"
                        }
                    ],
                    manager_id: [
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
                this.$http.get('/department/detail?id=' + this.curObjectId).then(
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
                    let url = this.curObjectId ? '/department/update' : '/department/add'
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
                console.log('选择', branch)
                this.curObject.branch_id = branch.id
                this.curObject.branch_name = branch.name
            },
            onUserSelect(user) {
                this.curObject.manager_id = user.id
                this.curObject.manager_name = user.name
            },
        }
    }
</script>