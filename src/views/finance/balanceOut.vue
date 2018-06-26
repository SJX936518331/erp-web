<template>
    <my-quick-table
            modelName="balance_out"
            modelNameZh="费用单"
            :filters="filters"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '单据编号',
                        key: 'code',
                        width: 240
                    },
                    {
                        title: '日期',
                        key: 'make_time',
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
        computed: {
            filters() {
                return {
                    branch_id: this.$util.getBranch().id
                }
            },
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
