<template>
    <my-quick-table
            :addAble="false"
            :filters="filters"
            url="/sale_count/sku"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
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
                        key: "product_unit",
                        width: 160
                    },
                    {
                        title: "销售数量",
                        key: "number_sum",
                        width: 160
                    },
                ],
            }
        },
        computed: {
            filters() {
                return {
                    branch_id: this.$util.getBranch().id,
                }
            },
        },
        methods: {
        }
    }
</script>
