<template>
    <div>
        <Card>
            <p slot="title">
                申请编辑
            </p>
            <div>
                <Form class="admin-form" ref="form" :model="apply" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="类型" prop="type_id">
                        <div class="form-selector">
                            <div class="value">{{ apply.type_name }}</div>
                            <div class="selector">
                                <my-apply-type-selector @select="onApplyTypeSelect" />
                            </div>
                        </div>
                    </FormItem>
                    <FormItem label="开始日期" prop="start_time">
                        <DatePicker class="form-common-width" v-model="apply.start_time" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="结束日期" prop="end_time">
                        <DatePicker class="form-common-width" v-model="apply.end_time" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="天数" prop="day">
                        <Input class="form-common-width" v-model="day" placeholder="请输入天数"></Input>
                    </FormItem>
                    <FormItem label="内容" prop="content">
                        <Input class="form-common-width" v-model="apply.content" type="textarea" placeholder="请输入内容"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Modal v-model="applyTypeModalVisible" title="选择类型" :width="800" okText="212" @on-ok="userModalOk"
               @on-cancel="userModalCancel">
            <Table :columns="applyTypeColumn" :data="type"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import {format} from '../../util/time'

    export default {
        data() {
            return {
                apply: {
                    type_id: '',
                    type_name: ''
                },
                day: '',
                editData: [],
                editForm: {
                    name: "",
                    beizhu: "",
                    id: "",
                    people: ""
                },
                editForm1: {
                    name: "",
                    beizhu: "",
                    id: "",
                    people: ""
                },
                validate: {
                    type: [
                        {
                            required: true,
                            message: "类型不能为空",
                            trigger: "blur"
                        }
                    ],
                    create_time: [
                        {
                            required: true,
                            message: "开始日期不能为空",
                            trigger: "blur"
                        }
                    ],
                    check_time: [
                        {
                            required: true,
                            message: "结束日期不能为空",
                            trigger: "blur"
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: "内容不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                // 分支机构选择
                type: [],
                applyTypeModalVisible: false,
                applyTypeColumn: [
                    {
                        title: "编号",
                        key: "id"
                    },
                    {
                        title: "名称",
                        key: "name"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectTypeItem(this.type[params.index]);
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ]
            };
        },
        mounted() {
            this.getData();
            //            this.selectUser()
        },
        methods: {
            getData() {
                this.applyId = this.$route.params.id;
                if (!this.applyId) {
                    return;
                }
                this.$http.get("/apply/detail?id=" + this.applyId).then(
                    response => {
                        let data = response.data;
                        this.apply = data.data;
                        console.log(this.apply);
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
                    this.apply.start_time = format(this.apply.start_time, 'yyyy-MM-dd')
                    this.apply.end_time = format(this.apply.end_time, 'yyyy-MM-dd')
                    let url = this.applyId ? "/apply/update" : "/apply/add";
                    this.$http.post(url, this.apply).then(
                        response => {
                            this.$Message.success("保存成功");
                        },
                        response => {
                            this.$Message.error("系统出错");
                            console.log(response);
                        }
                    );
                });
            },
            onApplyTypeSelect(type) {
                console.log('选择了', type)
                this.apply.type_id = type.id
                this.apply.type_name = type.name
            },
            selectType() {
                this.applyTypeModalVisible = true;
                this.$http.get("/apply_type/all").then(
                    response => {
                        let data = response.data;
                        this.type = data.data;
                        console.log(this.type);
                    },
                    response => {
                        console.log(response);
                    }
                );
            },
            selectTypeItem(type) {
                console.log("选择了", type);
                this.apply.apply_user_id = type.id;
                this.apply.check_user_id = type.id;
                this.apply.check_state = type.id;
                this.apply.type = type.id;
                this.applyTypeModalVisible = false;
            },
            userModalOk() {
                if (
                    this.editForm.name == "" ||
                    this.editForm.beizhu == "" ||
                    this.editForm.id == "" ||
                    this.editForm.people == ""
                ) {
                    this.$Message.info("请把信息填完整");
                } else {
                    this.data1.push({
                        index: this.data1.length + 1,
                        name: this.editForm.name,
                        beizhu: this.editForm.beizhu,
                        id: this.editForm.id,
                        people: this.editForm.people
                    });
                    this.$Message.info("添加部门成功");
                    this.editForm.name = "";
                    this.editForm.beizhu = "";
                    this.editForm.id = "";
                    this.editForm.people = "";
                }
            },
            userModalCancel() {
            }
        }
    };
</script>