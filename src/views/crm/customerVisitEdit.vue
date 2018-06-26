<template>
    <div>
        <Card>
            <Form ref="form" :model="customer_visit" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="客户" prop="customer_name">
                    <div>{{ customer_visit.customer_name }}</div>
                    <my-customer-selector @select="onCustomerSelect" />
                </FormItem>
                <FormItem label="业务员" prop="business_user_name">
                    <div>{{ customer_visit.business_user_name }}</div>
                    <my-user-selector @select="onUserSelect" />
                </FormItem>
                <FormItem label="回访方式" prop="visit_type_name">
                    <div>{{ customer_visit.visit_type_name }}</div>
                    <my-visit-type-selector @select="onVisitTypeSelect" />
                    <!--<Button @click="selectVisitType">选择回访方式</Button>-->
                </FormItem>
                <!--<FormItem label="日期" prop="time">-->
                    <!--<DatePicker v-model="customer_visit.time" type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
                <!--</FormItem>-->
                <!--{{ customer_visit }}-->
                <FormItem label="回访内容" prop="content">
                    <Input v-model="customer_visit.content" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem label="回访结果" prop="result">
                    <Select v-model="customer_visit.result" style="width:200px">
                        <Option value="1">需继续跟进</Option>
                        <Option value="2">无需跟进</Option>
                        <Option value="3">问题解决</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input v-model="customer_visit.note" type="textarea" placeholder=""></Input>
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
                modelName: 'customer',
                customer_visit: {
                    customer_id: '',
                    customer_name: '',
                    visit_type_id: '',
                    visit_type_name: '',
                    business_user_id: '',
                    business_user_name: ''
                },
                validate: {
                    user_name: [
                        {
                            required: true,
                            message: "客户不能为空",
                            trigger: "blur"
                        }
                    ],
                    visit_type_name: [
                        {
                            required: true,
                            message: "回访方式不能为空",
                            trigger: "blur"
                        }
                    ],
                    time: [
                        {
                            required: true,
                            message: "日期不能为空",
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
                this.customer_visit_id = this.$route.params.id;
                if (!this.customer_visit_id) {
                    return;
                }
                this.$http
                    .get("/customer_visit/detail?id=" + this.customer_visit_id)
                    .then(
                        response => {
                            let data = response.data;
                            this.customer_visit = data.data;
                            console.log(this.customer_visit);
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
                    let url = this.customer_visit_id
                        ? "/customer_visit/update"
                        : "/customer_visit/add";
                    this.$http.post(url, this.customer_visit).then(
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
                this.customer_visit.business_user_id = user.id
                this.customer_visit.business_user_name = user.name
            },
            onCustomerSelect(customer) {
                this.customer_visit.customer_id = customer.id
                this.customer_visit.customer_name = customer.name
            },
            onVisitTypeSelect(type) {
                this.customer_visit.visit_type_id = type.id
                this.customer_visit.visit_type_name = type.name
            }
        }
    };
</script>
