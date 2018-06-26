<template>
    <my-quick-table
            modelName="balance_in"
            modelNameZh="收入单"
            :filters="filters"
            :columns="columns"
            ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '单号',
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
                        key: 'total_money',
                        width: 160
                    },
                    {
                        title: '备注',
                        key: 'note',
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
            console.log('获得分支机构')
            console.log(this.$util.getBranch().id)
//            this.$refs.table.filter('branch_id', this.$util.getBranch().id)
        },
        methods: {
        },
    };
</script>
