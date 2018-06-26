<template>
    <my-quick-table
            modelName="sale_count_product"
            modelNameZh=""
            :addAble="false"
            :columns="columns" ref="table">
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "单号",
                        key: "code"
                    },
                    {
                        title: "日期",
                        key: "make_time"
                    },
                    {
                        title: "门店",
                        key: "store"
                    },
                    {
                        title: "金额",
                        key: "total_money"
                    },
                    {
                        title: "订单状态",
                        key: "status"
                    },
                    {
                        title: "客户姓名",
                        key: "name"
                    },
                    {
                        title: "摘要",
                        key: "abstract"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        buttons: [
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            };
        },
        methods: {
        }
    };
</script>
