<template>
    <my-quick-table
            modelName="stock"
            modelNameZh="仓库"
            :addAble="false"
            url="/stock/warning"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
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
                        title: "总库存",
                        key: "total_number",
                        width: 160
                    },
                    {
                        title: "库存预警下限",
                        key: "down_number",
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.down_number === '-1' ? '' : params.row.down_number)
                        }
                    },
                    {
                        title: "库存预警上限",
                        key: "top_number",
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.top_number === '-1' ? '' : params.row.top_number)
                        }
                    },
                ],
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
