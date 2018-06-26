<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <div class="admin-card-title" slot="title">
                基本信息
            </div>
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="编号" prop="code">
                    <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="类型" prop="asset_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.asset_type_name }}</div>
                        <div class="selector">
                            <my-asset-type-selector @select="onAssetTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="增减方式" prop="asset_io_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.asset_io_type_name }}</div>
                        <div class="selector">
                            <my-asset-io-type-selector @select="onAssetIoTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="使用方式" prop="asset_use_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.asset_use_type_name }}</div>
                        <div class="selector">
                            <my-asset-use-type-selector @select="onAssetUseTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="规格型号" prop="spec">
                    <Input class="form-common-width" v-model="curObject.spec" placeholder=""></Input>
                </FormItem>
                <FormItem label="所属部门" prop="department_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.department_name }}</div>
                        <div class="selector">
                            <my-department-selector @select="onDepartmentSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="规格" prop="spec">
                    <Input class="form-common-width" v-model="curObject.spec" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Card class="admin-card" v-if="curObject">
            <div class="admin-card-title" slot="title">
                折旧信息
            </div>
        </Card>
        <Card class="admin-card" v-if="curObject">
            <div class="admin-card-title" slot="title">
                对于科目
            </div>
        </Card>
        <Card class="admin-card" v-if="curObject">
            <div class="admin-card-title" slot="title">
                附属设备
            </div>
            <Table :columns="equipmentColumns" :data="equipments" ref="table" ></Table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'asset',
                curObjectId: null,
                curObject: {
                    asset_type_id: '',
                    asset_type_name: '',
                    asset_io_type_id: '',
                    asset_io_type_name: '',
                    asset_use_type_id: '',
                    asset_use_type_name: '',
                    department_id: '',
                    department_name: '',
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "编号不能为空",
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                        }
                    ],
                },
                equipments: [],
                equipmentColumns: [
                    {
                        title: "设备名称",
                        key: "name"
                    },
                    {
                        title: "规格型号",
                        key: 'spec'
                    },
                    {
                        title: "计量单位",
                        key: "unit"
                    },
                    {
                        title: "数量",
                        key: 'number'
                    },
                    {
                        title: "金额",
                        key: "money"
                    },
                    {
                        title: "启用日期",
                        key: 'start_date'
                    },
                    {
                        title: "备注",
                        key: "note"
                    },
                ]
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
                // 附属设备
                this.$http.get(`/equipment/all?asset_id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.equipments = data.data
                        console.log(this.equipments)
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
            onAssetTypeSelect(type) {
                this.curObject.asset_type_id = type.id
                this.curObject.asset_type_name = type.name
            },
            onAssetIoTypeSelect(type) {
                this.curObject.asset_io_type_id = type.id
                this.curObject.asset_io_type_name = type.name
            },
            onAssetUseTypeSelect(type) {
                this.curObject.asset_use_type_id = type.id
                this.curObject.asset_use_type_name = type.name
            },
            onBranchSelect(branch) {
                this.curObject.branch_id = branch.id
                this.curObject.branch_name = branch.name
            },
            onDepartmentSelect(department) {
                this.curObject.department_id = department.id
                this.curObject.department_name = department.name
            },
        }
    }
</script>
