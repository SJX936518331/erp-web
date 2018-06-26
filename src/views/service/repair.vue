<template>
    <my-quick-table
            modelName="repair"
            modelNameZh="维修派工单"
            :filters="filters"
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
                        key: "code",
                        width: 240
                    },
                    {
                        title: "日期",
                        key: "make_time",
                        width: 160
                    },
                    {
                        title: "金额",
                        key: "total_money",
                        width: 80
                    },
                    {
                        title: "分支机构",
                        key: "branch_name",
                        width: 160
                    },
                    {
                        title: "订单状态",
                        key: "status_text",
                        width: 160
                    },
                    {
                        title: "客户姓名",
                        key: "customer_name",
                        width: 160
                    },
                    {
                        title: "业务员",
                        key: "salesMan",
                        width: 160
                    },
                    {
                        title: "摘要",
                        key: "abstract",
                        width: 160
                    },
                    {
                        title: "状态",
                        key: "check_state",
                        width: 160,
                        render: this.$util.getCheckStateRender()
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
        computed: {
            filters() {
                return {
                    branch_id: this.$util.getBranch().id,
                }
            },
        },
        methods: {
        }
    };
</script>
