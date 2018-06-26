<template>
    <my-quick-table
            modelName="stock"
            modelNameZh="仓库"
            :addAble="false"
            :columns="columns"
            ref="table">
        <div slot="filter">
            <span>仓库：{{ storeName }}</span>
            <my-store-selector @select="onStoreChange" />
        </div>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                storeId: '',
                storeName: '',
                data: [],
                columns: [
                    {
                        title: "产品编号",
                        key: "product_code",
                        width: 160
                    },
                    {
                        title: "产品名称",
                        key: "product_name",
                        width: 160
                    },
                    {
                        title: "规格",
                        key: "product_spec",
                        width: 160
                    },
                    {
                        title: "单位",
                        key: "unit",
                        width: 160
                    },
                    {
                        title: "仓库名称",
                        key: "store_name",
                        width: 160
                    },
                    {
                        title: "库存数量",
                        key: "number",
                        width: 160
                    },
                    {
                        title: "成本价",
                        key: "cost_price",
                        width: 160
                    },
                ],
            }
        },
        mounted() {
        },
        methods: {
            onStoreChange(store) {
                this.storeName = store.name
                this.storeId = store.id
                this.$refs.table.filter('store_id', this.storeId)
            }
        },
    }
</script>
