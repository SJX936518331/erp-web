<template>
    <my-quick-table
            modelName="bank_io"
            modelNameZh="银行存取款单"
            :filters="filters"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'code',
                        width: 240
                    },
                    {
                        title: '日期',
                        key: 'make_time',
                        width: 160
                    },
                    {
                        title: '金额',
                        key: 'money',
                        width: 160
                    },
                    {
                        title: '备注',
                        key: 'note',
                        width: 320
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
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            };
        },
        mounted() {
        },
        computed: {
            filters() {
                return {
                    branch_id: this.$util.getBranch().id
                }
            },
        },
        methods: {
        },
    };
</script>
