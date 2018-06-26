<template>
    <div class="container">
        <Card>
            <Form ref="form" :model="logistics" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="物流名称" prop="name">
                    <Input class="form-common-width" v-model="logistics.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="快递公司" prop="company">
                    <Input class="form-common-width" v-model="logistics.company" placeholder=""></Input>
                </FormItem>
                <FormItem label="联系人姓名" prop="contacts_name">
                    <Input class="form-common-width" v-model="logistics.contacts_name" placeholder=""></Input>
                </FormItem>
                <FormItem label="联系人电话" prop="contacts_phone">
                    <Input class="form-common-width" v-model="logistics.contacts_phone" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="logistics.note" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
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
                logistics: {},
                validate: {
                    name: [
                        {
                            required: true,
                            message: "物流名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    company: [
                        {
                            required: true,
                            message: "快递公司不能为空",
                            trigger: "blur"
                        }
                    ],
                    contacts_phone: [
                        {
                            required: true,
                            message: "联系人电话不能为空",
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
            getData() {
                this.logisticsId = this.$route.params.id;
                if (!this.logisticsId) {
                    return;
                }
                this.$http.get("/logistics/detail?id=" + this.logisticsId).then(
                    response => {
                        let data = response.data;
                        this.logistics = data.data;
                        console.log(this.logistics);
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
                    let url = this.logisticsId ? "/logistics/update" : "/logistics/add";
                    this.$http.post(url, this.logistics).then(
                        response => {
                            this.$Message.success("保存成功");
                        },
                        response => {
                            this.$Message.error("系统出错");
                        }
                    );
                });
            },
            selectUserItem(user) {
                console.log("选择了2", user);
                this.logistics.contacts_id = user.id;
                this.logistics.contacts_name = user.name;
            }
        }
    };
</script>
