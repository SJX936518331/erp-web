<template>
    <div class="container">
        <Card>
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="仓库编号" prop="code">
                    <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="仓库名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="管理员" prop="manager_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.manager_name }}</div>
                        <div class="selector">
                            <my-user-selector @select="selectUserItem"/>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="分支机构" prop="branch_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.branch_name }}</div>
                        <div class="selector">
                            <my-branch-selector @select="onBranchSelect"/>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input class="form-common-width" type="textarea" v-model="curObject.address" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" type="textarea" v-model="curObject.note" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <!--<Button type="ghost" style="margin-left: 8px">取消</Button>-->
                    <Button type="ghost" style="margin-left: 8px" @click="reset">重置</Button>
                </FormItem>
            </Form>
        </Card>
        <my-footer/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curObject: {
                    code: '',
                    name: '',
                    manager_id: '',
                    manager_name: '',
                    branch_id: '',
                    branch_name: '',
                    address: '',
                    note: ''
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "仓库编号不能为空",
                            trigger: "blur"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "仓库名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    branch_id: [
                        {
                            required: true,
                            message: "分支机构不能为空",
                            trigger: "content"
                        }
                    ],
                    address: [
                        {
                            message: "地址不能为空",
                            trigger: "blur"
                        }
                    ],
                    note: [
                        {
                            message: "备注不能为空",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            reset() {
                console.log('reset')
                this.$refs.form.resetFields()
                this.curObject.manager_name = ''
                this.curObject.branch_name = ''

            },
            getData() {
                this.curObjectId = this.$route.params.id;
                if (!this.curObjectId) {
                    return;
                }
                this.$http.get("/store/detail?id=" + this.curObjectId).then(
                    response => {
                        let data = response.data;
                        this.curObject = data.data;
                        console.log(this.curObject);
                    },
                    response => {
                        console.log(response);
                    }
                );
            },
            save() {
                this.$refs["form"].validate(valid => {
                    if (!valid) {
                        this.$Message.error("请完善表单");
                        return;
                    }
                    let url = this.curObjectId ? "/store/update" : "/store/add";
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success("保存成功");
                            if (!this.curObjectId) {
                                this.reset()
                            }
                        },
                        response => {
                            this.$Message.error("系统出错");
                        }
                    );
                });
            },
            onBranchSelect(branch) {
                this.curObject.branch_id = branch.id;
                this.curObject.branch_name = branch.name;
            },
            selectUserItem(user) {
                console.log("选择了2", user);
                this.curObject.manager_id = user.id;
                this.curObject.manager_name = user.name;
            }
        }
    };
</script>
