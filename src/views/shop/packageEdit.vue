<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="套餐编号" prop="id">
                    <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="套餐名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>

        <Card class="admin-card">
            <div class="admin-card-title" slot="title">
                套餐商品
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right">
                    <my-product-selector @select="onProductSelect" />
                </div>
            </div>
            <my-table v-model="products" :columns-list="columns" :editIncell="true" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curObjectId: null,
                curObject: {},
                validate: {
                    code: [
                        {
                            required: true,
                            message: "套餐编号不能为空",
                            trigger: "code"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "套餐名称不能为空",
                            trigger: "name"
                        }
                    ]
                },
                products: [],
                columns: [
                    {
                        title: "产品编号",
                        key: "product_id"
                    },
                    {
                        title: "产品名称",
                        key: "name"
                    },
                    {
                        title: "规格",
                        key: "spec"
                    },
                    {
                        title: "单位",
                        key: "unit"
                    },
                    {
                        title: "数量",
                        key: "number",
                        editable: true
                    },
                    {
                        title: "单价",
                        key: "price"
                    },
                    {
                        title: "金额",
                        key: "money",
                        render: (h, params) => {
                            let item = this.products[params.index]
                            return h('div', item.number * item.price)
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "25px"
                                        },
                                        on: {
                                            click: () => {
                                                this.saveItem(this.products[params.index], params.index)
                                            }
                                        }
                                    },
                                    "保存"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.removeItem(this.products[params.index], params.index)
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
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
                this.$http.get('/package/detail?id=' + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        console.log(this.curObject)
                        this.products = this.curObject.products
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
                    let url = this.curObjectId ? '/package/update' : '/package/add'
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success('保存成功')
                            if (!this.curObjectId) {
                                this.$router.push('/packages/' + response.data.data + '/edit')
                            }
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            onProductSelect(obj) {
                console.log('选择了2', obj)
                this.$http.post(`/package_item/add`, {
                    package_id: this.curObjectId,
                    product_id: obj.product.id,
                    number: 1,
                    sku_id: obj.sku.id
                }).then(
                    response => {
                        this.getData()
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            saveItem(item, index) {
                console.log('保存', item)
                this.$http.post(`/package_item/update`, {
                    id: item.id,
                    package_id: this.curObjectId,
                    product_id: item.product_id,
                    number: item.number,
                    sku_id: item.sku_id
                }).then(
                    response => {
                        this.$Message.success('保存成功')
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            removeItem(item, index) {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '确定删除数据？',
                    onOk: () => {
                        this.$http.post(`/package_item/remove?id=` + item.id).then(
                            response => {
                                this.getData()
                            },
                            response => {
                                console.log(response)
                            }
                        )
                    }
                })
            },
        }
    }
</script>
