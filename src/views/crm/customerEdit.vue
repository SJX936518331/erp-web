<template>
    <div>
        <Card class="admin-card">
            <p slot="title">
                客户编辑
            </p>
            <div>
                <p slot="title">联系人信息</p>
                <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="编号" prop="code">
                        <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="类型" prop="type_id">
                        <Select class="form-common-width" v-model="curObject.type_id" placeholder="">
                            <Option :value="type.id" v-for="type in types" :key="type.id">{{ type.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <Select class="form-common-width" v-model="curObject.gender" placeholder="">
                            <Option value="">请选择</Option>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input class="form-common-width" v-model="curObject.phone" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input class="form-common-width" v-model="curObject.email" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="行业" prop="industry_id">
                        <Select class="form-common-width" v-model="curObject.industry_id" placeholder="">
                            <Option :value="industry.id" v-for="industry in industries" :key="industry.id">{{ industry.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="地区" prop="area_id">
                        {{ curObject.area_name }}
                        <!--<my-area-select />-->
                        <Select v-model="provinceCode" placeholder="" style="width: 160px">
                            <Option :value="province.code" v-for="province in provinces" :key="province.code">{{ province.name }}</Option>
                        </Select>
                        <Select v-model="cityCode" placeholder="" style="width: 160px">
                            <Option :value="city.code" v-for="city in cities" :key="city.code">{{ city.name }}</Option>
                        </Select>
                        <Select v-model="areaId" placeholder="" style="width: 160px">
                            <Option :value="area.id" v-for="area in areas" :key="area.code">{{ area.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="详细地址" prop="address">
                        <Input class="form-common-width" v-model="curObject.address" type="textarea" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder=""></Input>
                    </FormItem>
                </Form>
                <p slot="title">银行账户信息</p>
                <Form ref="form1" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                    <FormItem label="开户行" prop="bank_name">
                        <Input class="form-common-width" v-model="curObject.bank_name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="银行账户" prop="bank_user">
                        <Input class="form-common-width" v-model="curObject.bank_user" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="银行账号" prop="bank_account">
                        <Input class="form-common-width" v-model="curObject.bank_account" placeholder=""></Input>
                    </FormItem>
                    <!--<FormItem label="开户行" prop="bank_name">-->
                        <!--<div>{{ curObject.bank_name }}</div>-->
                        <!--<Button @click="selectName">选择开户行</Button>-->
                    <!--</FormItem>-->
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Card class="admin-card">
            <div class="admin-card-title" slot="title">
                联系人
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right" v-if="curObject.check_state !== '1'">
                    <Button @click="addContact">添加联系人</Button>
                </div>
            </div>
            <my-table v-model="contacts" :columns-list="columns" :editIncell="true" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'customer',
                curObjectId: null,
                curObject: {
                    type: '1',
                    type_id: ''
                },
                types: [],
                industries: [],
                contacts: [],
                editData: [],
                validate: {
                    name: [
                        {
                            required: true,
                            message: "联系人名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "编号不能为空",
                            trigger: "blur"
                        }
                    ],
//                    phone: [
//                        {
//                            required: true,
//                            message: "手机号不能为空",
//                            trigger: "blur"
//                        }
//                    ],
//                    bank_name: [
//                        {
//                            required: true,
//                            message: "开户行不能为空",
//                            trigger: "blur"
//                        }
//                    ]
                },
                columns: [
                    {
                        title: "姓名",
                        key: "name",
                        editable: true
                    },
                    {
                        title: "电话",
                        key: "phone",
                        editable: true
                    },
                    {
                        title: "性别",
                        key: "sex",
                        render: (h, params) => {
                            let item = this.contacts[params.index]
                            return h('div', item.sex === '1' ? '男' : '女')
                        },
                        editable: true
                    },
                    {
                        title: "备注",
                        key: "note",
                        editable: true
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            if (this.curObject && this.curObject.check_state === '1') {
                                return null
                            }
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeItem(this.items[params.index], params.index)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                // 地区
                provinceCode: '',
                provinces: [],
                cityCode: '',
                cities: [],
                areaId: '',
                areaCode: '',
                areas: []
            };
        },
        mounted() {
            this.getData();
            //
            this.$http.get(`/province/all`).then(
                response => {
                    let data = response.data
                    this.provinces = data.data
                },
                response => {
                    console.log(response)
                }
            )
        },
        methods: {
            getData() {
                // 查询客户类型
                this.$http.get(`/customer_type/all`).then(
                    response => {
                        let data = response.data
                        this.types = data.data
                        console.log('类型', this.types)
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 行业
                this.$http.get(`/industry/all`).then(
                    response => {
                        let data = response.data
                        this.industries = data.data
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 查询客户详情
                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        this.contacts = this.curObject.contacts
                        if (this.curObject.area) {
                            this.areaId = this.curObject.area.id
                            this.cityCode = this.curObject.area.city_code
                            this.provinceCode = this.curObject.area.province_code
                        }
                        console.log(this.curObject)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            addContact() {
                this.contacts.push({
                    name: '',
                    phone: '',
                    sex: 0
                })
            },
            save() {
                this.$refs['form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('请完善表单')
                        return
                    }
                    this.curObject.contacts = this.contacts
                    this.curObject.area_id = this.areaId
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
        },
        watch: {
            provinceCode() {
                this.$http.get(`/city/all?province_code=${this.provinceCode}`).then(
                    response => {
                        let data = response.data
                        this.cities = data.data
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            cityCode() {
                this.$http.get(`/area/all?city_code=${this.cityCode}`).then(
                    response => {
                        let data = response.data
                        this.areas = data.data
                    },
                    response => {
                        console.log(response)
                    }
                )
            }
        }
    };
</script>
