<template>
    <my-quick-table
            modelName="purchase_receive"
            modelNameZh="采购收货单"
            :addAble="false"
            :columns="columns" ref="table"></my-quick-table>
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
                        key: "date",
                        width: 160
                    },
                    {
                        title: "收货仓库",
                        key: "warehouse",
                        width: 160
                    },
                    {
                        title: "摘要",
                        key: "note",
                        width: 160
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
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

