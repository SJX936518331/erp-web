<template>
    <div>
        <Card>
            <p slot="title">
                分支机构编辑
            </p>
            <Form class="admin-form" ref="form" :model="branch" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="机构编号" prop="code">
                    <Input class="form-common-width" v-model="branch.code" placeholder="请输入机构编号"></Input>
                </FormItem>
                <FormItem label="机构名称" prop="name">
                    <Input class="form-common-width" v-model="branch.name" placeholder="请输入机构名称"></Input>
                </FormItem>
                <FormItem label="负责人" prop="manager_id">
                    <div class="form-selector">
                        <div class="value">{{ branch.manager_name }}</div>
                        <div class="selector">
                            <my-user-selector @select="onUserSelect" text="选择负责人" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input class="form-common-width" v-model="branch.address" placeholder="请输入地址"></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="branch.note" type="textarea" placeholder="请输入备注"></Input>
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
                branch: {
                    manager_id: '',
                    manager_name: ''
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "机构名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "机构编号不能为空",
                            trigger: "blur"
                        }
                    ],
                },
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.branchId = this.$route.params.id;
                if (!this.branchId) {
                    return;
                }
                this.$http.get("/branch/detail?id=" + this.branchId).then(
                    response => {
                        let data = response.data;
                        this.branch = data.data;
                        console.log(this.branch);
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
                    let url = this.branchId ? "/branch/update" : "/branch/add";
                    this.$http.post(url, this.branch).then(
                        response => {
                            this.$Message.success("保存成功");
                        },
                        response => {
                            this.$Message.error("系统出错");
                        }
                    );
                });
            },
            onUserSelect(user) {
                this.branch.manager_id = user.id
                this.branch.manager_name = user.name
            },
        }
    };
</script>