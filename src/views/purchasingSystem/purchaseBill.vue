<template>
    <my-quick-table
            modelName="purchase_bill"
            modelNameZh="采购开单"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: "code",
                        width: 240
                    },
                    {
                        title: "日期",
                        key: "make_time",
                        width: 160
                    },
                    {
                        title: "供应商编号",
                        key: "supplier_code",
                        width: 160
                    },
                    {
                        title: "总金额",
                        key: "total_money",
                        width: 160
                    },
                    {
                        title: "已付金额",
                        key: "pay_money",
                        width: 160
                    },
                    {
                        title: "备注",
                        key: "note",
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
                        width: 200,
                        buttons: [
                            'BUTTON_VIEW',
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
