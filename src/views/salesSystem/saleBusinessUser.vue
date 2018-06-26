<template>
    <my-quick-table
            :addAble="false"
            url="/sale_count/business_user"
            :filters="filters"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "业务员编号",
                        key: "business_user_code",
                        width: 160
                    },
                    {
                        title: "业务员姓名",
                        key: "business_user_name",
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
//                        key: "canceled_total_money",
//                        width: 160
//                    },
                    {
                        title: "未执行金额",
                        key: "un_receive_money",
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
