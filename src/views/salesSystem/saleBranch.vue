<template>
    <my-quick-table
            :addAble="false"
            url="/sale_count/branch"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "分支机构编号",
                        key: "branch_code",
                        width: 160
                    },
                    {
                        title: "分支机构",
                        key: "branch_name",
                        width: 160
                    },
                    {
                        title: "订单数",
                        key: "order_count",
                        width: 160
                    },
                    {
                        title: "订货金额",
                        key: "total_money",
                        width: 160
                    },
                    {
                        title: "已执行金额",
                        key: "receive_money",
                        width: 160
                    },
//                    {
//                        title: "中止金额",
//                        key: "canceled_total_money"
//                    },
                    {
                        title: "未执行金额",
                        key: "un_receive_money",
                        width: 160
                    },
                ],
            }
        },
        methods: {
        }
    }
</script>
