<template>
    <div>
        <Button @click="selectUser">选择产品</Button>
        <Modal v-model="modalVisible" title="选择产品" :width="800" okText="212" @on-ok="userModalOk" @on-cancel="userModalCancel">
            <div style="margin-bottom: 16px">
                <Input class="admin-search-input" v-model="keyword" :clearable="true" placeholder="产品名称" style="width: 160px"></Input>
                <Button @click="search">搜索</Button>
            </div>

            <Table :columns="columns" :height="450" :data="products"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyword: '',
                modelName: 'product',
                products: [],
                modalVisible: false,
                columns: [
                    {
                        title: "产品编号",
                        key: "product_code"
                    },
                    {
                        title: "产品名称",
                        key: 'product_name'
                    },
                    {
                        title: "规格",
                        key: 'product_spec',
                        width: 120,
                    },
                    {
                        title: "单位",
                        key: 'product_unit'
                    },
                    {
                        title: "数量",
                        key: 'number'
                    },
                    {
                        title: "单价",
                        key: 'price'
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
            }
        },
        props: {
            storeId: {
                type: String,
                default: ''
            },
            before: {
                type: Function
            }
        },
        methods: {
            back() {
                this.modalVisible = true
                this.skuModalVisible = false
            },
            selectUser() {
                if (this.before) {
                    if (!this.before()) {
                        return
                    }
                }
                this.modalVisible = true
                let url
                if (this.storeId) {
                    url = `sku/store?store_id=` + this.storeId
                } else {
                    url = `stock/total_stock?a=a`
                }
                if (this.keyword) {
                    url += '&keyword=' + this.keyword
                }
                this.$http.get(url).then(
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
            search() {
                this.selectUser()
            },
            selectUserItem(product) {
                console.log('选择了', product)
                console.log(this.onSelect)
                this.modalVisible = false
                this.$emit('select', product)
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
