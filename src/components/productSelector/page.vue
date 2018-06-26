<template>
    <div>
        <Button @click="selectUser">选择产品</Button>

        <Modal v-model="modalVisible" title="选择产品" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <Table :columns="userColumn" :data="products"></Table>
            <div slot="footer"></div>
        </Modal>

        <Modal v-model="skuModalVisible" title="选择规格" :width="800" okText="212" @on-ok="skuModalOk" @on-cancel="skuModalCancel">
            <div @click="back">返回</div>
            <Table :columns="skuColumn" :data="skus"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'product',
                products: [],
                modalVisible: false,
                skus: [],
                skuModalVisible: false,
                userColumn: [
                    {
                        title: "产品编号",
                        key: "code"
                    },
                    {
                        title: "产品名称",
                        key: 'name'
                    },
                    {
                        title: "单位",
                        key: 'unit'
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
                                                this.selectUserItem(this.products[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
                skuColumn: [
                    {
                        title: "ID",
                        key: "id"
                    },
                    {
                        title: "规格",
                        key: "spec"
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
                                                this.selectSkuItem(this.skus[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        props: {
//            onSelect: {
//                type: Function
//            }
        },
        methods: {
            back() {
                this.modalVisible = true
                this.skuModalVisible = false
            },
            selectUser() {
                this.modalVisible = true
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.products = data.data
                        console.log(this.products)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectUserItem(product) {
                console.log('选择了', product)
                console.log(this.onSelect)
                this.modalVisible = false
                this.skuModalVisible = true
//                this.onSelect && this.onSelect(user)
//                this.$emit('select', user)
                this.selectedProduct = product
                this.$http.get(`/sku/all?product_id=` + product.id).then(
                    response => {
                        let data = response.data
                        this.skus = data.data
                        console.log(this.products)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectSkuItem(sku) {
                console.log('选择了', sku)
                this.skuModalVisible = false
                this.$emit('select', {
                    product: this.selectedProduct,
                    sku: sku
                })
            },
            userModalOk() {
            },
            userModalCancel() {
            },
            skuModalOk() {
            },
            skuModalCancel() {
            }
        }
    }
</script>

<style scoped>
</style>
