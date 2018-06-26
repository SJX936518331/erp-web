<template>
    <div>
        <Card v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="员工" prop="user_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.user_name }}</div>
                        <div class="selector">
                            <my-user-selector @select="onWorkTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="工种" prop="work_type_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.work_type_name }}</div>
                        <div class="selector">
                            <my-work-type-selector @select="onWorkTypeSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="工序" prop="work_process_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.work_process_name }}</div>
                        <div class="selector">
                            <my-work-process-selector @select="onWorkProcessSelect" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="数量" prop="number">
                    <Input v-model="curObject.number" placeholder=""></Input>
                </FormItem>
                <FormItem label="工价" prop="price">
                    <Input v-model="curObject.price" placeholder=""></Input>
                </FormItem>
                <FormItem label="加班工资" prop="overtime_wage">
                    <Input v-model="curObject.overtime_wage" placeholder=""></Input>
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
                modelName: 'piecework_wage_item',
                curObject: {
                    type: '1',
                    user_id: '',
                    user_name: '',
                    work_type_id: '',
                    work_type_name: '',
                    work_process_id: '',
                    work_process_name: ''
                },
                validate: {
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                        }
                    ],
                    number: [
                        {
                            required: true,
                            message: "数量不能为空",
                        }
                    ],
                    price: [
                        {
                            required: true,
                            message: "工价不能为空",
                        }
                    ],
                    work_type_id: [
                        {
                            required: true,
                            message: "工种不能为空",
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
            onWorkTypeSelect(type) {
                this.curObject.work_type_id = type.id
                this.curObject.work_type_name = type.name
            },
            onWorkProcessSelect(process) {
                this.curObject.work_process_id = process.id
                this.curObject.work_process_name = process.name
            }
        }
    }
</script>
