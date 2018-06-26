<template>
    <div>
        <Card>
            <div>
                <Form ref="form" :model="log" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="日志内容" prop="content">
                        <Input class="form-common-width" v-model="log.content" type="textarea" placeholder="请输入日志内容"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                log: {},
                validate: {
                    content: [
                        {
                            required: true,
                            message: "日志内容不能为空",
                            trigger: "blur"
                        }
                    ]
                },
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.logId = this.$route.params.id;
                if (!this.logId) {
                    return;
                }
                this.$http.get("/work_log/detail?id=" + this.logId).then(
                    response => {
                        let data = response.data;
                        this.log = data.data;
                        console.log(this.log);
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
                    let url = this.logId ? "/work_log/update" : "/work_log/add";
                    this.$http.post(url, this.log).then(
                        response => {
                            this.$Message.success("保存成功");
                        },
                        response => {
                            this.$Message.error("系统出错");
                        }
                    );
                });
            },
        }
    };
</script>
