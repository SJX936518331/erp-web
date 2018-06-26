<template>
    <div>
        <Card v-if="curObject">
            <Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="银行" prop="bank_id">
                    <div class="form-selector">
                        <div class="value">{{ curObject.bank_name }}</div>
                        <div class="selector">
                            <my-bank-selector @select="onBankSelect" type="2" />
                        </div>
                    </div>
                </FormItem>
                <FormItem label="银行账号">
                    {{ curObject.bank_account }}
                </FormItem>
                <FormItem label="币种">
                    人民币
                </FormItem>
                <!--<FormItem label="购置日期" prop="buy_date">-->
                    <!--<DatePicker v-model="curObject.buy_date" type="date" placeholder=""></DatePicker>-->
                <!--</FormItem>-->
                <FormItem label="票据起始号" prop="start_no">
                    <Input v-model="curObject.start_no" placeholder=""></Input>
                </FormItem>
                <FormItem label="票据终止号" prop="end_no">
                    <Input v-model="curObject.end_no" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click.native="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import {format} from '../../util/time'

    export default {
        data() {
            return {
                modelName: 'bill',
                curObject: {
                    bank_id: '',
                    bank_name: '',
                    bank_account: '',
                },
                validate: {
                    bank_id: [
                        {
                            required: true,
                            message: "银行不能为空",
                            trigger: "title"
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

                    console.log(this.curObject.date, typeof this.curObject.date)
                    this.curObject.date = format(this.curObject.date, 'yyyy-MM-dd')
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
            onBankSelect(bank) {
                this.curObject.bank_id = bank.id
                this.curObject.bank_name = bank.name
                this.curObject.bank_account = bank.bank_account
            }
        }
    }
</script>
